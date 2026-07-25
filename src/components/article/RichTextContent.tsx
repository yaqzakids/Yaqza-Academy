import { sanitizeRichText } from '@/lib/security/sanitize'
import { looksLikeHtml } from '@/lib/editor/htmlContent'

export interface RichTextContentProps {
  html: string | null | undefined
  className?: string
  style?: React.CSSProperties
  dir?: 'ltr' | 'rtl' | 'auto'
}

export default function RichTextContent({ html, className = '', style, dir }: RichTextContentProps) {
  const value = html?.trim()
  if (!value) return null

  if (!looksLikeHtml(value)) {
    return (
      <div className={`whitespace-pre-wrap ${className}`} style={style} dir={dir}>
        {value}
      </div>
    )
  }

  return (
    <div
      className={`rich-text-content ${className}`}
      style={style}
      dir={dir}
      dangerouslySetInnerHTML={{ __html: sanitizeRichText(value) }}
    />
  )
}
