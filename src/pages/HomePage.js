import React from "react";
import { useStudent } from "../context/studentContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/homePage.css";
import toast from "react-hot-toast";

const HomePage = () => {
  const { students, setStudents, deleteStudentFunction } = useStudent();
  const navigate = useNavigate();

  const handleDelete = (codigoEstudiante) => {
    toast(
      (t) => (
        <div className="modal">
          <p>Do you want delete the Student?</p>
          <div className="buttons">
            <button
              className="button"
              onClick={async () => {
                await deleteStudentFunction(codigoEstudiante);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button className="button" onClick={() => toast.dismiss(t.id)}>
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "none",
          border: "1px solid aqua",
          borderRadius: "5px",
          boxShadow: "5px 5px aqua",
        },
      }
    );
  };

  return (
    <div className="homePage">
      <h1 className="h1">HomePage</h1>
      <Link className="link" to="/new">
        Add a new Student
      </Link>
      <div className="container">
        {setStudents
          ? students.map((student, index) => (
              <div className="element" key={student.codigoEstudiante}>
                <h3 className="h3 title">Estudiante: {index + 1} </h3>
                <h3 className="h3">Código: {student.codigoEstudiante} </h3>
                <h3 className="h3">Cédula: {student.cedula} </h3>
                <h3 className="h3">Nombres: {student.nombres} </h3>
                <h3 className="h3">Apellidos: {student.apellidos} </h3>
                <h3 className="h3">Celular: {student.celular} </h3>
                <div className="buttons">
                  <button
                    onClick={() => handleDelete(student.codigoEstudiante)}
                    className="button"
                  >
                    Delete
                  </button>
                  <button
                    className="button"
                    onClick={() =>
                      navigate(`/update/${student.codigoEstudiante}`)
                    }
                  >
                    Update
                  </button>
                </div>
              </div>
            ))
          : "No hay estudiantes agregados"}
      </div>
    </div>
  );
};

export default HomePage;
