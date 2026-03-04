export default function About() {
  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">

      <h1 className="text-2xl font-bold text-white mb-12">Behind Wallert.</h1>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">The problem</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"I spent 6 years at Ledger as Head of Product. Since 2024, I've been helping people secure their crypto assets. I've seen what crypto brings — and the risks it creates for those who hold it."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"Physical attacks are on the rise. Home invasions, kidnappings, extortion."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"When faced with violence, no hardware wallet protects you. You're ALONE, and no one knows you're in danger."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed">
          {"IMPORTANT: the best solution today is often to remove yourself from the equation entirely — not having easy access to your funds. But not everyone makes that choice."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">The idea</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"I built Wallert as an additional layer of protection."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"The concept: a dedicated wallet, placed under surveillance. If a transfer is made under duress, that movement triggers a silent alarm. The attacker sees a payout. In reality, it's a distress signal."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed">
          {"Within seconds, a trusted circle receives an alert with your instructions — call the police, act now, etc."}
        </p>
      </section>

{/* <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Designed to leave no trace</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"A security tool must not become a risk vector. Wallert is built on 3 pillars to minimize exposure in case of a data breach."}
        </p>
        <div className="space-y-3 mb-4">
          <div className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3">
            <p className="text-white text-base font-medium mb-1">{"Anonymity"}</p>
            <p className="text-gray-500 text-sm">{"Sign up with a non-nominal, dedicated email address."}</p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3">
            <p className="text-white text-base font-medium mb-1">{"Isolated, dedicated wallet"}</p>
            <p className="text-gray-500 text-sm">{"A wallet kept separate from your main funds. Its only purpose is to trigger the alert."}</p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3">
            <p className="text-white text-base font-medium mb-1">{"Anonymous Telegram group"}</p>
            <p className="text-gray-500 text-sm">{"Alerts are sent to an anonymous Telegram group."}</p>
          </div>
        </div>
        <p className="text-gray-400 text-base leading-relaxed">
          {"The result: even if Wallert were compromised, there's no direct link between Wallert, your identity, and your funds."}
        </p>
      </section> */}

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">A personal tool first</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"I built Wallert for myself first. When I showed the concept to people around me, the reaction was unanimous: \"I want the same thing.\""}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"So I turned it into something configurable, accessible to everyone."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed">
          {"Wallert is now available to all."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Let's be clear</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"Wallert doesn't prevent attacks or theft. That's not its job."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"Its job is to break the silence — fast. Will the police arrive in time? Maybe not. But without Wallert, no one even knows you're in danger. That's the worst scenario."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed">
          {"It's a safety net, a daily peace of mind. Not a guarantee."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">A beta, built with Claude</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"I'll be honest: I'm not a developer. I built Wallert piece by piece with the help of Claude."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed">
          {"The result isn't perfect. The interface and features can be improved. But the core of the system — detection, alert, follow-up until someone responds — works."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Help me improve it</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"This project may evolve."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"If you use Wallert, tell me what's missing, what bothers you. If you're a developer and see things to improve, your feedback is valuable."}
        </p>
        <p className="text-gray-400 text-base leading-relaxed">
          {"Every message counts. Reach out at "}
          <a href="mailto:contact@wallert.app" className="text-[#00d4aa] hover:underline">contact@wallert.app</a>
          {" — I read everything and I reply."}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-[#00d4aa] text-xs font-semibold tracking-widest uppercase mb-4">Support the project</h2>
        <p className="text-gray-400 text-base leading-relaxed mb-4">
          {"Wallert is free, and I intend to keep it that way. If you find it useful and want to help cover the costs (servers, development, time), you can send code :) or a tip :):"}
        </p>
        <div className="bg-[#111] border border-gray-800 rounded-lg px-4 py-3 mb-6">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">ETH</p>
          <p className="text-gray-300 font-mono text-sm">{"0x..."} <span className="text-gray-600 text-xs ml-2">(coming soon)</span></p>
        </div>
        <p className="text-gray-400 text-base leading-relaxed">
          {"Thanks in advance. And above all — stay safe."}
        </p>
      </section>
    </div>
  )
}
