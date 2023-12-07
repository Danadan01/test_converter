import { options } from "../constans/options.constants";
import { listQuotesUrl } from "../constans/listQuotesUrl.constants";

export type Currencies = string[];

export const getListQuotes = async (): Promise<Currencies | undefined> => {
  const res = await fetch(listQuotesUrl, options);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(`Something went wrong. Error status: ${res.status}`);
  }
};
