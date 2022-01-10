CREATE TABLE Restaurants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  imageLink TEXT
);

CREATE TABLE Menus (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT
);

CREATE TABLE MenuItems (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  price REAL
);

INSERT INTO Restaurants (name, imageLink)
VALUES ("Nandos", "https://brewerysquare.com/wp-content/uploads/2019/08/nandos-feat-img-01-brewery-square-dorchester-1024x539.jpg");

INSERT INTO Restaurants (name, imageLink)
VALUES ("Ippudo", "https://www.ippudo.co.uk/wordpress/wp-content/themes/ippudo-theme/images/ogp_image.png");

SELECT * FROM Restaurants;

INSERT INTO Menus (title)
VALUES ("Starters");

INSERT INTO Menus (title)
VALUES ("PERi-PERi Chicken");

INSERT INTO Menus (title)
VALUES ("Lunch Set");

INSERT INTO Menus (title)
VALUES ("Sharing Platters");

SELECT * FROM Menus;

INSERT INTO MenuItems (name, price)
VALUES ("1/2 Chicken", 7.95);

INSERT INTO MenuItems (name, price)
VALUES ("Chicken Butterfly", 8.25);

INSERT INTO MenuItems (name, price)
VALUES ("Whole Chicken", 14.50);

INSERT INTO MenuItems (name, price)
VALUES ("10 Chicken Wings", 10.95);

INSERT INTO MenuItems (name, price)
VALUES ("KARAKA-MEN", 9.50);

SELECT * FROM MenuItems;

UPDATE Menus
SET title="Salads"
WHERE title="Lunch Set";

SELECT * FROM Menus;

SELECT * FROM MenuItems
WHERE name LIKE "K%";

DELETE FROM MenuItems
WHERE name = "KARAKA-MEN";

SELECT * FROM MenuItems;


SELECT MIN(price)
FROM MenuItems;

SELECT MAX(price)
FROM MenuItems;

SELECT AVG(price)
FROM MenuItems;