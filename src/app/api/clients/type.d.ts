export interface GetClientsMapResponse {
  _id: string;
  phone: string;
  address: {
    lat: number;
    lng: number;
  };
  fullName: string;
}
