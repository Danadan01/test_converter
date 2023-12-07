import { useState, useRef } from "react";
import { Header } from "./components/header";
import { CurrencyInput } from "./components/currencyInput";
import { getResult } from "./helpers/getResult";
import { useFetchListQuotes } from "./hooks/useFetchListQuotes";
import { useFetchRate } from "./hooks/useFetchRate";

function App() {
  const [firstSelectValue, setFirstSelectValue] = useState<string>("");
  const [secondSelectValue, setSecondSelectValue] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  const firstInput = useRef<HTMLInputElement>(null);
  const secondInput = useRef<HTMLInputElement>(null);

  const { list, listError } = useFetchListQuotes();
  const { rate, rateError } = useFetchRate(
    [firstSelectValue, secondSelectValue],
    [firstInput, secondInput]
  );

  listError && setError(listError);
  rateError && setError(rateError);

  const handleResultFrom = () => {
    getResult(firstInput, secondInput, rate);
  };
  const handleResultTo = () => {
    getResult(secondInput, firstInput, 1 / rate);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-800">
      <Header />
      <div className="flex justify-center items-center gap-16 h-screen">
        {error && <div className="text-red-600">{error.message}</div>}
        {!list && !error && <div className="text-stone-400">Loading...</div>}

        {list && !error && (
          <>
            <CurrencyInput
              list={list}
              setCurrency={setFirstSelectValue}
              ref={firstInput}
              handleResult={handleResultFrom}
            />
            <CurrencyInput
              list={list}
              setCurrency={setSecondSelectValue}
              ref={secondInput}
              handleResult={handleResultTo}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
