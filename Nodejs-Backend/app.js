const express = require("express");
const app = express();
const cors = require("cors");
const errorController = require("./controllers/errorController");
const authRouter = require('./routers/authRouter');
const farmerRouter = require('./routers/farmerRouter');
const plantRouter = require('./routers/plantRouter');
const farmLocationRouter = require('./routers/farmLocationRouter');
const assumptionRouter = require('./routers/assumptionRouter');
const predictionRouter = require('./routers/predictionRouter');
const analyticsRouter = require('./routers/analyticsRouter');
const predictionController = require("./controllers/predictionController");
const cron = require('node-cron');
cron.schedule("0 0 * * *",async()=>{
    await predictionController.autoPredict();
});

app.use(express.json());

app.use(cors());

app.use('/api/auth' ,authRouter );
app.use('/api/farmer' ,farmerRouter );
app.use('/api/location' ,farmLocationRouter );
app.use('/api/plant' ,plantRouter );
app.use('/api/assumption' ,assumptionRouter );
app.use('/api/prediction' ,predictionRouter );
app.use('/api/analytics' ,analyticsRouter );
app.all("*",(req,res,next)=>{
    res.status(404).json({
        message: "wrong URL",
    });
});
app.use(errorController);
module.exports=app;