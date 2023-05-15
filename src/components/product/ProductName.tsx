import React, { FC, useEffect, useState } from "react";
import ActionButtons from "./ActionButtons";
import { useEditProductMutation } from "@/services/productApi";
import { toast } from "react-toastify";

interface Props {
  name: string;
  editMode: boolean;
}

const ProductName: FC<Props> = ({ name, editMode }) => {
  const [preview, setPreview] = useState(false);
  const [productName, setProductName] = useState("");

  const [updateName, { isLoading, isSuccess, isError }] =
    useEditProductMutation();

  useEffect(() => {
    setProductName(name);
  }, [name]);

  const onSave = () => {
    updateName({ name: productName });
    if (isSuccess) {
      toast.success("Product name updated", {
        closeOnClick: true,
        progress: undefined,
      });
    }
    if (isError) {
      toast.error("Something went wrong", {
        closeOnClick: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className="p-4">
      {editMode && !preview && (
        <input
          type="text"
          className="input"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      )}
      {(!editMode || preview) && (
        <p className="mt-1 text-lg font-light">{productName}</p>
      )}
      {editMode && (
        <ActionButtons
          preview={preview}
          setPreview={setPreview}
          onSave={onSave}
          disabled={!productName}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ProductName;
