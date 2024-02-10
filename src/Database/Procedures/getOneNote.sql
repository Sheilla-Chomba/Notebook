CREATE OR ALTER PROCEDURE getOneNote(@note_id VARCHAR(100))
AS
BEGIN   
    SELECT * FROM Notes WHERE note_id = @note_id 
END