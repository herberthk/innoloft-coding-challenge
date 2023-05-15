import React, { FC, useEffect, useState } from "react";
import { TbReportMoney } from "react-icons/tb";
import ActionButtons from "./ActionButtons";
import { useEditProductMutation } from "@/services/productApi";
import { toast } from "react-toastify";
interface Props {
  cost: string;
  editMode: boolean;
}
const CostComponent: FC<Props> = ({ cost, editMode }) => {
  const [preview, setPreview] = useState(false);
  const [costValue, setCostValue] = useState("");
  useEffect(() => {
    setCostValue(cost);
  }, [cost]);
  const [updateCost, { isLoading, isSuccess, isError }] =
    useEditProductMutation();

  const onSave = () => {
    updateCost({ investmentEffort: costValue });
    if (isSuccess) {
      toast.success("Product cost updated", {
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
    <div className="flex">
      <div>
        <TbReportMoney size={25} />
      </div>
      <div className="w-full">
        <p className="ml-3 text-base">Costs</p>
        {editMode && !preview && (
          <input
            type="text"
            className="input mt-3"
            value={costValue}
            onChange={(e) => setCostValue(e.target.value)}
          />
        )}
        {(!editMode || preview) && (
          <div className="mt-3 flex flex-wrap space-x-1 space-y-1">
            <div className="rounded-3xl bg-[#ccc] px-2 py-[3px] font-extralight">
              {costValue}
            </div>
          </div>
        )}
        {editMode && (
          <ActionButtons
            onSave={onSave}
            preview={preview}
            setPreview={setPreview}
            disabled={!costValue}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default CostComponent;
