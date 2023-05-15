import { BusinessModels, Category } from "@/interface";
import React, { FC, memo } from "react";

import CategoryComponent from "./Category";
import BusinessModelsComponent from "./BusinessModels";
import TrlComponent from "./TrlComponent";
import CostComponent from "./CostComponent";

interface Props {
  categories?: Category[];
  businessModels?: BusinessModels[];
  trl?: {
    id?: number;
    name: string;
  };
  cost?: string;
  editMode?: boolean;
}
const DetailSection: FC<Props> = ({
  businessModels,
  categories,
  cost,
  editMode = false,
  trl,
}) => {
  return (
    <div className="bg-white p-4">
      <p className="text-md">Offer Details</p>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2">
        <CategoryComponent categories={categories!} editMode={editMode} />
        <BusinessModelsComponent
          businessModels={businessModels!}
          editMode={editMode}
        />
      </div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2">
        <TrlComponent editMode={editMode} trl={trl?.name || ""} />
        <CostComponent cost={cost!} editMode={editMode} />
      </div>
    </div>
  );
};

export default memo(DetailSection);
