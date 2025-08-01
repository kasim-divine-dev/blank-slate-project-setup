
import React from 'react';

interface BoxesLayerProps {
    gridColor?: string;
    gridSize?: string;
}

const BoxesLayer: React.FC<BoxesLayerProps> = ({ gridColor = '#9b9389', gridSize = '25px 24px' }) => {
    return (
        <div
            className={`absolute bottom-0 left-0 right-0 top-0 z-0 pointer-events-none`}
            style={{
                backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), 
                                  linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
                backgroundSize: gridSize,
                maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
            }}
        ></div>
    );
};

export default BoxesLayer;
