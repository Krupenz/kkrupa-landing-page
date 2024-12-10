// TypewriterText.tsx
import React, { useState, useEffect, useRef } from 'react';

interface TypeTextProps {
    text: string;
    onComplete: () => void;
    delay?: number;
}

const TypeText: React.FC<TypeTextProps> = ({
    text,
    onComplete,
    delay = 50,
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(intervalId);
                onComplete();
            }
        }, delay);

        return () => clearInterval(intervalId);
    }, [text, delay, onComplete]);

    return <span>{displayedText}</span>;
};

export default TypeText;
