CREATE TABLE IF NOT EXISTS Sessions (SessionId TEXT, UserEmail TEXT);
INSERT INTO Sessions (SessionId, UserEmail) VALUES ("SessionId1", "alanj@alanj.live");

-- DELETE Tokens if exists
DROP TABLE IF EXISTS Tokens;
CREATE TABLE IF NOT EXISTS Tokens (Issuer TEXT, TimeStep INTEGER, EncryptedSecret TEXT, Algorithm TEXT, Digits INTEGER);
