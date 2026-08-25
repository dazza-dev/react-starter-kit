import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "@/core/languages/en/common.json";
import enSidebar from "@/core/languages/en/sidebar.json";
import enValidation from "@/core/languages/en/validation.json";
import enAuth from "@/modules/auth/languages/en.json";
import enDashboard from "@/modules/dashboard/languages/en.json";
import enUsers from "@/modules/users/languages/en.json";
import enGroups from "@/modules/configs/groups/languages/en.json";
import enRoles from "@/modules/configs/roles/languages/en.json";
import enSettings from "@/modules/configs/settings/languages/en.json";

import esCommon from "@/core/languages/es/common.json";
import esSidebar from "@/core/languages/es/sidebar.json";
import esValidation from "@/core/languages/es/validation.json";
import esAuth from "@/modules/auth/languages/es.json";
import esDashboard from "@/modules/dashboard/languages/es.json";
import esUsers from "@/modules/users/languages/es.json";
import esGroups from "@/modules/configs/groups/languages/es.json";
import esRoles from "@/modules/configs/roles/languages/es.json";
import esSettings from "@/modules/configs/settings/languages/es.json";

import ptCommon from "@/core/languages/pt/common.json";
import ptSidebar from "@/core/languages/pt/sidebar.json";
import ptValidation from "@/core/languages/pt/validation.json";
import ptAuth from "@/modules/auth/languages/pt.json";
import ptDashboard from "@/modules/dashboard/languages/pt.json";
import ptUsers from "@/modules/users/languages/pt.json";
import ptGroups from "@/modules/configs/groups/languages/pt.json";
import ptRoles from "@/modules/configs/roles/languages/pt.json";
import ptSettings from "@/modules/configs/settings/languages/pt.json";

export const SUPPORTED_LANGUAGES = ["es", "en", "pt"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const resources = {
  en: {
    common: enCommon,
    sidebar: enSidebar,
    validation: enValidation,
    auth: enAuth,
    dashboard: enDashboard,
    users: enUsers,
    groups: enGroups,
    roles: enRoles,
    settings: enSettings,
  },
  es: {
    common: esCommon,
    sidebar: esSidebar,
    validation: esValidation,
    auth: esAuth,
    dashboard: esDashboard,
    users: esUsers,
    groups: esGroups,
    roles: esRoles,
    settings: esSettings,
  },
  pt: {
    common: ptCommon,
    sidebar: ptSidebar,
    validation: ptValidation,
    auth: ptAuth,
    dashboard: ptDashboard,
    users: ptUsers,
    groups: ptGroups,
    roles: ptRoles,
    settings: ptSettings,
  },
} as const;

const storedLanguage = localStorage.getItem("lang") as SupportedLanguage | null;

i18n.use(initReactI18next).init({
  resources,
  ns: [
    "common",
    "sidebar",
    "validation",
    "auth",
    "dashboard",
    "users",
    "groups",
    "roles",
    "settings",
  ],
  defaultNS: "common",
  lng: storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage) ? storedLanguage : "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Screen readers and the browser's spell checker go by this attribute.
i18n.on("languageChanged", (lang) => {
  document.documentElement.lang = lang;
});

document.documentElement.lang = i18n.language;

/**
 * Changes the language and persists it; the axios interceptor sends it in Accept-Language.
 */
export function setLanguage(lang: SupportedLanguage) {
  localStorage.setItem("lang", lang);
  void i18n.changeLanguage(lang);
}

export default i18n;
