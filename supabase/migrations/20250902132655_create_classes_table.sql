CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_class TEXT NOT NULL,
  year_class INTEGER NOT NULL,
  capacity INTEGER,
  created_at TIMESTAMP DEFAULT now()
);
