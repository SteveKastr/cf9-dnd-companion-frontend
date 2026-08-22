# D&D Companion — Frontend

A React frontend for a Dungeons & Dragons 5e (2014) companion application, built as the final project for Coding Factory 9 (Athens University of Economics and Business).

Provides a browsable, role-aware interface to the full 5e System Reference Document (SRD) compendium, backed by a separate [Spring Boot REST API](../dndcompanion).

## Tech Stack

- **React 19** with **TypeScript**
- **Vite** (build tool and dev server)
- **React Router** (client-side routing)
- **TanStack Query (React Query)** (server state management, caching)
- **React Hook Form** + **Zod** (form handling and validation)
- **Tailwind CSS 4** + **shadcn/ui** (Radix-based components)
- **react-markdown** + **remark-gfm** (rendering the Rules Reference, including tables)
- **js-cookie** + **jwt-decode** (JWT token storage and decoding)

## Features

- Login and registration, with client-side validation matching the backend's rules
- Full SRD compendium browsing: Races, Classes (with subclasses, level-by-level features, and spell slot progression), Spells, Items, Monsters, Backgrounds, Feats, and Rules
- Role-aware navigation and access — pages and links only appear for roles that can actually use them (e.g. Monsters is hidden from Players; the "Users" admin page is hidden from non-Admins)
- Filtering, search, and pagination on larger collections (Spells, Items, Monsters)
- Personal account management ("My Account" — view/update profile, delete own account)
- Admin user management (list/search/delete users)
- Consistent, D&D-themed visual design across the app

## Prerequisites

- **Node.js 18+** and **npm**
- The [backend API](../dndcompanion) running locally (or accessible at the URL configured below)

## Setup & Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd cf9-dnd-companion-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:8080/api
```

Adjust this if your backend runs on a different host/port.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

**Note:** The backend API must be running (with MongoDB) for the app to load any data — see the [backend README](../dndcompanion/README.md) for setup instructions.

## Authentication

- New users can register via the Register page (role limited to Game Master or Player).
- The single Admin account is created automatically by the backend on first startup.
- Sessions persist across page reloads via a cookie storing the JWT access token.

## Role-Based Access

| Feature | Player | Game Master | Admin |
|---|---|---|---|
| Races, Classes, Spells, Backgrounds, Feats, Rules | ✅ | ✅ | ✅ |
| Items | ✅ (mundane only) | ✅ (all) | ✅ (all) |
| Monsters | ❌ | ✅ | ✅ |
| Admin user management | ❌ | ❌ | ✅ |
| Own account management | ✅ | ✅ | ✅ (cannot self-delete) |

Role-based UI restrictions mirror the backend's actual authorization rules — hiding a link or button is a UX convenience, not the source of truth for security.

## Data Source & Attribution

This project uses data derived from the **System Reference Document 5.1 ("SRD 5.1")** by Wizards of the Coast LLC, available at https://dnd.wizards.com/resources/systems-reference-document, licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode).

Icons used in this project are provided by [Font Awesome](https://fontawesome.com) under the CC BY 4.0 License.

## Project Structure

src/    
├── api/ # Backend API calls, grouped by entity     
├── components/ # Reusable UI components (Header, Footer, forms, shadcn/ui primitives)  
├── context/ # Authentication state (AuthContext/AuthProvider)  
├── lib/ # Shared utilities (e.g. the shadcn cn class-merging helper)   
├── pages/ # Route-level page components    
├── schemas/ # Zod validation schemas for forms     
├── types/ # TypeScript types mirroring backend DTOs/entities   
├── utils/ # Small helpers (e.g. cookie storage)    
├── App.tsx # Route definitions     
├── main.tsx # Application entry point  
└── index.css # Tailwind + theme configuration


## Build & Deploy

### Build for production

```bash
npm run build
```

This type-checks the project and produces an optimized static build in the `dist/` folder.

### Preview the production build locally

```bash
npm run preview
```

### Deployment notes

- This is a static single-page application (SPA) — the `dist/` folder can be served by any static file host (e.g. Nginx, Vercel, Netlify).
- `VITE_API_URL` is baked into the build at build time. Set it correctly in `.env` **before** running `npm run build` for production.
- The backend's CORS configuration currently only allows requests from `http://localhost:5173`. If deploying the frontend to a different origin, the backend's `SecurityConfig.java` must be updated accordingly.