CREATE DATABASE dorm_mg;

CREATE TABLE Building (
    BName VARCHAR(255) NOT NULL,
    _room int,
    _floor int,
    sex CHAR(3),
    PRIMARY KEY (BName)
);

CREATE TABLE Room (
    BName VARCHAR(255) NOT NULL,
    RoomId int NOT NULL,
    _wc int NOT NULL,
    _bedroom int NOT NULL,
    _roomer int NOT NULL,
    _status BOOL NOT NULL,
    price DOUBLE(6,2) NOT NULL,
    PRIMARY KEY (RoomId),
    FOREIGN KEY (BName) REFERENCES Building(BName)
);

CREATE TABLE Tenant (
    SSN BIGINT NOT NULL,
    BName VARCHAR(255),
    RoomId int,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    sex CHAR(3) NOT NULL,
    phoneNumber int,
    type VARCHAR(255) NOT NULL,
    PRIMARY KEY (SSN),
    FOREIGN KEY (BName) REFERENCES Building(BName),
    FOREIGN KEY (RoomId) REFERENCES Room(RoomId),
);

CREATE TABLE Student (
    StudentId INTEGER NOT NULL,
    SSN BIGINT NOT NULL,
    PRIMARY KEY (StudentId),
    FOREIGN KEY (SSN) REFERENCES Tenant(SSN)
);

CREATE TABLE Staff (
    StaffId INTEGER NOT NULL,
    SSN BIGINT NOT NULL,
    BName VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    salary FLOAT NOT NULL,
    PRIMARY KEY (StaffId),
    FOREIGN KEY (SSN) REFERENCES Tenant(SSN),
    FOREIGN KEY (BName) REFERENCES Building(BName)
);

CREATE TABLE Contract (
    ContractNo int NOT NULL,
    BName VARCHAR(255) NOT NULL,
    RoomId int NOT NULL,
    SSN BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    rent FLOAT NOT NULL,
    deposit FLOAT NOT NULL,
    status BOOL NOT NULL,
    PRIMARY KEY (ContractNo),
    FOREIGN KEY (BName) REFERENCES Building(BName),
    FOREIGN KEY (RoomId) REFERENCES Room(RoomId),
    FOREIGN KEY (SSN) REFERENCES Tenant(SSN)
);

CREATE TABLE Address (
    SSN BIGINT NOT NULL,
    HNo VARCHAR(255) NOT NULL,
    District VARCHAR(255) NOT NULL,
    Province VARCHAR(255) NOT NULL,
    ZipCode int NOT NULL
    FOREIGN KEY (SSN) REFERENCES Tenant(SSN)
);

CREATE TABLE Bill (
    BillId INT NOT NULL,
    BName VARCHAR(255) NOT NULL,
    RoomId int NOT NULL,
    due_date DATE NOT NULL,
    status BOOL NOT NULL,
    fine FLOAT NOT NULL,
    CostName VARCHAR(255) NOT NULL,
    PRIMARY KEY (BillId),
    FOREIGN KEY (BName) REFERENCES Building(BName),
    FOREIGN KEY (RoomId) REFERENCES Room(RoomId)
);

CREATE TABLE Payment (
    PaymentId BIGINT NOT NULL,
    BillId INT NOT NULL,
    pay_date TIMESTAMP without time zone NOT NULL,
    cost FLOAT NOT NULL,
    status BOOL NOT NULL,
    paidType VARCHAR(255) NOT NULL,
	PRIMARY KEY (PaymentId),
    FOREIGN KEY (BillId) REFERENCES Bill(BillId)
);

CREATE TABLE Bank_Payment (
    PaymentId BIGINT NOT NULL,
    bank_name VARCHAR(255) NOT NULL,
    account_id BIGINT NOT NULL,
    FOREIGN KEY (PaymentId) REFERENCES Payment(PaymentId)
);

CREATE TABLE CreditCard_Payment (
    PaymentId BIGINT NOT NULL,
    holder_name VARCHAR(255) NOT NULL,
    exp_date VARCHAR(5) NOT NULL,
    cc_number BIGINT NOT NULL,
    FOREIGN KEY (PaymentId) REFERENCES Payment(PaymentId)
);

