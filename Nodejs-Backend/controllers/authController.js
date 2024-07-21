const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { PrismaClient } =require( '@prisma/client');
const {promisify} = require("util");
const prisma = new PrismaClient();

const signToken = (id) => {
    return jwt.sign({ id }, "secret", {
        expiresIn: "90d",
    });
};
exports.createAdmin = catchAsync(async (req,res,next)=>{
    const {username,password} = req.body;
    if(!username || !password){
        return next(new AppError("username and password are required!", 400));
    }
    const exist =  await prisma.admin.findUnique({
        where:{
            username : username
        }
    });
    if (exist){
        return next(new AppError("username already exists!", 400));
    }
    const hash = await bcrypt.hash(password,12);
    const user = await prisma.admin.create({
        data:{
            username:username,
            password:hash,
        }
    });
    res.status(200).json({
        user
    });
});
exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    if(!username || !password){
        return next(new AppError("username and password are required!", 400));
    }
    const user = await prisma.admin.findUnique({
        where:{
            username : username
        }
    });
    if (!user || !(await bcrypt.compare(password,user.password))) {
        return next(new AppError("incorrect data send!", 403));
    }
    const token = signToken(user.id);
    req.user = user;
    res.status(200).json({
        user,
        token
    });
});
exports.isLoggedIn = catchAsync(async (req,res,next)=>{
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(new AppError("Please Log in first", 403));
    }
    const decoded = await promisify(jwt.verify)(token, "secret");
    const freshUser = await prisma.admin.findUnique({
        where:{
            id:decoded.id,
        }
    });
    if (!freshUser) {
        return next(
            new AppError("the user with this token does no longer exist", 403)
        );
    }
    console.log(freshUser);
    req.user = freshUser;
    next();
});