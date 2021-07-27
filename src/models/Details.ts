export interface Details {
  symbol: string,
  name: string,
  price: number,
  market_cap: number,
  market_cap_dominance: number
};

export interface DetailsActionResponse {
  symbol: string|null,
  name: string|null,
  price: number|null,
  market_cap: number|null,
  market_cap_dominance: number|null,
  message: string|null
};