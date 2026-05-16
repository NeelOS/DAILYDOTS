import { JournalEntry } from '../types/journal.types';

const STORAGE_KEY = 'dailydots_entries';

/**
 * Journal data service layer
 * Abstracts localStorage operations for easy migration to Supabase later
 */
class JournalService {
  /**
   * Get all journal entries
   */
  getAll(): JournalEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading journal entries:', error);
      return [];
    }
  }

  /**
   * Get a single entry by date
   */
  getByDate(date: string): JournalEntry | null {
    const entries = this.getAll();
    return entries.find(entry => entry.date === date) || null;
  }

  /**
   * Create a new journal entry
   */
  create(date: string, mood: string, content: string): JournalEntry {
    const id = `entry_${Date.now()}`;
    const now = Date.now();

    const entry: JournalEntry = {
      id,
      date,
      mood,
      content,
      createdAt: now,
      updatedAt: now,
    };

    const entries = this.getAll();
    entries.push(entry);
    this.save(entries);

    return entry;
  }

  /**
   * Update an existing entry (by date)
   */
  update(date: string, mood: string, content: string): JournalEntry | null {
    const entries = this.getAll();
    const index = entries.findIndex(entry => entry.date === date);

    if (index === -1) {
      return null;
    }

    entries[index] = {
      ...entries[index],
      mood,
      content,
      updatedAt: Date.now(),
    };

    this.save(entries);
    return entries[index];
  }

  /**
   * Delete an entry by date
   */
  delete(date: string): boolean {
    const entries = this.getAll();
    const filtered = entries.filter(entry => entry.date !== date);

    if (filtered.length === entries.length) {
      return false; // Entry not found
    }

    this.save(filtered);
    return true;
  }

  /**
   * Create or update entry (upsert)
   */
  upsert(date: string, mood: string, content: string): JournalEntry {
    const existing = this.getByDate(date);

    if (existing) {
      return this.update(date, mood, content)!;
    }

    return this.create(date, mood, content);
  }

  /**
   * Search entries by content
   */
  search(query: string): JournalEntry[] {
    const entries = this.getAll();
    const lowerQuery = query.toLowerCase();

    return entries.filter(entry =>
      entry.content.toLowerCase().includes(lowerQuery) ||
      entry.mood.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get entries sorted by date (newest first)
   */
  getAllSorted(order: 'asc' | 'desc' = 'desc'): JournalEntry[] {
    const entries = this.getAll();
    return entries.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }

  /**
   * Private: Save entries to localStorage
   */
  private save(entries: JournalEntry[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving journal entries:', error);
    }
  }
}

export default new JournalService();
