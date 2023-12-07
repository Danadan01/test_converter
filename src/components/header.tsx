import { useEffect, useState } from "react";
import { getRate } from "../helpers/getRate";

export const Header = () => {
  const [usdValue, setUsdValue] = useState<string>("");
  const [eurValue, setEurValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      const usdToUahRate = await getRate("USD", "UAH");
      const eurToUahRate = await getRate("EUR", "UAH");

      if (!usdToUahRate || !eurToUahRate) return new Error('Something went wrong!');

      setUsdValue(usdToUahRate.toFixed(3));
      setEurValue(eurToUahRate.toFixed(3));
    };

    fetchRates()
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err);
        setLoading(false);
      });

  }, []);

  return (
    <div className="bg-gray-900 max-w-full h-20 rounded-b-sm flex justify-around items-center">
      {loading && <div className="text-white">Loading...</div>}
      {error && <div className="text-red-600">{error.message}</div>}

      {!loading && !error && (
        <>
          <div className="text-white">1 USD equals: {usdValue} UAH</div>
          <div className="text-white">1 EUR equals: {eurValue} UAH</div>
        </>
      )}
    </div>
  );
};
