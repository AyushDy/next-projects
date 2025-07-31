// @ts-nocheck

export const getCartItems = () => {
  try {
    if (typeof window === "undefined") return [];
    const stored = sessionStorage.getItem("guestCart") || [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const getCartCount = (items) => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};

export const saveCartItems = (items) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("guestCart", JSON.stringify(items));
};

export const getCartSubTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
