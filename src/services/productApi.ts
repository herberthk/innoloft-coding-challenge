import { Configuration, Product, Trl } from "@/interface";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://api-test.innoloft.com";

const createRequest = (url: string) => ({ url });

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const productApi = createApi({
  reducerPath: "productApi",
  // tagTypes: ["Product"],
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    getProduct: builder.query<Product, string>({
      query: (id: string) => createRequest(`/product/${id}/`),
    }),

    getConfiguration: builder.query<Configuration, string>({
      query: (id: string) => createRequest(`/configuration/${id}/`),
    }),

    getTrl: builder.query<Trl[], void>({
      query: () => createRequest(`/trl/`),
    }),

    editProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: `/product/6781/`,
        method: "PUT",
        body,
      }),
      // invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useEditProductMutation,
  useGetConfigurationQuery,
  useGetTrlQuery,
} = productApi;
