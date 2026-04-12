"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"

const githubPath = "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname() || "/"
  const isFr = pathname === "/fr" || pathname.startsWith("/fr/")
  const pathWithoutLang = isFr ? (pathname.replace(/^\/fr/, "") || "/") : pathname
  const enHref = pathWithoutLang
  const frHref = pathWithoutLang === "/" ? "/fr" : `/fr${pathWithoutLang}`
  const labels = isFr
    ? { about: "À propos", account: "Mon compte", cta: "Commencer" }
    : { about: "About", account: "My account", cta: "Get started" }
  const aboutHref = isFr ? "/fr/about" : "/about"
  const homeHref = isFr ? "/fr" : "/"

  return (
    <nav className="bg-white border-b border-line-light relative">
      <div className="px-6 md:px-16 lg:px-32 xl:px-40 py-4 max-w-[1400px] mx-auto flex justify-between items-center">
        <a href={homeHref} className="text-ink-dark font-bold text-xl md:text-2xl no-underline tracking-tight">
          Walle<span className="text-brand-green">r</span>t
        </a>
        <div className="hidden md:flex gap-6 text-sm items-center">
          <a href={aboutHref} className="text-ink-light no-underline font-medium hover:text-ink-dark transition-colors">{labels.about}</a>
          <a href="/my-account" className="text-ink-dark border border-line px-3.5 py-1.5 rounded-md no-underline font-medium text-[13px] hover:border-line-strong transition-colors">{labels.account}</a>
          <a href="/register" className="bg-brand-green text-white px-4 py-2 rounded-md no-underline font-semibold text-[13px] hover:bg-brand-green-dark transition-colors" style={{ boxShadow: "0 4px 14px rgba(15,166,122,0.25)" }}>{labels.cta}</a>
          <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="text-ink-light no-underline flex items-center hover:text-ink-dark transition-colors">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d={githubPath} /></svg>
          </a>
          <span className="text-ink-muted text-sm flex items-center gap-2 pl-3 border-l border-line ml-1">
            <a href={enHref} className={isFr ? "text-ink-light hover:text-ink-dark transition-colors no-underline" : "text-ink-dark no-underline font-semibold"}>EN</a>
            <span>|</span>
            <a href={frHref} className={isFr ? "text-ink-dark no-underline font-semibold" : "text-ink-light hover:text-ink-dark transition-colors no-underline"}>FR</a>
          </span>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer" aria-label="Menu">
          <span className={`block w-5 h-[2px] bg-ink-dark transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-[2px] bg-ink-dark transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[2px] bg-ink-dark transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-line-light bg-white px-6 py-4 flex flex-col gap-4">
          <a href={aboutHref} className="text-ink-dark no-underline text-sm font-medium" onClick={() => setMenuOpen(false)}>{labels.about}</a>
          <a href="/my-account" className="text-ink-dark no-underline text-sm font-medium" onClick={() => setMenuOpen(false)}>{labels.account}</a>
          <a href="/register" className="bg-brand-green text-white px-4 py-2.5 rounded-md no-underline font-semibold text-sm text-center" style={{ boxShadow: "0 4px 14px rgba(15,166,122,0.25)" }} onClick={() => setMenuOpen(false)}>{labels.cta}</a>
          <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="text-ink-light no-underline text-sm flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d={githubPath} /></svg>
            GitHub
          </a>
          <div className="border-t border-line-light pt-4 mt-2 flex items-center gap-3 text-sm">
            <a href={enHref} className={isFr ? "text-ink-light no-underline" : "text-ink-dark no-underline font-semibold"} onClick={() => setMenuOpen(false)}>EN</a>
            <span className="text-ink-muted">|</span>
            <a href={frHref} className={isFr ? "text-ink-dark no-underline font-semibold" : "text-ink-light no-underline"} onClick={() => setMenuOpen(false)}>FR</a>
          </div>
        </div>
      )}
    </nav>
  )
}
