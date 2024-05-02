import React from "react";
import { useFormStatus } from "react-dom";

export type OrderSubmitButtonProps = {
  text: string;
  value: string;
  disabled: boolean;
  className: string;
};

export default function OrderSubmitButton({
  text,
  value,
  disabled,
  className,
}: OrderSubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending || disabled}
      type="submit"
      name="paymentMethod"
      value={value}
      className={`rounded-lg p-2 disabled:text-black disabled:bg-gray-300 disabled:border-gray-500 border-b-4 ${className}`}
    >
      {text}
    </button>
  );
}
