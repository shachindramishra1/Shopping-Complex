const INR_EXCHANGE_RATE = 83;

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatPrice(value) {
  return inrFormatter.format(value * INR_EXCHANGE_RATE);
}
