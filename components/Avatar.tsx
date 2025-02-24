import crypto from "crypto";
import Image from "next/image";

interface AvatarProps {
  text: string;
  size?: number;
  defaultImage?:
    | "identicon"
    | "monsterid"
    | "wavatar"
    | "retro"
    | "robohash"
    | "blank";
  rating?: "g" | "pg" | "r" | "x";
  className?: string;
}

export default function Avatar({
  text,
  size = 32,
  defaultImage = "identicon",
  rating = "pg",
  className = "",
}: AvatarProps) {
  const hash = crypto
    .createHash("md5")
    .update(text.toLowerCase().trim())
    .digest("hex");

  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultImage}&r=${rating}`;

  return (
    <Image
      src={gravatarUrl}
      alt={`Avatar for ${text}`}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
    />
  );
}
