export default function FormattedPrice({ value }: { value: number }) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(value / 100.0);
  };

  return <span>{formatPrice(value)}</span>;
}
