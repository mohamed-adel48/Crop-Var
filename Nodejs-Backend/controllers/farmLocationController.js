const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { PrismaClient } =require( '@prisma/client');
const prisma = new PrismaClient();
exports.createLatLongs = catchAsync(async (req, res, next) => {
    const latLungs = req.body.latlungs;
    if (!latLungs || !Array.isArray(latLungs)) {
        return next(new AppError("latlungs array is required!", 400));
    }
    
    for (const latlung of latLungs) {
        await prisma.latlong.create({
            data: {
                lang: latlung.lng,
                lat: latlung.lat,
                locationId: req.locationId
            }
        });
    }
    
    next();
});
exports.createFarmLocation = catchAsync(async(req,res,next)=>{
    const {farmerId} = req.body;
    const {nationalId} = req.body;
    console.log(req.body);
    let location;
    if (!farmerId&&!nationalId){
        return next(new AppError("farmerId or members required",400));
    }
    if (!farmerId){
        const farmer = await prisma.user.findUnique({
            where:{
                nationalId,
            }
        });
        console.log(farmer);
        location = await prisma.location.create({
            data:{
                farmerId:+farmer.id,
                adminId  : req.user.id
            }
        });
    }else if (!nationalId){
        location = await prisma.location.create({
            data:{
                farmerId:+farmerId,
                adminId  : req.user.id
            }
        });
    }
    
    req.locationId = location.id;
    next();
});
exports.getLocations = catchAsync(async (req,res,next)=>{
    const locations = await prisma.location.findMany({
        include:{
            farmer:true,
            assumption:true
        }
    });
    res.status(200).json({
        locations
    });
});

exports.getUserLocations = catchAsync(async (req,res,next)=>{
    const farmerId = req.params.id;
    const locations = await prisma.location.findMany({
        where:{
            farmerId,
        },
        include:{
            assumption:true
        }
    });
    res.status(200).json({
        locations,
    });
});

exports.getLocationById = catchAsync(async (req,res,next)=>{
    const {id} = req.params;
    const location = await prisma.location.findUnique({
        where:{
            id,
        },
        include:{
            farmer:true,
            assumption:true
        }
    });
    if (!location){
        return next(new AppError("No location found with this id!",404));
    }
    res.status(200).json({
        location
    });
});
