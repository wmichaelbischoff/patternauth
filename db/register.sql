INSERT INTO account ( username, password )
VALUES ( ${username}, ${password} );

SELECT * FROM account
WHERE username = ${username};