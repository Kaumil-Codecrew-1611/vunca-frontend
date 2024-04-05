import {createContext, useContext, useEffect, useState} from "react";
import de from "../lang/de.json"

const I18nContext = createContext({});

export const I18nProvider = ({children}) => {
    const [locale, setLocale] = useState("de");

    let languages = [
        {
            name: 'Deutsch',
            code: 'de',
            flag: 'de',
            translations: Object.keys(de).reduce((acc, cur) => {
                acc[cur?.toLowerCase()] = de[cur]
                return acc
            }, {})
        },
        // {
        //     name: 'English',
        //     code: 'en',
        //     flag: 'us',
        //     translations: {}
        // }
    ]

    useEffect(() => {
        let find = languages.find(d => d.locale === locale)
        if (!!find) {
            if (find.rtl) {
                document.documentElement.dir = 'rtl'
            } else {
                document.documentElement.dir = 'ltr'
            }
        }
    }, [locale]);

    const trans = languages.find(d => d.code === locale)?.translations || {}
    const t = (key) => trans[key?.toLowerCase()] || key

    const changeLocale = (locale) => {
        setLocale(locale)
        localStorage.setItem('locale', locale)
    }

    useEffect(() => {
        let locale = localStorage.getItem('locale')
        if (!!locale && !!languages.find(d => d.code === locale)) {
            setLocale(locale)
        }
    }, [])

    const value = {
        locale,
        changeLocale,
        languages,
        t
    };

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    )
}

export const useI18n = () => useContext(I18nContext);
export default I18nProvider;