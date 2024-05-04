"use client";

import { updateOrder } from "@/actions/orders";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Order } from "@prisma/client";

export type DeleteOrderButtonProps = {
  order: Order;
};

export default function DeleteOrderButton({ order }: DeleteOrderButtonProps) {
  const { toast } = useToast();

  const toggleDelete = async () => {
    await updateOrder(order.id, !order.deletedAt);

    toast({
      description: !order.deletedAt
        ? "❌ Commande supprimée"
        : "✅ Commande restaurée",
    });
  };

  return (
    <Button variant="outline" onClick={toggleDelete}>
      {!order.deletedAt ? "Supprimer la commande" : "Annuler la suppression"}
    </Button>
  );
}
