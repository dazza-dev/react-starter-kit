# React Starter Kit — Development Rules

## Stack

- React 19, Vite 7, TypeScript 5.9
- **MUI 7** (component library) + `@mui/x-data-grid` for tables
- React Router 7, TanStack Query 5 (server), Zustand 5 (client), react-i18next
- `react-hook-form` + `zod` for forms and validation
- `axios-case-converter` on top of the axios instance (converts snake_case ↔ camelCase)
- Layout, theme and shared components live in `src/core/` — nothing comes from an external UI package

---

## Comments

- **Language:** every comment is written in **English**. The code — variable, function, component,
  hook, field and type names — is already in English.
- **Function / hook / component docblocks:** multiline block form (`/** ... */`), even if the text
  is a single sentence.
- **Inline comments:** a single `//` line is enough. Don't expand them into a block.
- Never explain why an alternative was discarded. That belongs in the commit message.

---

## Module Structure

Each feature lives in `src/modules/{domain}/` (or `src/modules/{domain}/{feature}/`):

```
src/modules/configs/groups/
├── hooks/
│   ├── useGroups.ts          # queries and mutations (API layer)
│   └── useGroupColumns.tsx   # table columns
├── languages/{en,es,pt}.json
├── routes/groupRoutes.tsx
├── types/group.type.ts
└── views/
    ├── GroupList.tsx
    └── GroupFormModal.tsx
```

Modules included in the starter:

| Domain      | Content                           |
| ----------- | --------------------------------- |
| `auth`      | Login, password recovery, profile |
| `dashboard` | Home screen after login           |
| `users`     | **Reference CRUD** — users        |
| `configs`   | `groups`, `roles`, `settings`     |

> `configs/groups` is the **smallest complete example** of the pattern. Copy it when creating a module.
> `users` is the richest example: relations, option loading and more complete validation.

---

## API Calls

Every call goes through `src/core/utils/axios` (preconfigured instance):

- `baseURL` = `getBaseUrl() + '/api/v1'`
- `withCredentials: true`, `withXSRFToken: true` (cookie-based session)
- `axios-case-converter` applied
- Request interceptor that adds `Accept-Language`
- Response interceptor that shows the error toast and redirects to login on 401

The URL is passed **relative to** `/api/v1`:

```ts
axios.get("groups");
axios.post("groups", form);
```

All keys in `params: {}` and in request bodies **must be camelCase** — `axios-case-converter`
converts them to snake_case on the wire:

```ts
// ✓ correct
axios.get("users", { params: { perPage: 15, roleUuid: uuid } });

// ✗ incorrect — snake_case keys
axios.get("users", { params: { per_page: 15, role_uuid: uuid } });
```

**Careful:** the converter only touches **keys**, not values. A setting name travels as a
value (`{ name: "app_name", value: "..." }`), so snake_case is written by hand there — that's what
`SETTING_NAMES` in `configs/settings/types/setting.type.ts` is for.

Requests are wrapped in TanStack Query hooks, one per module:

```ts
export function useGroups(params: GroupTableParams) {
  return useQuery<PaginatedResponse<Group>>({
    queryKey: ["groups", params],
    queryFn: async () => {
      const { data } = await axios.get<PaginatedResponse<Group>>("groups", { params });
      return data;
    },
    placeholderData: (previous) => previous,
  });
}
```

---

## Types

Rules:

- Never include `id` in entity interfaces — the API only returns `uuid`
- `uuid: string` is the public identifier for every entity
- The `Form` interface contains only the editable fields (no `uuid`)
- Filters referencing entities are `string[]` (UUIDs), never `number[]`
- No anonymous inline types for shapes coming from the API: define a named `interface` in a
  `types/` file
- Shared types (`NamedOption`, `PaginatedResponse`, `TableParams`, `SortCriterion`) live in
  `src/core/types/common.type.ts` — import them from there, never duplicate them

---

## UUID Convention

- Empty string `''` = creation mode
- Non-empty string = edit mode
- Never use numeric ids (`-1`, `0`) as sentinel values

```ts
const isCreating = uuid === "";
```

---

## Hooks

Two per module, each with a single job:

- `useXxx` — API layer. One hook per operation (`useGroups`, `useGroup`, `useSaveGroup`,
  `useDeleteGroup`, `useRestoreGroup`), all in the same file
- `useXxxColumns` — table columns, memoized, with the actions it receives via props

Shared hooks live in `src/core/hooks/`. Don't create module hooks for data reused across the
system — `useRoleOptions()` and `useGroupOptions()` already serve the lists from the `settings/*`
endpoints.

`useDataTable()` centralizes pagination, sorting and search, and already returns the parameters
in the shape the backend expects (`page` starts at 1).

**Sorting:** travels as `sort_by[0][key]` + `sort_by[0][order]`, the same shape on both backends.
The `key` is the **field name as returned by the API** (camelCase, the same `field` used by the
DataGrid column), not the database column: each backend translates it to its own name.

Only the first criterion is used. Each backend validates the key against a whitelist; a key not
in it is ignored and the resource's default order is applied — never an error. If you add a
sortable column, add it to the whitelist on both backends too.

---

## State