CREATE TABLE Service (
    ServiceNo INT NOT NULL,
    SSN BIGINT NOT NULL,
    request_date TIMESTAMP without time zone NOT NULL,
    status BOOL NOT NULL,
    PRIMARY KEY (ServiceNo),
    FOREIGN KEY (SSN) REFERENCES Tenant(SSN)
);

CREATE TABLE Inform_Service (
    ServiceNo INT NOT NULL,
    SSN BIGINT NOT NULL,
    FOREIGN KEY (ServiceNo) REFERENCES Service(ServiceNo),
    FOREIGN KEY (SSN) REFERENCES Tenant(SSN)
);

CREATE TABLE Service_Detail (
    ServiceNo INT NOT NULL,
    SSN BIGINT NOT NULL,
    detail VARCHAR(1364) NOT NULL,
    FOREIGN KEY (ServiceNo) REFERENCES Service(ServiceNo),
    FOREIGN KEY (SSN) REFERENCES Tenant(SSN)
);

INSERT INTO Building 
VALUES ('B1',30, 8, 'M'),
('B2',30,8,'M'),
('B3',30,8,'M'),
('C1',35,10,'M'),
('C2',35,10,'M'),
('C3',35,10,'M'),
('M1',50,5,'M'),
('M2',50,5,'M'),
('F1',50,5,'F'),
('F2',50,5,'F');

INSERT INTO Room
VALUES
('B1',205,2,4,4,FALSE,12000),
('B2',211,2,4,4,FALSE,12000),
('B3',109,2,2,3,TRUE,12000),
('C1',313,1,2,4,FALSE,15000),
('C2',407,1,2,4,FALSE,15000),
('C3',501,1,2,1,TRUE,15000),
('M1',113,1,1,4,TRUE,6000),
('M2',222,1,1,4,FALSE,6000),
('F1',215,1,1,4,FALSE,6000),
('F2',306,1,1,4,FALSE,6000),
('B1',207,1,2,4,FALSE,12000),
('B2',316,1,2,4,TRUE,12000),
('C1',203,1,2,2,FALSE,15000),
('C2',401,1,2,2,FALSE,15000),
('M1',119,1,2,3,TRUE,6000);


INSERT INTO Tenant
VALUES
(1234567891001,'B1',205,'Will','Smith','M',0989990001,'student'),
(1234567891002,'B2',211,'Eddie','Redmayne','M',0989990002,'student'),
(1234567891003,'B3',109,'David','Beckham','M',0989990003,'student'),
(1234567891004,'C1',313,'Tom','Hanks','M',0989990004,'student'),
(1234567891005,'C2',407,'Jack','Black','M',0989990005,'student'),
(1234567891006,'C3',501,'Eden','Hazard','M',0989990006,'student'),
(1234567891007,'M1',113,'Edouard','Mendy','M',0989990007,'student'),
(1234567891008,'M2',222,'Chris','Evans','M',0989990008,'student'),
(1234567891009,'F1',215,'Anya','Taylor-joy','F',0989990009,'Student'),
(1234567891010,'F2',306,'Karen','Gillan','F',0989990010,'Student'),
(1234567891011,'B1',207,'Dwayne','Johnson','M',0989990011,'staff'),
(1234567891012,'B2',316,'Jason','Statham','M',0989990012,'staff'),
(1234567891013,'C1',203,'Vin','Diesel','M',0989990013,'staff'),
(1234567891014,'C2',401,'Morgan','Freeman','M',0989990014,'staff'),
(1234567891015,'M1',119,'Samuel','Jackson','M',0989990015,'staff');

INSERT INTO Student
VALUES
(6109680001, 1234567891001),
(6109680002, 1234567891002),
(6109680003, 1234567891003),
(6109680004,1234567891004),
(6109680005,1234567891005),
(6209680001,1234567891006),
(6209680002,1234567891007),
(6209680003,1234567891008),
(6209680004,1234567891009),
(6209680005,1234567891010);


