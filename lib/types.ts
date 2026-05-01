export interface MandiPrice {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  min_price: string;
  max_price: string;
  modal_price: string;
  arrival_date: string;
}

export interface AgmarknetResponse {
  total: number;
  count: number;
  limit: number;
  offset: number;
  records: MandiPrice[];
}

export interface MSPCrop {
  name: string;
  msp: number;
  season: "Kharif" | "Rabi";
  unit: string;
}

export interface CommoditySummary {
  commodity: string;
  avgModal: number;
  minPrice: number;
  maxPrice: number;
  markets: number;
  states: number;
  date: string;
}
