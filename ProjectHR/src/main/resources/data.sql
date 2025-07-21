INSERT INTO users (id, first_name, last_name, role, email, username, password)
VALUES
    (RANDOM_UUID(), 'HR User 1', 'Lastname 1', 'HR', 'hr1@example.com', 'hruser1', 'password1'),
    (RANDOM_UUID(), 'HR User 2', 'Lastname 2', 'HR', 'hr2@example.com', 'hruser2', 'password2'),
    (RANDOM_UUID(), 'HR User 3', 'Lastname 3', 'HR', 'hr3@example.com', 'hruser3', 'password3');

INSERT INTO users (id, first_name, last_name, role, email, username, password)
VALUES
    (RANDOM_UUID(), 'Admin User', 'Lastname', 'ADMIN', 'admin@example.com', 'adminuser', 'adminpassword');