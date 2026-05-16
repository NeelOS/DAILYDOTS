import { Link } from 'react-router-dom';
import { JournalEntry } from '../types/journal.types';

interface JournalCardProps {
  entry: JournalEntry;
  onDelete: (date: string) => void;
}

export function JournalCard({ entry, onDelete }: JournalCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const preview = entry.content.substring(0, 100) + (entry.content.length > 100 ? '...' : '');

  const handleDelete = () => {
    if (window.confirm(`Delete entry for ${formatDate(entry.date)}?`)) {
      onDelete(entry.date);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-gray-500">{formatDate(entry.date)}</p>
          <p className="text-2xl mt-1">{entry.mood}</p>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/add?date=${entry.date}`}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{preview}</p>
    </div>
  );
}
