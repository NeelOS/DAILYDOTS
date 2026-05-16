# project-instructions.md

## Project Overview

Build a modern, responsive Daily Journal web application with Mood Tracking using:

- Vite
- React
- TypeScript
- Supabase
- Tailwind CSS
- shadcn/ui
- Zustand
- TanStack Query
- React Router DOM
- React Hook Form + Zod

The application should prioritize:

- Clean architecture
- Reusable components
- Maintainable code
- Accessibility
- Production-ready standards
- Responsive design
- Excellent developer experience

---

# Core Tech Stack

## Frontend

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Radix UI
- React Router DOM
- Zustand
- TanStack Query
- React Hook Form
- Zod
- Framer Motion (minimal animations only)

## Backend / Services

- Supabase Authentication
- Supabase Database
- Supabase Storage (future-ready)
- Supabase Row Level Security (RLS)

## Tooling

- ESLint
- Prettier
- Vitest
- React Testing Library

## Deployment

- Vercel

---

# Application Features

## Authentication

Support:

- Email/password authentication
- Google OAuth login
- Protected routes
- Persistent sessions
- Logout functionality

Use Supabase Auth.

## Journal Features

Each journal entry should support:

- Mood selection
- Rich text or textarea content
- Tags
- Created timestamp
- Updated timestamp

Users should be able to:

- Create entries
- Edit entries
- Delete entries
- Search entries
- Filter by mood
- Filter by tags
- Sort by newest/oldest

## Offline Support

Support offline draft saving using browser localStorage.

Requirements:

- Auto-save drafts
- Restore unfinished drafts
- Prevent accidental data loss

---

# UI/UX Guidelines

## Design Style

Use:

- Minimal modern UI
- Clean spacing
- Soft shadows
- Rounded corners
- Consistent typography
- Calm mood-tracking aesthetic

Avoid:

- Excessive animations
- Overly bright colors
- Cluttered layouts

## Responsive Design

Desktop-first but fully responsive.

Breakpoints:

- Mobile
- Tablet
- Desktop
- Large Desktop

All pages must work well on:

- Mobile browsers
- Tablets
- Laptop screens
- Wide monitors

## Dark Mode

Implement:

- System theme detection
- Manual theme toggle
- Persistent theme preference

Use Tailwind dark mode.

## Accessibility

Requirements:

- Semantic HTML
- Keyboard navigation
- Proper aria-label usage
- Focus states
- Screen-reader friendly forms
- Accessible dialogs and modals

All interactive elements must be accessible.

---

# Folder Structure

Use feature-based architecture.

Recommended structure:

```txt
src/
├── app/
│   ├── providers/
│   ├── router/
│   └── layouts/
│
├── components/
│   ├── ui/
│   ├── shared/
│   └── feedback/
│
├── features/
│   ├── auth/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── types/
│   │
│   ├── journal/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── types/
│   │
│   └── mood/
│
├── hooks/
├── lib/
├── services/
├── store/
├── styles/
├── types/
├── utils/
└── main.tsx
```

---

# Coding Standards

## General Rules

- Use TypeScript everywhere
- Avoid `any`
- Prefer explicit typing
- Use functional components only
- Prefer composition over inheritance
- Keep components small and reusable
- Use named exports where possible
- Avoid duplicated logic

## Component Rules

Each component should:

- Have a single responsibility
- Be reusable
- Remain presentation-focused when possible
- Avoid business logic inside UI components

Split large components into:

- UI components
- Hooks
- Service functions

## Naming Conventions

### Components

Use PascalCase.

Examples:

- JournalCard.tsx
- MoodSelector.tsx
- LoginForm.tsx

### Hooks

Use camelCase with `use` prefix.

Examples:

- useAuth.ts
- useJournalEntries.ts

### Files

- Components: PascalCase
- Utilities: camelCase
- Types: camelCase.types.ts
- Schemas: feature.schema.ts

### Variables

Use descriptive camelCase names.

Avoid abbreviations.

Bad:

```ts
const d = data;
```

Good:

```ts
const journalEntries = data;
```

---

# State Management

Use Zustand for client-side state.

Rules:

- Keep global state minimal
- Prefer local component state when possible
- Separate UI state from server state
- Use TanStack Query for server cache
- Do not duplicate server data in Zustand

Examples of Zustand usage:

- Theme state
- Auth UI state
- Sidebar state
- Temporary filters

---

# API and Data Layer

## API Architecture

Use centralized service layer.

Structure:

```txt
features/journal/services/
```

Service responsibilities:

- Database calls
- API transformations
- Error handling
- Validation

Components should never directly call Supabase.

Use:

- Custom hooks
- Service functions

## TanStack Query Rules

Use TanStack Query for:

- Fetching
- Caching
- Mutations
- Background refetching
- Loading states
- Error states

Each feature should have:

- queryKeys.ts
- query hooks
- mutation hooks

Example:

