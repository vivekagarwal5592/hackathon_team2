import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Parking } from '../parking';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ParkingSlotComponent } from '../parking-slot/parking-slot.component';

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ParkingLotComponent implements OnInit {

  allParkingLots: Parking[] = [{"id":1,"name":"Parking Lot A","address":"Wework, Andheri, Mumbai","totalCapacity":50,"availableSlots":50},{"id":2,"name":"Oberoi Mall","address":"Goregaon","totalCapacity":10,"availableSlots":10},{"id":3,"name":"Inorbit","address":"Malad","totalCapacity":10,"availableSlots":10},{"id":1,"name":"Parking Lot A","address":"Wework, Andheri, Mumbai","totalCapacity":50,"availableSlots":50},{"id":2,"name":"Oberoi Mall","address":"Goregaon","totalCapacity":10,"availableSlots":10},{"id":3,"name":"Inorbit","address":"Malad","totalCapacity":10,"availableSlots":10},{"id":1,"name":"Parking Lot A","address":"Wework, Andheri, Mumbai","totalCapacity":50,"availableSlots":50},{"id":2,"name":"Oberoi Mall","address":"Goregaon","totalCapacity":10,"availableSlots":10},{"id":3,"name":"Inorbit","address":"Malad","totalCapacity":10,"availableSlots":10},{"id":1,"name":"Parking Lot A","address":"Wework, Andheri, Mumbai","totalCapacity":50,"availableSlots":50},{"id":2,"name":"Oberoi Mall","address":"Goregaon","totalCapacity":10,"availableSlots":10},{"id":3,"name":"Inorbit","address":"Malad","totalCapacity":10,"availableSlots":10},{"id":1,"name":"Parking Lot A","address":"Wework, Andheri, Mumbai","totalCapacity":50,"availableSlots":50},{"id":2,"name":"Oberoi Mall","address":"Goregaon","totalCapacity":10,"availableSlots":10},{"id":3,"name":"Inorbit","address":"Malad","totalCapacity":10,"availableSlots":10},{"id":1,"name":"Parking Lot A","address":"Wework, Andheri, Mumbai","totalCapacity":50,"availableSlots":50},{"id":2,"name":"Oberoi Mall","address":"Goregaon","totalCapacity":10,"availableSlots":10},{"id":3,"name":"Inorbit","address":"Malad","totalCapacity":10,"availableSlots":10},{"id":1,"name":"Parking Lot A","address":"Wework, Andheri, Mumbai","totalCapacity":50,"availableSlots":50},{"id":2,"name":"Oberoi Mall","address":"Goregaon","totalCapacity":10,"availableSlots":10},{"id":3,"name":"Inorbit","address":"Malad","totalCapacity":10,"availableSlots":10}];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getAllParkingSlots(parkingLotId: Number) {
    console.log(parkingLotId);
    this.dialog.open(ParkingSlotComponent);
  }
}
