import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useCreateRecord } from "../Hooks/useCreateRecord";
import { useGetRecords } from "../Hooks/useGetRecords";
import { useDeleteRecord } from "../Hooks/useDeleteRecord";

interface IMyFormValues {
  firstName: string;
  lastName: string;
}

const formSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Required")
    .min(3, "Must be enter at lest 3 characters."),
  lastName: Yup.string()
    .required("Required")
    .min(3, "Must be enter at lest 3 characters."),
});

export const IndexPage: React.FC = () => {
  const initialValues: IMyFormValues = { firstName: "", lastName: "" };
  const { createRecord } = useCreateRecord();
  const { data: records } = useGetRecords();
  const { deleteRecord } = useDeleteRecord();

  return (
    <div className="container">
      <h1 className="mt-3 display-3">Webform</h1>
      <hr />
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={async (values, formikBag) => {
          try {
            const record = await createRecord({
              firstname: values.firstName,
              lastname: values.lastName,
            });
            formikBag.resetForm();
            toast.success("Register Complete");
          } catch (error) {
            toast.error("Internal Server Error");
          }
        }}
      >
        <Form>
          <div className="row">
            <div className="form-group col-3">
              <label htmlFor="firstName">First Name</label>
              <Field
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="form-control"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="field-error text-danger"
              />
            </div>
            <div className="form-group col-3">
              <label htmlFor="lastName">Last Name</label>
              <Field
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="form-control"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="field-error text-danger"
              />
            </div>
            <div className="col-2 mt-4">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <table className="table mt-5">
        <thead className="text-center">
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Actions</th>
        </thead>
        <tbody className="text-center">
          {records.map((e) => {
            return (
              <tr>
                <td>{e.id}</td>
                <td>{e.firstname}</td>
                <td>{e.lastname}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      toast.success("Register Deleted");
                      deleteRecord({ id: e.id });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
};
