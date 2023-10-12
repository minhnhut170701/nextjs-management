import ProductSlice from "@/feature/Product/ProductSlice";
import UserSlice from "@/feature/User/UserSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    product: ProductSlice,
    user: UserSlice
  },
});
