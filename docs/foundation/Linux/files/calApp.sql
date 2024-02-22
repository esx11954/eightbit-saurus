
mysql -u root -p
root

drop database cal_data;
drop table account;

create database cal_data default character set utf8;

use cal_data;

CREATE TABLE account (loginId int AUTO_INCREMENT, pass TEXT,name TEXT , INDEX (loginId));
