declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VITE_EMAILJS_PUBLIC_KEY: string;
            VITE_GMAIL_SERVICE_ID: string;
            VITE_EMAIL_TEMPLATE_ID: string;
        }
    }
}

export {};
