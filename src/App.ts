// Packages
import express from "express";
//import {connect} from "mongoose";
import {MongoClient} from "mongodb";
import fetch from "cross-fetch";
import weatherstationroute from "./routes/Weatherstation";
import { weatherstation } from "./schemas/weatherstation";
//import { weatherstation } from "./schemas/weatherstation";
require('dotenv').config()

const app = express()

// Routes
app.use('/Weatherstation', weatherstationroute);

// set interval
const client = MongoClient.connect("mongodb+srv://rutger:"+process.env.DB_PASSWORD+"@cluster0.yh4da.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
client.then(async res => {
    let response = await fetch('https://data.buienradar.nl/2.0/feed/json');
    let data = await response.json();

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
    await res.db().collection("weatherstations").updateMany(weatherstations, {upsert: true});

})

// Opstarten server
app.listen({port: 4001}, ()=> {
    console.log('server running')
})

// een functie die data van buienradar api ophaalt


// een functie die data in een mongodb schrijft


// endpoint voor de buitenwereld om data uit de mongodb te lezen