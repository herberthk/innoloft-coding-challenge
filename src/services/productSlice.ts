import { AppDispatch } from "@/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Tag = {
  id: string;
  name: string;
}[];

export interface ProductState {
  name: string;
  description: string;
  videoURL: string;
  categories: Tag;
  businessModels: Tag;
  trl: string;
  costs: string;
}

const initialState: ProductState = {
  businessModels: [],
  categories: [],
  costs: "",
  description: "",
  name: "",
  trl: "",
  videoURL: "",
};

const product = createSlice({
  name: "Product",
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    updateVideoUrl: (state, action: PayloadAction<string>) => {
      state.videoURL = action.payload;
    },
    updateCost: (state, action: PayloadAction<string>) => {
      state.costs = action.payload;
    },
    updateTrl: (state, action: PayloadAction<string>) => {
      state.trl = action.payload;
    },
    updateCategories: (state, action: PayloadAction<Tag>) => {
      state.categories = action.payload;
    },
    updateBusinessModals: (state, action: PayloadAction<Tag>) => {
      state.businessModels = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateBusinessModals,
  updateCategories,
  updateCost,
  updateDescription,
  updateName,
  updateTrl,
  updateVideoUrl,
} = product.actions;

export default product.reducer;

export const updateDescriptionAsync =
  (val: string) => (dispatch: AppDispatch) => {
    setTimeout(() => {
      dispatch(updateDescription(val));
    }, 100);
  };
