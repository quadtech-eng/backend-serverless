CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  street TEXT NOT NULL,
  house_number TEXT,
  complement TEXT,
  neighborhood TEXT,
  city TEXT NOT NULL,
  federal_unit TEXT NOT NULL,
  zip_code TEXT NOT NULL
);
