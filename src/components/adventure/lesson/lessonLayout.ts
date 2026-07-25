/** Shared two-column layout for lesson article pages (content + sticky sidebar). */
export const LESSON_PAGE_GRID_CLASS =
  'flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10 xl:gap-16'

export const LESSON_MAIN_COLUMN_CLASS = 'min-w-0 flex-1 w-full max-w-full'

export const LESSON_SIDEBAR_COLUMN_CLASS =
  'hidden md:block w-[280px] max-w-[280px] shrink-0 md:sticky md:top-24 md:ml-auto'

/** Mobile / narrow: sidebar stacks above content, aligned right */
export const LESSON_MOBILE_SIDEBAR_CLASS = 'md:hidden mb-6 flex justify-end'
