import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useUpdateRecord } from "../../Hooks/useUpdateRecord";

interface IUpdateModalProps {
  id: number;
  show: boolean;
  firstName: string | undefined;
  lastName: string | undefined;
  handleClose: () => void;
}

const formSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Required")
    .min(3, "Must be enter at lest 3 characters."),
  lastName: Yup.string()
    .required("Required")
    .min(3, "Must be enter at lest 3 characters."),
});

export const UpdateModal = ({
  id,
  show,
  firstName,
  lastName,
  handleClose,
}: IUpdateModalProps) => {
  const { updateRecord } = useUpdateRecord();

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize
            initialValues={{ firstName, lastName }}
            validationSchema={formSchema}
            onSubmit={async (values) => {
              try {
                await updateRecord({
                  id: id,
                  firstname: values.firstName,
                  lastname: values.lastName,
                });
                toast.success("Update Record");
                handleClose();
              } catch (error) {
                toast.error("Internal Server Error");
              }
            }}
          >
            <Form>
              <div className="row">
                <div className="form-group col-6">
                  <label htmlFor="updateFirstname">First Name</label>
                  <Field
                    id="updateFirstname"
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="field-error text-danger"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="updateLastname">Last Name</label>
                  <Field
                    id="updateLastname"
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
              </div>
              <div className="d-flex justify-content-end mt-4">
                <Button
                  type="button"
                  className="btn btn-danger mx-3"
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button type="submit" className="btn btn-success">
                  Save Changes
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};
