import React, { FC, memo } from "react";
import ProductName from "./ProductName";
import Description from "./Description";
import Banner from "./Banner";

interface Props {
  description?: string;
  name?: string;
  ImageUrl?: string;
  editMode?: boolean;
  type?: {
    id: number;
    name: string;
  };
}

const MainSection: FC<Props> = ({
  ImageUrl,
  type,
  description,
  name,
  editMode = false,
}) => {
  return (
    <div className="mb-4 bg-white md:p-4">
      <Banner editMode={editMode} picture={ImageUrl!} type={type!} />
      <ProductName editMode={editMode} name={name!} />
      <Description
        description={description || "This is the default text"}
        editMode={editMode}
      />
    </div>
  );
};

export default memo(MainSection);
