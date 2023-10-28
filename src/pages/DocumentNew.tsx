import { useContext } from "react";
import { Box, Button, Container, Option, Stack, Typography } from "@mui/joy";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { DocumentType, Role } from "../types";
import { RoleContext } from "../RoleContext";
import { InputControl } from "../components/InputControl";
import { SelectControl } from "../components/SelectControl";
import { useCreateDocumentMutation } from "../api";

export const DocumentNew = () => {
  const role = useContext(RoleContext);
  const { mutateAsync: create, isPending } = useCreateDocumentMutation();
  const navigate = useNavigate();

  if (role !== Role.EMPLOYEE)
    throw new Error("Only employees can create documents.");

  const initialValues = {
    description: "",
    type: DocumentType.EXPENSE,
    amount: 0,
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 4 }}>
      <Typography level="h1" sx={{ marginBlockEnd: 2 }}>
        New document
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          const { data } = await create(values);
          navigate(`/documents/${data.id}`);
        }}
        validationSchema={Yup.object().shape({
          description: Yup.string().required(),
          amount: Yup.number().moreThan(0),
        })}
      >
        <Form>
          <Stack spacing={4}>
            <Field component={SelectControl} label="Type" name="type">
              <Option value={DocumentType.EXPENSE}>Expense</Option>
              <Option value={DocumentType.REQUISITION}>Requisition</Option>
            </Field>
            <Field
              component={InputControl}
              label="Description"
              name="description"
            />
            <Field
              component={InputControl}
              label="Amount"
              name="amount"
              startDecorator="$"
              type="number"
            />
            <Box sx={{ justifyContent: "flex-end", display: "flex" }}>
              <Button loading={isPending} type="submit">
                Create
              </Button>
            </Box>
          </Stack>
        </Form>
      </Formik>
    </Container>
  );
};
