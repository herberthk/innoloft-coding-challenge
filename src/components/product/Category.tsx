import { Category, T } from "@/interface";
import React, { FC, useEffect, useState } from "react";
import TagInput from "./TagInput";
import { HiCog } from "react-icons/hi";

type Props = {
  categories: Category[];
  editMode: boolean;
};

const CategoryComponent: FC<Props> = ({ categories, editMode }) => {
  const modifiedCategories = categories?.map(({ id, name }) => {
    return { id: String(id), text: name };
  });
  const [preview, setPreview] = useState(false);
  const [categoryState, setCategoryState] = useState<T[]>([]);
  useEffect(() => {
    setCategoryState(
      categories?.map(({ id, name }) => {
        return {
          id: String(id),
          name,
        };
      })
    );
  }, [categories]);

  return (
    <>
      <div className="flex">
        <div>
          <HiCog size={25} />
        </div>
        <div className="w-full">
          <p className="ml-3 text-base">Technology</p>
          {editMode && !preview && (
            <TagInput
              type="technology"
              selectedTags={modifiedCategories || []}
              preview={preview}
              setPreview={setPreview}
            />
          )}
          {(!editMode || preview) && (
            <div className="mt-3 flex flex-wrap  space-x-1 space-y-1">
              {categoryState?.map(({ id, name }) => (
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
    </>
  );
};

export default CategoryComponent;
