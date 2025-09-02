CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_subject TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
