export interface Currency {
  symbol: string,
  name: string
};

export interface CurrenciesActionResponse {
  currencies: Array<Currency>|null,
  message: string|null,
};