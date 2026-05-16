export interface JournalEntry {
  id: string;
  date: string; // ISO 8601 format: YYYY-MM-DD
  mood: string; // emoji or label
  content: string;
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
}

export interface MoodOption {
  emoji: string;
  label: string;
  value: string;
}
