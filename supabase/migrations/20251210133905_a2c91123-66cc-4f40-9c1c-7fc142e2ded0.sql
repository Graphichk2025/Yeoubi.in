-- Create sections table for admin-managed product sections
CREATE TABLE public.sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  is_coming_soon BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add section_id to products table
ALTER TABLE public.products ADD COLUMN section_id UUID REFERENCES public.sections(id);

-- Add logo_url to a settings table
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  logo_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Sections policies
CREATE POLICY "Anyone can view active sections" ON public.sections FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage sections" ON public.sections FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Site settings policies
CREATE POLICY "Anyone can view settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage settings" ON public.site_settings FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default sections
INSERT INTO public.sections (name, slug, description, display_order) VALUES 
  ('New Arrivals', 'new', 'Fresh drops just for you', 1),
  ('Trending', 'trending', 'What''s hot right now', 2),
  ('T-Shirts', 't-shirts', 'Premium oversized tees', 3),
  ('Pants', 'pants', 'Streetwear bottoms', 4);

-- Insert default settings
INSERT INTO public.site_settings (id) VALUES (gen_random_uuid());