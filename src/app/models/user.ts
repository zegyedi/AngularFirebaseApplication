export class ChatUser {
  uid: string;
  displayName: string;
  email: string;
  photo_source: string;

  constructor(uid: string, name: string, email: string, photo: string) {
    this.uid = uid;
    this.displayName = name;
    this.email = email;
    this.photo_source = photo;
  }
}
