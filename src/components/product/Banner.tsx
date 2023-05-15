import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { TbAward } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils";

interface Props {
  picture: string;
  type: {
    id: number;
    name: string;
  };
  editMode: boolean;
}
const Banner: FC<Props> = ({ picture, type, editMode }) => {
  const [photo, setPhoto] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPhoto(picture);
  }, [picture]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(e.target.files[0].type)) {
      toast.error("upload valid image", {
        closeOnClick: true,
        progress: undefined,
      });
      toast.info("Uploaded image should be of type png, jpg, gif or", {
        closeOnClick: true,
        progress: undefined,
      });
      e.target.value = "";
      return;
    }
    // File size should not exceed 500kb
    if (e.target.files[0].size > MAX_FILE_SIZE) {
      toast.error("Uploaded image is too large", {
        closeOnClick: true,
        progress: undefined,
      });
      toast.info("Uploaded image shouldn't exceed 500kb", {
        closeOnClick: true,
        progress: undefined,
      });
      e.target.value = "";
      return;
    }

    // We get the image to preview
    const src = URL.createObjectURL(e.target.files[0]);
    setPhoto(src);
    e.target.value = "";
  }, []);
  return (
    <div className="bg-[#272e71 relative mt-4 h-80 w-full">
      <div className="absolute left-0 top-0 z-10 flex">
        <div className="bg-blue-800 p-2">
          <TbAward size={25} className="text-white" />
        </div>
        <div className="bg-[hsla(260,11%,95%,1)] p-2">
          <p className="text-base">{type?.name}</p>
        </div>
      </div>
      {editMode && (
        <>
          <button
            className="absolute right-0 top-0 z-10 flex bg-blue-800 p-2"
            title="Update photo"
            onClick={() => inputRef.current?.click()}
          >
            <CiEdit size={25} className="text-white" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            className="hidden"
            onChange={onChange}
          />
        </>
      )}

      <Image src={photo} style={{ objectFit: "cover" }} alt="photo" fill />
    </div>
  );
};

export default Banner;
