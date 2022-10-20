import { createContext, useContext, useEffect, useState } from "react";

import {
  getStudents,
  postStudent,
  deleteStudent,
  getStudent,
  updateStudent,
} from "../api/studentRequest";

/**
 * Creación del contexto y creación de hook para obtenerlo.
 */
const context = createContext();

export const useStudent = () => {
  return useContext(context);
};

export const StudenProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudentsFunction();
  }, []);

  const getStudentsFunction = async () => {
    const res = await getStudents()
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        return [];
      });
    setStudents(res);
  };

  const postStudentFunction = async (student) => {
    return await postStudent(student).then((res) =>
      setStudents([...students, res.data])
    );
  };

  const deleteStudentFunction = async (codigoEstudiante) => {
    return await deleteStudent(codigoEstudiante).then((res) => {
      const newStudents = students.filter(
        (s) => s.codigoEstudiante !== codigoEstudiante
      );
      setStudents(newStudents);
    });
  };

  const getStudentFunction = async (codigoEstudiante) => {
    const res = await getStudent(codigoEstudiante);
    return res.data;
  };

  const updateStudentFunction = async (student) => {
    return await updateStudent(student).then((res) => {
      const updateStudents = students.map((s) => {
        if (s.codigoEstudiante === student.codigoEstudiante) {
          s = res.data;
        }
        return s;
      });
      setStudents(updateStudents);
    });
  };

  return (
    <context.Provider
      value={{
        students,
        setStudents,
        postStudentFunction,
        deleteStudentFunction,
        getStudentFunction,
        updateStudentFunction,
      }}
    >
      {children}
    </context.Provider>
  );
};
