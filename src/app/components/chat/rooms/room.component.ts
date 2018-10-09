import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../../../models/room';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Messages } from '../../../Models/messages';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chatroom',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  rooms: Observable<Room[]>;
  roomContext: AngularFireList<Room>;
  messageCount: number;
  @Input()
  messageLength: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fireDb: AngularFireDatabase
  ) {
    this.roomContext = this.fireDb.list('/rooms');
  }

  ngOnInit() {
    this.rooms = this.roomContext.valueChanges();
  }

  isActive(selectedRoomName?: string): boolean {
    return (
      this.activatedRoute.snapshot.paramMap.get('name').toLowerCase() ===
      selectedRoomName.toLowerCase()
    );
  }

  addRoom(channelName: string) {
    this.roomContext.push(new Room(channelName));
  }
}
