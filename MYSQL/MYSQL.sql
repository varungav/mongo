use sql_assessment;
CREATE TABLE users (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100),
    Age INT);

    
insert into users (name, email, age) values ('Varun G', 'varun@7edge.com', 28),('Suhas G', 'suhas@7edge.com', 25),('Kiran G', 'kiran@7edge.com', 81),('tejas G', 'tejas@7edge.com', 53),('Ajay G', 'akhil@7edge.com', 55);
    -- all users
select * from users;
-- age greater than 30
select * from users where age >= 30;
-- email with specific mail id
select * from users where email like '%@7edge.com';
-- sers in alphabetical order
select name from users order by name asc;

-- updating the age to 30
update users set age = 30 where id = 1;
-- deleing the user command
delete from users where id = 2;
-- inserting new values
insert into users(name, email, age) values ('Arun G', 'varun@gmail.com', 25);
-- count of all users
select count(*) from users;
-- average age of all users
select avg(age) from users;

-- retrieve users from the oldest
select * from users order by age desc limit 1;

create table orders (
	orderId int auto_increment primary key,
    userId int,
    orderDate date,
    foreign key (userId) references users(ID)
    );
insert into orders (userId, orderDate) values 
(1, '2025-01-01'),
(3, '2025-01-02'),
(4, '2025-01-03'),
(5, '2025-01-04'),
(6, '2025-01-05');

select orders.OrderID, orders.orderDate, users.Name, users.Email from orders
join users on orders.userId = users.Id;

select * from orders;

select * from users where name like 'J%';
select * from users where age > 40 and email like '%@gmail.com';

alter table users add constraint chk_age_non_negative check(age >=0);

insert into users(name, age, email) values ('Tejasss', -4, 'teja@gmail.com');
-- Error Code: 3819. Check constraint 'chk_age_non_negative' is violated.
drop table userss;
-- task 10
create table posts(
	ID int auto_increment primary key,
    title varchar(40),
    content text,
    user_id int,
    foreign key(user_id) references users(id) on delete cascade);
    
INSERT INTO posts (title, content, user_id)
VALUES
('Aarav’s First Post', 'Aarav shares his thoughts on technology.', 1),
('Aarav’s Second Post', 'Aarav explores innovations in AI.', 1),
('Ananya’s Insights', 'Ananya discusses cultural diversity.', 4),
('Rohan’s Perspective', 'Rohan talks about entrepreneurship.', 3),
('Rohan’s Second Post', 'Rohan shares tips for startups.', 3);

select * from users;
select * from posts;

-- retrieve all posts along with the respective users
select p.title, p.content, u.name, u.email from posts p join users u on p.user_id = u.id;

-- retrieve any specific id along with the post
select * from posts where posts.id = 1;

-- retrieve the users who have most number of posts
SELECT users.id AS user_id,users.name,users.email,COUNT(posts.id) AS total_posts FROM users JOIN posts ON users.id = posts.user_id
GROUP BY users.id, users.name, users.email
ORDER BY total_posts DESC LIMIT 1;

update users set name = "Varunnn" where id = 1;
delete from posts where user_id = 4;

alter table posts add constraint nw_user_id foreign key (user_id) REFERENCES  users(id) on delete cascade;

-- Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`sql_assessment`.`posts`, CONSTRAINT `nw_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE)
insert into posts (title, content, user_id) values ('Invalid Post', "this is invalid user", 9999);

-- eager loading part
SELECT users.id AS user_id,users.name,users.email,posts.id AS post_id,posts.title,posts.content
FROM users LEFT JOIN posts ON users.id = posts.user_id;
