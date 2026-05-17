import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JournalEntry } from '../types/journal.types';
import { MoodSelector } from './MoodSelector';
import journalService from '../services/journalService';

interface JournalFormProps {
  date: string;
  initialEntry?: JournalEntry | null;
  onSave: (date: string, mood: string, content: string) => void;
  onDateChange?: (date: string) => void;
}

export function JournalForm({ date, initialEntry, onSave, onDateChange }: JournalFormProps) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(date);
  const [mood, setMood] = useState(initialEntry?.mood || '😊');
  const [content, setContent] = useState(initialEntry?.content || '');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    onDateChange?.(newDate);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!mood.trim()) {
      setError('Please select a mood');
      return;
    }

    if (!content.trim()) {
      setError('Please write something');
      return;
    }

    try {
      setIsSaving(true);
      onSave(selectedDate, mood, content);
      navigate('/journals');
    } catch (err) {
      setError('Failed to save entry. Please try again.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/journals');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <label htmlFor="date" className="block text-sm font-medium text-gray-900">Date</label>
        <input
          id="date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <MoodSelector value={mood} onChange={setMood} />

      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium text-gray-900">
          What's on your mind?
        </label>
        <textarea
          id="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your thoughts, feelings, and experiences here..."
          rows={10}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>}

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Entry'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
