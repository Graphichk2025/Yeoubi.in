import { useState, useEffect } from 'react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

export function useShopifyProducts(count: number = 20, query?: string) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts(count, query);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [count, query]);

  return { products, loading, error };
}
