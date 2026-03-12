import { FileInput } from "@/shared";

export default function AvatarUploader({ onChange }) {
  return (
    <FileInput
      label="Foto de perfil"
      accept="image/png, image/jpeg, image/jpg, image/webp"
      onChange={onChange}
    />
  );
}