export class Messages {
    userName: string;
    userPhoto: string;
    text: string;
    createdDate: string;

    constructor(userName: string, userPhoto: string, message: string) {
        this.userName = userName;
        this.userPhoto = userPhoto;
        this.text = message;
        this.createdDate =  new Date().toLocaleString();
    }
}

