// Packages
import express from "express";
import { weatherstation } from "../schemas/weatherstation";

// Create router object
const router = express.Router();

// endpoint voor de buitenwereld om data uit de mongodb te lezen
router.get('/getstations/:startdate', async (req,res,next)=>{
    try{
        let date = new Date(req.params.startdate);
        let PeriodInDays = 7; // Default
        let dates: any[] = [];
        for(let i = 0; i <= PeriodInDays; i++){
            dates.push(date.toLocaleDateString("en-CA"));
            date.setDate(date.getDate() + 1);
        }
        const stations = await weatherstation.find({date: {$in: dates}});
        res.json({Stations: stations});
    }catch(err){
        next(err);
    }
})

// Export
export default router;