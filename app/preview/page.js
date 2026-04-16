export default function Preview() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen">

      {/* ======= HERO — deep slate-blue, radial glow ======= */}
      <section
        className="min-h-screen flex items-center px-6 md:px-16 lg:px-32 xl:px-40 pt-20 pb-16 relative overflow-hidden"
        style={{ background: "#0F1525" }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(15,166,122,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-[1400px] mx-auto w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
          {/* Left */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              <span
                className="text-[11px] tracking-widest uppercase font-semibold px-3.5 py-1.5 rounded-full"
                style={{ background: "rgba(232,168,64,0.1)", border: "1px solid rgba(232,168,64,0.25)", color: "#E8A840" }}
              >
                Beta
              </span>
              <span
                className="text-[11px] tracking-widest uppercase font-semibold px-3.5 py-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#8890A0" }}
              >
                Open source
              </span>
            </div>

            <h1 className="text-[clamp(38px,5.5vw,64px)] font-bold leading-[1.05] tracking-[-2px] mb-7 text-white">
              Your wallet:<br />
              a silent <span style={{ color: "#34D399" }}>alarm</span><br />
              under <span style={{ color: "#F0816C" }}>duress</span>.
            </h1>

            <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "#A8B0C0" }}>
              Wallert is an open-source duress alarm for crypto holders. It monitors a dedicated wallet and alerts your trusted contacts if you're forced to transfer funds.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <a
                href="/register"
                className="inline-block px-8 py-4 rounded-xl font-bold text-sm transition-all"
                style={{
                  background: "linear-gradient(135deg, #0FA67A 0%, #0D9B70 100%)",
                  color: "#fff",
                  boxShadow: "0 6px 24px rgba(15,166,122,0.25), 0 0 0 1px rgba(15,166,122,0.15)",
                }}
              >
                Try Wallert
              </a>
              <a href="#threat" className="inline-block px-8 py-4 text-sm transition-colors" style={{ color: "#6B7280" }}>
                How it works
              </a>
            </div>
          </div>

          {/* Flow card — frosted glass */}
          <div className="w-full max-w-[310px] lg:max-w-[330px] mx-auto lg:mx-0 shrink-0">
            <div
              className="rounded-2xl p-7 backdrop-blur-sm"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {/* Monitor */}
              <div className="flex items-start gap-4 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#6B7A8E" }}>Monitored</p>
                  <p className="text-sm font-medium text-white">Security wallet</p>
                  <p className="text-xs font-mono mt-1" style={{ color: "#6B7A8E" }}>0x8a...c9b2 · ETH</p>
                </div>
              </div>
              {/* Detect */}
              <div className="flex items-start gap-4 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(232,168,64,0.1)", border: "1px solid rgba(232,168,64,0.2)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8A840" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#6B7A8E" }}>Detected</p>
                  <p className="text-sm font-medium text-white">Outgoing transfer</p>
                  <p className="text-xs mt-1" style={{ color: "#6B7A8E" }}>Signal triggered instantly</p>
                </div>
              </div>
              {/* Alert */}
              <div className="flex items-start gap-4 pt-5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(240,129,108,0.1)", border: "1px solid rgba(240,129,108,0.2)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F0816C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: "#6B7A8E" }}>Alerted</p>
                  <p className="text-sm font-medium text-white">Trusted circle notified</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(240,129,108,0.1)", color: "#F0816C" }}>Email</span>
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(240,129,108,0.1)", color: "#F0816C" }}>Telegram</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= THE THREAT — warm dark, totally different mood ======= */}
      <section
        id="threat"
        style={{
          background: "linear-gradient(180deg, #1C1714 0%, #211C18 100%)",
          borderTop: "1px solid rgba(240,129,108,0.08)",
        }}
      >
        <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-24">
          <p className="text-[11px] font-semibold tracking-[3px] uppercase mb-5" style={{ color: "#F0816C" }}>The threat</p>
          <h2 className="text-[clamp(28px,3.5vw,46px)] font-bold tracking-tight leading-[1.12] mb-6 text-white">
            Hardware wallets protect your keys.<br />
            Nothing protects <em className="font-normal" style={{ color: "#C8B8A8" }}>you</em>.
          </h2>
          <p className="text-base leading-relaxed max-w-2xl mb-6" style={{ color: "#B5A898" }}>
            Physical attacks on crypto holders are rising worldwide. When someone breaks into your home and threatens you with a weapon, you have seconds to act, no way to call for help, and no one knows you're in danger.
          </p>
          <p className="text-base font-bold leading-relaxed max-w-2xl mb-12 text-white">
            Wallert exists so that, in those seconds, someone knows and can act.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
            <div
              className="rounded-xl p-8"
              style={{
                background: "linear-gradient(135deg, rgba(240,129,108,0.08) 0%, rgba(240,129,108,0.03) 100%)",
                border: "1px solid rgba(240,129,108,0.15)",
              }}
            >
              <p className="text-xl md:text-2xl font-bold leading-snug">
                <span style={{ color: "#F0816C" }}>The attacker</span><br />
                <span className="text-white">sees a transfer.</span>
              </p>
            </div>
            <div
              className="rounded-xl p-8"
              style={{
                background: "linear-gradient(135deg, rgba(52,211,153,0.06) 0%, rgba(52,211,153,0.02) 100%)",
                border: "1px solid rgba(52,211,153,0.15)",
              }}
            >
              <p className="text-xl md:text-2xl font-bold leading-snug">
                <span style={{ color: "#34D399" }}>Your circle</span><br />
                <span className="text-white">receives an alarm.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======= NOTE ======= */}
      <div className="py-16 text-center" style={{ background: "#0F1525" }}>
        <p style={{ color: "#4A5568" }} className="text-sm">
          Preview — hero + threat only.
        </p>
      </div>
    </div>
  )
}
