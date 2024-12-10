import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ContactForm from './components/ContactForm';
import TypeText from './components/TypeText';

const App: React.FC = () => {
    const [showContactForm, setShowContactForm] = useState(false);
    const [showEnding, setShowEnding] = useState(false);

    return (
        <div className="flex flex-col min-h-screen w-full">
            <Navbar />
            <main className="flex-1">
                <HeroSection onComplete={() => setShowEnding(true)} />
                {showEnding && (
                    <h2 className="text-center mb-8">
                        <TypeText
                            text={
                                '...then leave me a message. I might be a good fit for your project.'
                            }
                            onComplete={() => setShowContactForm(true)}
                        />
                    </h2>
                )}
                {showContactForm && <ContactForm />}
            </main>
        </div>
    );
};

export default App;
