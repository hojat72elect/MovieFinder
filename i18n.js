import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import I18nextReactNativeLanguageDetector from "./src/shared/i18next-react-native-language-detector";

i18n
    .use(I18nextReactNativeLanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: require('./locales/en.json'),
            },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;

