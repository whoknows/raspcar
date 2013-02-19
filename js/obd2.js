/*
 * @author Guillaume Coste <guillaume.coste (at) gmail.com>
 * @lastModified 19/02/2013
 */

if(typeof util != "undefined"){
    var util = require('util');
}

function obdCommunicator() {
	this.ConnectionStatus = "Not connected";
	//this.something;

	// Déclaration des fonctions
	if ( typeof obdCommunicator.initialized == "undefined" ) {

		/*
		 * Connects to the ELM equipement
		 * @param interface : interface to connect to
		 * @return bool : true success, false failure
		 */
		obdCommunicator.prototype.Connect = function(Interface) {
			// connection to the elm327
			util.puts("/dev/" + Interface);
            this.ConnectionStatus = "Connected";
			return true;
		};

        /*
         * Disconnects to the ELM equipement
		 * @param interface : interface to connect to
		 * @return bool : true success, false failure
		 */
		obdCommunicator.prototype.Disconnect = function(Interface) {
			// connection to the elm327
            this.ConnectionStatus = "Not connected";
			return true;
		};

		/*
		 * Get engine coolant temperature in Celsius
		 * @return float : temperature
		 * @valueType temperature (°C)
		 */
		obdCommunicator.prototype.getEngineCoolantTemperature = function() {
			// TODO
			util.puts("0x105");
			// A-40
		};

		/*
		 * Get short term gas consomation
		 * @return float : stconso
		 * @valueType percentage (%)
		 */
		obdCommunicator.prototype.getShortTermConso = function() {
			// TODO
			util.puts("0x106");
			//(A-128) * 100/128
		};

		/*
		 * Get long term gas consomation
		 * @return float : ltconso
		 * @valueType percentage (%)
		 */
		obdCommunicator.prototype.getLongTermConso = function() {
			// TODO
			util.puts("0x107");
			//(A-128) * 100/128
		};

		/*
		 * Get fuel pressure
		 * @return float : pressure
		 * @valueType kilopascal (kpa)
		 */
		obdCommunicator.prototype.getFuelPressure = function() {
			// TODO
			util.puts("0x10A");
			//A*3
		};

		/*
		 * Get engire rounds per minute
		 * @return float : rpm
		 * @valueType float
		 */
		obdCommunicator.prototype.getEngineRPM = function() {
			// TODO
			util.puts("0x10C");
			//((A*256)+B)/4
		};

		/*
		 * Get car speed
		 * @return float : speed
		 * @valueType speed (km/h)
		 */
		obdCommunicator.prototype.getCarSpeed = function() {
			// TODO
			util.puts("0x10D");
			//A
		};

		/*
		 * Get run time since engine start
		 * @return float : time
		 * @valueType time (seconds)
		 */
		obdCommunicator.prototype.upTime = function() {
			// TODO
			util.puts("0x11F");
			//(A*256)+B
		};

		/*
		 * Get fuel level input
		 * @return float : fuel level
		 * @valueType percentage (%)
		 */
		obdCommunicator.prototype.getFuelLevel = function() {
			// TODO
			util.puts("0x12F");
			// A*100/255
		};

		/*
		 * Get relative accelerator pedal position
		 * @return float : position
		 * @valueType percentage (%)
		 */
		obdCommunicator.prototype.getGasPedalPos = function() {
			// TODO
			util.puts("0x15A");
			// A*100/255
		};

		/*
		 * Get oil temperature
		 * @return float : temperature
		 * @valueType temperature (°C)
		 */
		obdCommunicator.prototype.getOilTemperature = function() {
			// TODO
			util.puts("0x15C");
			// A - 40
		};

		/*
		 * Get engine fuel rate
		 * @return float : fuel rate
		 * @valueType Littre per hour (°L/h)
		 */
		obdCommunicator.prototype.getFuelRate = function() {
			// TODO
			util.puts("0x15E");
			// ((A*256)+B)*0.05
		};

		/*
		obdCommunicator.prototype.getTurboRPM = function() {
			// TODO
			util.puts("0x174");
		};

		obdCommunicator.prototype.getTurboTemperature = function() {
			// TODO
			util.puts("0x175");
			util.puts("0x176");
		};
		*/
	}
}
