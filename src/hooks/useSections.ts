import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Section {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_coming_soon: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export const useSections = () => {
  return useQuery({
    queryKey: ['sections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Section[];
    },
  });
};
