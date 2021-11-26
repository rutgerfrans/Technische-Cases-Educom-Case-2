// Packages
import express from "express";
import { weatherstation } from "../schemas/weatherstation";

// Create router object
const router = express.Router();

// Endpoint for frondend
router.get('/:stationname/:startdate', async (req,res,next)=>{
    try{
        // Parse String value to Date value
        let date = new Date(req.params.startdate);
        
        // Default Enddate
        let PeriodInDays = 7; 
        
        // Populate dates
        let dates: any[] = [];
        for(let i = 0; i <= PeriodInDays; i++){
            dates.push(date.toLocaleDateString("en-CA")); // Parse date to right date format YYYY-MM-DD
            date.setDate(date.getDate() + 1);
        }

        // Query and return data
        const stations = await weatherstation.find({date: {$in: dates}, stationname: req.params.stationname});
        res.json({Stations: stations});
    }catch(err){
        next(err);
    }
})

// Export
export default router;