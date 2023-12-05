import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress'
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }, // timestamps true dile data createdAt and UpdatedAt 2 ta filed rakhbe auto
);

///TODO: Document Middleware
userSchema.pre('save', async function(next){ //save event er name, data save howar age hook ta call hobe
  // console.log(this, "pre hook: we will save the data")
   //hashing password and save into db
   //this keyword diye database e pathano document ta pawa jai

   // eslint-disable-next-line @typescript-eslint/no-this-alias
   const user = this;
   user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds)) //user.password e hashed password ta db te jabe
   next();
   
})

///TODO: Document Milleware post
//post save middleware/hook
userSchema.post('save', function(doc, next){ //data save howar pore hook ta call hobe
  // console.log(this, 'post hook: we saved our data')
  //doc ta updated document jeta database e save hoise

  doc.password=''; //password k empty string kore dialm
  next();
})
export const User = model<TUser>('User', userSchema);