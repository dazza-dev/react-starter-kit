import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "@/languages/en.json";
import Spanish from "@/languages/es.json";
import Portuguese from "@/languages/pt.json";
import French from "@/languages/fr.json";

const resources = {
  en: {
    translation: English,
  },
  es: {
    translation: Spanish,
  },
  pt: {
    translation: Portuguese,
  },
  fr: {
    translation: French,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
