import React from "react";
type Type = {
  id: number;
  name: string;
};

export type Category = {
  id?: number;
  name: string;
};

type Address = {
  country: {
    name: string;
  };
  city: {
    name: string;
  };
  street: string;
  house: string;
  zipCode: string;
  longitude: string;
  latitude: string;
};

export type Company = {
  name: string;
  logo: string;
  address: Address;
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  sex?: string;
  profilePicture: string;
  position: string;
};

export type BusinessModels = {
  id?: number;
  name: string;
};

export interface Product {
  id: number;
  name: string;
  description: string;
  picture: string;
  type: Type;
  categories: Category[];
  implementationEffortText?: string | null;
  investmentEffort: string;
  trl: {
    id?: number;
    name: string;
  };
  video: string;
  user: User;
  company: Company;
  businessModels: BusinessModels[];
}

export interface Configuration {
  id: number;
  logo: string;
  mainColor: string;
  hasUserSection: boolean;
}

export interface Trl {
  id: number;
  name: string;
  description?: string | null;
}

export interface PageProps {
  preview: boolean;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

export type T = {
  id: string;
  name: string;
};
