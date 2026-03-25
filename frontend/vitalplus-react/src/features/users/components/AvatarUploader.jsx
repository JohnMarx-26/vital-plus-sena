import { FileInput } from "@/shared";

export default function AvatarUploader({
  onChange,
  label = "Foto de perfil",
}) {
  return (
    <FileInput
      label={label}
      accept="image/png, image/jpeg, image/jpg, image/webp"
      onChange={onChange}
    />
  );
}