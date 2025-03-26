// ✅ GameService.cache.ts

export const CACHE_TTL = 1000 * 60 * 30; // 30 minutes
const CACHE_PREFIX = "gameCache-";

export function cleanupCache() {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(CACHE_PREFIX)) {
      try {
        const cached = JSON.parse(localStorage.getItem(key) || "");
        if (!cached.timestamp || Date.now() - cached.timestamp > CACHE_TTL) {
          localStorage.removeItem(key);
        }
      } catch {
        localStorage.removeItem(key);
      }
    }
  });
}

export function getCache<T>(key: string): T | null {
  try {
    const fullKey = CACHE_PREFIX + key;
    const cached = localStorage.getItem(fullKey);
    if (!cached) return null;

    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.timestamp > CACHE_TTL) return null;

    return parsed.data;
  } catch {
    return null;
  }
}

export function setCache<T>(key: string, data: T) {
  const fullKey = CACHE_PREFIX + key;
  localStorage.setItem(
    fullKey,
    JSON.stringify({ timestamp: Date.now(), data })
  );
}
