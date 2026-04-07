export default function WhatIsWallert() {
  return (
    <section
      id="what-is-wallert"
      aria-labelledby="what-is-wallert-title"
      className="border-t border-white/10 py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl px-6">
        <p className="mb-3 text-sm uppercase tracking-wider text-white/50">
          Definition
        </p>
        <h2
          id="what-is-wallert-title"
          className="mb-8 text-3xl font-semibold md:text-4xl"
        >
          What is Wallert?
        </h2>

        <p className="mb-6 text-lg leading-relaxed text-white/90">
          <strong>
            Wallert is a free, open-source duress alarm system for
            cryptocurrency holders.
          </strong>{" "}
          It continuously monitors a dedicated decoy wallet, and the moment
          funds are transferred under physical coercion — what the security
          community calls a <em>wrench attack</em> — it instantly notifies a
          pre-defined trusted circle by email and Telegram, with custom
          emergency instructions.
        </p>

        <p className="mb-6 text-base leading-relaxed text-white/75">
          Physical attacks against cryptocurrency holders are escalating
          sharply. According to{" "}
          <a
            href="https://cryptocrime-dashboard.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            CryptoCrime.db
          </a>
          , a public tracker of physical attacks against crypto holders,{" "}
          <strong>
            311 incidents have been documented worldwide since 2014
          </strong>
          , with <strong>74 recorded in 2025 alone</strong> — nearly double the
          2024 figure. <strong>France now ranks second globally</strong>,
          behind the United States, with 43 documented incidents and a steep
          acceleration through 2025 and 2026.
        </p>

        <p className="mb-6 text-base leading-relaxed text-white/75">
          Hardware wallets protect private keys against remote attackers.
          Wallert addresses what they cannot: the moment an attacker is
          physically present, with a weapon, demanding a transfer.
        </p>

        <p className="text-base leading-relaxed text-white/75">
          Wallert is non-custodial, never touches private keys, and is
          released under the MIT license. It can be used on the public
          instance at{" "}
          <a
            href="https://wallert.app"
            className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            wallert.app
          </a>{" "}
          or self-hosted on your own infrastructure.
        </p>
      </div>
    </section>
  );
}
