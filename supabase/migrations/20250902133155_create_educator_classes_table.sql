CREATE TABLE educator_classes (
  educator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  PRIMARY KEY (educator_id, class_id)
);
