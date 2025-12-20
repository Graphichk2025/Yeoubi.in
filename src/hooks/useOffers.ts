import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Offer {
  id: string;
  title: string;
  description: string | null;
  discount_percent: number | null;
  is_active: boolean;
  created_at: string;
}

export const useOffers = () => {
  return useQuery({
    queryKey: ['offers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Offer[];
    },
  });
};
