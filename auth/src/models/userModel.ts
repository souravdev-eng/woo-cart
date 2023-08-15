import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface UserAttars {
  name: string;
  email: string;
  password: string;
  conformPassword: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attars: UserAttars): UserDoc;
  comparePassword(userPassword: string, userDBPassword: string): Promise<boolean>;
}

interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  conformPassword: string;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    conformPassword: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        // delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.conformPassword = undefined as any;
  }
  next();
});

userSchema.statics.comparePassword = async (userPassword: string, userDBPassword: string) => {
  return await bcrypt.compare(userPassword, userDBPassword);
};

userSchema.statics.build = (attars: UserAttars) => {
  return new User(attars);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
