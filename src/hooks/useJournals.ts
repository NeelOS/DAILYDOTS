import { useState, useCallback, useEffect } from 'react';
import { JournalEntry } from '../types/journal.types';
import journalService from '../services/journalService';

export function useJournals() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load all entries
  useEffect(() => {
    const loadEntries = () => {
      setIsLoading(true);
      try {
        const allEntries = journalService.getAllSorted('desc');
        setEntries(allEntries);
      } finally {
        setIsLoading(false);
      }
    };

    loadEntries();
  }, []);

  // Create entry
  const createEntry = useCallback(
    (date: string, mood: string, content: string) => {
      const newEntry = journalService.create(date, mood, content);
      setEntries(prev => [newEntry, ...prev]);
      return newEntry;
    },
    []
  );

  // Update entry
  const updateEntry = useCallback((date: string, mood: string, content: string) => {
    const updated = journalService.update(date, mood, content);
    if (updated) {
      setEntries(prev =>
        prev.map(entry => (entry.date === date ? updated : entry))
      );
    }
    return updated;
  }, []);

  // Delete entry
  const deleteEntry = useCallback((date: string) => {
    const success = journalService.delete(date);
    if (success) {
      setEntries(prev => prev.filter(entry => entry.date !== date));
    }
    return success;
  }, []);

  // Get entry by date
  const getByDate = useCallback((date: string) => {
    return journalService.getByDate(date);
  }, []);

  // Search entries
  const searchEntries = useCallback((query: string) => {
    return journalService.search(query);
  }, []);

  return {
    entries,
    isLoading,
    createEntry,
    updateEntry,
    deleteEntry,
    getByDate,
    searchEntries,
  };
}
