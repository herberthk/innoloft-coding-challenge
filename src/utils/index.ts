import parse from "html-react-parser";
export const createMarkup = (html: string) => {
  return parse(html.trim());
};

// File size should not exceed 500kb
export const MAX_FILE_SIZE = 500000;
export const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/jpg",
  "image/webp",
];
