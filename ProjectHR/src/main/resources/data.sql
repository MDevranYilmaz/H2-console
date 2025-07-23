CREATE EXTENSION IF NOT EXISTS "pgcrypto";
ALTER TABLE users ADD COLUMN IF NOT EXISTS status varchar(255);
DELETE FROM users;
--INSERT INTO users (id, first_name, last_name, role, email, username, password, Status, details)
--VALUES
   -- ( gen_random_uuid(), 'HR User 1', 'Lastname 1', 'HR', 'hr1@example.com', 'hruser1', 'password1', 'APPROVED',' 12'),
    --( gen_random_uuid(), 'HR User 2', 'Lastname 2', 'HR', 'hr2@example.com', 'hruser2', 'password2', 'APPROVED', ' 12'),
   -- ( gen_random_uuid(), 'HR User 3', 'Lastname 3', 'HR', 'hr3@example.com', 'hruser3', 'password3', 'APPROVED', ' 12');

INSERT INTO users (id, first_name, last_name, role, email, username, password, Status, details, submitted_by)
VALUES
    ( gen_random_uuid(), 'Admin User', 'Lastname', 'ADMIN', 'admin@example.com', 'admin', '$2a$12$.zWe162EC5wbryPkpgKfEex2VS7UBNxxhyb7c4wfAbtU0cm/LJZ3.', 'APPROVED', '21', 'a4c6223c-1472-475b-951f-06f63f30a28f');