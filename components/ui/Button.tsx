import Link from "next/link"

type ButtonProps = {
  href?: string
  children: React.ReactNode
  className?: string
  variant?: "solid" | "light"
}

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ")
}

export function Button({ href, children, className, variant = "solid" }: ButtonProps) {
  const base = "inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold transition-all duration-300 group"
  const styles =
    variant === "solid"
      ? "rounded-md bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105"
      : "rounded-full bg-white/90 text-slate-900 hover:bg-white hover:scale-105"

  const classes = cx(base, styles, className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 rotate-45 group-hover:rotate-0"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17"/>
        </svg>
      </Link>
    )
  }
  return (
    <button className={classes}>
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 rotate-45 group-hover:rotate-0"
      >
        <path d="M7 17L17 7M17 7H7M17 7V17"/>
      </svg>
    </button>
  )
}
