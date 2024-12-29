import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaSpinner } from 'react-icons/fa';

interface FormData {
    name: string;
    email: string;
    message: string;
}

const VITE_EMAILJS_PUBLIC_KEY = 'Fkv-UBOwLY92_Anb4';
const VITE_GMAIL_SERVICE_ID = 'service_i9ega5s';
const VITE_EMAIL_TEMPLATE_ID = 'template_kd9ofxd';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    emailjs.init(VITE_EMAILJS_PUBLIC_KEY);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);

        try {
            const notificationToMe = await emailjs.send(
                VITE_GMAIL_SERVICE_ID,
                VITE_EMAIL_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                },
                VITE_EMAILJS_PUBLIC_KEY,
            );

            if (notificationToMe.status === 200) {
                setIsSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => {
                    setIsSubmitted(false);
                }, 3000);
            }
        } catch (e) {
            console.error(e);
            setIsError(true);
            setTimeout(() => {
                setIsError(false);
            }, 2500);
        } finally {
            setIsPending(false);
        }
    };

    const getButtonClassName = () => {
        let baseClass =
            'w-full p-3 text-base text-white rounded-md transition-colors duration-300 ';
        if (isError) {
            return baseClass + 'bg-red-900 cursor-not-allowed';
        } else if (isSubmitted || isPending) {
            return baseClass + 'bg-emerald-900 cursor-not-allowed';
        } else {
            return baseClass + 'bg-emerald-600 cursor-pointer';
        }
    };

    const getButtonContent = () => {
        if (isPending)
            return (
                <div className="flex items-center justify-center">
                    <FaSpinner className="text-white animate-spin" size={20} />
                </div>
            );
        if (isSubmitted) return 'Message was sent, thank you! :)';
        if (isError) return 'Something went wrong, please try again';
        return 'Submit';
    };

    return (
        <section className="py-4 px-4 md:py-4">
            <div className="mx-auto p-4 md:p-8 bg-formBackground rounded-lg shadow-md max-w-[40%] min-w-[320px] transition-opacity duration-500 ease-in opacity-0 animate-fadeIn">
                <form
                    className="flex flex-col gap-4 transition-opacity duration-500 ease-in opacity-0 animate-fadeIn"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                        required
                        className="w-full bg-background p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-opacity duration-500 ease-in opacity-0 animate-fadeIn"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            })
                        }
                        required
                        className="w-full p-3 bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-opacity duration-500 ease-in opacity-0 animate-fadeIn"
                    />
                    <textarea
                        placeholder="Message content"
                        value={formData.message}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                message: e.target.value,
                            })
                        }
                        required
                        className="w-full p-3 bg-background rounded-md min-h-[150px] resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-opacity duration-500 ease-in opacity-0 animate-fadeIn"
                    />
                    <button
                        type="submit"
                        disabled={isPending || isError || isSubmitted}
                        className={getButtonClassName()}
                    >
                        {getButtonContent()}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
