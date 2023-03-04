-- @block
CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    bio TEXT,
    country VARCHAR(2)
);
-- @block
CREATE TABLE Launches(
    id INT PRIMARY KEY AUTO_INCREMENT,
    location_name VARCHAR(255) NOT NULL UNIQUE
);
-- @block
CREATE TABLE Watching (
    user_id INT,
    launch_id INT,
    PRIMARY_KEY (user_id, launch_id),
    FOREIGN_KEY (user_id) REFERENCES Users(id),
    FOREIGN_KEY (launch_id) REFERENCES Launches(id)
) -- @block
SELECT email,
    id
FROM Users
WHERE country = 'US'
ORDER BY id ASC
LIMIT 1;
-- @block
CREATE INDEX email_index ON Users(email);
-- @block
CREATE TABLE Rooms(
    id INT AUTO_INCREMENT,
    street VARCHAR(255),
.owner__iud INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (OWN)
)