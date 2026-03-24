"use client"
import { useState, useEffect } from "react"

export default function ResetPassword() {
  const [token, setToken] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const checks = [
    { label: "8+ characters", test: password.length >= 8 },
    { label: "At least one letter", test: /[a-zA-Z]/.test(password) },
    { label: "At least one number", test: /[0-9]/.test(password) },
    { label: "Recommended: a special character (#, @, !, %...)", test: /[^a-zA-Z0-9]/.test(password), optional: true },
  ]

  const requiredPassed = checks.filter(function(c) { return !c.optional }).every(function(c) { return c.test })

  useEffect(function() {
    const params = new URLSearchParams(window.location.search)
    setToken(params.get("token") || "")
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    if (!requiredPassed) { setError("Password does not meet the requirements."); return }
    if (password !== confirm) { setError("Passwords do not match"); return }
    setLoading(true)
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    })
    const data = await res.json()
    setLoading(false)
    if (res.ok) { setDone(true) }
    else { setError(data.error) }
  }

  if (done) return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px] text-center">
        <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
          <div className="text-3xl mb-4">✓</div>
          <h2 className="text-lg font-bold text-[#00d4aa] mb-2">Password updated</h2>
          <p className="text-gray-400 text-sm mb-6">Your password has been changed successfully.</p>
          <a href="/login" className="inline-block px-6 py-3 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors no-underline">Log in</a>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">New password</h1>
          <p className="text-gray-400 text-sm">Choose a new password for your account.</p>
        </div>

        <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
          {error && (
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg px-4 py-3 mb-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="block text-xs text-white mb-1.5">New password</label>
              <input
                type="password"
                required
                value={password}
                onChange={function(e) { setPassword(e.target.value) }}
                onFocus={function() { setPasswordFocused(true) }}
                placeholder="Create a strong password"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-500"
              />
              {(passwordFocused || password.length > 0) && (
                <div className="mt-2 flex flex-col gap-1.5">
                  {checks.map(function(check, i) {
                    const active = password.length > 0
                    let color = "text-gray-500"
                    let icon = "○"
                    if (active && check.test) {
                      color = "text-[#00d4aa]"
                      icon = "✓"
                    } else if (active && !check.test && !check.optional) {
                      color = "text-gray-400"
                      icon = "○"
                    } else if (active && !check.test && check.optional) {
                      color = "text-gray-500"
                      icon = "○"
                    }
                    return (
                      <div key={i} className={"flex items-center gap-2 text-xs transition-colors " + color}>
                        <span className="w-3 text-center">{icon}</span>
                        <span>{check.label}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs text-white mb-1.5">Confirm password</label>
              <input
                type="password"
                required
                value={confirm}
                onChange={function(e) { setConfirm(e.target.value) }}
                placeholder="Repeat your password"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg text-gray-200 text-sm outline-none focus:border-[#00d4aa]/50 transition-colors placeholder:text-gray-500"
              />
              {confirm.length > 0 && password !== confirm && (
                <p className="text-red-400 text-xs mt-1.5">Passwords do not match</p>
              )}
              {confirm.length > 0 && password === confirm && (
                <p className="text-[#00d4aa] text-xs mt-1.5">✓ Passwords match</p>
              )}
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-[#00d4aa] text-black rounded-lg font-bold text-sm hover:bg-[#00b892] transition-colors disabled:opacity-50 mt-2">
              {loading ? "Updating..." : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
