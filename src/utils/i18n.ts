import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// English
import EnglishCommon from "@/core/languages/en/common.json";
import EnglishCustomizer from "@/core/languages/en/customizer.json";
import EnglishSidebar from "@/core/languages/en/sidebar.json";
import EnglishUsers from "@/modules/users/languages/en.json";
import EnglishAuth from "@/modules/auth/languages/en.json";

// Spanish
import SpanishCommon from "@/core/languages/es/common.json";
import SpanishCustomizer from "@/core/languages/es/customizer.json";
import SpanishSidebar from "@/core/languages/es/sidebar.json";
import SpanishUsers from "@/modules/users/languages/es.json";
import SpanishAuth from "@/modules/auth/languages/es.json";

// Portuguese
import PortugueseCommon from "@/core/languages/pt/common.json";
import PortugueseCustomizer from "@/core/languages/pt/customizer.json";
import PortugueseSidebar from "@/core/languages/pt/sidebar.json";
import PortugueseUsers from "@/modules/users/languages/pt.json";
import PortugueseAuth from "@/modules/auth/languages/pt.json";

// French
import FrenchCommon from "@/core/languages/fr/common.json";
import FrenchCustomizer from "@/core/languages/fr/customizer.json";
import FrenchSidebar from "@/core/languages/fr/sidebar.json";
import FrenchUsers from "@/modules/users/languages/fr.json";
import FrenchAuth from "@/modules/auth/languages/fr.json";

const resources = {
  en: {
    common: EnglishCommon,
    customizer: EnglishCustomizer,
    sidebar: EnglishSidebar,
    users: EnglishUsers,
    auth: EnglishAuth,
  },
  es: {
    common: SpanishCommon,
    customizer: SpanishCustomizer,
    sidebar: SpanishSidebar,
    users: SpanishUsers,
    auth: SpanishAuth,
  },
  pt: {
    common: PortugueseCommon,
    customizer: PortugueseCustomizer,
    sidebar: PortugueseSidebar,
    users: PortugueseUsers,
    auth: PortugueseAuth,
  },
  fr: {
    common: FrenchCommon,
    customizer: FrenchCustomizer,
    sidebar: FrenchSidebar,
    users: FrenchUsers,
    auth: FrenchAuth,
  },
} as const;

// Get the saved language from local storage or default to English
const savedLanguage = (
  (typeof window !== "undefined" && localStorage.getItem("isLanguage")) ||
  "en"
).toLowerCase();

// Initialize i18n with React-i18next
i18n.use(initReactI18next).init({
  resources,
  ns: ["common", "customizer", "sidebar", "auth", "users"],
  defaultNS: "common",
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
