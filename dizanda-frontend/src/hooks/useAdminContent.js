import { useEffect, useState } from 'react';
import { fetchAdminContent } from '../lib/adminApi';

// Returns `fallback` immediately, then swaps in live content from the admin
// API once it loads. If the admin API is unreachable, `fallback` is kept.
export function useAdminContent(path, fallback) {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    fetchAdminContent(path).then((result) => {
      if (!cancelled && result) setData(result);
    });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return data;
}
