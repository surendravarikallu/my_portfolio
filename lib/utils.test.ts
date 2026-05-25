import { describe, test, expect } from '@jest/globals';
import { cn } from './utils';

describe('cn utility function in portfolio', () => {
  test('should merge class names correctly', () => {
    const result = cn('text-gray-900', 'bg-white');
    expect(result).toContain('text-gray-900');
    expect(result).toContain('bg-white');
  });

  test('should override Tailwind classes correctly when there is a conflict', () => {
    const result = cn('m-2', 'm-4');
    expect(result).toBe('m-4');
  });

  test('should filter out falsy values', () => {
    const result = cn('flex', false, null, undefined, 'items-center');
    expect(result).toBe('flex items-center');
  });
});
