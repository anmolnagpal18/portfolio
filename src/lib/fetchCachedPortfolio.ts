let cachedPromise: Promise<any> | null = null;
export async function fetchCachedPortfolio() {
  if (!cachedPromise) {
    cachedPromise = fetch('/api/portfolio')
      .then(res => res.json())
      .catch(err => {
        cachedPromise = null;
        console.error("Failed to fetch shared portfolio data:", err);
        throw err;
      });
  }
  return cachedPromise;
}
