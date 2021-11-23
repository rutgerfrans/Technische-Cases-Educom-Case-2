// Packages
import express from "express";
// import {MongoClient} from "mongodb";
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
        return new weatherstation({
            stationname: station.stationname,
            weatherdescription: station.weatherdescription,
            temperature: station.temperature,
            feeltemperature: station.feeltemperature,
            groundtemperature: station.groundtemperature,
            humidity: station.humidity,
            rainFallLast24Hour: station.rainFallLast24Hour,
            rainFallLastHour: station.rainFallLastHour
        })
    });

    // Update every station in client
    weatherstations.forEach(async (station: any) => {
        await client.db.collection("weatherstations").findOneAndUpdate({stationname: station.stationname}, 
            {$set :{stationname: station.stationname,
                weatherdescription: station.weatherdescription,
                temperature: station.temperature,
                feeltemperature: station.feeltemperature,
                groundtemperature: station.groundtemperature,
                humidity: station.humidity,
                rainFallLast24Hour: station.rainFallLast24Hour,
                rainFallLastHour: station.rainFallLastHour}}, 
            {upsert: true});
    });
}

// const UpdateData = () =>{
//     db.then(async res =>{
//         console.log(res.connection.collection("users"))
        // let response = await fetch('https://data.buienradar.nl/2.0/feed/json');
        // let data = await response.json();

        // // Create Array of station objects
        // let weatherstations = data.actual.stationmeasurements.map((station: any) =>{
        //     return new weatherstation({
        //         stationname: station.stationname,
        //         weatherdescription: station.weatherdescription,
        //         temperature: station.temperature,
        //         feeltemperature: station.feeltemperature,
        //         groundtemperature: station.groundtemperature,
        //         humidity: station.humidity,
        //         rainFallLast24Hour: station.rainFallLast24Hour,
        //         rainFallLastHour: station.rainFallLastHour
        //     })
        // });

        // // Update every station in client
        // weatherstations.forEach(async (station: any) => {
        //     await res.db().collection("weatherstations").findOneAndUpdate({stationname: station.stationname}, 
        //         {$set :{stationname: station.stationname,
        //             weatherdescription: station.weatherdescription,
        //             temperature: station.temperature,
        //             feeltemperature: station.feeltemperature,
        //             groundtemperature: station.groundtemperature,
        //             humidity: station.humidity,
        //             rainFallLast24Hour: station.rainFallLast24Hour,
        //             rainFallLastHour: station.rainFallLastHour}}, 
        //         {upsert: true});
        // });
//     });
// }

// // Create client
// export const client = MongoClient.connect("mongodb+srv://rutger:"+process.env.DB_PASSWORD+"@cluster0.yh4da.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

// // Retrieves data from Buienradar and writes/updates it to the client
// const UpdateData = () =>{ 
//     client.then(async res =>{
//         // Retrieve data from Buienradar
//         let response = await fetch('https://data.buienradar.nl/2.0/feed/json');
//         let data = await response.json();

//         // Create Array of station objects
//         let weatherstations = data.actual.stationmeasurements.map((station: any) =>{
//             return new weatherstation({
//                 stationname: station.stationname,
//                 weatherdescription: station.weatherdescription,
//                 temperature: station.temperature,
//                 feeltemperature: station.feeltemperature,
//                 groundtemperature: station.groundtemperature,
//                 humidity: station.humidity,
//                 rainFallLast24Hour: station.rainFallLast24Hour,
//                 rainFallLastHour: station.rainFallLastHour
//             })
//         });

//         // Update every station in client
//         weatherstations.forEach(async (station: any) => {
//             await res.db().collection("weatherstations").findOneAndUpdate({stationname: station.stationname}, 
//                 {$set :{stationname: station.stationname,
//                     weatherdescription: station.weatherdescription,
//                     temperature: station.temperature,
//                     feeltemperature: station.feeltemperature,
//                     groundtemperature: station.groundtemperature,
//                     humidity: station.humidity,
//                     rainFallLast24Hour: station.rainFallLast24Hour,
//                     rainFallLastHour: station.rainFallLastHour}}, 
//                 {upsert: true});
//         });
//     })
// }

// Set interval
setInterval(() => {
    UpdateData();
    console.log("Data updated")},
    config.SetInterval
);

// Opstarten server
app.listen({port: 4001}, ()=> {
    console.log('server running')
})