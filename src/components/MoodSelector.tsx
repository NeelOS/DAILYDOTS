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
  const moodSelectorId = 'mood-selector';

  return (
    <fieldset className="space-y-2">
      <legend className="block text-sm font-medium text-gray-900">How are you feeling?</legend>
      <div className="grid grid-cols-4 gap-2 md:grid-cols-8" role="group" aria-labelledby="mood-selector">
        {MOOD_OPTIONS.map(mood => (
          <button
            key={mood.value}
            onClick={() => onChange(mood.emoji)}
            aria-label={mood.label}
            aria-pressed={value === mood.emoji}
            type="button"
            className={`p-3 text-2xl rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              value === mood.emoji
                ? 'ring-2 ring-blue-500 scale-110'
                : 'hover:scale-105 hover:ring-2 hover:ring-blue-200'
            }`}
          >
            <span aria-hidden="true">{mood.emoji}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}
