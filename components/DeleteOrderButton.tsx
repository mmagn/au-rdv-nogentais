"use client";

import { updateOrder } from "@/actions/orders";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Order } from "@prisma/client";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export type DeleteOrderButtonProps = {
  order: Order;
};

export default function DeleteOrderButton({ order }: DeleteOrderButtonProps) {
  const { toast } = useToast();

  let [isPending, startTransition] = useTransition();

  const toggleDelete = () => {
    startTransition(async () => {
      await updateOrder(order.id, !order.deletedAt);

      toast({
        description: !order.deletedAt
          ? "❌ Commande supprimée"
          : "✅ Commande restaurée",
      });
    });
  };

  return (
    <Button variant="outline" onClick={toggleDelete} disabled={isPending}>
      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!order.deletedAt ? "Supprimer la commande" : "Annuler la suppression"}
    </Button>
  );
}