INSERT INTO Address
VALUES
(1234567891001,'103/123','Nong Yai','Chonburi',20110),
(1234567891002,'207/156','Si Racha','Chonburi',20230),
(1234567891003,'210/264','Ban Bueng','Chonburi',20120),
(1234567891004,'301/164','Bo Thong','Chonburi',20210),
(1234567891005,'105/326','Krasang','Buriram',31010),
(1234567891006,'199/342','Nong Ki','Buriram',31020),
(1234567891007,'156/958','Ban Dan','Buriram',31030),
(1234567891008,'101/334','Din Daeng','Bangkok',10100),
(1234567891009,'202/337','Ratchathewi','Bangkok',10200),
(1234567891010,'201/658','Min Buri','Bangkok',10270),
(1234567891011,'294/367','Khlong Toei','Bangkok',10320),
(1234567891012,'174/156','Lam Luk Ka','Pathum Thani',12120),
(1234567891013,'134/358','Bang Phun','Pathum Thani',10530),
(1234567891014,'164/188','Nong Sam Wang','Pathum Thani',10510),
(1234567891015,'149/279','Nong Suea','Pathum Thani',12140);


INSERT INTO Staff (staffid,ssn,position,salary,bname)
VALUES
(0001,1234567891011,'Cleaning staff',12000,'B1'),
(0002,1234567891012,'Cleaning staff',12000,'C1'),
(0003,1234567891013,'Cleaning staff',12000,'C3'),
(0004,1234567891014,'Chief staff',18000,'B1'),
(0005,1234567891015,'Chief staff',18000,'B2');

SET datestyle = dmy;

INSERT INTO Contract
VALUES
(00001,'B1',205,1234567891001,'1/2/2020','1/2/2021',12000,24000,FALSE),
(00002,'B2',211,1234567891002,'7/2/2020','7/2/2021',12000,24000,FALSE),
(00003,'B3',109,1234567891003,'8/2/2020','8/2/2021',12000,24000,FALSE),
(00004,'C1',313,1234567891004,'12/2/2020','12/2/2021',15000,30000,FALSE),
(00005,'C2',407,1234567891005,'4/3/2020','4/3/2021',15000,30000,FALSE),
(00006,'C3',501,1234567891006,'4/5/2020','4/5/2021',15000,30000,FALSE),
(00007,'M1',113,1234567891007,'29/5/2020','30/5/2021',6000,12000,TRUE),
(00008,'M2',222,1234567891008,'17/6/2020','17/6/2021',6000,12000,TRUE),
(00009,'F1',215,1234567891009,'11/8/2020','11/8/2021',6000,12000,TRUE),
(00010,'F2',306,1234567891010,'18/8/2020','18/8/2021',6000,12000,TRUE),
(00011,'B1',207,1234567891011,'18/8/2020','18/8/2021',12000,24000,TRUE),
(00012,'B2',316,1234567891012,'19/8/2020','19/8/2021',12000,24000,TRUE),
(00013,'C1',203,1234567891013,'20/8/2020','20/8/2021',15000,15000,TRUE),
(00014,'C2',401,1234567891014	,'20/8/2020','20/8/2021',15000,15000,TRUE),
(00015,'M1',119,1234567891015,'21/8/2020','21/8/2021',6000,12000,TRUE);

