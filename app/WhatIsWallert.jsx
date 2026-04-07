export default function WhatIsWallert() {
  return (
    <section
      id="what-is-wallert"
      aria-labelledby="what-is-wallert-title"
      className="border-t border-white/5"
    >
      <div className="px-6 md:px-16 lg:px-32 xl:px-40 max-w-[1400px] mx-auto py-20">
        <p className="text-[#00FF85] text-[11px] font-semibold tracking-[3px] uppercase mb-4">
          Definition
        </p>
        <h2
          id="what-is-wallert-title"
          className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold tracking-tight leading-[1.12] mb-8"
        >
          What is Wallert?
        </h2>

        <div className="max-w-3xl space-y-6">
          <p className="text-[#C8C8C2] text-lg leading-relaxed">
            <strong className="text-white">
              Wallert is an open-source duress alarm system for
              cryptocurrency holders.
            </strong>{" "}
            It continuously monitors a dedicated decoy wallet, and the moment
            funds are transferred under physical coercion or a <em>wrench attack</em>, it instantly notifies
            a pre-defined trusted circle by email and Telegram, with custom
            emergency instructions.
          </p>

          <p className="text-[#C8C8C2] text-base leading-relaxed">
            Physical attacks against cryptocurrency holders are escalating
            sharply. According to{" "}
            <a
              href="https://cryptocrime-dashboard.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00FF85] hover:opacity-80 transition-opacity underline underline-offset-4 decoration-[#00FF85]/40"
            >
              CryptoCrime.db
            </a>
            , a public tracker of physical attacks against crypto holders,{" "}
            <strong className="text-white">
              311 incidents have been documented worldwide since 2014
            </strong>
            , with{" "}
            <strong className="text-white">
              74 recorded in 2025 alone
            </strong>{" "}
            — nearly double the 2024 figure.{" "}
            <strong className="text-white">
              France now ranks second globally
            </strong>
            , behind the United States, with 43 documented incidents and a
            steep acceleration through 2025 and 2026.
          </p>

          <p className="text-[#C8C8C2] text-base leading-relaxed">
            Hardware wallets protect private keys against remote attackers.
            Wallert addresses what they cannot: the moment an attacker is
            physically present, with a weapon, demanding a transfer.
          </p>

          <p className="text-[#C8C8C2] text-base leading-relaxed">
            Wallert never touches private keys, and is
            released under the MIT license. It can be used on the public
            instance at{" "}
            <a
              href="https://wallert.app"
              className="text-[#00FF85] hover:opacity-80 transition-opacity underline underline-offset-4 decoration-[#00FF85]/40"
            >
              wallert.app
            </a>{" "}
            or self-hosted on your own infrastructure.
          </p>
        </div>
      </div>
    </section>
  )
}
