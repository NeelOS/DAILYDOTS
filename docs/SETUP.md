# Setup Guide

Complete setup instructions for DailyDots development environment.

## Prerequisites

- **Node.js**: Version 16 or higher
  - Download from https://nodejs.org/
  - Verify: `node --version` and `npm --version`

- **Git**: For version control
  - Download from https://git-scm.com/
  - Verify: `git --version`

- **Code Editor**: VS Code recommended
  - Download from https://code.visualstudio.com/

## Installation Steps

### 1. Clone Repository

```bash
git clone <repository-url>
cd DAILYDOTS
```

### 2. Install Dependencies

```bash
npm install
```

This installs all dependencies listed in `package.json`:
- React and React DOM
- React Router DOM for routing
- TypeScript for type safety
- Build tools (Vite, ESLint, Prettier)
- Tailwind CSS for styling

### 3. Start Development Server

```bash
npm run dev
```

Output will show:
```
  VITE v5.0.8  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Open your browser and navigate to `http://localhost:5173/`

### 4. Verify Installation

- [ ] Home page loads without errors
- [ ] Navigation menu appears
- [ ] You can navigate between pages
- [ ] No console errors in DevTools (F12)

## Development Workflow

### Daily Development

1. **Start the dev server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - Navigate to `http://localhost:5173/`
   - DevTools will hot-reload as you save changes

3. **Format code before committing**
   ```bash
   npm run format
   ```

4. **Check for linting issues**
   ```bash
   npm run lint
   ```

### Building for Production

```bash
npm run build
```

This:
- Runs TypeScript compiler (`tsc`)
- Bundles code with Vite
- Outputs optimized files to `dist/` folder

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

## Environment Variables

Create a `.env.local` file in the project root if you need environment variables:

```env
# Example (currently not required)
VITE_APP_NAME=DailyDots
```

**Note**: In production, sensitive variables should be configured through your hosting platform.

## IDE Setup (VS Code)

### Recommended Extensions

1. **TypeScript Vue Plugin (Volar)**
   - ID: `vue.vscode-typescript-vue-plugin`

2. **ESLint**
   - ID: `dbaeumer.vscode-eslint`

3. **Prettier - Code formatter**
   - ID: `esbenp.prettier-vscode`

4. **Tailwind CSS IntelliSense**
   - ID: `bradlc.vscode-tailwindcss`

### Settings (`.vscode/settings.json`)

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Troubleshooting

### Port Already in Use

If `http://localhost:5173` is already in use:

```bash
# Vite will ask if you want to use another port
# Or specify a port manually
npm run dev -- --port 3000
```

### Dependency Issues

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Ensure TypeScript is up to date:

```bash
npm update typescript
```

Check for type errors:

```bash
npx tsc --noEmit
```

### Hot Reload Not Working

1. Restart the dev server: `Ctrl+C` then `npm run dev`
2. Clear browser cache: DevTools → Application → Clear storage
3. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Build Fails

```bash
# Clean build
npm run build

# If that fails, try:
rm -rf dist
npm run build
```

## Next Steps

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the project structure
2. Check [FEATURES.md](./FEATURES.md) for feature documentation
3. Review [../AGENTS.md](../AGENTS.md) for AI agent guidelines
4. Start coding! Create a new branch for your work

## Getting Help

- Check existing issues on GitHub
- Review code comments and inline documentation
- Ask in the team Slack/Discord channel
- Create detailed issue descriptions with steps to reproduce

---

Happy coding! 🚀
