import { useState, useEffect } from "react";
import { Currencies } from "../helpers/getListQuotes";
import { getListQuotes } from "../helpers/getListQuotes";

export const useFetchListQuotes = () => {
  const [list, setList] = useState<Currencies>();
  const [listError, setListError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchListQuotes = async () => {
      const listQuotesArr = await getListQuotes();
      setList(listQuotesArr);
    };

    fetchListQuotes().catch((err) => setListError(err));
  }, []);

  return {list, listError}
}