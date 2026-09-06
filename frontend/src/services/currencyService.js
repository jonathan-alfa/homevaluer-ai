/**
 * Real-time Currency Exchange Rate Service (USD to IDR)
 * Automatically tracks live currency rate fluctuations without manual updates.
 */

const FALLBACK_RATE = 17650.0;
const CACHE_KEY = 'homevaluer_fx_rate';
const CACHE_TIME_KEY = 'homevaluer_fx_time';
const CACHE_DURATION_MS = 6 * 60 * 60 * 1000; // 6 jam

/**
 * Mendapatkan kurs USD ke IDR terkini secara otomatis
 */
export async function getLiveExchangeRate() {
  // Cek cache lokal browser
  try {
    const cachedRate = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    const now = Date.now();

    if (cachedRate && cachedTime && (now - Number(cachedTime) < CACHE_DURATION_MS)) {
      return Number(cachedRate);
    }
  } catch (e) {
    // Ignore localStorage error
  }

  // 1. Coba ambil dari Backend FastAPI
  try {
    const res = await fetch('/api/exchange-rate', { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      if (data.rate && data.rate > 10000) {
        saveRateToCache(data.rate);
        return data.rate;
      }
    }
  } catch (e) {
    // Backend mungkin offline / slow
  }

  // 2. Fallback: Langsung ke Open Exchange Rates API publik
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', { signal: AbortSignal.timeout(3500) });
    if (res.ok) {
      const data = await res.json();
      const liveRate = data?.rates?.IDR;
      if (liveRate && liveRate > 10000) {
        saveRateToCache(liveRate);
        return liveRate;
      }
    }
  } catch (e) {
    console.warn('[Currency] Live FX fetch warning:', e.message);
  }

  // 3. Fallback sekunder: jsdelivr Fawaz Ahmed currency CDN
  try {
    const res = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json', { signal: AbortSignal.timeout(3500) });
    if (res.ok) {
      const data = await res.json();
      const liveRate = data?.usd?.idr;
      if (liveRate && liveRate > 10000) {
        saveRateToCache(liveRate);
        return liveRate;
      }
    }
  } catch (e) {
    // Ignore
  }

  // Gunakan cache lama jika ada, atau fallback default
  const oldRate = Number(localStorage.getItem(CACHE_KEY));
  return oldRate && oldRate > 10000 ? oldRate : FALLBACK_RATE;
}

function saveRateToCache(rate) {
  try {
    localStorage.setItem(CACHE_KEY, String(rate));
    localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
  } catch (e) {
    // Ignore localStorage write error
  }
}

/**
 * Format angka USD ke Rupiah secara otomatis
 */
export function formatToRupiah(usdAmount, rate = FALLBACK_RATE) {
  const rupiah = Math.round(usdAmount * rate);
  return `Rp ${rupiah.toLocaleString('id-ID')}`;
}
