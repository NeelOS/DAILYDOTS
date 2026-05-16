import { useSearchParams } from 'react-router-dom';
import { useJournals } from '../hooks/useJournals';
import { JournalForm } from '../components/JournalForm';

export function AddJournal() {
  const [searchParams] = useSearchParams();
  const { createEntry, updateEntry, getByDate } = useJournals();

  // Get date from query params or use today
  const dateParam = searchParams.get('date');
  const today = new Date().toISOString().split('T')[0];
  const selectedDate = dateParam || today;

  // Check if entry exists for this date
  const existingEntry = getByDate(selectedDate);

  const handleSave = (date: string, mood: string, content: string) => {
    if (existingEntry) {
      updateEntry(date, mood, content);
    } else {
      createEntry(date, mood, content);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {existingEntry ? 'Edit Entry' : 'New Entry'}
        </h1>
        <p className="text-gray-600 mt-2">
          {existingEntry ? 'Update your journal entry' : 'Create a new journal entry'}
        </p>
      </div>

      <JournalForm date={selectedDate} initialEntry={existingEntry || null} onSave={handleSave} />
    </div>
  );
}
