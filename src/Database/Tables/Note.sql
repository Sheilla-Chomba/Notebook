CREATE  TABLE Notes(
    note_id VARCHAR(100) NOT NULL, 
    title VARCHAR(100) NOT NULL, 
    content VARCHAR(8000) NULL, 
    createdAt VARCHAR(255) NULL, 
    isDeleted BIT Default 0
)

SELECT * FROM Notes;

UPDATE Notes SET isDeleted = 0