set datestyle = dmy;
INSERT INTO Bill
VALUES
(40001,'B1',205,'21/7/2020',TRUE,0,	'ค่าห้อง'),
(40002,'B1',205,'21/7/2020',TRUE,0,	'ค่าไฟ'),
(40003,'B1',205,'21/7/2020',TRUE,0,	'ค่าน้ำ'),
(40004,'B2',211,'3/8/2020',TRUE,0,	'ค่าห้อง'),
(40005,'B2',211,'3/8/2020',TRUE,0,	'ค่าไฟ'),
(40006,'B2',211,'3/8/2020',TRUE,0,	'ค่าน้ำ'),
(40007,'B3',109,'6/9/2020',TRUE,	0,	'ค่าห้อง'),
(40008,'B3',109,'6/9/2020',TRUE,	0,	'ค่าไฟ'),
(40009,'B3',109,'6/9/2020',TRUE,	0,	'ค่าน้ำ'),
(40010,'C1',313,'13/9/2020',TRUE,	0,	'ค่าห้อง'),
(40011,'C1',313,'13/9/2020',TRUE,	0,	'ค่าไฟ'),
(40012,'C1',313,'13/9/2020',TRUE,	0,	'ค่าน้ำ'),
(40013,'C2',407,'19/9/2020',TRUE,	300,	'ค่าห้อง'),
(40014,'C2',407,'19/9/2020',TRUE,	300,	'ค่าไฟ'),
(40015,'C2',407,'19/9/2020',TRUE,	300,	'ค่าน้ำ'),
(40016,'C3',501,'29/9/2020',TRUE,	0,	'ค่าห้อง'),
(40017,'C3',501,'29/9/2020',TRUE,	0,	'ค่าไฟ'),
(40018,'C3',501,'29/9/2020',TRUE,	0,	'ค่าน้ำ'),
(40019,'M1',113,'10/9/2020',TRUE,	0,	'ค่าห้อง'),
(40020,'M1',113,'10/9/2020',TRUE,	0,	'ค่าไฟ'),
(40021,'M1',113,'10/9/2020',TRUE,	0,	'ค่าน้ำ'),
(40022,'M2',222,'14/10/2020',TRUE,	125,	'ค่าห้อง'),
(40023,'M2',222,'14/10/2020',TRUE,	125,	'ค่าไฟ'),
(40024,'M2',222,'14/10/2020',TRUE,	125	,'ค่าน้ำ'),
(40025,'F1',215,'15/10/2020',TRUE,	0,	'ค่าห้อง'),
(40026,'F1',215,'15/10/2020',TRUE,	0,	'ค่าไฟ'),
(40027,'F1',215,'15/10/2020',TRUE,	0,	'ค่าน้ำ'),
(40028,'F2',306,'18/10/2020',TRUE,	0,	'ค่าห้อง'),
(40029,'F2',306,'18/10/2020',TRUE,	0,	'ค่าไฟ'),
(40030,'F2',306,'18/10/2020',TRUE,	0,	'ค่าน้ำ'),
(40031,'B1',207,'18/10/2020',TRUE,	0,	'ค่าห้อง'),
(40032,'B1',207,'18/10/2020',TRUE,	0,	'ค่าไฟ'),
(40033,'B1',207,'18/10/2020',TRUE,	0,	'ค่าน้ำ'),
(40034,'B2',316,'19/10/2020',TRUE,	50,	'ค่าห้อง'),
(40035,'B2',316,'19/10/2020',TRUE,	50,	'ค่าไฟ'),
(40036,'B2',316,'19/10/2020',TRUE,	50	,'ค่าน้ำ'),
(40037,'C1',203,'20/5/2021',FALSE,	0,	'ค่าห้อง'),
(40038,'C1',203,'20/5/2021',FALSE,	0,	'ค่าไฟ'),
(40039,'C1',203,'20/5/2021',FALSE,	0,	'ค่าน้ำ'),
(40040,'C2',401,'28/5/2021',FALSE,	0,	'ค่าห้อง'),
(40041,'C2',401,'28/5/2021',FALSE,	0,	'ค่าไฟ'),
(40042,'C2',401,'28/5/2021',FALSE,	0	,'ค่าน้ำ'),
(40043,'M1',119,'30/5/2021',FALSE,	25,	'ค่าห้อง'),
(40044,'M1',119,'30/5/2021',FALSE,	25,	'ค่าไฟ'),
(40045,'M1',119,'30/5/2021',FALSE,	25,	'ค่าน้ำ');

