import React, { useState, useEffect } from 'react';
import StatusIcon from './StatusIcon';

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
    const [statuses, setStatuses] = useState<('pending' | 'passed')[]>(
        new Array(listItems.length).fill('pending'),
    );

    useEffect(() => {
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
                onComplete(); // Call onComplete when all items are processed
                return prevIndex;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <section className="container mx-auto px-4 py-12">
            <div className="max-w-[90%] min-w-[320px] mx-auto">
                <h1 className="text-3xl font-bold mb-6">
                    Hi! If you're looking for a QA/SDET who:
                </h1>
                <ul className="list-none space-y-4">
                    {listItems.map((item, index) => (
                        <li key={index} className="flex gap-3">
                            <StatusIcon status={statuses[index]} size={20} />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default HeroSection;
