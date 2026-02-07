export interface GetClientsMapResponse {
  _id: string;
  phone: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  fullName: string;
}
