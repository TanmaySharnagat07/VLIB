export const catchAsyncErrors=(thefunction)=>{
    return (req,res,next)=>{
        thefunction(req,res,next).catch(next);
    };
}