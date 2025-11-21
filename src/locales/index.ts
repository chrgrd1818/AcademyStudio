import { createI18n } from 'vue-i18n'
import enUS from './en-US.json'
import frFR from './fr-FR.json'

export const i18n = createI18n({
    legacy: false, // Use Composition API mode
    locale: localStorage.getItem('locale') || 'en-US',
    fallbackLocale: 'en-US',
    messages: {
        'en-US': enUS,
        'fr-FR': frFR
    }
})

export const availableLocales = [
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'fr-FR', name: 'Français', flag: '🇫🇷' }
]
