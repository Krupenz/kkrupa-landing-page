import React from 'react';

interface SocialLinkProps {
    href: string;
    icon: string;
    alt: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, alt }) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <img
                src={icon}
                alt={alt}
                className="w-[50px] h-[50px] max-w-full max-h-full box-border inline-block p-[5px]"
            />
        </a>
    );
};

export default SocialLink;
