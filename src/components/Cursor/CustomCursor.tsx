
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { throttle } from 'lodash';

const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
    );

const StyledCursor = styled.div`
  position: fixed;
  width: ${isMobile ? '0' : '25px'};
  height: ${isMobile ? '0' : '25px'};
  background-color: transparent;
  border: ${isMobile ? 'none' : '1.5px solid var(--cursor-border)'};
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;

  .cursor-dot {
    position: absolute;
    width: ${isMobile ? '0' : '5px'};
    height: ${isMobile ? '0' : '5px'};
    background-color: var(--cursor-dot);
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const TrailSegment = styled.div`
  position: fixed;
  width: ${isMobile ? '0' : '25px'};
  height: ${isMobile ? '0' : '25px'};
  background: var(--cursor-background);
  pointer-events: none;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 9998;
`;

const CustomCursor: React.FC = () => {
    const [isMoving, setIsMoving] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isHoveringLink, setIsHoveringLink] = useState(false);
    const trailRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailLength = 10;
    const mousePosition = useRef({ x: -100, y: -100 });
    const movementTimeout = useRef<NodeJS.Timeout | null>(null);
    const animationFrameId = useRef<number | null>(null);

    useEffect(() => {
        const segments = Array(trailLength)
            .fill(null)
            .map(() => React.createRef<HTMLDivElement>());
        trailRefs.current = segments;

        return () => {
            trailRefs.current = [];
        };
    }, [trailLength]);

    useEffect(() => {
        const throttledMouseMove = throttle((e: MouseEvent) => {
            const { clientX: x, clientY: y } = e;
            mousePosition.current = { x, y };

            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    x,
                    y,
                    duration: 0.6,
                    ease: 'power2.out',
                });
            }

            setIsMoving(true);
            if (movementTimeout.current) {
                clearTimeout(movementTimeout.current);
            }

            movementTimeout.current = setTimeout(() => {
                setIsMoving(false);
            }, 500);
        }, 16);

        window.addEventListener('mousemove', throttledMouseMove);

        return () => {
            window.removeEventListener('mousemove', throttledMouseMove);
        };
    }, [setIsMoving]);

    useEffect(() => {
        const handleMouseDown = () => {
            setIsMouseDown(true);
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    width: 50,
                    height: 50,
                    borderColor: 'var(--cursor-mouse-down-border)',
                    boxShadow: '0 0 25px var(--cursor-mouse-down-shadow)',
                    duration: 0.2,
                    ease: 'power2.out',
                });
            }
        };

        const handleMouseUp = () => {
            setIsMouseDown(false);
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    width: 25,
                    height: 25,
                    borderColor: 'var(--cursor-border)',
                    boxShadow: 'none',
                    duration: 0.2,
                    ease: 'power2.out',
                });
            }
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    useEffect(() => {
        const handleMouseEnterLink = () => {
            setIsHoveringLink(true);
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    width: 50,
                    height: 50,
                    borderColor: 'var(--cursor-link-hover-border)',
                    boxShadow: '0 0 25px var(--cursor-link-hover-shadow)',
                    duration: 0.2,
                    ease: 'power2.out',
                });
            }
        };

        const handleMouseLeaveLink = () => {
            setIsHoveringLink(false);
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    width: 25,
                    height: 25,
                    borderColor: 'var(--cursor-border)',
                    boxShadow: 'none',
                    duration: 0.2,
                    ease: 'power2.out',
                });
            }
        };

        const addLinkListeners = () => {
            const links = document.querySelectorAll(
                'a, button, input, textarea, img, p',
            );
            links.forEach((link) => {
                link.addEventListener('mouseenter', handleMouseEnterLink);
                link.addEventListener('mouseleave', handleMouseLeaveLink);
            });
        };

        addLinkListeners();

        const observer = new MutationObserver(() => {
            addLinkListeners();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            const links = document.querySelectorAll(
                'a, button, input, textarea, img, p',
            );
            links.forEach((link) => {
                link.removeEventListener('mouseenter', handleMouseEnterLink);
                link.removeEventListener('mouseleave', handleMouseLeaveLink);
            });
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const updateTrail = () => {
            trailRefs.current.forEach((ref, index) => {
                const segment = ref.current;
                if (segment) {
                    const delay = (index + 1) * 0.05;

                    gsap.to(segment, {
                        x: mousePosition.current.x,
                        y: mousePosition.current.y,
                        duration: 0.6,
                        ease: 'power2.out',
                        delay: delay,
                    });
                }
            });

            if (animationFrameId.current) {
                requestAnimationFrame(updateTrail);
            }
        };

        animationFrameId.current = requestAnimationFrame(updateTrail);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    if (isMobile) {
        return null;
    }

    return (
        <>
            <StyledCursor ref={cursorRef}>
                <div className="cursor-dot" />
            </StyledCursor>
            {trailRefs.current.map((ref, index) => (
                <TrailSegment key={index} ref={ref} />
            ))}
        </>
    );
};

export default CustomCursor;
