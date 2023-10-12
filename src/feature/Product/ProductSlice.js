import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CommentService } from "./ProductService";

const initialState = {
  data: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  isDelete: false,
  message: "",
};

export const addProduct = createAsyncThunk(
  "product/add",
  async (productData, thunkAPI) => {
    try {
      return await CommentService.createProduct(productData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("lỗi nè: ", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/all",
  async (_, thunkAPI) => {
    try {
      const res = await CommentService.fetchProduct();
      return res;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("lỗi nè: ", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/remove",
  async (productId, thunkAPI) => {
    try {
      return await CommentService.deleteProduct(productId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("lỗi nè: ", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const CommentSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isDelete = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default CommentSlice.reducer;
