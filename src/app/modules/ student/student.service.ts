import { Student } from './student.model';



const getAllStudentDataFromDB = async () => {
  const result = Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id: id }); //{id} manei id: id
  const result = await Student.aggregate([
    {$match: {id: id}}
  ])
  return result;
};


const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id: id }, {isDeleted: true}); //{id} manei id: id
  return result;
};

export const studentServices = {
  getAllStudentDataFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
