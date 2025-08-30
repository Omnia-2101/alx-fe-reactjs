import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function FormikForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const onSubmit = (values, { resetForm }) => {
    console.log("Formik submitted:", values);
    alert("Formik form submitted!");
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className="max-w-md mx-auto p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">Register (Formik)</h2>

        <Field name="username" type="text" placeholder="Username" className="w-full mb-2 p-2 border rounded" />
        <ErrorMessage name="username" component="div" className="text-red-500" />

        <Field name="email" type="email" placeholder="Email" className="w-full mb-2 p-2 border rounded" />
        <ErrorMessage name="email" component="div" className="text-red-500" />

        <Field name="password" type="password" placeholder="Password" className="w-full mb-2 p-2 border rounded" />
        <ErrorMessage name="password" component="div" className="text-red-500" />

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </Form>
    </Formik>
  );
}
