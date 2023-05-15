import React, { FC, memo, useEffect } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import ActionButtons from "./ActionButtons";
import { useEditProductMutation } from "@/services/productApi";
import { toast } from "react-toastify";

type Tag = {
  id: string;
  text: string;
};

type Props = {
  selectedTags: Tag[];
  type: "technology" | "businessModal";
  preview: boolean;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
};

const TagInput: FC<Props> = ({ selectedTags, type, preview, setPreview }) => {
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const [tags, setTags] = React.useState<Tag[]>([]);

  const handleDelete = (i: number) => {
    setTags(tags?.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
    const tArray = tag.text.split(" ");
    if (tArray.length) {
      tag.text = tArray.join("-");
    }

    setTags([...tags!, tag]);
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  useEffect(() => {
    setTags(selectedTags);
  }, [selectedTags]);

  const [updateTags, { isLoading, isSuccess, isError }] =
    useEditProductMutation();

  const modifiedTags = tags.map((el) => {
    return { name: el.text };
  });

  const onSave = () => {
    if (type === "technology") {
      updateTags({
        categories: modifiedTags,
      });
    } else {
      updateTags({
        businessModels: modifiedTags,
      });
    }

    if (isSuccess) {
      if (type === "technology") {
        toast.success("Product categories updated", {
          closeOnClick: true,
          progress: undefined,
        });
      } else {
        toast.success("Product business models updated", {
          closeOnClick: true,
          progress: undefined,
        });
      }
    }
    if (isError) {
      toast.error("Something went wrong", {
        closeOnClick: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <ReactTags
        tags={tags}
        suggestions={selectedTags}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        inputFieldPosition="bottom"
        autocomplete
        classNames={{
          tagInputField: "tags_input_field",
          selected: "tags_selected",
        }}
      />
      <ActionButtons
        preview={preview}
        setPreview={setPreview}
        onSave={onSave}
        enablePreview={false}
        isLoading={isLoading}
      />
    </>
  );
};

export default memo(TagInput);
