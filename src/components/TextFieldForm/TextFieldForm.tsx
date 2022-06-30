import { useTranslation } from "react-i18next";
import { InputField } from "./styled";

interface TextFieldFormPorps {
  label: string;
  value?: string;
  isRequired?: boolean;
  onChange: (e: string) => void;
}

export const TextFieldForm = ({
  label,
  value,
  isRequired = true,
  onChange,
}: TextFieldFormPorps) => {
  const { t } = useTranslation();

  return (
    <InputField
      label={t(label)}
      variant="standard"
      required={isRequired}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
