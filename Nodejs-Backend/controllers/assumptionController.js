const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { PrismaClient } =require( '@prisma/client');
const prisma = new PrismaClient();
exports.deleteAssumption = catchAsync(async(req,res,next)=>{
    const {id} = req.params;
    await prisma.assumption.delete({
        where:{
            id:+id
        }
    });
    res.status(204).json({
        message:"deleted"
    });
});
exports.editAssumption = catchAsync(async (req,res,next)=>{
    const {id} = req.params;
    const {result , planted} = req.body;
    let assumption = await prisma.assumption.findUnique({
        where:{
            id :+id,

        }
    });
    if (!assumption){
        return next(new AppError("no assumption found!",404));
    }
    const equal = +planted === +result;
    
    assumption=  await prisma.assumption.update({
        where:{
            id:+id
        }
        ,
        data:{
            plantId_farmer:+planted,
            plantId_ai:+result,
            status:equal?"Right":"Wrong",
            
        }
    });
    res.status(201).json({
        assumption,
    })
});
exports.getAssumptionByUserId = catchAsync(async (req,res,next)=>{
    const {id} = req.params;
    const assumption = await prisma.assumption.findMany({
        where:{
            userId : +id,
        },
        include:{
            farmer:true,
            location:{
                include:{
                    latlongs:true,
                }
            },
            ai_Assumption:true,
            farmerAssumption:true,
            
        }
    });
    if (!assumption){
        return next(new AppError("No assumption found with this id!",404));
    }
    res.status(200).json({
        assumption
    });
});
exports.getAssumptionById = catchAsync(async (req,res,next)=>{
    const {id} = req.params;
    const assumption = await prisma.assumption.findUnique({
        where:{
            id : +id,
        },
        include:{
            farmer:true,
            location:{
                include:{
                    latlongs:true,
                }
            },
            ai_Assumption:true,
            farmerAssumption:true,
            
        }
    });
    if (!assumption){
        return next(new AppError("No assumption found with this id!",404));
    }
    res.status(200).json({
        assumption
    });
});
exports.getAssumptions = catchAsync(async (req,res,next)=>{
    const assumptions = await prisma.assumption.findMany({
        include:{
            farmer:true,
            ai_Assumption:true,
            farmerAssumption:true
        }
    });
    res.status(200).json({
        assumptions,
    });
});
exports.plantingLocation = catchAsync(async(req,res,next)=>{
    const {plantId ,startDate,farmerId,nationalId} = req.body;
    if (!plantId||!startDate||(!farmerId&&!nationalId)){
        return next( new AppError("plantId,startDate,farmerId are required!",400));
    }
    let farmer ;
    if (!farmerId){
        farmer = await prisma.user.findUnique({
            where:{
                nationalId,
            }
        });
    }else {
        farmer = await prisma.user.findUnique({
            where:{
                id:+farmerId,
            }
        });
    }
    const startDateFromString = new Date(startDate);
    const planting = await prisma.assumption.create({
        data:{
            startDate:startDateFromString,
            userId:+farmer.id,
            locationId:req.locationId,
            plantId_farmer:+plantId,
        }
    });
    res.status(201).json({
        planting,
    });
});