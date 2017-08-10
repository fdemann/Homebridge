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
  this.context = accessory.context;
  this.mqttClient = mqttClient;
  this.pubTopic = pubTopic;


}



//check if this is actually ok

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
//These should be the getProperty messages (what is the current status of the AC)
----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*mqttnestthermostatAccessory.prototype.getFanSpeed = function(callback) {
    callback(null, this.Fanspeed);
}*/

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

//?
ThermostatAccessory.prototype.getServices = function() {
  return [this.service];
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------
//these should be the setProperty messages (change for example the temperature)
//this is version 1; source code for this version can be found at https://github.com/chaeplin/homebridge-mqtt-nest-thermostat/blob/master/index.js
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


//maybe can just set on auto, else if else statement
/*ThermostatAccessory.prototype.setTargetHeatingCoolingState = function(TargetHeatingCoolingState, callback, context) {
    if(context !== 'fromSetValue') {
      this.TargetHeatingCoolingState = TargetHeatingCoolingState;
      //var mqttMsg = '{"message":"set properties","device":{"address":"' + this.context.id + '","type":"AirCondition","status":"On","properties":{"temperature":' String(this.CurrentTemperature)'}}}'


      this.client.publish(this.topics.set + 'setTargetHeatingCoolingState', String(this.TargetHeatingCoolingState), this.options_publish);
    }
    callback();
}*/

ThermostatAccessory.prototype.setTargetTemperature = function(TargetTemperature, callback, context) {
    if(context !== 'fromSetValue') {
      this.TargetTemperature = TargetTemperature;

        var mqttMsg = '{"message":"set properties","device":{"address":"' + this.context.id + '","type":"AirCondition","status":"On","properties":{"temperature":'String(this.TargetTemperature)',"mode":"0","speed":"0","direction":"0","change":"temperature"}}}'

        this.mqttClient.publish(this.pubTopic, mqttMsg, {qos:1});

        //this.client.publish(this.topics.set + '{"message":"set properties","device":{"address":"' + this.context.id + '","type":"AirCondition","status":"On","properties":{"temperature":'String(this.TargetTemperature)',"mode":"0","speed":"0","direction":"0","change":"temperature"}}}'), this.options_publish);
        //this.client.publish(this.topic_for_esp8266, '{"ac_temp":' + String(this.TargetTemperature) + '}', this.options_publish);
    }
    callback();
}

//Question: Do I have to use the setTargetTemperature or the change ("Temperature")




/*--------------------------------------------------------------------------------------------------------------------------------------------------------------
//this code is just used to update the variables defined at the beginning of thermostat accessory.js and that the code in the next section is still
//to actually change the properties of the device; this would make sense as you cannot really change the properties of a sensor
--------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//unresolved
thermostatAccessory.prototype.processMQTT = function(json) {
    var self = this;
    var thermostatService = this.accessory.getService(Service.Thermostat);

    //this.log("SensorAccessory processMQTT:" + json);

    /*if(this.context.id == json.device.address)
    {   //maybe target services dont have to be set again since they have been aready set above; if this werent the case, might be problematic as 1, no property in json message for them and 2, would maybe conflict with the setCharacteristic afrom above
        //(user sets characteristic and then it is changed right away; maybe use for these two the alternative code below; or right directly in set message)


        this.TargetTemperature = parseFloat(json.device.properties.temperature); //i think up here self.mode is expectet as it uses mqtt message, so AC properties are needed; chek StatusLowBattery to see how to deal with servicethat isnt defined in the properties
        thermostatService.setCharacteristic(Characteristic.TargetTemperature, self.mode); //not sure if mode is correct (or what self. means; might be that if have to input again target temp); Edit: seems as if i have to use the name from beginning variable

        this.TargetHeatingCoolingState = parseFloat(json.device.properties.humidity);
        humidityService.setCharacteristic(Characteristic.CurrentRelativeHumidity, self.humidity);

        if (json.device.propertie.)

    }*/
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

        //thermostatService.getCharacteristic(FanSpeedCharacteristic).setValue(that.CurrentFanSpeed, undefined, 'fromSetValue');
        thermostatService.getCharacteristic(Characteristic.TargetHeatingCoolingState).setValue(that.TargetHeatingCoolingState, undefined, 'fromSetValue');
        thermostatService.getCharacteristic(Characteristic.TargetTemperature).setValue(that.TargetTemperature, undefined, 'fromSetValue');
        thermostatService.getCharacteristic(Characteristic.CurrentTemperature).setValue(that.CurrentTemperature, undefined, 'fromSetValue');
        //thermostatService.getCharacteristic(Characteristic.CurrentRelativeHumidity).setValue(that.CurrentRelativeHumidity, undefined, 'fromSetValue');
        thermostatService.getCharacteristic(Characteristic.CurrentHeatingCoolingState).setValue(that.CurrentHeatingCoolingState, undefined, 'fromSetValue');

}

















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
