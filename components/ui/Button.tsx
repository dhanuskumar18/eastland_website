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
  const base = "inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold transition-all duration-300 group relative overflow-hidden"
  const styles =
    variant === "solid"
      ? "rounded-md bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105"
      : "rounded-full bg-white/90 text-slate-900 hover:bg-white hover:scale-105 hover:before:scale-100 before:scale-0 before:absolute before:inset-0 before:bg-yellow-400 before:rounded-full before:transition-transform before:duration-300 before:origin-center"

  const classes = cx(base, styles, className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        <span className="relative z-10">{children}</span>
      </Link>
    )
  }
  return (
    <button className={classes}>
      <span className="relative z-10">{children}</span>
    </button>
  )
}
