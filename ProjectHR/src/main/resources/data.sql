CREATE EXTENSION IF NOT EXISTS "pgcrypto";
ALTER TABLE users ADD COLUMN IF NOT EXISTS status varchar(255);
DELETE FROM users;
INSERT INTO users (id, first_name, last_name, role, email, username, password, Status, details, submitted_by)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'HR User 1', 'Lastname 1', 'HR', 'hr1@example.com', 'hruser1', '$2a$12$.zWe162EC5wbryPkpgKfEex2VS7UBNxxhyb7c4wfAbtU0cm/LJZ3.', 'APPROVED', '12', NULL),
    ('11111111-1111-1111-1111-111111111112', 'HR User 2', 'Lastname 2', 'HR', 'hr2@example.com', 'hruser2', '$2a$12$.zWe162EC5wbryPkpgKfEex2VS7UBNxxhyb7c4wfAbtU0cm/LJZ3.', 'APPROVED', '12', NULL),
    ('11111111-1111-1111-1111-111111111113', 'HR User 3', 'Lastname 3', 'HR', 'hr3@example.com', 'hruser3', '$2a$12$.zWe162EC5wbryPkpgKfEex2VS7UBNxxhyb7c4wfAbtU0cm/LJZ3.', 'APPROVED', '12', NULL);

INSERT INTO users (id, first_name, last_name, role, email, username, password, Status, details, submitted_by)
VALUES
    ('21111111-1111-1111-1111-111111111111', 'Admin User', 'Lastname', 'ADMIN', 'admin@example.com', 'admin', '$2a$12$.zWe162EC5wbryPkpgKfEex2VS7UBNxxhyb7c4wfAbtU0cm/LJZ3.', 'APPROVED', '21', 'a4c6223c-1472-475b-951f-06f63f30a28f');

--username admin password 1234 (from decoder)