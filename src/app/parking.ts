export interface Parking {
    id: Number;
    name: String;
    address?: String;
    totalCapacity?: Number;
    availableSlots?: Number;
    parkingSlotIds?: String[];
}

// "name":"Parking Lot A",
//     "address":"Wework, Andheri, Mumbai",
//     "totalCapacity":50,
//     "parkingSlotIds":["1A", "2A"]