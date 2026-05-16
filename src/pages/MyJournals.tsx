import { useState, useMemo } from 'react';
import { useJournals } from '../hooks/useJournals';
import { JournalCard } from '../components/JournalCard';

export function MyJournals() {
  const { entries, deleteEntry, searchEntries } = useJournals();
  const [searchQuery, setSearchQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState<string>('');

  const moodOptions = useMemo(() => {
    const moods = new Set(entries.map(e => e.mood));
    return Array.from(moods).sort();
  }, [entries]);

  const filteredEntries = useMemo(() => {
    let result = entries;

    if (searchQuery.trim()) {
      result = searchEntries(searchQuery);
    }

    if (moodFilter) {
      result = result.filter(entry => entry.mood === moodFilter);
    }

    return result;
  }, [entries, searchQuery, moodFilter, searchEntries]);

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
        <h3 className="font-semibold text-gray-900">Filters & Search</h3>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search entries..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2">
            {moodFilter && (
              <button
                onClick={() => setMoodFilter('')}
                className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {moodOptions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {moodOptions.map(mood => (
              <button
                key={mood}
                onClick={() => setMoodFilter(moodFilter === mood ? '' : mood)}
                className={`px-3 py-1 rounded-full text-2xl transition-all ${
                  moodFilter === mood ? 'ring-2 ring-blue-500 scale-110' : 'hover:scale-105'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {filteredEntries.length > 0
          ? `Showing ${filteredEntries.length} of ${entries.length} entries`
          : 'No entries found'}
      </div>

      {/* Entries List */}
      {filteredEntries.length > 0 ? (
        <div className="space-y-3">
          {filteredEntries.map(entry => (
            <JournalCard key={entry.id} entry={entry} onDelete={deleteEntry} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            {entries.length === 0 ? 'No entries yet. Create your first one!' : 'No matching entries found.'}
          </p>
        </div>
      )}
    </div>
  );
}
