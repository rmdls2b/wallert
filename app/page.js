import StructuredData from "./StructuredData"
export default function Accueil() {
  const githubPath = "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.005 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"
  return (
    <div className="min-h-screen">
      <StructuredData />

      {/* HERO with gradient */}
      <section className="min-h-screen flex items-center px-6 md:px-16 lg:px-32 xl:px-40 pt-24 pb-16" style={{ background: "linear-gradient(145deg, #FAFBF9 0%, #FFF9F6 100%)" }}>
        <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex gap-2 mb-8">
              <span className="text-[11px] tracking-widest uppercase font-semibold px-3.5 py-1 rounded-full" style={{ background: "rgba(15,166,122,0.06)", border: "1px solid rgba(15,166,122,0.15)", color: "#0C8A66" }}>Open source</span>
              <span className="text-[11px] tracking-widest uppercase font-semibold px-3.5 py-1 rounded-full" style={{ background: "rgba(232,146,13,0.06)", border: "1px solid rgba(232,146,13,0.2)", color: "#92400E" }}>Beta</span>
            </div>
            <h1 className="font-serif text-[clamp(40px,5vw,56px)] font-normal leading-[1.1] text-ink-dark mb-6 tracking-tight">
              Your wallet.<br />
              A <span className="italic text-brand-green">silent alarm</span>.<br />
              Under <span className="text-brand-terra">duress</span>.
            </h1>
            <p className="text-[17px] leading-[1.75] text-ink-mid max-w-[440px] mb-10">
              Wallert monitors a dedicated wallet. If you're forced to transfer funds, your trusted contacts are instantly alerted.
            </p>
            <div className="flex gap-3 items-center">
              <a href="/register" className="inline-block px-8 py-3.5 bg-brand-green text-white rounded-[10px] font-semibold text-[15px] hover:bg-brand-green-dark transition-colors" style={{ boxShadow: "0 4px 14px rgba(15,166,122,0.25)" }}>Try Wallert</a>
              <a href="#how" className="inline-block px-5 py-3.5 text-ink-light text-sm font-medium hover:text-ink-dark transition-colors">How it works ↓</a>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-full max-w-[360px] bg-white rounded-2xl border border-line overflow-hidden" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}>
              <div className="px-6 py-4 flex items-center gap-2.5 border-b border-line-light" style={{ background: "rgba(224,90,56,0.06)" }}>
                <div className="w-2 h-2 rounded-full bg-brand-terra animate-pulse" />
                <span className="text-xs font-semibold text-brand-terra uppercase tracking-wider">Emergency alert triggered</span>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-1">Wallet</p>
                  <p className="text-sm text-ink-dark font-mono font-medium">0x8a7B...c9b2</p>
                </div>
                <div className="mb-4">
                  <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-1">Event</p>
                  <p className="text-sm text-ink-dark">Outgoing transfer detected</p>
                </div>
                <div className="mb-5">
                  <p className="text-[10px] text-ink-muted uppercase tracking-widest mb-1.5">Notified</p>
                  <div className="flex gap-2">
                    <span className="text-[11px] font-semibold text-brand-terra px-2.5 py-1 rounded" style={{ background: "rgba(224,90,56,0.06)" }}>Email sent</span>
                    <span className="text-[11px] font-semibold text-brand-terra px-2.5 py-1 rounded" style={{ background: "rgba(224,90,56,0.06)" }}>Telegram sent</span>
                  </div>
                </div>
                <div className="px-4 py-3 rounded-lg bg-bg-soft border-l-2 border-brand-amber">
                  <p className="text-[13px] text-ink-light leading-relaxed">Resending in 4m 38s until confirmed…</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREAT */}
      <section className="bg-white border-t border-line-light px-6 md:px-16 lg:px-32 xl:px-40 py-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-xs text-brand-terra tracking-widest uppercase mb-4 font-semibold">The problem</p>
            <h2 className="font-serif text-[38px] leading-[1.2] text-ink-dark font-normal">Hardware wallets protect your keys.<br /><span className="text-ink-light">Nothing protects you.</span></h2>
          </div>
          <div>
            <p className="text-base leading-[1.8] text-ink-mid mb-7">Home invasions, forced transfers, physical attacks on crypto holders are rising. When someone has a weapon to your head, you're alone, and no one knows.</p>
            <div className="px-6 py-5 rounded-r-[10px] border-l-[3px] border-brand-green" style={{ background: "rgba(15,166,122,0.06)" }}>
              <p className="text-[15px] leading-[1.7] text-ink-dark">The attacker sees a transfer.<br />Your contacts see an alarm.<br /><span className="text-brand-green font-semibold">That gap is what Wallert creates.</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* PROTOCOL */}
      <section id="how" className="bg-bg-soft border-t border-line-light px-6 md:px-16 lg:px-32 xl:px-40 py-24">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-xs text-ink-muted tracking-widest uppercase mb-4 font-semibold">How it works</p>
          <h2 className="font-serif text-[38px] leading-[1.2] text-ink-dark font-normal mb-14 max-w-[360px]">Set up once.<br />Hope to never use it.</h2>
          <div>
            {[
              { num: "01", title: "Security wallet", text: "Set aside a credible amount on a dedicated wallet, separate from your real holdings. This address becomes your emergency trigger." },
              { num: "02", title: "Trusted circle", text: "Define your emergency contacts, alert channels, and exact instructions. What should they do? Call police? Contact SEAL 911?" },
              { num: "03", title: "Silent signal", text: "Transfer from the watched wallet. Your network receives an instant alert. Alerts resend every 5 minutes until confirmed." },
            ].map((s, i, arr) => (
              <div key={s.num} className={`grid grid-cols-[72px_180px_1fr] py-8 border-t border-line items-baseline ${i === arr.length - 1 ? "border-b" : ""}`}>
                <span className="font-mono text-[13px] text-brand-green font-semibold">{s.num}</span>
                <span className="text-base text-ink-dark font-semibold">{s.title}</span>
                <span className="text-[15px] text-ink-mid leading-[1.7] max-w-[520px]">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-white border-t border-line-light px-6 md:px-16 lg:px-32 xl:px-40 py-24">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-xs text-ink-muted tracking-widest uppercase mb-4 font-semibold">Capabilities</p>
          <h2 className="font-serif text-[38px] leading-[1.2] text-ink-dark font-normal mb-14 max-w-[420px]">Built around what matters in a crisis.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Unlimited wallets", desc: "Monitor as many addresses as needed.", color: "text-brand-green" },
              { title: "Multi-channel", desc: "Email and Telegram simultaneously.", color: "text-brand-terra" },
              { title: "Emergency instructions", desc: "Precise directives for your circle.", color: "text-brand-amber" },
              { title: "Instant detection", desc: "On-chain monitoring via Alchemy. Real-time webhooks.", color: "text-brand-green" },
              { title: "Persistent alerts", desc: "Repeats every 5 minutes until confirmed.", color: "text-brand-amber" },
              { title: "Test mode", desc: "Simulate before going live.", color: "text-brand-green-dark" },
            ].map(f => (
              <div key={f.title} className="border border-line rounded-xl p-6 bg-bg-soft">
                <div className={`w-1.5 h-1.5 rounded-full mb-4 ${f.color.replace("text-", "bg-")}`} />
                <h4 className="text-[15px] text-ink-dark font-semibold mb-1.5">{f.title}</h4>
                <p className="text-[13px] text-ink-light leading-[1.6]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="bg-bg-soft border-t border-line-light px-6 md:px-16 lg:px-32 xl:px-40 py-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-18">
          <div>
            <p className="text-xs text-ink-muted tracking-widest uppercase mb-4 font-semibold">Behind Wallert</p>
            <h2 className="font-serif text-[30px] leading-[1.25] text-ink-dark font-normal mb-4">Rémi D'Alise</h2>
            <p className="text-sm text-ink-light leading-[1.7]">6 years Head of Product at Ledger.<br />Crypto security advisor since 2024.</p>
            <div className="w-8 h-px bg-line mt-6" />
          </div>
          <div>
            <blockquote className="font-serif italic text-[22px] leading-[1.5] text-ink-dark mb-7">"When you're under threat, the only thing that matters is that someone knows."</blockquote>
            <p className="text-[15px] leading-[1.8] text-ink-mid mb-4">The best solution is often to remove yourself from the equation entirely: no easy access to your funds. But not everyone can make that choice.</p>
            <p className="text-[15px] leading-[1.8] text-ink-mid">For those who hold directly: this is a safety net. Not a guarantee. An extra layer that costs nothing to activate, and could matter when nothing else does.</p>
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section className="bg-white border-t border-line-light px-6 md:px-16 lg:px-32 xl:px-40 py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-end mb-14">
            <div>
              <p className="text-xs text-ink-muted tracking-widest uppercase mb-4 font-semibold">Privacy & Security</p>
              <h2 className="font-serif text-[38px] leading-[1.2] text-ink-dark font-normal max-w-[380px]">Designed to leave no trace.</h2>
            </div>
            <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="text-ink-light text-sm font-medium flex items-center gap-1.5 hover:text-ink-dark transition-colors">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d={githubPath} /></svg>
              View on GitHub →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {[
              { title: "Anonymous by design", text: "Register with a non-nominal email. No link between your identity, your account, and your real funds." },
              { title: "Isolated wallet", text: "The monitored wallet is dedicated and separate. No trace back to your main holdings." },
              { title: "Open source", text: "Full code transparency. Run your own instance if you need complete control." },
              { title: "Private infrastructure", text: "Dedicated server in France, isolated container, DDoS protection via Cloudflare." },
            ].map((item, i) => (
              <div key={i} className={`py-7 border-t border-line ${i % 2 === 0 ? "pr-12" : "pl-12 border-l"}`}>
                <p className="text-[15px] text-ink-dark font-semibold mb-1.5">{item.title}</p>
                <p className="text-sm text-ink-mid leading-[1.7]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line-light px-6 md:px-16 lg:px-32 xl:px-40 py-24" style={{ background: "linear-gradient(145deg, #F2FAF6, #FFF9F6)" }}>
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="font-serif text-[36px] text-ink-dark font-normal mb-3">Five minutes now.<br /><span className="text-ink-light">Peace of mind after.</span></h2>
          <p className="text-[15px] text-ink-muted mb-9">Free. Open source. No data collected.</p>
          <a href="/register" className="inline-block px-10 py-4 bg-brand-green text-white rounded-[10px] font-semibold text-[15px] hover:bg-brand-green-dark transition-colors" style={{ boxShadow: "0 4px 14px rgba(15,166,122,0.25)" }}>Get started</a>
        </div>
      </section>

      {/* WARNING */}
      <div className="bg-white px-6 md:px-16 lg:px-32 xl:px-40">
        <div className="max-w-[1200px] mx-auto">
          <div className="px-6 py-5 -mt-px border border-line rounded-lg bg-bg-soft">
            <p className="text-[13px] text-ink-light leading-[1.7]"><span className="text-brand-terra font-semibold">⚠</span> Wallert does not prevent attacks or theft. It alerts your trusted circle as quickly as possible. Whether that changes the outcome depends on many factors outside our control.</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 lg:px-32 xl:px-40 py-10 flex justify-between items-center">
          <p className="text-[13px] text-ink-muted">© 2025 Wallert</p>
          <div className="flex gap-6">
            <a href="/about" className="text-[13px] text-ink-muted hover:text-ink-dark transition-colors">Behind Wallert</a>
            <a href="https://github.com/rmdls2b/wallert" target="_blank" rel="noopener noreferrer" className="text-[13px] text-ink-muted hover:text-ink-dark transition-colors flex items-center gap-1.5"><svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d={githubPath} /></svg>GitHub</a>
            <a href="mailto:contact@wallert.app" className="text-[13px] text-ink-muted hover:text-ink-dark transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
