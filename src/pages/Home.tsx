import { Link } from 'react-router-dom';
import { useJournals } from '../hooks/useJournals';
import journalService from '../services/journalService';

export function Home() {
  const { entries } = useJournals();

  // Get recent entries (last 3)
  const recentEntries = entries.slice(0, 3);

  // Count entries by mood
  const moodStats = entries.reduce(
    (acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const today = new Date().toISOString().split('T')[0];
  const todayEntry = journalService.getByDate(today);

  return (
    <div className="space-y-8">
      {/* Quick Add Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {todayEntry ? "Today's Entry" : "Start Today"}
        </h2>
        <p className="text-gray-600 mb-6">
          {todayEntry
            ? "You already have an entry for today. You can update it below."
            : 'Create your first journal entry for today.'}
        </p>
        <Link
          to="/add"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {todayEntry ? 'Update Entry' : 'Create Entry'}
        </Link>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Entries</h3>
          <p className="text-4xl font-bold text-blue-600">{entries.length}</p>
          <p className="text-sm text-gray-500 mt-2">days of journaling</p>
        </div>

        {/* Mood Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Distribution</h3>
          <div className="space-y-2">
            {Object.entries(moodStats)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
              .map(([mood, count]) => (
                <div key={mood} className="flex items-center justify-between">
                  <span className="text-xl">{mood}</span>
                  <span className="text-sm font-medium text-gray-600">{count}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <div className="space-y-2">
            <Link
              to="/journals"
              className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
            >
              → View all entries
            </Link>
            <Link
              to="/add"
              className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
            >
              → New entry
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Entries */}
      {recentEntries.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Entries</h2>
          <div className="space-y-3">
            {recentEntries.map(entry => (
              <div
                key={entry.id}
                className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <span className="text-3xl flex-shrink-0">{entry.mood}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 font-medium">{formatDate(entry.date)}</p>
                  <p className="text-gray-700 mt-1 line-clamp-2">{entry.content}</p>
                </div>
                <Link
                  to={`/add?date=${entry.date}`}
                  className="text-blue-600 text-sm hover:underline flex-shrink-0"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {entries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No entries yet. Start journaling today! 📝</p>
        </div>
      )}
    </div>
  );
}
