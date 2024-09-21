import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Room {
  _id: string;
  nombre_sala: string;
  ubicacion: string;
  capacidad: number;
  recursos_disponibles: string[];
  estado: boolean;
}

export interface Booking {
  _id: string;
  usuario: string;
  fecha: Date;
  hora: string;
  estado: boolean;
  datos_sala: Room;
}

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private httpClient: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(environment.apiGetRoom);
  }
  newRoom(roomData: any) {
    return this.httpClient.post(environment.apiPostRoom, roomData);
  }
  updateRoom() {
    return this.httpClient.put(environment.apiPutRoom, {});
  }
  deleteRoom() {
    return this.httpClient.delete(environment.apiDeleteRoom);
  }

  getBooking(): Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(environment.apiGetBooking);
  }

  newBooking(bookingData: any) {
    return this.httpClient.post(environment.apiPostBooking, bookingData);
  }
}
