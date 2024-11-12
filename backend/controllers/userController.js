import { catchAsyncErrors } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../middlewares/ErrorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";


export const userRegister = catchAsyncErrors(async (req,res,next) =>{
    if(req.files){
        const {profilePicture} = req.files;
        const allowedFormats = ["image/png","image/jpeg","image/webp"];
        if(!allowedFormats.includes(docAvatar.mimetype)){
            return next(new ErrorHandler("Invalid file format",400));
        }
        const{
            firstName,
            lastName,
            email,
            phone,
            password,
            gender,
            dob,
            enrollmentNumber,
        }=req.body;
        if( !firstName||
            !lastName||
            !email||
            !phone||
            !password||
            !gender||
            !dob||
            !enrollmentNumber){
                return next(new ErrorHandler("Please fill full form",400));
            }
        let user =await User.findOne({email});
        if(user){
            return next(new ErrorHandler("Email already exists",400));
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(
            profilePicture.tempfilepath
        )
        if(!cloudinaryResponse||cloudinaryResponse.error){
            console.error("Cloudinary Error",cloudinaryResponse.error||"Invalid cloudinary response");
        }
    
        user = await User.create({
          firstName,
          lastName,
          email,
          phone,
          password,
          gender,
          dob,
          enrollmentNumber,
          profilePicture: cloudinaryResponse.secure_url,
          role: "Student",
        });
        generateToken(user,"User Registered",200,res);  
    }

    const{
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        enrollmentNumber,
    }=req.body;
    if( !firstName||
        !lastName||
        !email||
        !phone||
        !password||
        !gender||
        !dob||
        !enrollmentNumber){
            return next(new ErrorHandler("Please fill full form",400));
        }
    let user =await User.findOne({email});
    if(user){
        return next(new ErrorHandler("Email already exists",400));
    }

    user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      enrollmentNumber,
      role: "Student",
    });
    generateToken(user,"User Registered",200,res);
});
export const login = catchAsyncErrors(async (req,res,next) =>{
    const {email,password,role} = req.body;
    if(!email||!password||!role){
        return next(new ErrorHandler("Please fill full form",400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",400));
    }
    if(role!==user.role){
        return next(new ErrorHandler("User With this role not found",400));
    }
    generateToken(user,"Login Successful",200,res);
});

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res
      .status(201)
      .cookie("studentToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "User Logged Out Successfully.",
      });
  });

export const logoutAdmin = catchAsyncErrors(async (req, res, next)=>{
    res
      .status(201)
      .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "User Logged Out Successfully.",
      });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
      success: true,
      data: user,
    });
});
