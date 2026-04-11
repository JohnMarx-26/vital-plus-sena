import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  cloneElement
} from "react"

export const DropdownContext = createContext(null)

export function DropdownMain({
  children,
  open: controlledOpen,
  onOpenChange,
  className = ""
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = (value) => {
    if (isControlled) {
      onOpenChange?.(value)
    } else {
      setUncontrolledOpen(value)
    }
  }

  const containerRef = useRef(null)

  // Click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className={`relative inline-block ${className}`}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

// Trigger (asChild pattern)
export function DropdownTriggerMain({ children }) {
  const { open, setOpen } = useContext(DropdownContext)

  if (!children) return null

  return cloneElement(children, {
    onClick: (e) => {
      children.props.onClick?.(e)
      setOpen(!open)
    },
    "aria-expanded": open,
    "aria-haspopup": "menu"
  })
}

// Content
export function DropdownContentMain({ children, className = "" }) {
  const { open } = useContext(DropdownContext)

  if (!open) return null

  return (
    <div
      role="menu"
      className={`
        bg-brand-dark
        absolute 
        mt-1
        min-w-48
        border
        border-brand-semiLight
        text-text-inverse
        p-1
        dark:bg-brand
        backdrop-blur-[2px] 
        shadow-lg rounded-xl 
        overflow-hidden
        hover:brand-hover 
        transition-shadow duration-700
        ${className}
      `}
    >
      {children}
    </div>
  )
}

// Item
export function DropdownItemMain({
  children,
  onClick,
  className = ""
}) {
  const { setOpen } = useContext(DropdownContext)

  const handleClick = (e) => {
    onClick?.(e)
    setOpen(false)
  }

  return (
    <button
      role="menuitem"
      onClick={handleClick}
      className={`
        w-full text-left px-3 py-2 rounded-lg
        hover:bg-brand focus:bg-brand-light
        transition-colors
        ${className}
      `}
    >
      {children}
    </button>
  )
}
