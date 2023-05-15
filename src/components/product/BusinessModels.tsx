import { BusinessModels, T } from "@/interface";
import React, { FC, useEffect, useState } from "react";
import { TbChessKnight } from "react-icons/tb";
import TagInput from "./TagInput";
type Props = {
  businessModels: BusinessModels[];
  editMode: boolean;
};

const BusinessModelsComponent: FC<Props> = ({ businessModels, editMode }) => {
  const modifiedBusinessModels = businessModels?.map(({ id, name }) => {
    return { id: String(id), text: name };
  });
  const [businessModelsState, setBusinessModelsState] = useState<T[]>([]);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    setBusinessModelsState(
      businessModels?.map(({ id, name }) => {
        return {
          id: String(id),
          name,
        };
      })
    );
  }, [businessModels]);

  return (
    <div className="flex">
      <div>
        <TbChessKnight size={25} />
      </div>
      <div className="w-full">
        <p className="ml-3 text-base">Business Modal</p>
        {editMode && !preview && (
          <TagInput
            type="businessModal"
            selectedTags={modifiedBusinessModels || []}
            preview={preview}
            setPreview={setPreview}
          />
        )}
        {(!editMode || preview) && (
          <div className="mt-3 flex flex-wrap space-x-1 space-y-1">
            {businessModelsState?.map(({ id, name }) => (
              <div
                key={id}
                className="rounded-3xl bg-[#ccc] px-2 py-[3px] font-extralight"
              >
                {name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessModelsComponent;
