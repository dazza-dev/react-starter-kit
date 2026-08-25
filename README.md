# react-starter-kit

React 19 SPA to kick off a project without rebuilding login, permissions, layout and theme from
scratch. Consumes [`laravel-starter-kit`](https://github.com/dazza-dev/laravel-starter-kit) or
[`nestjs-starter-kit`](https://github.com/dazza-dev/nestjs-starter-kit): both expose the same contract, so
it works with either one without changing a line.

React 19 · MUI 7 · TypeScript 5.9 · Vite 7 · TanStack Query · Zustand · react-i18next

![React starter kit](https://github.com/user-attachments/assets/7d709d27-acc6-425c-9ae0-72bd56beaa5e)

---

## What's included

- Login, password recovery and user profile
- Permissions in three layers: route guard (`PermissionGuard`), `CanAccess` component and `usePermission` hook
- Full CRUD for users, roles (with permissions matrix), groups and settings
- Layout, theme and components included in the project itself, under `src/core/`
- Eight palettes, each with a light and a dark variant, and i18n in `es`/`en`/`pt`
- Form components with `react-hook-form` + `zod` validation
- Rich text editor based on tiptap

## Requirements

- Node.js 18+
- pnpm

## Getting started

Start the backend first and point `VITE_API_URL` to its URL.

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Open `http://localhost:5173` and log in with the user created by the API's seeder.

## Commands

```bash
pnpm dev          # dev server
pnpm build        # production build
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint --fix
pnpm format       # prettier --write
```

## Structure

Everything shared lives in `src/core/`; each feature is a module in `src/modules/`.

```
src/
├── core/
│   ├── components/   Forms, buttons, modals, table, editor
│   ├── context/      Customizer (theme and sidebar)
│   ├── hooks/        useDataTable, useOptions, useUnsavedChangesGuard
│   ├── languages/    common, sidebar and validation per language
│   ├── layouts/      FullLayout (sidebar + header) and BlankLayout
│   ├── providers/    QueryProvider (TanStack Query)
│   ├── routes/       Router.tsx
│   ├── store/        configStore (app settings)
│   ├── theme/        Palettes, typography, shadows and MUI overrides
│   ├── types/        Shared types
│   └── utils/        Preconfigured axios, i18n, dates
├── modules/
│   ├── auth/            login, password recovery, profile, guards
│   ├── dashboard/       home screen
│   ├── users/           user CRUD  ← full example
│   └── configs/
│       ├── groups/      ← the smallest example of the pattern; copy it for new modules
│       ├── roles/       roles + permissions matrix
│       └── settings/    app settings
└── assets/
```

Development rules, the module pattern and conventions live in [`CLAUDE.md`](./CLAUDE.md).

## Adding a module

1. Copy `src/modules/configs/groups/` and rename everything
2. Register its routes in `src/core/routes/Router.tsx`
3. Register its locales in `src/core/utils/i18n.ts`, in all **three** languages
4. Add its entry to the sidebar in `src/core/layouts/full/sidebar/MenuItems.ts` with its `permission`
5. Create the equivalent module in the backend and its permissions in its seeder

## Customization

Every layout default lives in one file, `src/core/context/config.ts`:

| Option                                             | Values                          | What it does                                                                    |
| -------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------- |
| `activeTheme`                                      | a palette name                  | Colour palette. The backend's `app_theme` setting overrides it at runtime       |
| `activeMode`                                       | `light` / `dark`                | Mode on first load; the header toggle then remembers the user's choice          |
| `borderCard`                                       | `true` / `false`                | `true` outlines cards with a border, `false` gives them a shadow                |
| `boxed`                                            | `true` / `false`                | `true` centres the content and caps it at `boxedWidth`, `false` fills the width |
| `boxedWidth`                                       | pixels                          | Maximum content width when `boxed` is on                                        |
| `isCollapse`                                       | `full-sidebar` / `mini-sidebar` | Sidebar on first load; the toggle then remembers the user's choice              |
| `sidebarWidth`, `miniSidebarWidth`, `topBarHeight` | pixels                          | Layout dimensions                                                               |

Palettes: `DEFAULT_THEME`, `BLUE_THEME`, `AQUA_THEME`, `ORANGE_THEME`, `PURPLE_THEME`, `GREEN_THEME`,
`CYAN_THEME`, `EMERALD_THEME`. Each ships a `DARK_` twin, picked automatically by the mode toggle.
Their colours are defined in `src/core/theme/DefaultColors.tsx`.

`activeMode` and `isCollapse` are only the **starting** values: once the user touches the header
toggle or the sidebar button, their choice is kept in `localStorage` and wins from then on.

`vue-starter-kit` and `saas-starter-app` expose the same options, in the `setCustomizerDefaults()`
call in their `src/main.ts`.

## Rebranding

- The logo is uploaded from `Settings → Design` and saved on the backend; without a logo, the app
  name is rendered instead. `SidebarLogo.tsx` and `AppLogo.tsx` decide between the two
- Colors in `src/core/theme/DefaultColors.tsx`. The sidebar uses the `palette.sidebar` token
- Name in `VITE_APP_NAME`; the backend's `app_name` setting takes precedence if set
- The favicon in `public/` is a placeholder: replace it
