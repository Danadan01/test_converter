export const getResult = (
  inputFrom: React.RefObject<HTMLInputElement>,
  inputTo: React.RefObject<HTMLInputElement>,
  rate: number
) => {
  if (!inputFrom.current || !inputTo.current) return;
  const inputValueFrom = inputFrom.current.value;

  const result = (+inputValueFrom * rate).toFixed(3);
  inputTo.current.value = result;
};