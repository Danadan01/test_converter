import { useState, useEffect } from "react";
import { getRate } from "../helpers/getRate";


export const useFetchRate = (selectValues: string[], inputRefs: React.RefObject<HTMLInputElement>[]) => {
  const [rate, setRate] = useState<number>(0);
  const [rateError, setRateError] = useState<Error | null>(null);
  const [selectValue1, selectValue2] = selectValues;
  const [inputRef1, inputRef2] = inputRefs;

  useEffect(() => {
    if (!selectValue1 || !selectValue2) return;
    if (inputRef1.current && inputRef2.current) {
      inputRef1.current.value = "";
      inputRef2.current.value = "";
    }

    const fetchRates = async () => {
      const fetchedRate = await getRate(selectValues[0], selectValues[1]);
      if(fetchedRate) setRate(fetchedRate);
    };

    fetchRates().catch((err) => setRateError(err));
  }, [selectValue1, selectValue2]);

  return {rate, rateError}
}