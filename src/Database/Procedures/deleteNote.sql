CREATE OR ALTER PROCEDURE deleteNote(@note_id VARCHAR(100))
AS
BEGIN
    UPDATE Notes SET isDeleted = 1 WHERE note_id  = @note_id 
END