import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParkingLotService } from '../parking-lot.service';

@Component({
  selector: 'app-parking-slot',
  templateUrl: './parking-slot.component.html',
  styleUrls: ['./parking-slot.component.scss']
})
export class ParkingSlotComponent implements OnInit {

  isSeatSelected: boolean = false;
  seatConfig: any = null;
  seatmap: any = [];
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

  parkingLotId: Number = 0;

  constructor(public dialogRef: MatDialogRef<ParkingSlotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    public parkingLotService: ParkingLotService) {
    this.parkingLotId = this.data.parkingLotId;
  }

  ngOnInit(): void {
    //Process a simple bus layout
    console.log("-------- : " + this.parkingLotId)
    this.parkingLotService.getAllParkingSlotsForLot(this.parkingLotId)
      .subscribe(response => {
        console.log(response)
        // response.forEach(eachElement => {

        // })
      })
    this.seatConfig = [
      {
        seat_map: [
          {
            seat_label: "1",
            layout: "g___g___g___g"
          },
          {
            seat_label: "2",
            layout: "g___g___g___g"
          },
          {
            seat_label: "3",
            layout: "g___g___g___g"
          },
          {
            seat_label: "4",
            layout: "g___g___g___g"
          },
          {
            seat_label: "5",
            layout: "g___g___g___g"
          },
          {
            seat_label: "6",
            layout: "g___g___g___g"
          },
          {
            seat_label: "7",
            layout: "g___g___g___g"
          },
          {
            seat_label: "8",
            layout: "g___g___g___g"
          }
        ]
      }
    ];
    this.processSeatChart(this.seatConfig);
    this.blockSeats("25");
  }

  public processSeatChart(map_data: any[]) {
    if (map_data.length > 0) {
      var seatNoCounter = 1;
      for (let __counter = 0; __counter < map_data.length; __counter++) {
        var row_label = "";
        var item_map = map_data[__counter].seat_map;

        //Get the label name and price
        row_label = "Row " + item_map[0].seat_label + " - ";
        if (item_map[item_map.length - 1].seat_label != " ") {
          row_label += item_map[item_map.length - 1].seat_label;
        } else {
          row_label += item_map[item_map.length - 2].seat_label;
        }

        item_map.forEach((map_element: { seat_label: string; layout: string; }) => {
          var mapObj: any = {
            seatRowLabel: map_element.seat_label,
            seats: [],
            seatPricingInformation: row_label
          };
          row_label = "";
          var seatValArr = map_element.layout.split("");
          if (this.seatChartConfig.newSeatNoForRow) {
            seatNoCounter = 1; //Reset the seat label counter for new row
          }
          var totalItemCounter = 1;
          seatValArr.forEach((item: string) => {
            var seatObj: any = {
              key: map_element.seat_label + "_" + totalItemCounter,
              status: "available"
            };

            if (item != "_") {
              seatObj["seatLabel"] =
                map_element.seat_label + " " + seatNoCounter;
              if (seatNoCounter < 10) {
                seatObj["seatNo"] = "0" + seatNoCounter;
              } else {
                seatObj["seatNo"] = "" + seatNoCounter;
              }

              seatNoCounter++;
            } else {
              seatObj["seatLabel"] = "";
            }
            totalItemCounter++;
            mapObj["seats"].push(seatObj);
          });
          this.seatmap.push(mapObj);
        });
      }
    }
  }

  public selectSeat(seatObject: any) {
    if (!this.isSeatSelected) {
      console.log("Seat to block: ", seatObject);
      if (seatObject.status == "available") {
        seatObject.status = "booked";
        this.cart.selectedSeats.push(seatObject.seatLabel);
        this.cart.seatstoStore.push(seatObject.key);
        this.cart.totalamount += seatObject.price;
        this.isSeatSelected = true;
        this._snackBar.open("Your car parking has been booked for next 3 hours - " + seatObject.key, "close");
        this.dialogRef.close();
      } else if ((seatObject.status = "booked")) {
        seatObject.status = "available";
        var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
        if (seatIndex > -1) {
          this.cart.selectedSeats.splice(seatIndex, 1);
          this.cart.seatstoStore.splice(seatIndex, 1);
          this.cart.totalamount -= seatObject.price;
        }
      }
    }
  }

  public blockSeats(seatsToBlock: string) {
    if (seatsToBlock != "") {
      var seatsToBlockArr = seatsToBlock.split(",");
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat = seatsToBlockArr[index] + "";
        var seatSplitArr = seat.split("_");
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              seatObj["status"] = "unavailable";
              this.seatmap[index2]["seats"][
                parseInt(seatSplitArr[1]) - 1
              ] = seatObj;
              break;
            }
          }
        }
      }
    }
  }
}
