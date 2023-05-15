import React, { FC } from "react";
import { MdOutlineDone } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { PageProps } from "@/interface";

interface Props extends PageProps {
  onSave: () => void;
  disabled?: boolean;
  enablePreview?: boolean;
  isLoading: boolean;
}

const ActionButtons: FC<Props> = ({
  preview,
  setPreview,
  onSave,
  disabled = false,
  enablePreview = true,
  isLoading,
}) => {
  const ButtonComponent = () => {
    return (
      <>
        {isLoading ? (
          <button className="custom-button ml-3 bg-blue-700 text-white">
            <p className="ml-1 font-bold">Loading</p>
          </button>
        ) : (
          <button
            className="custom-button ml-3 bg-blue-700 text-white"
            disabled={disabled}
            onClick={onSave}
          >
            <MdOutlineDone size={23} />
            <p className="ml-1 font-bold">Save</p>
          </button>
        )}
      </>
    );
  };
  if (!enablePreview) {
    return (
      <div className="flex flex-row-reverse space-x-4">
        <ButtonComponent />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-row-reverse space-x-4">
        <ButtonComponent />
        {!preview ? (
          <button
            onClick={() => setPreview(true)}
            className="custom-button bg-white"
          >
            Preview
          </button>
        ) : (
          <button
            className="custom-button bg-blue-700 text-white"
            onClick={() => setPreview(false)}
          >
            <AiOutlineEdit size={25} />
            <p className="ml-1 font-bold">Edit</p>
          </button>
        )}
      </div>
    </>
  );
};

export default ActionButtons;
