# Architecture Guide

Overview of DailyDots technical architecture and design patterns.

## High-Level Architecture

```
┌─────────────────────────────────────┐
│         React Components             │
│  (Pages, Components, Hooks)          │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│       Services & Business Logic      │
│  (journalService)                    │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│      Local Storage / Persistence     │
│  (Browser localStorage)              │
└─────────────────────────────────────┘
```

## Directory Structure

### `/src/components` - Reusable UI Components

Components are presentation-focused and stateless when possible.

```
components/
├── Navigation.tsx        # App navigation bar
├── JournalCard.tsx       # Display single entry (list view)
├── JournalForm.tsx       # Create/edit entry form
└── MoodSelector.tsx      # Mood emoji selection interface
```

**Design Pattern**: Presentational Components
- Accept data via props
- Call functions passed via props for events
- No direct service calls
- Easily testable

### `/src/pages` - Page Routes

Each page represents a route in the application.

```
pages/
├── Home.tsx              # Landing page (/)
├── AddJournal.tsx        # Create/edit entry (/add)
└── MyJournals.tsx        # View all entries (/journals)
```

**Responsibilities**:
- Handle route params
- Manage page-level state
- Compose components
- Pass data to child components

### `/src/hooks` - Custom React Hooks

Custom hooks encapsulate state management logic.

```
hooks/
└── useJournals.ts        # Journal state + CRUD operations
```

**`useJournals` Hook**:
```typescript
const {
  entries,           // All journal entries
  isLoading,         // Loading state
  createEntry,       // Create new entry
  updateEntry,       // Update existing entry
  deleteEntry,       // Delete entry
  getByDate          // Get entry by date
} = useJournals();
```

### `/src/services` - Business Logic

Services contain pure business logic, data transformations, and API calls.

```
services/
└── journalService.ts     # Journal CRUD operations
```

**Key Methods**:
- `create(date, mood, content)` - Create new entry
- `update(date, mood, content)` - Update entry
- `delete(date)` - Remove entry
- `getByDate(date)` - Fetch single entry
- `getAllSorted(order)` - Fetch all entries

### `/src/types` - TypeScript Definitions

```
types/
└── journal.types.ts      # Entry and mood interfaces
```

**Core Types**:
```typescript
interface JournalEntry {
  id: string
  date: string           // YYYY-MM-DD format
  mood: string           // emoji or label
  content: string
  createdAt: number      // timestamp
  updatedAt: number      // timestamp
}

interface MoodOption {
  emoji: string
  label: string
  value: string
}
```

## Data Flow

### Creating an Entry

```
AddJournal Page
    ↓
JournalForm Component (with date picker)
    ↓
handleSave() callback
    ↓
useJournals.createEntry()
    ↓
journalService.create()
    ↓
localStorage.setItem()
    ↓
Update React state
    ↓
Navigate to /journals
```

### Displaying Entries

```
MyJournals Page
    ↓
useJournals() hook
    ↓
journalService.getAllSorted()
    ↓
localStorage.getItem()
    ↓
Return entries array
    ↓
Map over entries
    ↓
Render JournalCard components
```

## State Management Strategy

### Local Component State
- Used for: Form inputs, UI state (show/hide), loading states
- Examples: `mood`, `content`, `error`, `isSaving`
- Storage: React `useState()`

### Hook State
- Used for: Shared data across components
- Examples: Journal entries list, loading status
- Storage: Custom hook + localStorage

### Future: Global State (Zustand)
- When needed: Theme, user preferences, auth state
- Pattern: Zustand store with persistence

## Design Patterns Used

### 1. Component Composition
```typescript
<AddJournal>
  <JournalForm>
    <MoodSelector />
  </JournalForm>
</AddJournal>
```

### 2. Custom Hooks
Encapsulate state and logic:
```typescript
const { entries, createEntry } = useJournals();
```

### 3. Callback Props
Child → Parent communication:
```typescript
<JournalForm onSave={handleSave} onDateChange={handleDate} />
```

### 4. Service Layer
Separate business logic from UI:
```typescript
const newEntry = journalService.create(date, mood, content);
```

## Data Persistence

### Current: Browser localStorage

**Pros**:
- No server needed
- Works offline
- Simple implementation

**Cons**:
- Data lost if storage cleared
- No cloud sync
- Limited storage (~5-10MB)

**Storage Format**:
```javascript
localStorage.getItem('journal_entries')
// Returns: JSON string of entries array
```

### Future: Supabase Integration

```
Components → Services → Supabase
                      ↓
                   PostgreSQL DB
```

Expected changes:
- Replace localStorage with Supabase queries
- Add authentication layer
- Implement real-time sync
- Add RLS (Row Level Security)

## Performance Considerations

### Current Optimizations
- Local state for form inputs (no unnecessary renders)
- `useCallback` for stable function references
- Conditional rendering
- No unnecessary re-renders

### Future Improvements
- Implement `React.memo()` for components
- Code splitting with lazy loading
- Pagination for large entry lists
- Search/filter optimization

## Scalability

### Adding New Features

1. **New Page**:
   - Create in `/src/pages/NewPage.tsx`
   - Add route in `App.tsx`
   - Use existing hooks/services

2. **New Service**:
   - Create `src/services/newService.ts`
   - Export functions
   - Use in hooks or components

3. **New Hook**:
   - Create `src/hooks/useNewFeature.ts`
   - Manage state
   - Use service layer

4. **New Component**:
   - Create `src/components/NewComponent.tsx`
   - Keep focused and reusable
   - Accept data via props

### Feature Flags
When adding major features, consider:
```typescript
const FEATURES = {
  SUPABASE_SYNC: false,
  DARK_MODE: false,
  EXPORT: false,
};
```

## Error Handling

### Current Strategy
- Try/catch in components
- Show user-friendly error messages
- Log to console in development

### Future Strategy
- Centralized error boundary
- Error logging service
- User notifications (toast)
- Error recovery mechanisms

## Testing Strategy

### Unit Tests
- Services (business logic)
- Utilities and helpers
- Type checking

### Component Tests
- User interactions
- Form submissions
- Conditional rendering

### Integration Tests
- Full user workflows
- Navigation
- State persistence

## Security Considerations

### Current
- All data is client-side
- No authentication needed
- No sensitive data handled

### Future (with Supabase)
- User authentication (email/password, OAuth)
- Row Level Security (RLS)
- Data encryption in transit (HTTPS)
- Secure token storage

## Monitoring & Analytics

### Future Additions
- Error tracking (Sentry)
- Usage analytics
- Performance monitoring
- User feedback collection

---

For questions about architecture decisions, see [FEATURES.md](./FEATURES.md) for feature-specific details.
