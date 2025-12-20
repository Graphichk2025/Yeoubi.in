
-- Create products table for admin-managed products
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  sizes TEXT[] DEFAULT ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table for user orders
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  size TEXT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  remarks TEXT,
  coupon_code TEXT,
  discount_percent INTEGER DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table for contact requests
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create offers table for promotional banners
CREATE TABLE public.offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  discount_percent INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Products: Anyone can view active products, admins can manage all
CREATE POLICY "Anyone can view active products" ON public.products
FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage products" ON public.products
FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Bookings: Anyone can create, admins can view all
CREATE POLICY "Anyone can create bookings" ON public.bookings
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all bookings" ON public.bookings
FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update bookings" ON public.bookings
FOR UPDATE USING (has_role(auth.uid(), 'admin'));

-- Messages: Anyone can create, admins can view/update
CREATE POLICY "Anyone can send messages" ON public.messages
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view messages" ON public.messages
FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update messages" ON public.messages
FOR UPDATE USING (has_role(auth.uid(), 'admin'));

-- Offers: Anyone can view active offers, admins can manage
CREATE POLICY "Anyone can view active offers" ON public.offers
FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage offers" ON public.offers
FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true);

-- Storage policies for product images
CREATE POLICY "Anyone can view product images" ON storage.objects
FOR SELECT USING (bucket_id = 'products');

CREATE POLICY "Admins can upload product images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'products' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update product images" ON storage.objects
FOR UPDATE USING (bucket_id = 'products' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete product images" ON storage.objects
FOR DELETE USING (bucket_id = 'products' AND has_role(auth.uid(), 'admin'));

-- Insert default offer
INSERT INTO public.offers (title, description, discount_percent, is_active)
VALUES ('Get 10% OFF', 'Use code YEO10 at checkout', 10, true);
