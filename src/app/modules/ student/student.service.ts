import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentDataFromDB = async () => {
  const result = StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = StudentModel.findOne({ id: id }); //{id} manei id: id
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentDataFromDB,
  getSingleStudentFromDB,
};
