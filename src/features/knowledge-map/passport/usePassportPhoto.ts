import { useCallback, useEffect, useState } from 'react'

const STORAGE_PREFIX = 'yaqza-passport-photo-'

function storageKey(childId: string) {
  return `${STORAGE_PREFIX}${childId}`
}

export function usePassportPhoto(childId: string | null | undefined) {
  const [customPhoto, setCustomPhoto] = useState<string | null>(null)

  const readPhoto = useCallback(() => {
    if (!childId) {
      setCustomPhoto(null)
      return
    }
    setCustomPhoto(localStorage.getItem(storageKey(childId)))
  }, [childId])

  useEffect(() => {
    readPhoto()
  }, [readPhoto])

  useEffect(() => {
    const onUpdate = (event: Event) => {
      const detail = (event as CustomEvent<{ childId?: string }>).detail
      if (!childId || detail?.childId === childId) readPhoto()
    }
    window.addEventListener('passport-photo-updated', onUpdate)
    return () => window.removeEventListener('passport-photo-updated', onUpdate)
  }, [childId, readPhoto])

  const uploadPhotoFile = useCallback(
    (file: File) => {
      if (!childId) return
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          localStorage.setItem(storageKey(childId), reader.result)
          setCustomPhoto(reader.result)
        }
      }
      reader.readAsDataURL(file)
    },
    [childId],
  )

  const clearCustomPhoto = useCallback(() => {
    if (!childId) return
    localStorage.removeItem(storageKey(childId))
    setCustomPhoto(null)
  }, [childId])

  return { customPhoto, uploadPhotoFile, clearCustomPhoto }
}
