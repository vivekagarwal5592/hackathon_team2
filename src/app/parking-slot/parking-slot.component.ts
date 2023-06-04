import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParkingLotService } from '../parking-lot.service';
import { UserStateService } from '../user-state.service';

@Component({
  selector: 'app-parking-slot',
  templateUrl: './parking-slot.component.html',
  styleUrls: ['./parking-slot.component.scss']
})
export class ParkingSlotComponent implements OnInit {

  isSeatSelected: boolean = false;
  seatConfig: any = null;
  // seatmap: any = [];
  seats: any[] = [];
  seatChartConfig = {
    showRowsLabel: false,
    showRowWisePricing: false,
    newSeatNoForRow: false
  };
  cart: any = {
    selectedSeats: [],
    seatstoStore: [],
    totalamount: 0,
    cartId: "",
    eventId: 0
  };

  title = "seat-chart-generator";
  index = 0;

  parkingLotId: Number = 0;

  constructor(public dialogRef: MatDialogRef<ParkingSlotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    public parkingLotService: ParkingLotService,
    public userStateService: UserStateService) {
    this.parkingLotId = this.data.parkingLotId;
  }

  userId: String | null | undefined = "";

  ngOnInit(): void {
    //Process a simple bus layout
    this.userStateService.getUserDetails().subscribe(res => {
      if (res == null || res.id == null) {
        this.userId = localStorage.getItem("userId");
      } else {
        this.userId =  res.id;
      }
      
    })
    console.log("-------- : " + this.parkingLotId)
    this.parkingLotService.getAllParkingSlotsForLot(this.parkingLotId)
      .subscribe(response => {
        console.log(response)
        response.forEach(eachElement => {
            this.seats.push(eachElement);
        })
      })
   }


  public selectSeat(seatObject: any) {
    if (!this.isSeatSelected) {
      if (seatObject.status == "available") {
        seatObject.status = "booked";
        this.cart.selectedSeats.push(seatObject.seatLabel);
        this.cart.seatstoStore.push(seatObject.key);
        this.isSeatSelected = true;
        
      } 
    }
  }

  bookParking(parkingSlotId: Number, isAvailable: boolean) {
    
    if (isAvailable) {
      this.parkingLotService.parkVehicle(Number(this.userId), parkingSlotId, 150)
      .subscribe((response: any) => {
          if (response?.error == null) {
            this._snackBar.open("Your car parking has been booked", "close");
            this.dialogRef.close();
          } else {
            this._snackBar.open(response.error, "close");
          }
      });
    } else {
      this.parkingLotService.unParkVehicle(parkingSlotId)
      .subscribe((response: any) => {
          if (response?.error == null) {
            this._snackBar.open("You have successfully unparked your vehicle", "close");
            this.dialogRef.close();
          } else {
            this._snackBar.open(response.error, "close");
          }
      });
    }
    
    
  }
}
