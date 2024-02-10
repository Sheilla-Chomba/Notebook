CREATE OR ALTER PROCEDURE updateNote(
    @note_id VARCHAR(100), 
    @title VARCHAR(100), 
    @content VARCHAR(8000),
    @createdAt VARCHAR(255))
AS
BEGIN
    UPDATE Notes SET
        title=@title, 
        content=@content, 
        createdAt=@createdAt
    WHERE note_id = @note_id
END