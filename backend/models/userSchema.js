import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name should have at least 3 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name should have at least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone Number should have at least 10 characters"],
    maxLength: [10, "Phone Number should have at least 10 characters"],
  },
  enrollmentNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const pattern = /^BT22(CME|MEC|EEE|CSE|MIN|META)\d{6}$|^BT22ECE\d{3}$/;
        return pattern.test(v);
      },
      message: (props) => `${props.value} is not a valid enrollment number!`,
    },
  },
  dob: {
    type: Date,
    required: [true, "DOB is necessary"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password have at least 6 characters"],
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Student"],
  },
  profilePicture: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", // Use a full URL as default value
  },
  booksBorrowed: [
    {
      booksId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      date: { type: Date, default: Date.now },
      quantity: {
        type: Number,
        default: 1,
        required: [true, "Quantity is required"],
        min: [1, "Quantity cannot be less than 1"],
      }
    },
  ],
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES });
}

export const User = mongoose.model("User", userSchema);
