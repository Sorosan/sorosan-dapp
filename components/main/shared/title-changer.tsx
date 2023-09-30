"use client"

import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

interface TitleChangerProp 
    extends React.HTMLAttributes<HTMLElement>{
    titles: string[];
}

export const TitleChanger = ({ className, titles }: TitleChangerProp) => {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeOut(true);
            setTimeout(() => {
                setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
                setFadeOut(false);
            }, 500); // Wait for 500ms before updating the title and fading in
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [titles]);

    return (
        <div className={cn("text-8xl font-bold flex justify-center", className)}>
            <h1>Soro</h1>
            <h1 className={`title-changer ${fadeOut ? 'fade-out' : 'fade-in'}`}>
                {titles[currentTitleIndex]}
            </h1>
        </div>
    );
};

