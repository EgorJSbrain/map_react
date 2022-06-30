export type AddressType = {
  "ISO3166-2-lvl4": string;
  city: string;
  country: string;
  country_code: string;
  county: string;
  state: string;
  state_district?: string;
  suburb?: string;
  village?: string;
  leisure?: string;
  town?: string;
  "ISO3166-2-lvl6"?: string;
};

export type PlaceType = {
  address: AddressType;
  boundingbox: string[];
  display_name: string;
  lat: string;
  licence: string;
  lon: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  icon?: string;
  importance?: number;
  class?: string;
  type?: string;
};
