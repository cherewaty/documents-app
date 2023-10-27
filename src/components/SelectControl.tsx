import { ReactNode } from "react";
import { FieldProps } from "formik";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  SelectProps,
} from "@mui/joy";

export interface SelectControlProps
  extends FieldProps,
    Omit<SelectProps<string>, "id" | "form" | "name"> {
  label: ReactNode;
  required?: boolean;
}

export const SelectControl = ({
  field,
  form: { setFieldValue, touched, errors },
  label = "",
  required,
  sx,
  ...props
}: SelectControlProps) => {
  const hasError = Boolean(touched[field.name] && errors[field.name]);

  return (
    <FormControl error={hasError} sx={sx}>
      <FormLabel required={required}>{label}</FormLabel>
      <Select
        {...field}
        {...props}
        onChange={(_e, value: string | null) =>
          setFieldValue(field.name, value)
        }
      />
      {hasError && <FormHelperText>{`${errors[field.name]}`}</FormHelperText>}
    </FormControl>
  );
};
