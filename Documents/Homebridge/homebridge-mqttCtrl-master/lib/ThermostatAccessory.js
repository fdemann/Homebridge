//This is for the smart AC, as apple only has a Thermostat service, this is used to describe the AC
"use strict"

var Accessory, Service, Characteristic;

module.exports = function (accessory, service, characteristic) {
  Accessory = accessory;
  Service = service;
  Characteristic = characteristic;

  return ThermostatAccessory;
};


//initialise ThermostatAccessory
function SensorAccessory(log, accessory) {
  /*this.caption                    = config["caption"]; Probably not needed
  this.topics                     = config["topics"];*/
  this.TargetTemperature          = 27;
  this.TargetHeatingCoolingState  = 0;
  this.CurrentHeatingCoolingState = 0;
  this.CurrentTemperature         = 0;
  //this.CurrentRelativeHumidity    = 0;
  this.TemperatureDisplayUnits    = 0;
  //this.FanSpeed                   = 0;

  this.accessory = accessory;
  this.log = log;
  this.context = accessory.context;*/


}


//check if this is actually ok



/*--------------------------------------------------------------------------------------------------------------------------------------------------------
//These should be the getProperty messages (what is the current status of the AC)
----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*mqttnestthermostatAccessory.prototype.getFanSpeed = function(callback) {
    callback(null, this.Fanspeed);
}*/

ThermostatAccessory.prototype.getTargetHeatingCoolingState = function(callback) {
    var self = this; //not sure if this and next line is necessary
    this.log("ThermostatAccessory(" + this.context.id + ") getTargetHeatingCoolingState " + this.targetHeatingCoolingState);
    callback(null, this.TargetHeatingCoolingState);
}

ThermostatAccessory.prototype.getTargetTemperature = function(callback) {
    var self = this; //not sure if this and next line is necessary
    this.log("ThermostatAccessory(" + this.context.id + ") getTargetTemperature " + this.TargetTemperature);
    callback(null, this.TargetTemperature);
}

ThermostatAccessory.prototype.getCurrentTemperature = function(callback) {
    var self = this; //not sure if this and next line is necessary
    this.log("ThermostatAccessory(" + this.context.id + ") getCurrentTemperature " + this.currentTemperature);
    callback(null, this.CurrentTemperature);
}

ThermostatAccessory.prototype.getTemperatureDisplayUnits = function(callback) {
    var self = this; //not sure if this and next line is necessary
    this.log("ThermostatAccessory(" + this.context.id + ") getTemperatureDisplayUnits " + this.temperatureDisplayUnits);
    callback(null, this.TemperatureDisplayUnits);
}

/*mqttnestthermostatAccessory.prototype.getCurrentRelativeHumidity = function(callback) {
    var self = this; //not sure if this and next line is necessary
    this.log("ThermostatAccessory(" + this.context.id + ") getTargetHeatingCoolingState " + this.targetHeatingCoolingState);
    callback(null, this.CurrentRelativeHumidity);
}*/

ThermostatAccessory.prototype.getCurrentHeatingCoolingState = function(callback) {
    var self = this; //not sure if this and next line is necessary
    this.log("ThermostatAccessory(" + this.context.id + ") getCurrentHeatingCoolingState " + this.currentHeatingCoolingState);
    callback(null, this.CurrentHeatingCoolingState);
}


/*--------------------------------------------------------------------------------------------------------------------------------------------------------------
//these should be the setProperty messages (change for example the temperature)
//this set property code is more similar to the setCharacteristic ocd ein the sensorSAccessory.js filter
//HOwever it is unclear where the setCharacteristic mqtt message is definded
--------------------------------------------------------------------------------------------------------------------------------------------------------------*/


