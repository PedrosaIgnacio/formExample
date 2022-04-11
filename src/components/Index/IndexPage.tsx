import { Formik, Form, Field, ErrorMessage } from "formik";
import { Form as BootstrapForm } from "react-bootstrap";
import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useCreateRecord } from "../Hooks/useCreateRecord";
import { useGetRecords } from "../Hooks/useGetRecords";
import { useDeleteRecord } from "../Hooks/useDeleteRecord";
import { MdUpdate } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { UpdateModal } from "./Modals/UpdateModal";
import { Layout } from "../Layouts/Layout";

interface IMyFormValues {
  firstName: string;
  lastName: string;
}
interface IRecord {
  id: number;
  firstName: string | undefined;
  lastName: string | undefined;
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

  const [updatedRecord, setupdateRecord] = useState<IRecord | undefined>();

  const { createRecord } = useCreateRecord();
  const { data: records } = useGetRecords();
  const { deleteRecord } = useDeleteRecord();

  const [idArray, setIdArray] = useState<number[]>([]);

  const deleteAll = useCallback(async () => {
    for (const id of idArray) {
      await deleteRecord({ id });
    }
    setIdArray([]);
  }, [deleteRecord, idArray]);

  return (
    <Layout>
      <div className="container">
        <h1 className="mt-3 display-3">Register</h1>
        <hr />
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={async (values, formikBag) => {
            try {
              await createRecord({
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
              <div className="form-group col-md-3">
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
              <div className="form-group col-md-3">
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
              <div className="col-md-2 mt-4">
                <button className="btn btn-outline-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </Form>
        </Formik>

        <div
          className="mt-3"
          style={{ overflow: "auto", maxHeight: "40vh", position: "relative" }}
        >
          <table
            className="table table-hover table-responsive text-center"
            style={{ position: "relative" }}
          >
            <thead
              className="text-white bg-dark"
              style={{
                position: "sticky",
                top: "0",
                fontWeight: "20px",
                height: "4vh",
              }}
            >
              <tr>
                <th>Selection</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>
                      <BootstrapForm.Check
                        onChange={(event) => {
                          if (event.target.checked) {
                            setIdArray((previousArray) => [
                              ...previousArray,
                              e.id,
                            ]);
                          } else {
                            setIdArray((previousArray) =>
                              previousArray.filter((id) => id !== e.id)
                            );
                          }
                        }}
                        inline
                        type={"checkbox"}
                        id={e.id.toString()}
                      ></BootstrapForm.Check>
                    </td>
                    <td>{e.firstname}</td>
                    <td>{e.lastname}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          toast.success("Register Deleted");
                          deleteRecord({ id: e.id });
                        }}
                        style={{ marginRight: "1vw" }}
                      >
                        <AiFillDelete />
                      </button>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => {
                          setupdateRecord({
                            id: e.id,
                            firstName: e.firstname,
                            lastName: e.lastname,
                          });
                        }}
                      >
                        <MdUpdate />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <hr />
        <div className="mt-3 d-flex" style={{ alignItems: "center" }}>
          <p style={{ margin: "0", marginRight: "1rem" }}>
            {idArray.length} Items Seleccionados
          </p>
          <button className="btn btn-outline-danger" onClick={deleteAll}>
            Delete All
          </button>
        </div>
        <hr />
      </div>
      <Toaster />
      {updatedRecord !== undefined && (
        <UpdateModal
          id={updatedRecord?.id}
          show={updatedRecord !== undefined}
          firstName={updatedRecord?.firstName}
          lastName={updatedRecord?.lastName}
          handleClose={() => setupdateRecord(undefined)}
        />
      )}
    </Layout>
  );
};