INSERT INTO Payment
VALUES
(5001,  40001,  '13/07/2020 2:20 PM',	12000,	TRUE,	'bank_payment'),
(5002,	40002,	'13/07/2020 2:20 PM',	841,	TRUE,	'bank_payment'),
(5003,	40003,	'13/07/2020 2:20 PM',	219,	TRUE,	'bank_payment'),
(5004,	40004,	'1/08/2020 8:43 AM'	,12000,	TRUE,	'bank_payment'),
(5005,	40005,	'1/08/2020 8:43 AM',	612,	TRUE,	'bank_payment'),
(5006,	40006,	'1/08/2020 8:43 AM',	189,	TRUE,	'bank_payment'),
(5007,	40007,	'2/09/2020 10:53 AM',	12000,	TRUE,	'bank_payment'),
(5008,	40008,	'2/09/2020 10:53 AM',	721,	TRUE,	'bank_payment'),
(5009,	40009,	'2/09/2020 10:53 AM',	351,	TRUE,	'bank_payment'),
(5010,	40010,	'5/09/2020 9:24 AM',	15000,	TRUE,	'bank_payment'),
(5011,	40011,	'5/09/2020 9:24 AM',	865,	TRUE,	'bank_payment'),
(5012,	40012,	'5/09/2020 9:24 AM',	259,	TRUE,	'bank_payment'),
(5013,	40013,	'10/09/2020 12:02 PM',	15000,	TRUE,	'creditcard_payment'),
(5014,	40014,	'10/09/2020 12:02 PM',	422,	TRUE,	'creditcard_payment'),
(5015,	40015,	'10/09/2020 12:02 PM',	361,	TRUE,	'creditcard_payment'),
(5016,	40016,	'14/09/2020 4:13 PM',	15000,	TRUE,	'bank_payment'),
(5017,	40017,	'14/09/2020 4:13 PM',	521,	TRUE,	'bank_payment'),
(5018,	40018,	'14/09/2020 4:13 PM',	248,	TRUE,	'bank_payment'),
(5019,	40019,	'2/09/2020 8:34 PM',	6000,	TRUE,	'bank_payment'),
(5020,	40020,	'2/09/2020 8:34 PM',	681,	TRUE,	'bank_payment'),
(5021,	40021,	'2/09/2020 8:34 PM',	344,TRUE,	'bank_payment'),
(5022,	40022,	'10/10/2020 7:59 PM',	6000,	TRUE,	'creditcard_payment'),
(5023,	40023,	'13/10/2020 7:59 PM',	812,	TRUE,	'creditcard_payment'),
(5024,	40024,	'13/10/2020 7:59 PM',	345,	TRUE,	'creditcard_payment'),
(5025,	40025,	'2/10/2020 6:33 AM',6000,	TRUE,	'creditcard_payment'),
(5026,	40026,	'2/10/2020 6:33 AM',	846,	TRUE,	'creditcard_payment'),
(5027,	40027,	'2/10/2020 6:33 AM',	102,	TRUE,	'creditcard_payment'),
(5028,	40028,	'1/10/2020 3:52 PM',	6000,	TRUE,	'bank_payment'),
(5029,	40029,	'1/10/2020 3:52 PM',	1025,	TRUE,	'bank_payment'),
(5030,	40030,	'1/10/2020 3:52 PM',	411,	TRUE,	'bank_payment'),
(5031,	40031,	'30/09/2020 5:36 PM',	12000,	TRUE,	'creditcard_payment'),
(5032,	40032,	'30/09/2020 5:36 PM',	942,	TRUE,	'creditcard_payment'),
(5033,	40033,	'30/09/2020 5:36 PM',	345,	TRUE,	'creditcard_payment'),
(5034,	40034,	'5/10/2020 9:23 AM',	12000,	TRUE,	'creditcard_payment'),
(5035,	40035,	'5/10/2020 9:23 AM',	433,	TRUE,	'creditcard_payment'),
(5036,	40036,	'5/10/2020 9:23 AM',	238,	TRUE,	'creditcard_payment');

