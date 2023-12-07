import { options } from "../constans/options.constants";

export type Rate = number;

export const getRate = async (
  from: string,
  to: string
): Promise<Rate | undefined> => {
  const rateUrl: string = `https://currency-exchange.p.rapidapi.com/exchange?from=${from}&to=${to}&q=1.0`;

  if (from === to) {
    return 1;
  } else {
    const res = await fetch(rateUrl, options);
    if (!res.ok) {
      throw new Error(`Something went wrong. Error status: ${res.status}`);
    } else {
      const rate = await res.json();
      return rate;
    }
  }
};
