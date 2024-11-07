import { catchAsyncErrors } from "./CatchAsyncError.js";
import ErrorHandler from "./errorMiddleware.js";
import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsyncErrors(async (req,res,next) =>{
  const token = req.cookies.adminToken;
  if(!token){
      return next(new ErrorHandler("Admin Not Authenticated",400));
  }
  const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if(req.user.role!=="Admin"){
      return next(new ErrorHandler(`${req.user.role} is not authorized`,403));
  }
  next();
});

export const isUserAuthenticated = catchAsyncErrors(async (req,res,next)=>{
  const token = req.cookies.studentToken;
  if(!token){
    return next(new ErrorHandler("You are not authenticated, please login",401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if(req.user.role!=="Student"){
    return next(new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403));
  }
  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource!`
        )
      );
    }
    next();
  };
};



