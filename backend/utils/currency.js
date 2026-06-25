import https from 'https';

let cachedRate = 94.4; // Initial fallback rate
let lastFetched = 0;
const CACHE_DURATION = 3600 * 1000; // Cache rate for 1 hour

export async function getUsdToInrRate() {
  const now = Date.now();
  // Return cached rate if it is within the cache duration
  if (now - lastFetched < CACHE_DURATION && lastFetched > 0) {
    return cachedRate;
  }

  return new Promise((resolve) => {
    https.get('https://open.er-api.com/v6/latest/USD', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const rate = json?.rates?.INR;
          if (typeof rate === 'number' && rate > 0) {
            cachedRate = rate;
            lastFetched = now;
            console.log(`[Currency Service] Live USD to INR rate updated to: ${cachedRate}`);
          }
        } catch (err) {
          console.error('[Currency Service] Failed to parse exchange rate API response, using cached rate:', err.message);
        }
        resolve(cachedRate);
      });
    }).on('error', (err) => {
      console.error('[Currency Service] HTTP request error fetching exchange rate, using cached rate:', err.message);
      resolve(cachedRate);
    });
  });
}
