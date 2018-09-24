

export class ChatUser {
    uid: string;
    displayName: string;
    email: string;
    photo_source: string;

    constructor(id: string, name: string, email: string, photo: string) {
       this.uid = id;
       this.displayName = name;
       this.email = email;
       this.photo_source = photo;
    }
}
