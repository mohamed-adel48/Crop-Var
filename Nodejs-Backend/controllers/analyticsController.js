const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { PrismaClient } =require( '@prisma/client');
const prisma = new PrismaClient();

exports.getTopData = catchAsync(async (req,res,next)=>{
    const assumptionTrue = await prisma.assumption.findMany({
        where: {
            status: "Right"
        }
    });
    
    const assumptionFalse = await prisma.assumption.findMany({
        where: {
            status: "Wrong"
        }
    });
    
    // Function to group assumptions by month
    function groupAssumptionsByMonth(assumptions) {
        const groupedAssumptions = {};
        assumptions.forEach(assumption => {
            const date = new Date(assumption.startDate);
            const month = date.getMonth(); // Extract month (0-indexed)
            const year = date.getFullYear(); // Extract year
            const key = `${year}-${month + 1}`; // Construct key in format "YYYY-MM"
            if (groupedAssumptions[key]) {
                groupedAssumptions[key].push(assumption);
            } else {
                groupedAssumptions[key] = [assumption];
            }
        });
        return groupedAssumptions;
    }
    
    const groupedTrueAssumptionsByMonth = groupAssumptionsByMonth(assumptionTrue);
    const groupedFalseAssumptionsByMonth = groupAssumptionsByMonth(assumptionFalse);
    
    res.status(200).json({
        totalChecks : assumptionFalse.length + assumptionTrue.length,
        false : assumptionFalse.length,
        true : assumptionTrue.length,
        groupedTrueAssumptionsByMonth,
        groupedFalseAssumptionsByMonth

    });
});