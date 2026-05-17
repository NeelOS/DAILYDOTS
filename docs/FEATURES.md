# Features Documentation

Detailed feature specifications and implementation details for DailyDots.

## Table of Contents

1. [Mood Tracking](#mood-tracking)
2. [Journal Entries](#journal-entries)
3. [Date Picker](#date-picker)
4. [Navigation](#navigation)
5. [Future Features](#future-features)

---

## Mood Tracking

### Overview
Users select their emotional state when creating or editing journal entries using emoji-based mood indicators.

### Available Moods

| Emoji | Label | Value |
|-------|-------|-------|
| 😊 | Happy | happy |
| 😌 | Calm | calm |
| 😕 | Confused | confused |
| 😢 | Sad | sad |
| 😤 | Frustrated | frustrated |
| 😴 | Tired | tired |
| 😍 | Loved | loved |
| 😎 | Confident | confident |

### Implementation

**Component**: `MoodSelector.tsx`

```typescript
interface MoodSelectorProps {
  value: string;        // Current mood emoji
  onChange: (mood: string) => void;  // Callback on selection
}
```

**Features**:
- Grid layout (4 columns on mobile, 8 on desktop)
- Visual feedback on hover (scale and ring effect)
- Selected mood shows ring with scale increase
- Accessible via title attribute
- Responsive design

**Styling**:
```
- Selected: ring-2 ring-blue-500 scale-110
- Hover: scale-105 ring-2 ring-blue-200
- Transition: all effects smooth
```

### Usage in Form

```typescript
const [mood, setMood] = useState(initialMood);
<MoodSelector value={mood} onChange={setMood} />
```

### Storage
Moods are stored as emoji strings in the `JournalEntry.mood` field.

---

## Journal Entries

### Entry Structure

```typescript
interface JournalEntry {
  id: string;           // Unique identifier (UUID format)
  date: string;         // ISO format: YYYY-MM-DD
  mood: string;         // Emoji: 😊, 😌, etc.
  content: string;      // Journal text content
  createdAt: number;    // Unix timestamp (milliseconds)
  updatedAt: number;    // Unix timestamp (milliseconds)
}
```

### CRUD Operations

#### Create Entry

**Endpoint**: `POST /api/entries` (future Supabase integration)

**Current Implementation**: `journalService.create()`

```typescript
function create(date: string, mood: string, content: string): JournalEntry
```

**Validation**:
- ✓ Date must be valid ISO format (YYYY-MM-DD)
- ✓ Mood emoji must exist in MOOD_OPTIONS
- ✓ Content must not be empty
- ✓ Content minimum length: 1 character

**Constraints**:
- One entry per date (overwrites if exists)
- Timestamps auto-generated (current time)

**Example**:
```typescript
const entry = journalService.create(
  '2026-05-17',
  '😊',
  'Today was a great day!'
);
```

#### Read Entry

**Single Entry**: `journalService.getByDate(date: string)`

```typescript
const entry = journalService.getByDate('2026-05-17');
// Returns: JournalEntry | null
```

**All Entries**: `journalService.getAllSorted(order: 'asc' | 'desc')`

```typescript
const entries = journalService.getAllSorted('desc');
// Returns: JournalEntry[] (sorted by date)
```

#### Update Entry

**Endpoint**: `PUT /api/entries/:date`

**Current Implementation**: `journalService.update()`

```typescript
function update(date: string, mood: string, content: string): JournalEntry | null
```

**Behavior**:
- Updates existing entry for the date
- Updates `updatedAt` timestamp
- `createdAt` remains unchanged
- Returns null if entry doesn't exist

**Example**:
```typescript
const updated = journalService.update(
  '2026-05-17',
  '😌',
  'Updated my thoughts...'
);
```

#### Delete Entry

**Endpoint**: `DELETE /api/entries/:date`

**Current Implementation**: `journalService.delete()`

```typescript
function delete(date: string): boolean
```

**Behavior**:
- Removes entry from storage
- Returns true if successful, false otherwise
- Cannot be undone (future: soft delete for recovery)

**Example**:
```typescript
const success = journalService.delete('2026-05-17');
```

### Display Component

**Component**: `JournalCard.tsx`

Displays a single journal entry card with:
- Date (formatted)
- Mood emoji
- Preview of content (truncated)
- Edit and delete buttons

**Props**:
```typescript
interface JournalCardProps {
  entry: JournalEntry;
  onEdit: (entry: JournalEntry) => void;
  onDelete: (date: string) => void;
}
```

---

## Date Picker

### Overview
Users can select or change the date when creating/editing journal entries. The date picker includes a native HTML5 date input with custom styling.

### Implementation

**Component**: `JournalForm.tsx` (integrated)

**Input Type**: HTML5 `<input type="date" />`

**Features**:
- Native browser date picker UI
- ISO format (YYYY-MM-DD) for storage
- Validation on submit
- Accessible (proper labels and IDs)
- Responsive design

### Usage

```typescript
const [selectedDate, setSelectedDate] = useState(date);

const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newDate = e.target.value;
  setSelectedDate(newDate);
  onDateChange?.(newDate);  // Notify parent
};

<input
  id="date"
  type="date"
  value={selectedDate}
  onChange={handleDateChange}
  className="..."
/>
```

### Date Constraints

**Current**:
- No minimum/maximum date
- Users can select any date in the past, present, or future

**Future Options**:
- Prevent future dates: `max={new Date().toISOString().split('T')[0]}`
- Prevent very old dates: `min="2020-01-01"`

### Integration with Entry Creation

1. **Initial Date**: Defaults to today's date
2. **URL Parameters**: Can pass date via query: `/add?date=2026-05-17`
3. **On Change**: Updates parent state and checks for existing entries
4. **On Submit**: Uses selected date for creating/updating entry

**Flow**:
```
User selects date → setSelectedDate() → Check existing entry
→ Update page title (Edit vs New) → Submit with selected date
```

---

## Navigation

### Component: `Navigation.tsx`

**Features**:
- Top navigation bar
- Logo/title
- Navigation links
- Responsive menu (future mobile menu)

**Routes**:
- `/` - Home page
- `/add` - Create new entry
- `/journals` - View all entries

**Navigation Pattern**:
```typescript
import { Link } from 'react-router-dom';

<Link to="/journals">My Journals</Link>
```

---

## Future Features

### Phase 1: Enhanced Tracking

- [ ] **Tags**: Categorize entries (#work, #personal, #health)
- [ ] **Search**: Full-text search across entries
- [ ] **Filter**: By mood, tags, date range
- [ ] **Sort**: By date, mood, content length

### Phase 2: Cloud Sync

- [ ] **Supabase Integration**: Cloud backup
- [ ] **Authentication**: Email/password, Google OAuth
- [ ] **Multi-device Sync**: Access entries across devices
- [ ] **Backup/Restore**: Manual data export/import

### Phase 3: Analytics

- [ ] **Mood Trends**: Chart mood over time
- [ ] **Statistics**: Entry count, average mood
- [ ] **Calendar View**: Visual entry timeline
- [ ] **Insights**: AI-generated mood patterns

### Phase 4: Enhancements

- [ ] **Dark Mode**: Theme toggle
- [ ] **Offline Mode**: Service worker for offline access
- [ ] **Voice Input**: Record journal entries
- [ ] **Rich Text**: Formatting, images, links
- [ ] **Templates**: Quick entry starters
- [ ] **Reminders**: Daily journal prompts

### Phase 5: Social

- [ ] **Privacy Modes**: Private/shareable entries
- [ ] **Shared Journals**: Collaborative journals
- [ ] **Prompts**: Writing prompts and exercises

---

## API Integration (Future)

### Supabase Tables

#### `journal_entries`
```sql
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  mood TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, date)
);
```

#### RLS Policies
- Users can only see their own entries
- Users can only create/update/delete their own entries

---

## Configuration

### Mood Options

Located in `MoodSelector.tsx`, easily customizable:

```typescript
const MOOD_OPTIONS: MoodOption[] = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  // Add more...
];
```

### Styling

All features use Tailwind CSS utility classes:
- Consistent spacing scale
- Color palette based on blue (#3B82F6)
- Responsive breakpoints (mobile-first)

---

For implementation details, see [ARCHITECTURE.md](./ARCHITECTURE.md)
