const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { PrismaClient } =require( '@prisma/client');
const prisma = new PrismaClient();
exports.getPlantById = catchAsync(async (req,res,next)=>{
    const {id} = req.params;
    const plant = await prisma.plant.findUnique({
       where : {
        id : +id,
       }
    });
    res.status(201).json({
        plant
    });
});
exports.createPlant = catchAsync(async(req,res,next)=>{
    const {name ,fertlizerConsumption } = req.body;
    const plant = await prisma.plant.create({
        data:{
            name,
            fertlizerConsumption,
            photo:req.url,
            
        }
    });
    res.status(201).json({
        plant
    });
});
exports.getAll = catchAsync(async (req,res,next)=>{
    const plants = await prisma.plant.findMany({

    });
    res.status(200).json({
        plants
    });
});