```ts
useJournalEntriesQuery()
useCreateJournalMutation()
```

---

# Form Handling

Use:

- React Hook Form
- Zod validation

Rules:

- Every form must use schema validation
- Show user-friendly validation messages
- Validate both client-side and server-side

Example:

```ts
const schema = z.object({
  title: z.string().min(1),
  mood: z.string(),
});
```

---

# Database Design

## Tables

### profiles

```sql
id uuid primary key
email text
created_at timestamp
```

### journal_entries

```sql
id uuid primary key
user_id uuid references auth.users
mood text
content text
tags text[]
created_at timestamp
updated_at timestamp
```

## Security

Enable Row Level Security (RLS).

Policies:

- Users can only access their own journal entries
- Users can only update their own entries
- Users can only delete their own entries

Never expose unrestricted access.

---

# Error Handling

Use:

- Error Boundaries
- Toast notifications
- Centralized error utilities

Requirements:

- Show friendly error messages
- Avoid exposing raw backend errors
- Log useful debug information in development only

Use toast notifications for:

- Success messages
- Error messages
- Save confirmations

---

# Routing

Use React Router DOM.

Routes should include:

```txt
/
/login
/register
/dashboard
/journal/new
/journal/:id
/settings
```

## Route Protection

Protect authenticated routes.

Use:

- ProtectedRoute wrapper
- Session checks
- Redirect unauthenticated users

---

# Reusable UI Patterns

## Shared Components

Create reusable:

- Buttons
- Inputs
- Dialogs
- Cards
- Empty states
- Loaders
- Error states
- Toasts
- Page containers

## Loading States

Always handle:

- Loading
- Empty
- Error
- Success

Never leave blank screens.

---

# Animation Guidelines

Use minimal animations.

Recommended:

- Fade transitions
- Hover transitions
- Smooth dialogs
- Small micro-interactions

Avoid:

- Large motion effects
- Complex parallax
- Distracting animations

Use Framer Motion sparingly.

---

# Testing Strategy

Use:

- Vitest
- React Testing Library

Test:

- Components
- Hooks
- Forms
- Utilities
- Critical flows

Focus on:

- User behavior
- Accessibility
- Rendering correctness

Avoid testing implementation details.

---

# Environment Variables

Use:

- .env.development
- .env.production

Never commit secrets.

Required variables:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

# Code Formatting Rules

Use:

- ESLint
- Prettier

Formatting preferences:

- Consistent imports
- Single responsibility files
- No unused variables
- No console logs in production

---

# Git Standards

Use Conventional Commits.

Examples:

```txt
feat: add mood selector
fix: resolve login redirect issue
chore: update dependencies
refactor: simplify journal service
```

---

# Performance Guidelines

Requirements:

- Lazy load routes
- Optimize renders
- Avoid unnecessary re-renders
- Memoize expensive computations
- Use code splitting

Avoid premature optimization.

---

# Security Best Practices

Requirements:

- Never expose secrets
- Validate all inputs
- Sanitize user-generated content
- Use RLS everywhere
- Secure authentication flows
- Use HTTPS-only deployment

---

# Copilot Instructions

## Code Generation Rules

When generating code:

- Prefer maintainability over shortcuts
- Use reusable abstractions
- Keep files modular
- Use TypeScript strict typing
- Follow feature-based architecture
- Generate accessible components
- Use Tailwind utility classes cleanly
- Avoid deeply nested logic

## React Rules

- Use hooks-based architecture
- Avoid class components
- Use custom hooks for reusable logic
- Keep JSX readable
- Extract repeated UI patterns

## Styling Rules

- Use Tailwind CSS utilities
- Avoid inline styles
- Use reusable utility patterns
- Maintain consistent spacing scale

## API Rules

- Keep API logic outside components
- Use TanStack Query hooks
- Handle loading and errors correctly
- Use optimistic updates carefully

## Form Rules

- Use React Hook Form
- Use Zod validation
- Show validation messages
- Keep forms accessible

## Testing Rules

- Generate testable code
- Avoid tightly coupled logic
- Prefer pure utility functions

---

# Recommended Dependencies

```bash
npm install react-router-dom
npm install @tanstack/react-query
npm install zustand
npm install react-hook-form
npm install zod
npm install @hookform/resolvers
npm install framer-motion
npm install sonner
npm install lucide-react
npm install clsx
npm install tailwind-merge
npm install class-variance-authority
```

Dev dependencies:

```bash
npm install -D typescript
npm install -D vitest
npm install -D @testing-library/react
npm install -D @testing-library/jest-dom
npm install -D eslint
npm install -D prettier
```

---

# Final Engineering Principles

Always prioritize:

1. Readability
2. Maintainability
3. Reusability
4. Accessibility
5. Performance
6. Scalability
7. Developer experience

The codebase should feel:

- Professional
- Clean
- Predictable
- Easy to extend
- Production-ready

