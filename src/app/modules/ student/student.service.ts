import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';

const getAllStudentDataFromDB = async (query: Record<string, unknown>) => { //Record<string, unknwn> diye bojacche ekta object hobe key hobe string value hobe unknown
  //{email: {}}
  const queryObj = {...query}; //queryObj e query copy kortesi
  let searchTerm = '';
  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string;
  }

  //searchTerm="komol" email, fristname ba permanent address kohtaio pertial match holei retrun kobre result
  const searchQuery =  Student.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
      [field] : {$regex: searchTerm, $options: 'i'} //options: i for case insensetive //field j field k search korbo seta dynamically pabe
    }))
  })

  //filtering
  const excludeFields = ['searchTerm','sort', 'limit', 'page', 'fields'];
  excludeFields.forEach(el => delete queryObj[el]) // searchTerm filed ta k exclude kore dicce
  console.log(query, queryObj)
  //filtering email:komol@gmail.com exact match hote hobe
  const filterQuery =  searchQuery.find(queryObj) //searchQuery ta chaining kortesi age Student.find ta execute hobe then searchQuery ta execute howar pore ei line excute hbe
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }); //multiple value howar 2 bar populate use korchi  ekhane academicDeparment er moddheo abar academicFaculty referencing kora ache tai
  //academicFaculty er data dekhate evabe path akare populate korte hobe.

  let sort = "-createdAt" //createdAt descending order e sort hobe bydefault
  if(query.sort){
    sort = query.sort as string;
  }

  //bar bar query lekhar karon hocce amara evabe query chaining kortesi
  const sortQuery =  filterQuery.sort(sort);

  let page = 1;
  let limit = 1;
  let skip = 0;
  if(query.limit){
    limit = Number(query.limit);
  }
  if(query.page){
    page= Number(query.page);
    skip = (page -1) * Number(limit);
  }
 


  const paginateQuery = sortQuery.skip(skip);
 
  const limitQuery =  paginateQuery.limit(limit as number);


  let fields = '-__v'; //__v er age - dewa mane oita bad dewa 
  //fields = 'name,email'
  //convert to fields = 'name email'
  if(query.fields){
    fields = (query.fields as string).split(",").join(" ");
  }

  const filedQuery = await limitQuery.select(fields);
  return filedQuery;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id: id }); //{id} manei id: id
  const result = await Student.findOne({id: id}).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });
  return result;
};

const updateStudentIntoDB = async (id: string, payLoad : Partial<TStudent>) => {
  // const result = await Student.findOne({ id: id }); //{id} manei id: id
  const {name, guardian, localGuardian, ...remainingStudentData} = payLoad; 
  const modifiedUpdatedData : Record<string,unknown> = {...remainingStudentData}  

  if(name && Object.keys(name).length){
    for(const [key,value] of Object.entries(name)){
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if(guardian && Object.keys(guardian).length){
    for(const [key,value] of Object.entries(guardian)){
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key,value] of Object.entries(localGuardian)){
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({id: id}, modifiedUpdatedData, {new: true, runValidators: true});
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  //TODO: Transaction and rollback delete hole 2 tai hobe na hole ektao hobe na

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate({ id: id }, { isDeleted: true }, {new: true, session}); //{id} manei id: id
    if(!deletedStudent){
      throw new AppError(httpStatus.BAD_REQUEST,"Failed to delete student")
    }

    const deletedUser = await User.findOneAndUpdate(
      {id},
      {isDeleted: true},
      {new: true, session}
    )

    if(!deletedUser){
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    //commit transaction
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete student")
  }

};

export const studentServices = {
  getAllStudentDataFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB
};
