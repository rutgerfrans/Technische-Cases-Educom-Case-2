// Packages
import { Document, Model, model, Schema } from "mongoose";

// Define weatherstation interface
export interface Iweatherstation extends Document {
    stationname: String;
    weatherdescription: String;
    temperature: String;
    feeltemperature: String;
    groundtemperature: String;
    humidity: String;
    rainFallLast24Hour: String;
    rainFallLastHour: String;
  }
  
// Define weatherstation schema  
const weatherstationSchema: Schema = new Schema({
    stationname: {type: String },
    weatherdescription: {type: String},
    temperature: {type: String },
    feeltemperature: {type: String },
    groundtemperature: {type: String },
    humidity: {type: String},
    rainFallLast24Hour: {type: String },
    rainFallLastHour: {type: String },
  });

// Export weatherstation  
export const weatherstation: Model<Iweatherstation> = model('weatherstation', weatherstationSchema);