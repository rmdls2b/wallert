import "./globals.css"
export const metadata = {
  title: "Wallert — Turn a wallet into a silent alarm.",
  description: "Real-time alerts for your crypto wallets.",
}
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{backgroundColor: "#0a0a0a", color: "#e0e0e0", minHeight: "100vh"}}>
        <nav style={{borderBottom: "1px solid #1a1a1a"}}>
          <div className="px-6 md:px-16 lg:px-32 xl:px-40 py-4 max-w-[1400px] mx-auto flex justify-between items-center">
            <a href="/accueil" style={{color: "#fff", fontWeight: "bold", fontSize: "24px", textDecoration: "none"}}>
              Walle<span style={{color: "#00d4aa"}}>r</span>t
            </a>
            <div style={{display: "flex", gap: "20px", fontSize: "14px", alignItems: "center"}}>
              <a href="/about" style={{color: "#ccc", textDecoration: "none"}}>Behind Wallert</a>
              <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" style={{color: "#ccc", textDecoration: "none", display: "flex", alignItems: "center"}}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
