export interface NasaData {
  name: string;
  id: string;
  nametype: string;
  recclass: string;
  mass: string;
  fall: string;
  year: Date;
  reclat: string;
  reclong: string;
  geolocation: Geolocation;
}

export interface Geolocation {
    type: string;
    coordinates: [number, number];
}
