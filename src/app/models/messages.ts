export class Messages {
  userName: string;
  userPhoto: string;
  text: string;
  createdDate: string;
  roomName: string;
  fileDownloadUrl: string;

  constructor(
    _userName: string,
    _userPhoto: string,
    _message: string,
    _roomName: string,
    _fileDownloadUrl: string = null
  ) {
    this.userName = _userName;
    this.userPhoto = _userPhoto;
    this.text = _message;
    this.createdDate = new Date().toLocaleString();
    this.roomName = _roomName;
    this.fileDownloadUrl = _fileDownloadUrl;
  }
}
