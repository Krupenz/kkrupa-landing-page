import React, { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import StatusIcon from './StatusIcon.tsx';

const typeSpeed = 25;

interface HeroSectionProps {
    onComplete: () => void;
}

const listItems = [
    'has expertise in testing web applications',
    'has experience with mobile platforms',
    'is familiar with cloud and containerization concepts',
    'knows Python or Javascript and can leverage it for test automation (Selenium, Cypress, Playwright)',
    'can utilize CI/CD pipelines to improve quality of your project',
    'communicates well and will strengthen your team',
];

const HeroSection: React.FC<HeroSectionProps> = ({ onComplete }) => {
    const [, setCurrentIndex] = useState<number>(0);
    const [showSkillsList, setShowSkillsList] = useState(false);
    const [showIncentiveText, setShowIncentiveText] = useState(false);
    const [statuses, setStatuses] = useState<('pending' | 'passed')[]>(
        new Array(listItems.length).fill('pending'),
    );
    const hiTextElement = useRef(null);
    const incentiveTextElement = useRef(null);

    useEffect(() => {
        const typed = new Typed(hiTextElement.current, {
            strings: ["Hi! ^1000 If you're looking for a QA/SDET who:"],
            typeSpeed: typeSpeed,
            onComplete: function (self) {
                self.cursor.remove();
                setShowSkillsList(true);
            },
        });

        return () => {
            typed.destroy();
        };
    }, []);

    useEffect(() => {
        if (!showSkillsList) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                if (prevIndex < listItems.length) {
                    setStatuses((prevStatuses) => {
                        const newStatuses = [...prevStatuses];
                        newStatuses[prevIndex] = 'passed';
                        return newStatuses;
                    });
                    return prevIndex + 1;
                }
                clearInterval(interval);
                setShowIncentiveText(true);
                return prevIndex;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [showSkillsList]);

    useEffect(() => {
        if (!showSkillsList) return;
        const typed = new Typed(incentiveTextElement.current, {
            strings: [
                '...then leave me a message. I might be a good fit for your project.',
            ],
            typeSpeed: typeSpeed,
            onComplete: function (self) {
                self.cursor.remove();
                onComplete();
            },
        });

        return () => {
            typed.destroy();
        };
    }, [showIncentiveText]);

    return (
        <section className="container mx-auto px-4 py-4">
            <div className="max-w-[90%] min-w-[320px] mx-auto">
                <h1 className="text-3xl font-bold mb-6">
                    <span ref={hiTextElement}></span>
                </h1>
                {showSkillsList && (
                    <ul className="list-none space-y-4 transition-opacity duration-500 ease-in opacity-0 animate-fadeIn">
                        {listItems.map((item, index) => (
                            <li key={index} className="flex gap-3">
                                <StatusIcon
                                    status={statuses[index]}
                                    size={20}
                                />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}
                {showIncentiveText && (
                    <h1 className="text-3xl font-bold mt-8">
                        <span ref={incentiveTextElement}></span>
                    </h1>
                )}
            </div>
        </section>
    );
};

export default HeroSection;
