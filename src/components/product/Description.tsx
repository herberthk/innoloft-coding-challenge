import { createMarkup } from "@/utils";
import { EditorProps } from "react-draft-wysiwyg";
import dynamic from "next/dynamic";
import { ContentState, EditorState, convertFromHTML } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import React, { FC, useEffect, useState } from "react";
import { convertToHTML } from "draft-convert";
import ActionButtons from "./ActionButtons";
import { toast } from "react-toastify";
import { useEditProductMutation } from "@/services/productApi";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

interface Props {
  description: string;
  editMode: boolean;
}

const Description: FC<Props> = ({ description, editMode }) => {
  const [preview, setPreview] = useState(false);
  const [convertedContent, setConvertedContent] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    setEditorState(() =>
      EditorState.createWithContent(
        //@ts-ignore
        ContentState.createFromBlockArray(convertFromHTML(description))
      )
    );
    // setEditorState(() =>
    //   EditorState.createWithContent(ContentState.createFromText(description))
    // );
  }, [description]);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  const [updateDescription, { isLoading, isSuccess, isError }] =
    useEditProductMutation();

  const onSave = () => {
    updateDescription({ description: convertedContent });
    if (isSuccess) {
      toast.success("Product description updated", {
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

  if (!editMode || preview) {
    return (
      <div className="px-4">
        <p
          className="font-light"
          // dangerouslySetInnerHTML={createMarkup(convertedContent || "")}
        >
          {createMarkup(convertedContent || "")}
        </p>
        {editMode && (
          <ActionButtons
            onSave={onSave}
            disabled={!convertedContent}
            preview={preview}
            setPreview={setPreview}
            isLoading={isLoading}
          />
        )}
      </div>
    );
  }
  return (
    <div className="p-4">
      <div className="mt-3">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
      </div>
      {editMode && (
        <ActionButtons
          preview={preview}
          setPreview={setPreview}
          onSave={onSave}
          disabled={!convertedContent}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Description;
