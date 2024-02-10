CREATE PROCEDURE registerNote(
    @note_id VARCHAR(100), 
    @title VARCHAR(100), 
    @content VARCHAR(8000),
    @createdAt VARCHAR(255)
    )
AS
BEGIN 
    INSERT INTO Notes(note_id, title, content,createdAt)
    VALUES(@note_id, @title, @content,@createdAt)
END