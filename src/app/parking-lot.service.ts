import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parking } from './parking';
import { Observable } from 'rxjs';
import { ParkingSlot } from './parking-slot';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {

  constructor(private http: HttpClient) { }

  getAllParkingLot(): Observable<Parking[]> {
    return this.http.get<Parking[]>(environment.baseUrl + "/api/parkinglot/all");
  }

  getParkingLot(id: String): Observable<Parking> {
    return this.http.get<Parking>(environment.baseUrl + "/api/parkinglot/id/" + id);
  }

  addParkingLot(parking: Parking) {
    return this.http.post(environment.baseUrl + "/api/parkinglot/add", parking);
  }

  getAllParkingSlotsForLot(parkingLotId: Number): Observable<ParkingSlot[]> {
    return this.http.get<ParkingSlot[]>(environment.baseUrl + "/api/parkingLot/" + parkingLotId + "/parkingSlots");
  }
}
