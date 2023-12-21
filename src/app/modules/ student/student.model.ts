import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';


//Creating schema of mongoose

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name must be entered'], //ekahne required true er sathe error msg dilte hole evabe dite hoi array er moddhe
    trim: true, //trim true kore dile data save korar somoy samne pichoner extra space remove kore dibe.
    maxlength: [20, 'First name cannot be more than 20 character '], // firstname er length 20 character er besi hobe na dile error dibe
    // same vabe amra buit in min max use korte pari j min & max value koto hobe seta fixed kore dite pari kono kicur
    // min:

    //CUSTOM VALIDATOR
    //eta amdr banano. Ekhane user jodi first name capatalized form e na dei to error dibe
    validate: {
      validator: function (value: string) {
        const firstNameValue = value.charAt(0).toUpperCase() + value.slice(1);
        return value === firstNameValue; // value r firstNamevalue same hole return korbe only
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: {
    type: String,
    trim: true,
    //validate using validator npm package
    validate: {
      validator: (value: string) => validator.isAlpha(value), //alpha numberic value dile error dibe
      message: '{VALUE} is not valid', //error msg
    },
  },
  lastName: {
    type: String,
    required: [true, 'Last name must be entered'],
    trim: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
});

//creating student schema with custom method
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true }, //unique true dewai duplicate value ba id insert hobe na
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User' //referencing --> User model er sathe referencing korlam
  },
  name: {
    type: userNameSchema,
    required: true, //name na dileo data insert hoie jachilo se jonno required true kore dilam r type evabe dilam
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid', //ekhane value hocce user j value dibe setqa
    },
    required: true,
  }, //eta mongoose er enum default value
  dateOfBirth: { type: Date },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email type',
    },
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], //ei gulo enum diye default value kore dicchi ei value chara onno value accept korbe na
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String, trim: true },
  admissionSemester: {type: Schema.Types.ObjectId, ref: 'AcademicSemester'},
  academicDepartment: {type: Schema.Types.ObjectId, ref: 'AcademicDepartment'},
  isDeleted: {
    type: Boolean,
    default: false 
  }
},{
  //enabling virtual
  toJSON: {
    virtuals: true
  }
});

//Virtual
//amder document e fullName name e kono filed nai, fistname, lastname r middlename concat kore virtual er maddhome fullName name e ekta filed add kore dibe
// vitual use korte hobe schema er moddhe virtual k enable kort hoi schema er last e 
studentSchema.virtual('fullName').get(function(){
  return (
    `${this?.name?.firstName}  ${this?.name?.middleName}  ${this?.name?.lastName}`
  )
})



///TODO: Query middleware
studentSchema.pre('find', function(next){
  this.find({isDeleted: {$ne: true}}) 
  next()
})

studentSchema.pre('findOne', function(next){
  this.find({isDeleted: {$ne: true}}) 
  next()
})

///Aggreegate
studentSchema.pre('aggregate', function(next){
  this.pipeline().unshift({$match: {isDeleted: {$ne: true}}}) //ekhane ei query ta pipeline e er first e push kore dewa hocce unshit use kore array er first e 
  next()
})




//Creating a custom static method
studentSchema.statics.isUserExists = async function(id: string){
  const existingUser = await Student.findOne({id: id});
  return existingUser;
}

//creating user model
export const Student = model<TStudent, StudentModel>('Student', studentSchema); //Student nam er model create korlam studentSchema er
