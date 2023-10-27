import { ReactNode } from "react";
import { FieldProps } from "formik";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from "@mui/joy";

export interface InputControlProps
  extends FieldProps,
    Omit<InputProps, "id" | "name"> {
  label: ReactNode;
  name: string;
}

export const InputControl = ({
  field,
  form: { touched, errors },
  label = "",
  required,
  sx,
  ...props
}: InputControlProps) => {
  const hasError = Boolean(touched[field.name] && errors[field.name]);

  return (
    <FormControl error={hasError} sx={sx}>
      <FormLabel required={required}>{label}</FormLabel>
      <Input {...field} {...props} />
      {hasError && (
        <FormHelperText color="danger">
          {`${errors[field.name]}`}
        </FormHelperText>
      )}
    </FormControl>
  );
};
