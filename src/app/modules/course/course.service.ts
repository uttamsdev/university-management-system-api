import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  //transaction
  const session = await mongoose.startSession();

  try {
    session.startTransaction(); //starting the transaction

    //step1: Basic course info update
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    //for transaction
    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    //check if there is any preRequite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      //filter out the deleted field

      //preRequisite Courses er moddhe courses thakle and isDeleted true hole eita kaj korbe
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course); //el.isDeleted --> isDeleted true gulo k nibe map diye sudu course gulo k nicche course id
      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          }, //deletedPreRequirestes hocce j course gulo delete korbo tar id gulo
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      //for transaction
      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      ); //isDeleted false gulo dibe
      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      //for transaction
      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
    }

    //commmit and end transaction
    await session.commitTransaction();
    await session.endSession();
    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const deleteCourseFomDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const assignFacultiesWithCourseIntoDB = async(id: string, payload: Partial<TCourseFaculty>) => {
const result  = await CourseFaculty.findByIdAndUpdate(id,
  
  {
    course: id,
    $addToSet: {faculties: {$each: payload}} //payload faculties er array
  },{
    upsert: true, //na thakle new create korbe age theke thakle ager data te add korbo
    new: true
  })

  return result;
}

const removeFacultiesFromCourseFromDB = async(id: string, payload: Partial<TCourseFaculty>) => {
  const result  = await CourseFaculty.findByIdAndUpdate(id,
    
    {
      $pull: {faculties: {$in: payload}} //payload array of faculty id
    },{
      new: true
    })
  
    return result;
  }
export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFomDB,
  updateCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB
};
