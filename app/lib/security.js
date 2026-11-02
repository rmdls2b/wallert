import jwt from "jsonwebtoken"
import crypto from "crypto"

const JWT_SECRET = process.env.JWT_SECRET

// HTML sanitization
export function escapeHtml(str) {
  if (str === null || str === undefined) return ""
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

// JWT — sign a token (expires in 30 days)
export function signToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30d" })
}

// JWT — verify token and return userId, or null if invalid
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded.userId
  } catch {
    return null
  }
}

// Extract userId from Authorization header (Bearer token)
export function getUserFromRequest(request) {
  const auth = request.headers.get("authorization")
  if (!auth || !auth.startsWith("Bearer ")) return null
  return verifyToken(auth.slice(7))
}

// Simple in-memory rate limiter
const stores = new Map()

export function createRateLimiter(maxAttempts, windowMs) {
  const id = Math.random().toString(36)
  stores.set(id, new Map())

  setInterval(() => {
    const store = stores.get(id)
    const now = Date.now()
    for (const [key, data] of store) {
      if (now - data.start > windowMs) store.delete(key)
    }
  }, 5 * 60 * 1000)

  return {
    check(key) {
      const store = stores.get(id)
      const now = Date.now()
      const record = store.get(key)

      if (!record || now - record.start > windowMs) {
        store.set(key, { count: 1, start: now })
        return true
      }

      if (record.count >= maxAttempts) return false

      record.count++
      return true
    }
  }
}

// Email volume limiter per user (max 30 emails per hour per user)
const emailStore = new Map()
const MAX_EMAILS_PER_USER_PER_HOUR = 30

setInterval(() => {
  const now = Date.now()
  for (const [key, data] of emailStore) {
    if (now - data.start > 60 * 60 * 1000) emailStore.delete(key)
  }
}, 5 * 60 * 1000)

export function checkEmailLimit(userId) {
  const now = Date.now()
  const record = emailStore.get(userId)

  if (!record || now - record.start > 60 * 60 * 1000) {
    emailStore.set(userId, { count: 1, start: now })
    return true
  }

  if (record.count >= MAX_EMAILS_PER_USER_PER_HOUR) return false

  record.count++
  return true
}

// Client IP for rate limiting.
// x-forwarded-for is client-controlled (a proxy appends to it, it does not replace
// it), so it must not be used: a different fake value per request bypasses limits.
// Behind Cloudflare, CF-Connecting-IP is set by Cloudflare and cannot be forged as
// long as the origin only accepts Cloudflare IPs. Self-hosters without Cloudflare
// should set CLIENT_IP_HEADER to a header their own reverse proxy overwrites
// (e.g. "x-real-ip" with `proxy_set_header X-Real-IP $remote_addr;` in Nginx).
const CLIENT_IP_HEADER = (process.env.CLIENT_IP_HEADER || "cf-connecting-ip").toLowerCase()

export function getClientIp(request) {
  return request.headers.get(CLIENT_IP_HEADER) || "unknown"
}

// Admin authentication: constant-time comparison + lockout after repeated failures.
const ADMIN_MAX_FAILURES = 5
const ADMIN_LOCKOUT_MS = 15 * 60 * 1000
const adminFailures = new Map()

setInterval(() => {
  const now = Date.now()
  for (const [key, data] of adminFailures) {
    if (now - data.start > ADMIN_LOCKOUT_MS) adminFailures.delete(key)
  }
}, 5 * 60 * 1000)

function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest()
  const hb = crypto.createHash("sha256").update(String(b)).digest()
  return crypto.timingSafeEqual(ha, hb)
}

// Returns { ok: true } or { ok: false, status } (401 wrong password, 429 locked out).
export function verifyAdminPassword(request, password) {
  const ip = getClientIp(request)
  const now = Date.now()
  let record = adminFailures.get(ip)
  if (record && now - record.start > ADMIN_LOCKOUT_MS) {
    adminFailures.delete(ip)
    record = null
  }
  if (record && record.count >= ADMIN_MAX_FAILURES) return { ok: false, status: 429 }

  const expected = process.env.DASHBOARD_PASSWORD
  if (expected && typeof password === "string" && password.length > 0 && safeEqual(password, expected)) {
    return { ok: true }
  }

  if (record) record.count++
  else adminFailures.set(ip, { count: 1, start: now })
  return { ok: false, status: 401 }
}

export function adminErrorResponse(result) {
  const error = result.status === 429 ? "Too many attempts" : "Unauthorized"
  return Response.json({ error }, { status: result.status })
}
