import { axiosClient } from "./axiosConfig.js";

export const fetchProducts = async () => {
    const res = await axiosClient.get("/products");
    return res.data;
}

export const addToCart = async ({ productId, cartId }) => {
  const res = await axiosClient.post("/cart", { productId, cartId });
  return res.data;
};

export const fetchCartItems = async (id) => {
  const res = await axiosClient.get(`/cart/${id}`);
  return res.data;
}

export const updateItemQuantity = async ({ cartId, productId, quantity }) => {
  const res = await axiosClient.patch("/cart", { cartId, productId, quantity  });
  return res.data.cart;
};

export const removeCartItem = async ({ cartId, productId }) => {
  const res = await axiosClient.delete(`/cart/${cartId}/${productId}`);
  return res.data;
};

export const checkoutOrder = async ({ name, email,total }) => {
  const res = await axiosClient.post("/checkout", { name, email,total});
  return res.data;
};