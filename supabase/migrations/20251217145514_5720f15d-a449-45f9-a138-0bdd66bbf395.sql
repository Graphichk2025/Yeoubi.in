-- Add multiple images support and price drop feature
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS original_price NUMERIC DEFAULT NULL;

-- Update existing products to have their current image_url in images array
UPDATE public.products 
SET images = ARRAY[image_url]
WHERE image_url IS NOT NULL AND (images IS NULL OR array_length(images, 1) IS NULL);