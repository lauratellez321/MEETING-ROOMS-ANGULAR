import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request/request-service.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  rooms: any[any];
  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.requestService.getRooms().subscribe((response) => {
      this.rooms = JSON.stringify(response);
    });
  }
}
