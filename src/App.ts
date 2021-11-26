// Packages
import express from "express";
import mongoose from "mongoose";
import fetch from "cross-fetch";
import weatherstationroute from "./routes/weatherstations";
import { weatherstation } from "./schemas/weatherstation";
import {config} from "./config/default";
require('dotenv').config()

const app = express()

// Routes
app.use('/weatherstation', weatherstationroute);

// Create client
mongoose.connect("mongodb+srv://rutger:"+process.env.DB_PASSWORD+"@cluster0.yh4da.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
const client = mongoose.connection;

// Retrieves data from Buienradar and writes/updates it to the client
const UpdateData = async () =>{
    let response = await fetch('https://data.buienradar.nl/2.0/feed/json');
    let data = await response.json();

    // Create Array of station objects
    let weatherstations = data.actual.stationmeasurements.map((station: any) =>{
        const date = station.timestamp.split("T");
        return new weatherstation({
            stationname: station.stationname,
            date: date[0],        
            weatherdescription: station.weatherdescription,
            temperature: station.temperature,
            feeltemperature: station.feeltemperature,
            groundtemperature: station.groundtemperature,
            humidity: station.humidity,
            rainFallLast24Hour: station.rainFallLast24Hour,
            rainFallLastHour: station.rainFallLastHour
        })
    }); 

    // Update every station in client if day date not the same
    weatherstations.forEach(async (station: any) => {
        await client.db.collection("weatherstations").findOneAndUpdate({date: station.date, stationname: station.stationname}, 
            {$set :{stationname: station.stationname,
                weatherdescription: station.weatherdescription,
                date: station.date,
                temperature: station.temperature,
                feeltemperature: station.feeltemperature,
                groundtemperature: station.groundtemperature,
                humidity: station.humidity,
                rainFallLast24Hour: station.rainFallLast24Hour,
                rainFallLastHour: station.rainFallLastHour}}, 
            {upsert: true});
    });
    console.log("Data updated")
}

// Set interval
setInterval(() => {
    UpdateData();},
    config.SetInterval
);

// Start server
app.listen({port: 4001}, ()=> {
    console.log('server running')
})