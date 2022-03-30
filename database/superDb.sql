CREATE DATABASE mySuperMarketDB;

use mysupermarketdb;

CREATE TABLE users
(
userID int not null,
firstName varchar(255) not null,
lastName varchar(255) not null,
email varchar(255) not null,
password varchar(1000) not null,
city varchar(255) not null,
street varchar(255) not null,
isAdmin boolean,
primary key (userID),
UNIQUE KEY uniqe_username (email)
);

CREATE TABLE categories
(
categoryID int auto_increment,
categoryName varchar(255),
primary key (categoryID)
);

CREATE TABLE products
(
productID int auto_increment,
productName varchar(255),
category_id int,
price varchar(255),
image text,
primary key (productID),
foreign key (category_id) references categories(categoryID)
);


CREATE TABLE shopping_cart
(
id int auto_increment,
user_id int,
cartDate datetime default now(),
isopen bool default 0,
foreign key (user_id) references users(userID),
primary key (id)
);

CREATE TABLE cart_products
(
id int auto_increment,
product_id int,
amount int,
cart_id int,
primary key (id),
foreign key (product_id) references products(productID)
);

CREATE TABLE orders
(
orderID int auto_increment,
user_id int,
cart_id int,
sendCity varchar(255),
sendStreet varchar(255),
sendDate varchar(255),
orderDate date default now(),
payEnd int(4),
primary key (orderID),
foreign key (user_id) references users(userID)
); 


INSERT INTO categories
(categoryName)
VALUES
("Milk & Eggs"),
("Vegetables & Fruits"),
("Meat & Fish"),
("Drinks"),
("Bread/Bakery"),
("Frozen"),
("Candys"),
("Cleaners");


