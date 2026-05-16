import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { MyJournals } from './pages/MyJournals';
import { AddJournal } from './pages/AddJournal';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journals" element={<MyJournals />} />
            <Route path="/add" element={<AddJournal />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
