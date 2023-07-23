export function formmateCurrencyBRL(price: number) {
  const valueInBRL = price / 100;

  const formatCoin = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatCoin.format(valueInBRL);
}
