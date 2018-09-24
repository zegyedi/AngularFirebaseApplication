export class Messages {
    userName: string;
    userPhoto: string;
    text: string;

    constructor(userName: string, userPhoto: string, message: string) {
        this.userName = userName;
        this.userPhoto = userPhoto;
        this.text = message;
    }
}

