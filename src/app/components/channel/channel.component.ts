import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../../models/channel';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  channels: Channel[] = [{ name: 'Main' }, { name: 'Fun' }, { name: 'Friendship' }];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  isActive(channel?: string): boolean {
    return this.activatedRoute.snapshot.paramMap.get('name').toLowerCase() === channel.toLowerCase();
  }

  addChannel(channelName: string)
  {
    this.channels.push(new Channel(channelName));

  }


}