INSERT INTO products
(productName, category_id, price, image)
VALUES
("Milk",1,"5.90","https://www.tnuva.co.il/uploads/f_606ee49e25971_1617880222.jpg"),
("Yolo", 1, "4.70", "https://img.haarets.co.il/img/1.2536010/3083885822.PNG?width=1200&height=1200"),
("Cottage", 1, "5.90", "https://www.tnuva.co.il/uploads/f_5d0f283c02962_1561274428.png"),
("Eggs", 1, "25", "https://ynet-images1.yit.co.il/picserver5/crop_images/2020/04/02/9886891/9886891_0_50_1000_563_0_x-large.jpg"),
("Chocolate milk - Tnuva", 1, "7.90", "https://hinawi.co.il/wp-content/uploads/2020/10/20200808_144945-600x683.jpg"),
("Bannana", 2, "7.90", "https://www.ynet.co.il/PicServer4/2016/02/23/6836592/68365910100887640360no.jpg"),
("Strawberry", 2, "12.90", "https://a7.org/pictures/878/878972.jpg"),
("Clementine", 2, "13", "https://yarkanhaair.co.il/wp-content/uploads/2021/01/%D7%A7%D7%9C%D7%9E%D7%A0%D7%98%D7%99%D7%A0%D7%94.jpg"),
("Potatoes", 2, "5", "https://www.tasmc.org.il/Be-Well/Newsletters/PublishingImages/headers/MAY2015/Potato001.jpg"),
("Pineapple", 2, "40", "https://haorgani.co.il/wp-content/uploads/2019/08/%D7%90%D7%A0%D7%A0%D7%A1-1024x694.jpg"),
("Cucember", 2, "5", "https://www.agogo.co.il/wp-content/uploads/2013/05/%D7%9E%D7%9C%D7%A4%D7%A4%D7%95%D7%9F-%D7%99%D7%AA%D7%A8%D7%95%D7%A0%D7%95%D7%AA.jpg"),
("Cucember", 2, "4", "https://www.ynet.co.il/PicServer5/2018/11/20/8894066/88940290100683640360no.jpg"),
("Chicken", 3, "30", "https://cdn.istores.co.il/image/upload/if_ar_gt_2:1/c_fill,h_662,w_555/c_fill,h_662,w_555/if_else/c_fill,q_100,w_555/if_end/dpr_2/v1589888120/clients/104422/929a2d0247de7952b8dd8e539b0a9380a4851193.jpg"),
("Meat", 3, "35", "https://www.clalit.co.il/he/new_article_images/lifestyle/meat%20and%20fish/GettyImages-505207430/medium.jpg"),
("Fish - Amnon",3,"25.90", "http://www.paskovich.co.il/Warehouse/catalog/items/3bdecc45-39bc-40b9-9f76-b528b80f2491.jpg"),
("Water - Neviot", 4, "15", "https://ynet-images1.yit.co.il/picserver5/wcm_upload/2020/08/21/SkJqYBpMP/nev1.jpg"),
("Orange juice", 4, "8.90", "https://prigat.co.il/wp-content/uploads/2018/12/7290002871460-2.png"),
("Coca Cola", 4, "7.90", "https://d3m9l0v76dty0.cloudfront.net/system/photos/4578810/large/58f3650a817d6b5fb0b74539db00ae51.jpg"),
("Goldstart Beer",4, "36", "https://diplomats.layam.com/media/catalog/product/cache/b7dfd230b7d734c0966cd84b3ae2fb1b/3/7/3717428_1.jpg"),
("Bread", 5, "4.90", "https://st1.foodsd.co.il/Images/Products/large/5Z1gP6XaIu.jpg"),
("Buns", 5, "10", "https://upload.wikimedia.org/wikipedia/commons/1/10/Sesame_seed_hamburger_buns.jpg"),
("Buns", 5, "12.50", "https://kerenagam.co.il/wp-content/uploads/2019/10/IMG_4683.jpg"),
("Corn schnitzel", 6, "36", "https://shook360.com/wp-content/uploads/2021/01/7290000300900.jpg"),
("Melawah", 6, "10", "https://m.pricez.co.il/ProductPictures/7290000238036.jpg"),
("Jahnun", 6, "9", "https://www.toprechesh.co.il/files/products/image1_858_2015-01-13_20-46-43.jpg"),
("Potato balls", 6, "25.90", "https://www.thedinnerbite.com/wp-content/uploads/2019/11/loaded-mashed-potato-balls-recipe-img-14.jpg"),
("Bamba nougat", 7, "3.90", "https://cdn.shopify.com/s/files/1/0274/5634/0081/products/BambaNugat60_475x475.png?v=1596706654"),
("Bamba Bisli mix", 7, "5.90", "https://5dakot.com/storage/3629/conversions/QNL56_Z_P_7290111564956_1-thumb.jpg"),
("Bamba", 7, "3.90", "https://www.dutyfree.co.il/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/2/4/249875__249877.jpg"),
("Click", 7, "4", "https://klik.co.il/user/apps/klik/assets/img/bundle_valentines.png"),
("Nutella", 7, "12.50", "https://www.nutella.com/il/sites/nutella20_il/files/styles/scale_width_250/public/2020-07/nutella-jar.jpg?t=1643126216"),
("Loacker - chocolate", 7, "8.90", "https://www.loacker.com/mediaObject/importedProducts/ProdWeb-1860066_int-en_packaged/original/ProdWeb-1860066_int-en_packaged.png"),
("Oreo", 7, "8.90", "https://www.amihaimcandies.com/wp-content/uploads/2020/07/7290002353324.jpg"),
("Cilit Bang", 8, "10", "https://ksp.co.il/site/siteUpload/814554248-4002448017684.jpg"),
("Economica - Sano", 8, "14.90", "https://www.sano.co.il/media/SA7290000294780-201x300.jpg"),
("Tissue", 8, "15.90", "https://media.istockphoto.com/photos/tissue-box-picture-id483771109?k=20&m=483771109&s=612x612&w=0&h=4Eqf3AiIz4_UdOc30GvQS7rF5A7jhfttEt80CLKjXSo="),
("Ritspaz - Sano", 8, "16.90", "https://www.sano.co.il/media/unnamed-13-1-180x300.jpg"),
("Softener - Sano Maxima", 8, "19.90", "https://www.sano.co.il/media/SA7290012117558-scaled.jpg");

-- INSERT INTO users
-- (userID, firstName, lastName, email, password, city, street,isAdmin)
-- VALUES
-- (123456789,"Michal","Hazan","michalhazansnt@gmail.com", "admin", "Rison Lezion", "Mivza Kadesh", 1);



-- please make sure to add an admin use update on your sql after you register:
-- update mysupermarketdb.users set isAdmin= 1 where userID=987654321;