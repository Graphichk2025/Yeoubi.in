import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteSettings {
    id: string;
    logo_url: string | null;
    countdown_target: string | null;
    announcement_text: string | null;
}

export const useSettings = () => {
    return useQuery({
        queryKey: ["site_settings"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("site_settings")
                .select("*")
                .maybeSingle();

            if (error) throw error;

            if (!data) return null;

            const d = data as any;
            return {
                id: d.id,
                logo_url: d.logo_url || null,
                countdown_target: d.countdown_target || null,
                announcement_text: d.announcement_text || null,
            } as SiteSettings;
        },
    });
};
