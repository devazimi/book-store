export const useLogic = () => {
  const toPersianNumber = (input: number | string) => {
    return String(input).replace(/[0-9]/g, (d) => {
      const digit = parseInt(d, 10);
      return "۰۱۲۳۴۵۶۷۸۹"[digit];
    });
  };

  const formatPrice = (input: number) => {
    const parts = input.toString().split(".");

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");
  };

  const dollarToToman = (input: number) => {
    let tomanAmount = input * 180000;

    tomanAmount = Math.round(tomanAmount);

    const formatted = formatPrice(tomanAmount);

    const persianFormatted = toPersianNumber(formatted);

    return persianFormatted;
  };

  return { dollarToToman, toPersianNumber };
};
