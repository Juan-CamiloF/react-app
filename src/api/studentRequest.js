import axios from "axios";
let backend = "http://54.147.43.234";
export const getStudents = async () =>
  await axios.get(`${backend}/api/estudiantes`);

export const postStudent = async (student) => {
  return await axios.post(`${backend}/api/estudiante`, student);
};

export const deleteStudent = async (codigoEstudiante) => {
  return await axios.delete(`${backend}/api/estudiante/${codigoEstudiante}`);
};

export const getStudent = async (codigoEstudiante) => {
  return await axios.get(`${backend}/api/estudiante/${codigoEstudiante}`);
};

export const updateStudent = async (student) => {
  return await axios.put(
    `${backend}/api/estudiante/${student.codigoEstudiante}`,
    student
  );
};
