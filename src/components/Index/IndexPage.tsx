import { Formik, Form, Field, ErrorMessage } from 'formik'
import React from 'react'
import * as Yup from 'yup'
interface IMyFormValues {
    firstName: string,
    lastName: string
}

const formSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("Required")
        .min(3, "Must be enter at lest 3 characters."),
    lastName: Yup.string()
        .required("Required")
        .min(3, "Must be enter at lest 3 characters.")
})

export const IndexPage: React.FC = () => {
    const initialValues: IMyFormValues = { firstName: '', lastName: '' };

    return (
        <div className="container">
            <h1 className="mt-3 display-3">Webform</h1>
            <hr />
            <Formik
                initialValues={initialValues}
                validationSchema={formSchema}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                <Form>
                    <div className="row">
                        <div className="form-group col-3">
                            <label htmlFor="firstName">First Name</label>
                            <Field id="firstName" name="firstName" placeholder="First Name" className="form-control" />
                            <ErrorMessage name='firstName' component='div' className="field-error text-danger" />
                        </div>
                        <div className="form-group col-3">
                            <label htmlFor="lastName">Last Name</label>
                            <Field id="lastName" name="lastName" placeholder="Last Name" className="form-control" />
                            <ErrorMessage name='lastName' component='div' className="field-error text-danger" />
                        </div>
                        <div className="col-2 mt-4">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div >
    )
}
