import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useStudent } from "../context/studentContext";
import "../css/studentPage.css";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const StudentPage = () => {
  const initialForm = {
    codigoEstudiante: "",
    cedula: "",
    nombres: "",
    apellidos: "",
    celular: "",
  };
  //Hooks
  const navigate = useNavigate();
  const [student, setStudent] = useState(initialForm);
  const { postStudentFunction, getStudentFunction, updateStudentFunction } =
    useStudent();
  const params = useParams();

  useEffect(() => {
    (async () => {
      if (params.code) {
        const student = await getStudentFunction(params.code);
        setStudent(student);
      }
    })();
  });

  const validateForm = Yup.object({
    codigoEstudiante: Yup.number("El código debe ser número").required(
      "El codigo del estudiante es requerido"
    ),
    cedula: Yup.string().required("La cédula es requerido"),
    nombres: Yup.string().required("Los nombres son requeridos"),
    apellidos: Yup.string().required("Los apellidos son requeridos"),
    celular: Yup.string()
      .min(10, "Deben ser un número válido")
      .max(10, "Deben ser un número válido")
      .required("El celular es requerido"),
  });

  const handleError = (message) => {
    toast(`There was a problem\n ${message}`);
  };

  return (
    <div className="studentPage">
      <h1 className="h1"> {params.code ? "StudenUpdate" : "StudenPost"}</h1>
      <Link className="link" to="/react-app/">
        Go back
      </Link>
      <Formik
        initialValues={student}
        onSubmit={async (values, actions) => {
          if (!params.code) {
            await postStudentFunction(values)
              .then(() => navigate("/"))
              .catch((err) => {
                console.log(err);
                handleError(err.response.data.message);
              });
          } else {
            await updateStudentFunction(values)
              .then(() => navigate("/"))
              .catch((err) => {
                console.log(err);
                handleError(err.response.data.message);
              });
          }
        }}
        validationSchema={validateForm}
        enableReinitialize={true}
      >
        {({ handleSubmit }) => (
          <Form className="form" onSubmit={handleSubmit}>
            <Field
              className="input"
              name="codigoEstudiante"
              placeholder="Código"
              type="number"
              disabled={params.code}
              style={{ color: "grey" }}
            />
            <ErrorMessage
              className="error"
              component="div"
              name="codigoEstudiante"
            />
            <Field className="input" name="cedula" placeholder="Cédula" />
            <ErrorMessage name="cedula" />
            <Field className="input" name="nombres" placeholder="Nombres" />
            <ErrorMessage name="nombres" />
            <Field className="input" name="apellidos" placeholder="Apellidos" />
            <ErrorMessage name="apellidos" />
            <Field className="input" name="celular" placeholder="Celular" />
            <ErrorMessage name="celular" />
            <button className="button" type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>
      <Toaster
        toastOptions={{
          className: "toast",
          style: {
            background: "none",
            border: "1px solid aqua",
            color: "aqua",
            boxShadow: "3px 3px aqua",
          },
        }}
        containerStyle={{
          position: "sticky",
        }}
      />
    </div>
  );
};

export default StudentPage;
