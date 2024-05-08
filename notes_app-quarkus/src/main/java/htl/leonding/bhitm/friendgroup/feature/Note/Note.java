package htl.leonding.bhitm.friendgroup.feature.Note;

import java.io.Serializable;
import java.time.LocalDateTime;

public class Note implements Serializable {
    private long id;
    private String type;
    private String title;
    private String author;
    private String message;
    private LocalDateTime createdTime;
    private LocalDateTime updateTime;

    public long getID() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public String getMessage() {
        return message;
    }

    public String getType() {
        return type;
    }

    //-------------------------

    public void setID(long id) {
        this.id = id;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }

    //----------------------------

    public Note(long id, String title, String author, String type, String message, LocalDateTime createdTime, LocalDateTime updateTime) {
        setID(id);
        setAuthor(author);
        setMessage(message);
        setTitle(title);
        setType(type);
        setCreatedTime(createdTime);
        setUpdateTime(updateTime);
    }
}
