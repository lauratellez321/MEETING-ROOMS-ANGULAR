import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private httpClient: HttpClient) {}

  getRooms() {
    return this.httpClient.get(environment.apiGetRoom);
  }
  newRoom() {
    return this.httpClient.post(environment.apiPostRoom, {});
  }
  updateRoom() {
    return this.httpClient.put(environment.apiPutRoom, {});
  }
  deleteRoom() {
    return this.httpClient.delete(environment.apiDeleteRoom);
  }
}
