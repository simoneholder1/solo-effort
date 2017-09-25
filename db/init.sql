
CREATE table if not exists Colors (
id SERIAL PRIMARY KEY,
color VARCHAR(60)
)

INSERT INTO Colors (
color)
VALUES ('black');
INSERT INTO Colors (
color)
VALUES ('beige');
INSERT INTO Colors (
color)
VALUES ('high gloss black');
INSERT INTO Colors (
color)
VALUES ('blue');
INSERT INTO Colors (
color)
VALUES ('tan');
INSERT INTO Colors (
color)
VALUES ('navy');

select *
from colors;


CREATE TABLE shoes (
id serial primary key,
name varchar(45),
colorid INTEGER,
details text,
price float
);

insert into shoes (name, colorid, price, details)
values ('Valentino Rockstud flip-flop',1,250, 'this is a great shoe'
);
insert into shoes (name, colorid, price, details)
values ('Fendi Patent Leather Heels',2,700, 'this is a great shoe for casual occasions'
);
insert into shoes (name, colorid, price, details)
values ('Ugg Luxury Emu Skin Boots',3,200, 'this is a painfully beautiful shoe'
);
insert into shoes (name, colorid, price, details)
values ('Tory Burch Short Ankle Booties',4,325, 'this is a show stopping shoe'
);
insert into shoes (name, colorid, price, details)
values ('Tory Burch Caroline Flats',5,295, 'this is a must have shoe'
);
insert into shoes (name, colorid, price, details)
values ('On Train Running Shoe',6,195, 'this is a practical shoe'
);
insert into shoes (name, colorid, price, details)
values ('Brooks Running Shoe',3,95, 'this is an ugly shoe'
);
insert into shoes (name, colorid, price, details)
values ('Louis Vuitton Leather Converse',4,450, 'great attention to detail went into make this shoe'
);
insert into shoes (name, colorid, price, details)
values ('Classic Quilted Chanel Flat',6,700, 'this is fabulous highend shoe'
);



