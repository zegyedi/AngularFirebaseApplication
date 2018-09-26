export class Messages {
    userName: string;
    userPhoto: string;
    text: string;
    createdDate: string;
    channelName: string;

    constructor(userName: string, userPhoto: string, message: string, channelName: string) {
        this.userName = userName;
        this.userPhoto = userPhoto;
        this.text = message;
        this.createdDate =  new Date().toLocaleString();
        this.channelName = channelName;
    }
}

