import { useContext, useMemo } from "react";
import ShopContext from "../context/ShopContext";

export const useBagCalculations = () => {
  const { bag } = useContext(ShopContext);

  const subtotal = useMemo(() => {
    if (!bag || !Array.isArray(bag)) return 0;
    return bag.reduce((total, item) => {
      if (!item) return total;
      const quantity = item.quantity || 1;
      const price =
        Number(item.newPrice) ||
        (item.productId && Number(item.productId.newPrice)) ||
        0;
      return total + price * quantity;
    }, 0);
  }, [bag]);

  const discount = useMemo(() => {
    if (!bag || !Array.isArray(bag)) return 0;
    return bag.reduce((total, item) => {
      if (!item) return total;
      const quantity = item.quantity || 1;
      const price =
        Number(item.newPrice) ||
        (item.productId && Number(item.productId.newPrice)) ||
        0;
      const oldPrice =
        Number(item.oldPrice) ||
        (item.productId && Number(item.productId.oldPrice)) ||
        0;
      return total + (oldPrice - price) * quantity;
    }, 0);
  }, [bag]);

  const shipping = subtotal > 50 ? 0 : 5;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return {
    subtotal: subtotal.toFixed(2),
    discount: discount.toFixed(2),
    shipping: shipping.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2),
  };
};
