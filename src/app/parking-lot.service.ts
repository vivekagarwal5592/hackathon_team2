import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parking } from './parking';
import { Observable } from 'rxjs';
import { ParkingSlot } from './parking-slot';

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {

  constructor(private http: HttpClient) { }

  getAllParkingLot(): Observable<Parking[]> {
    return this.http.get<Parking[]>("/api/parkinglot/all");
  }

  getParkingLot(id: String): Observable<Parking> {
    return this.http.get<Parking>("/api/parkinglot/id/" + id);
  }

  addParkingLot(parking: Parking) {
    return this.http.post("/api/parkinglot/add", parking);
  }

  getAllParkingSlotsForLot(parkingLotId: String): Observable<ParkingSlot> {
    return this.http.get<ParkingSlot>("/parkingLot/" + parkingLotId + "/parkingSlots");
  }
}
