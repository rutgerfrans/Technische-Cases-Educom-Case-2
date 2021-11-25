// Packages
import { Document, Model, model, Schema } from "mongoose";

// Define weatherstation interface
export interface Iweatherstation extends Document {
    stationname: String;
    date: String;
    weatherdescription: String;
    temperature: Number;
    feeltemperature: Number;
    groundtemperature: Number;
    humidity: Number;
    rainFallLast24Hour: Number;
    rainFallLastHour: Number;
  }
  
// Define weatherstation schema  
const weatherstationSchema: Schema = new Schema({
    stationname: {type: String },
    date: {type: String},
    weatherdescription: {type: String},
    temperature: {type: Number },
    feeltemperature: {type: Number },
    groundtemperature: {type: Number },
    humidity: {type: Number},
    rainFallLast24Hour: {type: Number },
    rainFallLastHour: {type: Number },
  });

// Export weatherstation  
export const weatherstation: Model<Iweatherstation> = model('weatherstation', weatherstationSchema);