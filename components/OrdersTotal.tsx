import FormattedPrice from "@/components/FormattedPrice";
import React from "react";

export type OrdersTotalProps = {
  totalCash: number;
  totalCard: number;
  totalCheck: number;
};

export default function OrdersTotal({
  totalCash,
  totalCard,
  totalCheck,
}: OrdersTotalProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <p className="flex-1">
        <span>Total espèces&nbsp;:&nbsp;</span>
        <FormattedPrice value={totalCash} />
      </p>
      <p className="flex-1">
        <span>Total carte bancaire&nbsp;:&nbsp;</span>
        <FormattedPrice value={totalCard} />
      </p>
      <p className="flex-1">
        <span>Total chèques&nbsp;:&nbsp;</span>
        <FormattedPrice value={totalCheck} />
      </p>
    </div>
  );
}
