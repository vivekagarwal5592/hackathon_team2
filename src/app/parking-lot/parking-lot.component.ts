import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Parking } from '../parking';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ParkingSlotComponent } from '../parking-slot/parking-slot.component';
import { UserStateService } from '../user-state.service';
import { ParkingLotService } from '../parking-lot.service';

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ParkingLotComponent implements OnInit {

  allParkingLots: Parking[] = [];

  constructor(public dialog: MatDialog,
    public userStateService: UserStateService,
    public parkingLotService: ParkingLotService) { }

  ngOnInit(): void {
    this.userStateService.setIsUserLoggedIn(true);
    this.parkingLotService.getAllParkingLot()
    .subscribe((each) => {
      each.forEach(eachElement => {
        this.allParkingLots.push(eachElement);
      });
    })
  }

  getAllParkingSlots(parkingLotId: Number) {
    console.log(parkingLotId);
    this.dialog.open(ParkingSlotComponent, {width: "50%", data: {"parkingLotId": parkingLotId}});
  }
}
