import React from 'react';
import { FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';

type TestStatusProps = {
    status: 'passed' | 'failed' | 'pending';
    size?: number;
};

const StatusIcon: React.FC<TestStatusProps> = ({ status, size = 24 }) => {
    const getStatusIcon = () => {
        switch (status) {
            case 'passed':
                return <FaCheck className="text-emerald-500" size={size} />;
            case 'failed':
                return <FaTimes className="text-red-500" size={size} />;
            case 'pending':
                return (
                    <FaSpinner
                        className="text-blue-500 animate-spin"
                        size={size}
                    />
                );
        }
    };

    return <div className="inline-block">{getStatusIcon()}</div>;
};

export default StatusIcon;
