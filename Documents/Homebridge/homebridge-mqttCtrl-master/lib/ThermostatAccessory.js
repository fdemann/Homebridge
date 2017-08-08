//Thermostat service is used, as it most closely resembles the smartAc; in conjunction with the FanService, all properties of the smart aC could be controlled
//This code is a mixture of code found in the Device- and SensorAccessory.js files and on https://github.com/chaeplin/homebridge-mqtt-nest-thermostat/blob/master/index.js
'use strict'

var Accessory, Service, Characteristic;

module.exports = function (accessory, service, characteristic) {
  Accessory = accessory;
  Service = service;
  Characteristic = characteristic;

  return ThermostatAccessory;
};


function SensorAccessory(log, accessory) {
  this.TargetTemperature          = 27;
  this.TargetHeatingCoolingState  = 0;
  this.CurrentHeatingCoolingState = 0;
  this.CurrentTemperature         = 0;
  this.TemperatureDisplayUnits    = 0;
  //this.FanSpeed                   = 0;

  this.accessory = accessory;
  this.log = log;
  this.context = accessory.context;
  this.mqttClient = mqttClient;
  this.pubTopic = pubTopic;


}

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************************
//Status messages
***********************************************************************************************************************************************************************************
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
ThermostatAccessory.prototype.getStatus = function(callback) {
    var self = this;

    this.log("ThermostatAccessory(" + this.context.id + ") getStatus" );
    callback(null, self.status);
}

ThermostatAccessory.prototype.setStatus = function(status, callback, context) {
    this.log("ThermostatAccessory(" + this.context.id + ") setStatus:" + status );

    if(context !== 'fromSetValue') {
        var st = status?"On":"Off";
        var mqttMsg = '{"message":"set status","device":{"address":"' + this.context.id + '","status":"' + st + '"}}';
        //this.mqttClient("test");

        this.mqttClient.publish(this.pubTopic, mqttMsg, {qos:1});
    }
    callback();
}

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**************************************************************************************************************************************************************************************
//Property messages
***********************************************************************************************************************************************************************************
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------------------------------------------
//getProperty messages
----------------------------------------------------------------------------------------------------------------------------------------------------------*/

ThermostatAccessory.prototype.getTargetHeatingCoolingState = function(callback) {
    var self = this; //not sure if this and next line is necessary; i think just for debugging
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

ThermostatAccessory.prototype.getCurrentHeatingCoolingState = function(callback) {
    var self = this; //not sure if this and next line is necessary
    this.log("ThermostatAccessory(" + this.context.id + ") getCurrentHeatingCoolingState " + this.currentHeatingCoolingState);
    callback(null, this.CurrentHeatingCoolingState);
}

/*mqttnestthermostatAccessory.prototype.getFanSpeed = function(callback) {
    callback(null, this.Fanspeed);
}*/

//not sure if this is necessary
ThermostatAccessory.prototype.getServices = function() {
  return [this.service];
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------
//setProperty messages
----------------------------------------------------------------------------------------------------------------------------------------------------------*/

ThermostatAccessory.prototype.setTargetTemperature = function(TargetTemperature, callback, context) {
    if(context !== 'fromSetValue') {
      this.TargetTemperature = TargetTemperature;

        var mqttMsg = '{"message":"set properties","device":{"address":"' + this.context.id + '","type":"AirCondition","status":"On","properties":{"temperature":'String(this.TargetTemperature)',"mode":"0","speed":"0","direction":"0","change":"temperature"}}}'

        this.mqttClient.publish(this.pubTopic, mqttMsg, {qos:1});

    }


    callback();
}

//can be left at auto
/*ThermostatAccessory.prototype.setTargetHeatingCoolingState = function(TargetHeatingCoolingState, callback, context) {
    if(context !== 'fromSetValue') {
      this.TargetHeatingCoolingState = TargetHeatingCoolingState;
      //var mqttMsg = '{"message":"set properties","device":{"address":"' + this.context.id + '","type":"AirCondition","status":"On","properties":{"temperature":' String(this.CurrentTemperature)'"mode":' String(this.TargetHeatingCoolingState)'"speed":"0","direction":"0","change":"temperature"}}}'}}}'


      this.mqttClient.publish(this.pubTopic, mqttMsg, {qos:1});
    }
    callback();
}*/

//fan speed might be implemented later
/*mqttnestthermostatAccessory.prototype.setFanSpeed = function(Fanspeed, callback, context) {
    if(context !== 'fromSetValue') {
      this.Fanspeed = Fanspeed;
      this.client.publish(this.topics.set + 'setFanSpeed', String(this.Fanspeed), this.options_publish);
      //this.client.publish(this.topic_for_esp8266, '{"ac_flow":' + String(this.Fanspeed) + '}', this.options_publish);
    }
    callback();
}*/

thermostatAccessory.prototype.processMQTT = function(json) {
    var self = this;
    var thermostatService = this.accessory.getService(Service.Thermostat);

    if(this.context.id == json.device.address)
    {
      if(json.device.status === "On")
      {
          this.status = true;
      }
      else
      {
          this.status = false;
      }

      thermostatService.getCharacteristic(Characteristic.TargetHeatingCoolingState).setValue(that.TargetHeatingCoolingState, undefined, 'fromSetValue');
      thermostatService.getCharacteristic(Characteristic.TargetTemperature).setValue(that.TargetTemperature, undefined, 'fromSetValue');
      thermostatService.getCharacteristic(Characteristic.CurrentTemperature).setValue(that.CurrentTemperature, undefined, 'fromSetValue');
      thermostatService.getCharacteristic(Characteristic.CurrentHeatingCoolingState).setValue(that.CurrentHeatingCoolingState, undefined, 'fromSetValue');
      //thermostatService.getCharacteristic(FanSpeedCharacteristic).setValue(that.CurrentFanSpeed, undefined, 'fromSetValue');

}






//for fan speed implementation; however possibly better to use apple own FanService
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
