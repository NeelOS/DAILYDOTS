# DailyDots 📔

A modern, minimalist daily journal application with mood tracking. Write your thoughts, track your feelings, and reflect on your day with an intuitive, beautiful interface.

## ✨ Features

- **Mood Tracking**: Select from 8 different moods (Happy, Calm, Confused, Sad, Frustrated, Tired, Loved, Confident)
- **Journal Entries**: Create, edit, and delete daily journal entries
- **Date Picker**: Choose any date for your journal entry
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Local Storage**: Entries persist in your browser's local storage
- **Clean UI**: Minimal, modern design with Tailwind CSS

## 🚀 Tech Stack

### Frontend
- **React 18.2** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd DAILYDOTS
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📖 Usage

### Creating an Entry
1. Navigate to "Add Journal" page
2. Select a date (defaults to today)
3. Choose your mood from the emoji selector
4. Write your thoughts in the content area
5. Click "Save Entry"

### Viewing Entries
- Go to "My Journals" to see all your entries
- Entries are sorted by newest first
- Click on any entry to edit it

### Editing an Entry
1. Click on an existing entry from "My Journals"
2. Modify the mood, date, or content
3. Click "Save Entry" to update

### Deleting an Entry
1. From "My Journals", find the entry you want to delete
2. Click the delete button
3. Confirm the deletion

## 🗂️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── JournalCard.tsx      # Individual journal entry card
│   ├── JournalForm.tsx      # Form for creating/editing entries
│   ├── MoodSelector.tsx     # Mood emoji selector
│   └── Navigation.tsx       # App navigation bar
│
├── features/            # Feature-specific code (ready for expansion)
│
├── hooks/               # Custom React hooks
│   └── useJournals.ts   # Journal state management
│
├── pages/               # Page components
│   ├── Home.tsx         # Landing page
│   ├── AddJournal.tsx   # Create/edit entry page
│   └── MyJournals.tsx   # View all entries page
│
├── services/            # Business logic & API calls
│   └── journalService.ts  # Journal CRUD operations
│
├── styles/              # Global styles
│   └── globals.css      # Tailwind imports
│
├── types/               # TypeScript type definitions
│   └── journal.types.ts # Journal interfaces
│
├── App.tsx             # Main app component with routing
└── main.tsx            # React entry point
```

## 🎯 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint

# Format code with Prettier
npm run format
```

## 💾 Data Persistence

Currently, journal entries are stored in the browser's local storage. This means:
- ✅ Entries persist across browser sessions
- ✅ Works offline
- ⚠️ Data is specific to this browser/device
- ⚠️ Clearing browser storage will delete entries

**Future**: Integration with Supabase for cloud sync and multi-device access.

## 🎨 Design

### Color Scheme
- Primary: Blue (#3B82F6)
- Background: White/Gray
- Text: Dark Gray/Black
- Accents: Soft shadows and rounded corners

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔒 Security & Privacy

- All data is stored locally in your browser
- No data is sent to external servers (currently)
- Passwords are not used in the current version

## 🚧 Roadmap

- [ ] Supabase integration for cloud sync
- [ ] User authentication
- [ ] Tags for categorizing entries
- [ ] Search functionality
- [ ] Export entries as PDF/JSON
- [ ] Dark mode support
- [ ] Mobile app with React Native
- [ ] Analytics dashboard
- [ ] Multiple journals support

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all files
- Follow ESLint rules
- Format with Prettier before committing
- Use functional components and hooks

### Component Guidelines
- Keep components focused and reusable
- Extract logic into custom hooks
- Use prop drilling minimally
- Place styles in className strings

### Testing
Currently, testing infrastructure is set up but not yet implemented. Future tests should focus on:
- Component rendering
- User interactions
- Form validation
- State management

## 🐛 Known Issues

- None at this time

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created as a modern journal application with mood tracking.

## 📧 Support

For questions or issues, please open an issue in the repository.

---

Made with ❤️ for mindful journaling
