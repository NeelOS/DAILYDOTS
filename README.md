# DailyDots 📔

A modern, responsive Daily Journal web application with mood tracking built with Vite + React + TypeScript + Tailwind CSS.

## Features ✨

- **Daily Journal Entries**: One entry per calendar day
- **Mood Tracking**: 8 different mood emojis to track how you're feeling
- **CRUD Operations**: Create, read, update, and delete journal entries
- **Search & Filter**: Search entries by content and filter by mood
- **Persistent Storage**: All entries saved to localStorage (ready for Supabase migration)
- **Responsive Design**: Mobile-first, works on all devices
- **Clean Architecture**: Service layer abstraction for easy backend migration

## Tech Stack 🛠️

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Storage**: localStorage (Service layer ready for Supabase)

## Project Structure 📁

```
src/
├── components/        # Reusable UI components
│   ├── Navigation.tsx
│   ├── JournalCard.tsx
│   ├── JournalForm.tsx
│   └── MoodSelector.tsx
├── pages/            # Page components
│   ├── Home.tsx      # Dashboard with stats and quick add
│   ├── MyJournals.tsx # List, search, and filter entries
│   └── AddJournal.tsx # Create or edit entry
├── services/         # Business logic
│   └── journalService.ts
├── types/           # TypeScript types
│   └── journal.types.ts
├── hooks/           # Custom React hooks
│   └── useJournals.ts
├── styles/          # Global styles
│   └── globals.css
└── App.tsx          # Main app component
```

## Getting Started 🚀

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view in the browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Pages 📄

### Home (`/`)
- Dashboard with entry statistics
- Mood distribution chart
- Today's quick add section
- Recent entries preview

### My Journals (`/journals`)
- Complete list of all journal entries
- Search functionality
- Filter by mood
- Quick edit/delete actions

### Add Journal (`/add`)
- Create new entries
- Edit existing entries
- Mood selector with 8 emoji options
- Rich textarea for journal content
- Form validation

## Features Overview 🎯

### One Entry Per Day
Each date can only have one journal entry. Editing an entry for a date will update the existing one.

### Mood Tracking
8 mood options with emojis:
- 😊 Happy
- 😌 Calm
- 😕 Confused
- 😢 Sad
- 😤 Frustrated
- 😴 Tired
- 😍 Loved
- 😎 Confident

### Data Persistence
All data is stored in browser's localStorage with a service layer abstraction. Ready to migrate to Supabase.

### Responsive Design
Works seamlessly on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## Future Enhancements 🔮

- [ ] Supabase integration
- [ ] User authentication
- [ ] Data export (PDF, CSV)
- [ ] Rich text editor
- [ ] Calendar view
- [ ] Dark mode
- [ ] Mobile app (React Native)
- [ ] Cloud sync

## Architecture Notes 📚

### Service Layer
The `journalService.ts` provides a clean abstraction for all data operations. This allows for easy migration to Supabase by simply replacing the localStorage implementation while keeping the same interface.

```typescript
// Easy to swap out localStorage for Supabase
journalService.create(date, mood, content)
journalService.update(date, mood, content)
journalService.delete(date)
journalService.getByDate(date)
journalService.getAll()
```

### Custom Hooks
The `useJournals()` hook manages all journal state and operations, keeping components clean and presentational.

## License 📄

MIT

## Contributing 🤝

Feel free to fork and submit pull requests!

---

Made with ❤️ for daily reflection and mood tracking.
