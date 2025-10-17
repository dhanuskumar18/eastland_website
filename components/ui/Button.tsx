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
  const base = "inline-flex items-center justify-center px-5 py-2 text-sm font-semibold transition-colors"
  const styles =
    variant === "solid"
      ? "rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
      : "rounded-full bg-white/90 text-slate-900 hover:bg-white"

  const classes = cx(base, styles, className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }
  return <button className={classes}>{children}</button>
}
