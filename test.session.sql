-- @block
CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    bio TEXT,
    country VARCHAR(2)
);
-- @block
CREATE TABLE Launches(
    id INT PRIMARY KEY AUTO_INCREMENT,
    location_name VARCHAR(255) NOT NULL UNIQUE,
    country VARCHAR(2),
    longitude INT,
    latitude INT,
    utc_offset INT(1)
);
-- @block
CREATE TABLE Watching (
    user_id INT,
    launch_id INT,
    PRIMARY KEY (user_id, launch_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (launch_id) REFERENCES Launches(id)
);
-- @block
DROP TABLE Watching;
DROP TABLE Launches;
-- @block 
INSERT INTO Users(email, bio, country)
VALUES ("test", "testing bio", "US");
-- @block
SELECT email,
    id
from Users;