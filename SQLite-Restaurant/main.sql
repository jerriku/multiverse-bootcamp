CREATE TABLE Restaurants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  imageLink TEXT
);

CREATE TABLE Menus (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT, 
  restaurant_id INTEGER,
  FOREIGN KEY (restaurant_id) REFERENCES Restaurants(id)
);

CREATE TABLE MenuItems (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  price REAL,
  menu_id INTEGER,
  FOREIGN KEY (menu_id) REFERENCES Menus(id)
);

INSERT INTO Restaurants (name, imageLink)
VALUES ("Nandos", "https://brewerysquare.com/wp-content/uploads/2019/08/nandos-feat-img-01-brewery-square-dorchester-1024x539.jpg");

INSERT INTO Restaurants (name, imageLink)
VALUES ("Ippudo", "https://www.ippudo.co.uk/wordpress/wp-content/themes/ippudo-theme/images/ogp_image.png");

SELECT * FROM Restaurants;

INSERT INTO Menus (title, restaurant_id)
VALUES ("Starters", 1);

INSERT INTO Menus (title, restaurant_id)
VALUES ("PERi-PERi Chicken", 1);

INSERT INTO Menus (title, restaurant_id)
VALUES ("Lunch Set", 1);

INSERT INTO Menus (title, restaurant_id)
VALUES ("Sharing Platters", 1);

SELECT * FROM Menus;

INSERT INTO MenuItems (name, price, menu_id)
VALUES ("1/2 Chicken", 7.95, 2);

INSERT INTO MenuItems (name, price, menu_id)
VALUES ("Chicken Butterfly", 8.25, 2);

INSERT INTO MenuItems (name, price, menu_id)
VALUES ("Whole Chicken", 14.50, 2);

INSERT INTO MenuItems (name, price, menu_id)
VALUES ("10 Chicken Wings", 10.95, 2);

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


INSERT INTO MenuItems (name, price, menu_id)
VALUES ("Rainbow Bowl", 8.95, 3);

INSERT INTO Menus (title, restaurant_id)
VALUES ("Appetisers", 2);

INSERT INTO Menus (title, restaurant_id)
VALUES ("Ramen", 2);

INSERT INTO MenuItems (name, price, menu_id)
VALUES ("Chicken Kara-Age", 5.00, 5);

INSERT INTO MenuItems (name, price, menu_id)
VALUES ("Age-Tako Yaki", 5.00, 5);

INSERT INTO MenuItems (name, price, menu_id)
VALUES ("Shiromaru Classic", 11.50, 6);

INSERT INTO MenuItems (name, price, menu_id)
VALUES ("Akamaru Modern", 12.50, 6);

SELECT Restaurants.name, Menus.title
FROM Restaurants
JOIN Menus ON Restaurants.id = Menus.restaurant_id;

SELECT Menus.title, MenuItems.name
FROM Menus
JOIN MenuItems ON Menus.id = MenuItems.menu_id;

SELECT  Menus.title, Restaurants.name, MenuItems.name
FROM Restaurants
JOIN Menus ON Restaurants.id = Menus.restaurant_id
JOIN MenuItems ON Menus.id = MenuItems.menu_id
WHERE Menus.title = "PERi-PERi Chicken";

SELECT Restaurants.name, COUNT(Menus.title)
FROM Restaurants
JOIN Menus ON Restaurants.id = Menus.restaurant_id
GROUP BY Restaurants.name;

SELECT Menus.title, SUM(MenuItems.price)
FROM Menus
JOIN MenuItems ON Menus.id = MenuItems.menu_id
GROUP BY Menus.title
ORDER BY SUM(MenuItems.price) DESC;