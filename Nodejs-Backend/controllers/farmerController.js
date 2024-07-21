const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { PrismaClient } =require( '@prisma/client');
const prisma = new PrismaClient();
exports.deleteFarmer = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    await prisma.user.delete({
        where:{
            id:+id
        }
    });
    res.status(204).json({
        message:"deleted"
    });
});
exports.createFarmer = catchAsync(async(req,res,next)=>{
    const farmer = await prisma.user.create({
        data:{
            
            farmerCard :  req.farmerCard,
            photo: req.profile,
            ...req.body,
            adminId  : req.user.id
            

        }
    });
    console.log(req.body);
    res.status(201).json({
        farmer
    });
});
exports.updateFarmer = catchAsync(async(req,res,next)=>{
    const farmerId = req.params.id;
    const farmer = await prisma.user.update({
        where:{
            id:+farmerId
        },
        data:{
            ...req.body
        }
    });
    res.status(201).json({
        farmer
    });

});
exports.getFarmers = catchAsync(async (req,res,next)=>{
    const farmers = await prisma.user.findMany({

    });
    res.status(200).json({
        farmers
    });
});
exports.getFarmer = catchAsync(async(req,res,next)=>{
    const farmerId = +req.params.id;
    const farmer = await prisma.user.findUnique({
        where:{
            id:farmerId,
        }
    });
   
    res.status(200).json({
        farmer
    })
});
exports.sendWarning = catchAsync(async(req,res,next)=>{
    const farmerId=req.params.id;
    const farmer = await prisma.user.update({
        where:{
            id:farmerId,
        },
        data:{
            warningCount:{
                increment:1
            }
        }
    });
    res.status(200).json({
        farmer
    })
});
