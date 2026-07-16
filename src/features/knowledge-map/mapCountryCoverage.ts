/**
 * Countries/regions that cannot be split with the current SVG paths alone.
 * Do not fake geometry — flag for future SVG editor work.
 */
export const NEEDS_SVG_PATH_SEPARATION = [
  {
    id: 'kosovo',
    note: 'No separate path in muslim-world-map.svg (Balkans region uses Albania border proxy only).',
  },
  {
    id: 'palestine-interior',
    note: 'Source SVG splits Palestine into two paths (`palestine` and `palestine-interior`); rendered as one territory in Ash-Sham.',
  },
  {
    id: 'zanzibar',
    note: 'Not separated from tanzania path.',
  },
  {
    id: 'southern-thailand',
    note: 'Only full thailand path exists — entire country used for Southeast Asia.',
  },
] as const
