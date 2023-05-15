import React, { FC, memo, useEffect, useState } from "react";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import ActionButtons from "./ActionButtons";
import { useEditProductMutation } from "@/services/productApi";
import { toast } from "react-toastify";

type Props = {
  url: string;
  editMode?: boolean;
};
const VideoSection: FC<Props> = ({ url, editMode = false }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const videoId = videoUrl?.split("=")[1];
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    setVideoUrl(url);
  }, [url]);

  const [updateVideo, { isLoading, isSuccess, isError }] =
    useEditProductMutation();

  const onSave = () => {
    updateVideo({ video: videoUrl });
    if (isSuccess) {
      toast.success("Product video updated", {
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
    <div className="mb-4 bg-white p-4 drop-shadow-md">
      {editMode && !preview && (
        <>
          <p>Video</p>
          <input
            onChange={(e) => setVideoUrl(e.target.value)}
            type="text"
            className="input mt-1"
            value={videoUrl}
          />
        </>
      )}
      {(!editMode || preview) && (
        <LiteYouTubeEmbed id={videoId || ""} title="Title of the video" />
      )}
      {editMode && (
        <ActionButtons
          onSave={onSave}
          disabled={!videoUrl}
          preview={preview}
          setPreview={setPreview}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default memo(VideoSection);