- **Server:** TanStack Query. Never copy its response into a `useState` via a `useEffect`
- **Client:** Zustand, one store per domain (`authStore`, `configStore`)
- To edit something that comes from the server, store only what was touched and derive the rest:

```ts
// ✓ correct — edits win, the rest comes from the server
const [edited, setEdited] = useState<Partial<Form>>({});
const form = { ...saved, ...edited };

// ✗ incorrect — syncing with an effect (forbidden by react-hooks/set-state-in-effect)
useEffect(() => setForm(data), [data]);
```

---

## Routing

Each module exports its routes array and registers it in `src/core/routes/Router.tsx`. Private
routes hang off `FullLayout` inside `AuthGuard`; auth routes hang off `BlankLayout`.

Each route declares the permission it requires by wrapping itself in `PermissionGuard`, which
redirects to `/403`:

```tsx
{
  path: "/app/users",
  element: (
    <PermissionGuard permission="read-users">
      <UserList />
    </PermissionGuard>
  ),
}
```

Views are loaded with `Loadable(lazy(...))` so each one is its own chunk.

---

## Permissions

- Permissions arrive inside the profile itself (`POST auth/profile`), alongside `isAdmin`. No
  second request is needed: `GET permissions/me` exists on the backend but the SPA doesn't use it
- An admin gets `isAdmin: true` instead of an enumerated list — a permission added tomorrow works
  without redeploying
- Three ways to check, all against the same `authStore`'s `can()`: `PermissionGuard` on routes,
  `<CanAccess>` in JSX, and `usePermission()` in a component's body
- The sidebar filters itself: an item whose permission is missing disappears, and so does a group
  left with no visible children

---

## Sidebar

Items are defined in `src/core/layouts/full/sidebar/MenuItems.ts`, each with its `permission`.
When adding a new one, add it there.

---

## Internationalisation

Three languages: `es`, `en`, `pt`.

Each module has its locales in `module/languages/{en,es,pt}.json`. Register them in
`src/core/utils/i18n.ts` in all **three** blocks. The namespace is the module's name in camelCase.

Every visible text **must** go through `t('...')`. Never hardcode literals:

```tsx
// ✓ correct
<Button>{t("groups:create.button")}</Button>

// ✗ incorrect — literal
<Button>Create group</Button>
```

---

## Core Components

UI components live in `src/core/components/`. Import them by their path:

```ts
import FormInput from "@/core/components/forms/FormInput";
```

| Component             | Purpose                                                       |
| --------------------- | ------------------------------------------------------------- |
| `FormInput`           | Text input wired to react-hook-form                           |
| `FormSelect`          | Select, with `multiple` support                               |
| `FormSwitch`          | iOS-style switch                                              |
| `FormTextArea`        | Textarea                                                      |
| `FormSection`         | Card with a title that groups fields                          |
| `CustomTextField`     | MUI TextField with the shared defaults                        |
| `CustomPasswordField` | Password field with a show/hide toggle button                 |
| `DataTable`           | `DataGrid` with the project's style and locale                |
| `DataSearch`          | Debounced search box                                          |
| `PageHeader`          | Title, subtitle, actions and filters; sets the document title |
| `ImageUploader`       | Image upload with preview and validation                      |
| `CustomDialog`        | Dialog with a fixed header and footer                         |
| `DeleteConfirmDialog` | Delete confirmation                                           |

When editing, the form loads the item before showing itself: the view passes a spinner while
`isLoading` from `useXxx(uuid)` is active, and disables Save until the data arrives. This doesn't
apply when creating — `uuid === ''` disables the query.

The rich text editor lives in `src/core/components/forms/editor/` and uses tiptap.

---

## Layout customization

Layout defaults live in **one** file, `src/core/context/config.ts`: `activeTheme`, `activeMode`,
`borderCard` (bordered vs shadowed cards), `boxed` + `boxedWidth`, `isCollapse`, and the
`sidebarWidth` / `miniSidebarWidth` / `topBarHeight` dimensions.

Read them from there — never hardcode a colour, width or card style in a component. `MuiCard` in
`src/core/theme/Components.tsx` already branches on `config.borderCard`.

`activeMode` and `isCollapse` are only the starting values: the header toggle and the sidebar
button persist the user's choice in `localStorage` (`activeMode`, `isCollapse`), which wins on the
next load.

`vue-starter-kit` and `saas-starter-app` expose the same options through `setCustomizerDefaults()`
in their `src/main.ts`. Keep the three in sync when adding one.

---

## Notifications

```ts
import { toast } from "react-toastify";

toast.success(t("groups:create.success"));
```

API errors are already rendered by the axios interceptor: don't duplicate the toast in `onError`.

---

## Before committing

```bash
pnpm typecheck   # tsc --noEmit
pnpm lint        # eslint --fix
pnpm format      # prettier --write
```

`eslint-plugin-react-hooks` v7 is active: it forbids `setState` inside an effect and reading refs
during render. If you hit these rules, derive the state instead of syncing it.

---

## Related projects

- `laravel-starter-kit` — the Laravel API this SPA consumes
- `nestjs-starter-kit` — the same API in NestJS; either one works without touching the SPA
- `vue-starter-kit` — the same starter in Vue 3 + Vuetify, with the same modules
