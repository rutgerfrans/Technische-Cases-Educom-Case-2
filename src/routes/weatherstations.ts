// Packages
import express from "express";
import { weatherstation } from "../schemas/weatherstation";

// Create router object
const router = express.Router();

// endpoint voor de buitenwereld om data uit de mongodb te lezen
router.get('/getstations', async (_req,res,next)=>{
    try{
        const stations = await weatherstation.find();
        res.json({Stations: stations});
    }catch(err){
        next(err);
    }
})

// Export
export default router;