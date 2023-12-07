import { ForwardedRef, forwardRef} from "react";
import { Currencies } from "../helpers/getListQuotes";

type CurrencyInputProps = {
  list: Currencies | null;
  setCurrency: (arg: string) => void;
  handleResult: () => void;
};

export const CurrencyInput = forwardRef(function CurrencyInput(
  { list, setCurrency, handleResult}: CurrencyInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {

   const getSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    setCurrency(target.value);
  };

  const optionList = list!.map((currency, i) => (
    <option key={i} value={currency}>
      {currency}
    </option>
  ));

  return (
    <div className="flex flex-col items-center gap-5 border-2 border-black rounded-md p-5">
      <select
        name="currencies"
        className="bg-slate-900 outline outline-1 outline-indigo-500 rounded-md p-1 cursor-pointer text-stone-400 hover:outline-indigo-700"
        onChange={getSelect}
      >
        <option value="">--Please select currency--</option>
        {optionList}
      </select>
      <label className="text-stone-400">Enter the amount:</label>
      <input
        ref={ref}
        type="text"
        name="currencyInput"
        className="bg-slate-900 rounded-md px-3 py-1 text-stone-400 outline outline-1 outline-indigo-500 hover:outline-indigo-700"
        onChange={handleResult}
      />
    </div>
  );
});
