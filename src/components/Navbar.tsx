import React from 'react';
import linkedinLogo from '../assets/linkedin_logo.png';
import githubLogo from '../assets/github_logo.png';
import codewarsLogo from '../assets/codewars_logo.png';
import SocialLink from './SocialLink';

const socialLinks = [
    {
        href: 'https://www.linkedin.com/in/krystian-krupa/',
        icon: linkedinLogo,
        alt: 'LinkedIn',
    },
    {
        href: 'https://github.com/Krupenz',
        icon: githubLogo,
        alt: 'GitHub',
    },
    {
        href: 'https://www.codewars.com/users/Krupenz',
        icon: codewarsLogo,
        alt: 'Codewars',
    },
];

const Navbar: React.FC = () => {
    return (
        <nav className="flex justify-between items-center px-8 py-4 shadow-md">
            <div>kkrupa.dev</div>
            <div>
                {socialLinks.map((link) => (
                    <SocialLink
                        key={link.alt}
                        href={link.href}
                        icon={link.icon}
                        alt={link.alt}
                    />
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
