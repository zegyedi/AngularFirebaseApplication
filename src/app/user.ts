

export class ChatUser {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;

    constructor(id: string, name: string, email: string, photo: string) {
       this.uid = id;
       this.displayName = name;
       this.email = email;
       this.photoURL = photo;
    }
}