INSERT INTO bank_payment
VALUES
(5001,	'ธนาคารกรุงเทพ',	4753361234),
(5002,	'ธนาคารกรุงเทพ',	4753361234),
(5003,	'ธนาคารกรุงเทพ',	4753361234),
(5004,	'ธนาคารกรุงไทย',	0521081213),
(5005,	'ธนาคารกรุงไทย',	0521081213),
(5006,	'ธนาคารกรุงไทย',	0521081213),
(5007,	'ธนาคารกรุงไทย',	0940154748),
(5008,	'ธนาคารกรุงไทย',	0940154749),
(5009,	'ธนาคารกรุงไทย',	0940154750),
(5010,	'ธนาคารไทยพาณิชย์',	3642121415),
(5011,	'ธนาคารไทยพาณิชย์',	3642121416),
(5012,	'ธนาคารไทยพาณิชย์',	3642121417),
(5016,	'ธนาคารกรุงไทย',	0745332618),
(5017,	'ธนาคารกรุงไทย',	0745332619),
(5018,	'ธนาคารกรุงไทย',	0745332620),
(5019,	'ธนาคารกสิกรไทย',	6842050681),
(5020,	'ธนาคารกสิกรไทย',	6842050681),
(5021,	'ธนาคารกสิกรไทย',	6842050681),
(5028,	'ธนาคารกรุงไทย',	0511248238),
(5029,	'ธนาคารกรุงไทย',	0511248239),
(5030,	'ธนาคารกรุงไทย',	0511248240);

INSERT INTO creditcard_payment
VALUES
(5013,	'Jack Black',	'08/28',	4286618265331450),
(5014,	'Jack Black',	'08/29',	4286618265331450),
(5015,	'Jack Black',	'08/30',	4286618265331450),
(5022,	'Chris Evans',	'06/25',	3152248631202985),
(5023,	'Chris Evans',	'06/26',	3152248631202985),
(5024,	'Chris Evans',	'06/27',	3152248631202985),
(5025,	'Anya Taylorjoy',	'01/27',	3544152336422185),
(5026,	'Anya Taylorjoy',	'01/28',	3544152336422185),
(5027,	'Anya Taylorjoy',	'01/29',	3544152336422185),
(5031,	'Dwayne Johnson',	'04/23',	2015529755412033),
(5032,	'Dwayne Johnson',	'04/24',	2015529755412033),
(5033,	'Dwayne Johnson',	'04/25',	2015529755412033),
(5034,	'Jason Statham',	'11/22',	2355816200513908),
(5035,	'Jason Statham',	'11/23',	2355816200513908),
(5036,	'Jason Statham',	'11/24',	2355816200513908);

INSERT INTO service
VALUES
(10001,	1234567891006,	'5/07/2020 11:42 AM',	TRUE),
(10002,	1234567891010,	'26/09/2020 1:18 PM',	TRUE),
(10003,	1234567891011,	'3/12/2020 10:53 AM',	TRUE),
(10004,	1234567891006,	'1/01/2021 2:37 PM',	TRUE),
(10005,	1234567891009,	'2/01/2021 7:21 PM',	TRUE),
(10006,	1234567891003,	'14/02/2021 10:28 AM',	FALSE),
(10007,	1234567891001,	'4/03/2021 9:05 AM',	FALSE);


INSERT INTO Service_detail
VALUES
(10001,	1234567891006,	'เครื่องทำน้ำอุ่นเสีย'),
(10002,	1234567891010,	'กลอนประตูเสีย'),
(10003,	1234567891011,	'กระจกห้องน้ำแตก'),
(10004,	1234567891006,	'ไฟเปิดไม่ติด'),
(10005,	1234567891009,	'เครื่องทำน้ำอุ่นเสีย'),
(10006,	1234567891003,	'ไฟเปิดไม่ติด'),
(10007,	1234567891001,	'กลอนประตูเสีย');

INSERT INTO Inform_service
VALUES
(10001,	1234567891006),
(10002,	1234567891010),
(10003,	1234567891011),
(10004,	1234567891006),
(10005,	1234567891009),
(10006,	1234567891003),
(10007,	1234567891001);