SensorAccessory.prototype.processMQTT = function(json) {
    var self = this;
    var thermostatService = this.accessory.getService(Service.Thermostat);

    //this.log("SensorAccessory processMQTT:" + json);

    if(this.context.id == json.device.address)
    {
        this.temperature = parseFloat(json.device.properties.temperature);
        temperatureService.setCharacteristic(Characteristic.CurrentTemperature, self.temperature);

        this.humidity = parseFloat(json.device.properties.humidity);
        humidityService.setCharacteristic(Characteristic.CurrentRelativeHumidity, self.humidity);

        this.pm2_5 = parseInt(json.device.properties.PM2_5);
        airQualityService.setCharacteristic(Characteristic.PM2_5Density, self.pm2_5);
        airQualityService.setCharacteristic(Characteristic.AirQuality, IdxParse(self.pm2_5));

        this.batteryLevel = parseInt(json.device.properties.batteryPercent);
        batteryService.setCharacteristic(Characteristic.BatteryLevel, self.batteryLevel);
        if(this.batteryLevel < 20)
        {
            this.statusLowBattery = Characteristic.StatusLowBattery.BATTERY_LEVEL_LOW;
            batteryService.setCharacteristic(Characteristic.BatteryLevel, self.statusLowBattery);
        }
        else
        {
            this.statusLowBattery = Characteristic.StatusLowBattery.BATTERY_LEVEL_NORMAL;
            batteryService.setCharacteristic(Characteristic.BatteryLevel, self.statusLowBattery);
        }
    }
}






/*--------------------------------------------------------------------------------------------------------------------------------------------------------------
//these should be the setProperty messages (change for example the temperature)
//this is version 1; source code for this version can be found at https://github.com/chaeplin/homebridge-mqtt-nest-thermostat/blob/master/index.js
// will is replaced with code above, as that code is more similar to SensorAccessory.js
--------------------------------------------------------------------------------------------------------------------------------------------------------------*/


//fan speed might be implemented later
/*mqttnestthermostatAccessory.prototype.setFanSpeed = function(Fanspeed, callback, context) {
    if(context !== 'fromSetValue') {
      this.Fanspeed = Fanspeed;
      this.client.publish(this.topics.set + 'setFanSpeed', String(this.Fanspeed), this.options_publish);
      //this.client.publish(this.topic_for_esp8266, '{"ac_flow":' + String(this.Fanspeed) + '}', this.options_publish);
    }
    callback();
}*/


/*
ThermostatAccessory.prototype.setTargetHeatingCoolingState = function(TargetHeatingCoolingState, callback, context) {
    if(context !== 'fromSetValue') {
      this.TargetHeatingCoolingState = TargetHeatingCoolingState;
      this.client.publish(this.topics.set + 'setTargetHeatingCoolingState', String(this.TargetHeatingCoolingState), this.options_publish);
    }
    callback();
}

ThermostatAccessory.prototype.setTargetTemperature = function(TargetTemperature, callback, context) {
    if(context !== 'fromSetValue') {
      this.TargetTemperature = TargetTemperature;
      this.client.publish(this.topics.set + 'setTargetTemperature', String(this.TargetTemperature), this.options_publish);
      //this.client.publish(this.topic_for_esp8266, '{"ac_temp":' + String(this.TargetTemperature) + '}', this.options_publish);
    }
    callback();
}







//?
ThermostatAccessory.prototype.getServices = function() {
  return [this.service];
}


*/


//for fan speed implementation
/*function makeFanSpeedCharacteristic() {

    FanSpeedCharacteristic = function() {
        Characteristic.call(this, 'FanSpeed', '00011033-0000-0000-8000-0026BB765291');
        this.setProps({
          format: Characteristic.Formats.UINT8,
          maxValue: 2,
          minValue: 0,
          minStep: 1,
          perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
        });
        this.value = this.getDefaultValue();
    };

    inherits(FanSpeedCharacteristic, Characteristic);
    FanSpeedCharacteristic.LOW  = 0;
    FanSpeedCharacteristic.MID  = 1;
    FanSpeedCharacteristic.HIGH = 2;*/
