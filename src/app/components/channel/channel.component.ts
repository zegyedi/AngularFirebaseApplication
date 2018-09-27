import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../../models/channel';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  channels: Observable<Channel[]>;
  channelContext: AngularFireList<Channel>;


  constructor(private activatedRoute: ActivatedRoute, private fireDb: AngularFireDatabase) {
    this.channelContext = this.fireDb.list('/channels');
   }

  ngOnInit() {
    this.channels = this.channelContext.valueChanges();
  }

  isActive(channel?: string): boolean {
    return this.activatedRoute.snapshot.paramMap.get('name').toLowerCase() === channel.toLowerCase();
  }

  addChannel(channelName: string)
  {
    this.channelContext.push(new Channel(channelName));

  }


}
