export class Article {
    constructor(userId, groupId, title, shortDescription, picture, longDescription, comments, likes, status, created, lastModified) {
            this.userId = userId;
            this.groupId = groupId;
            this.title = title;
            this.shortDescription = shortDescription;
            this.picture = picture;
            this.longDescription=longDescription;
            this.comments = comments;
            this.likes = likes;
            this.status = status;
            this.created = created;
            this.lastModified = lastModified;
    }
}