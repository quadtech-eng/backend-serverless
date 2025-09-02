CREATE TABLE educator_subjects (
  educator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  PRIMARY KEY (educator_id, subject_id)
);
