export interface IWebchatConfig {
    active: boolean;
    URLToken: string;
    settings: {
        colorScheme: string;
        designTemplate: number;
        inputPlaceholder: string;
        enableSTT: boolean;
        enableTTS: boolean;
        enableFileUpload: boolean;
        displayGetStartedButton: boolean;
        getStartedButtonText: string;
        getStartedPayload: string;
        getStartedText: string;
        headerLogoUrl: string;
        messageLogoUrl: string;
        backgroundImageUrl: string;
        enableTypingIndicator: boolean;
        messageDelay: number;
        persistentMenu: {
            title: string;
            menuItems: any[];
        },
        enablePersistentMenu: boolean;
        title: string;
    }
}