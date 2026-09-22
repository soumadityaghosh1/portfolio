import { createContext, useContext, useState, type ReactNode } from 'react'

type Ctx = { active: string | null; setActive: (id: string | null) => void }
const SkillFocusContext = createContext<Ctx>({ active: null, setActive: () => {} })

/** Shared "which skill is selected" state that links Arsenal → Projects → Credentials. */
export function SkillFocusProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<string | null>(null)
  return <SkillFocusContext.Provider value={{ active, setActive }}>{children}</SkillFocusContext.Provider>
}

export const useSkillFocus = () => useContext(SkillFocusContext)
