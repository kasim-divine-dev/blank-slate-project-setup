
import React from 'react'
import { RetroGrid } from '../RetroGrid/RetroGrid'
import StaggeredText from '../StaggeredText/StaggeredText'

interface CommonHeaderTextProps {
    text: string;
}

const CommonHeaderText: React.FC<CommonHeaderTextProps> = ({ text }) => {
    return (
        <div className="relative  flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
            <StaggeredText words={text} delay={0.05} />
            <RetroGrid />
        </div>
    )
}

export default CommonHeaderText
