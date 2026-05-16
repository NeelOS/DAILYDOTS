import { MoodOption } from '../types/journal.types';

const MOOD_OPTIONS: MoodOption[] = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😌', label: 'Calm', value: 'calm' },
  { emoji: '😕', label: 'Confused', value: 'confused' },
  { emoji: '😢', label: 'Sad', value: 'sad' },
  { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
  { emoji: '😴', label: 'Tired', value: 'tired' },
  { emoji: '😍', label: 'Loved', value: 'loved' },
  { emoji: '😎', label: 'Confident', value: 'confident' },
];

interface MoodSelectorProps {
  value: string;
  onChange: (mood: string) => void;
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">How are you feeling?</label>
      <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
        {MOOD_OPTIONS.map(mood => (
          <button
            key={mood.value}
            onClick={() => onChange(mood.emoji)}
            title={mood.label}
            className={`p-3 text-2xl rounded-lg transition-all ${
              value === mood.emoji
                ? 'ring-2 ring-blue-500 scale-110'
                : 'hover:scale-105 hover:ring-2 hover:ring-blue-200'
            }`}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
