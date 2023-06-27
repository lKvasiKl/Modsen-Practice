import defaultPhoto from "../assets/icons/noPhoto.png";

const getImageUrl = (
  photoReference: string | undefined,
  maxWidth: number,
  maxHeight: number,
) => {
  if (!photoReference) {
    return defaultPhoto;
  }

  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const baseUrl = process.env.REACT_APP_GOOGLE_PHOTO_URL;

  return `${baseUrl}?photoreference=${photoReference}&maxwidth=${maxWidth}&maxheight=${maxHeight}&key=${apiKey}`;
};

export { getImageUrl };
