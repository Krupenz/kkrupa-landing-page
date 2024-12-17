import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ContactForm from './components/ContactForm';

const App: React.FC = () => {
    const [showContactForm, setShowContactForm] = useState(false);
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Navbar />
            <main className="flex-1">
                <HeroSection onComplete={() => setShowContactForm(true)} />
                {showContactForm && <ContactForm />}
            </main>
        </div>
    );
};

export default App;
