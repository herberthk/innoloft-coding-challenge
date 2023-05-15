import { useEditProductMutation, useGetTrlQuery } from "@/services/productApi";
import React, { FC, useEffect, useState } from "react";
import DropDown from "./DropDown";
import { AiOutlineClockCircle } from "react-icons/ai";
import ActionButtons from "./ActionButtons";
import { toast } from "react-toastify";

type Props = {
  editMode: boolean;
  trl: string;
};
const TrlComponent: FC<Props> = ({ editMode, trl }) => {
  const { data } = useGetTrlQuery();
  const trlOptions = data?.map((el) => el.name);
  const [preview, setPreview] = useState(false);
  const [selectedTrl, setSelectedTrl] = useState("");
  useEffect(() => {
    setSelectedTrl(trl);
  }, [trl]);

  const [updateTrl, { isLoading, isSuccess, isError }] =
    useEditProductMutation();

  const onSave = () => {
    updateTrl({ trl: { name: selectedTrl } });
    if (isSuccess) {
      toast.success("Product trl updated", {
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
    <div className="flex ">
      <div>
        <AiOutlineClockCircle size={25} />
      </div>
      <div className="w-full">
        <p className="ml-3 text-base">TRL</p>
        {editMode && !preview && (
          <DropDown
            setSelectedTrl={setSelectedTrl}
            options={trlOptions || []}
            id="trl"
            selected={selectedTrl}
          />
        )}
        {(!editMode || preview) && (
          <div className="mt-3 flex flex-wrap  space-x-1 space-y-1">
            <div className=" rounded-3xl bg-[#ccc] px-[0.6rem] py-[3px] font-extralight">
              {selectedTrl}
            </div>
          </div>
        )}
        {editMode && (
          <ActionButtons
            onSave={onSave}
            disabled={!selectedTrl}
            preview={preview}
            setPreview={setPreview}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default TrlComponent;
