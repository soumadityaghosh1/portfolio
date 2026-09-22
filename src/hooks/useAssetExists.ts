import { useEffect, useState } from 'react'

/** Checks that a static asset really exists (SPA servers answer misses with index.html). */
export function useAssetExists(url: string, mimePrefix: string) {
  const [exists, setExists] = useState(false)
  useEffect(() => {
    let alive = true
    fetch(url, { method: 'HEAD' })
      .then((r) => alive && setExists(r.ok && (r.headers.get('content-type') ?? '').startsWith(mimePrefix)))
      .catch(() => alive && setExists(false))
    return () => {
      alive = false
    }
  }, [url, mimePrefix])
  return exists
}
