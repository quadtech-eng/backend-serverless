CREATE TYPE user_type AS ENUM ('student', 'educator');
CREATE TYPE gender_enum AS ENUM ('female', 'male', 'other');

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  cpf TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  user_password TEXT NOT NULL,
  phone TEXT,
  date_of_birth TEXT,
  gender gender_enum NOT NULL,
  address_id UUID REFERENCES addresses(id),
  user_type user_role NOT NULL,
  agree_terms BOOLEAN NOT NULL CHECK (agree_terms = TRUE),
  created_at TIMESTAMP DEFAULT now()
);
