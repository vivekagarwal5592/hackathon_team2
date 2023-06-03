export interface ParkingSlot {
    id: Number;
    number: String;
    isAvailable: Boolean;
    engagedFor: Number;
    userId: String;
}

// "id":101,
//         "number":"A1",
//         "isAvailable":true,
//         "engagedFor": 150