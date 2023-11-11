BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Teams" (
	"team_id"	INTEGER NOT NULL,
	"team_name"	TEXT NOT NULL,
	PRIMARY KEY("team_id")
);
CREATE TABLE IF NOT EXISTS "Boards" (
	"board_id"	INTEGER NOT NULL,
	"round_id"	INTEGER NOT NULL,
	"result"	TEXT NOT NULL,
	PRIMARY KEY("board_id"),
	FOREIGN KEY("round_id") REFERENCES "Rounds"("round_id")
);
CREATE TABLE IF NOT EXISTS "Scores" (
	"score_id"	INTEGER NOT NULL,
	"team_id"	INTEGER NOT NULL,
	"total_VP"	REAL NOT NULL,
	PRIMARY KEY("score_id"),
	FOREIGN KEY("team_id") REFERENCES "Teams"("team_id")
);
CREATE TABLE IF NOT EXISTS "Players" (
	"player_id"	INTEGER NOT NULL,
	"team_id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"sex"	TEXT NOT NULL,
	"contact"	INTEGER NOT NULL,
	PRIMARY KEY("player_id"),
	FOREIGN KEY("team_id") REFERENCES "Teams"("team_id")
);
CREATE TABLE IF NOT EXISTS "Rounds" (
	"round_id"	INTEGER NOT NULL,
	"VP"	REAL NOT NULL,
	PRIMARY KEY("round_id")
);
INSERT INTO "Teams" VALUES (1,'tiger');
INSERT INTO "Teams" VALUES (2,'Lord of ring');
INSERT INTO "Teams" VALUES (3,'Experts');
INSERT INTO "Teams" VALUES (4,'NeverLose');
INSERT INTO "Boards" VALUES (1,1,'3NT+1');
INSERT INTO "Boards" VALUES (2,1,'1S+3');
INSERT INTO "Boards" VALUES (3,1,'2S=');
INSERT INTO "Boards" VALUES (4,1,'6D-1');
INSERT INTO "Boards" VALUES (5,2,'6D+1');
INSERT INTO "Boards" VALUES (6,2,'3D+1');
INSERT INTO "Boards" VALUES (7,2,'3H+3');
INSERT INTO "Boards" VALUES (8,2,'3H+3');
INSERT INTO "Boards" VALUES (9,3,'4H=');
INSERT INTO "Boards" VALUES (10,3,'4H-1');
INSERT INTO "Boards" VALUES (11,3,'2NT-1');
INSERT INTO "Boards" VALUES (12,3,'2NT+1');
INSERT INTO "Scores" VALUES (1,4,32.2);
INSERT INTO "Scores" VALUES (2,3,41.2);
INSERT INTO "Scores" VALUES (3,2,45.7);
INSERT INTO "Scores" VALUES (4,1,38.9);
INSERT INTO "Players" VALUES (1,1,'Jim','F',4124198888);
INSERT INTO "Players" VALUES (2,1,'Jerry','M',4124198881);
INSERT INTO "Players" VALUES (3,1,'Max','M',4124198822);
INSERT INTO "Players" VALUES (4,1,'Carol','M',4124198811);
INSERT INTO "Players" VALUES (5,2,'Carol','M',4124298811);
INSERT INTO "Players" VALUES (6,2,'Linda','F',4124298211);
INSERT INTO "Players" VALUES (7,2,'Yousef','F',4124298211);
INSERT INTO "Players" VALUES (8,2,'Irvine','F',4124298201);
INSERT INTO "Players" VALUES (9,2,'Ire','F',4124218201);
INSERT INTO "Players" VALUES (10,2,'Ire','F',4122218201);
INSERT INTO "Players" VALUES (11,3,'AA','F',4122238201);
INSERT INTO "Players" VALUES (12,3,'BA','F',4122231201);
INSERT INTO "Players" VALUES (13,3,'Lee','M',4122231211);
INSERT INTO "Players" VALUES (14,3,'Lim','M',4122231210);
INSERT INTO "Players" VALUES (15,4,'Neda','M',4122231210);
INSERT INTO "Players" VALUES (16,4,'Ned','M',4122231260);
INSERT INTO "Players" VALUES (17,4,'Nemar','M',4122231280);
INSERT INTO "Players" VALUES (18,4,'Fima','M',4122231281);
INSERT INTO "Rounds" VALUES (1,10.31);
INSERT INTO "Rounds" VALUES (2,9.69);
INSERT INTO "Rounds" VALUES (3,19.64);
COMMIT;