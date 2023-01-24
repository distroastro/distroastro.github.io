/*

################################################################################
#                                                                              #
# Distro Astro Location Admin                                                  #
# Version 4.0                                                                  #
#                                                                              #
# Copyright (C) 2016 Bamm Gabriana.                                            #
#                                                                              #
# This program is free software; you can redistribute it and/or modify         #
# it under the terms of the GNU General Public License as published by         #
# the Free Software Foundation; either version 2 of the License, or            #
# (at your option) any later version.                                          #
#                                                                              #
# This program is distributed in the hope that it will be useful,              #
# but WITHOUT ANY WARRANTY; without even the implied warranty of               #
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                #
# GNU General Public License for more details.                                 #
#                                                                              #
# You should have received a copy of the GNU General Public License            #
# along with this program. If not, see <http://www.gnu.org/licenses/>          #
#                                                                              #
# On Debian systems, the complete text of the GNU General Public License       #
# version 2 and 3 can be found in                                              #
# "/usr/share/common-licenses/GPL-2" and "/usr/share/common-licenses/GPL-3".   #
#                                                                              #
################################################################################

*/

function window_load(event) {
	latitude = document.getElementById("latitude");
	longitude = document.getElementById("longitude");
	latitude.value = Shell.eval("location -ls");
	longitude.value = Shell.eval("location -Ls");
	validateInput();
}

function window_resize(event) {
	var textinput = document.getElementsByClassName("textinput");
	textinput[0].style.width = window.innerWidth - 118 + "px";
	textinput[1].style.width = window.innerWidth - 118 + "px";
}

function window_keydown(event) {
	var key = event.keyCode;
	var alt = event.altKey;
	var ctrl = event.ctrlKey;
	var shift = event.shiftKey;

	var esc = 27;
	var enter = 13;

	switch(key) {
	case esc:
		window.close();
		break;
	case enter:
		updateSysManual();
		break;
	}
}

function validateInput() {
	document.getElementById("buttonok").disabled = testInputValues();
}

function testInputValues() {
	var Lat = latitude.value - 0;
	var Long = longitude.value - 0;
	var curLat = Shell.eval("location -ls") - 0;
	var curLong = Shell.eval("location -Ls") - 0;
	return isNaN(Lat) || isNaN(Long) || latitude.value == "" || longitude.value == "" || (Lat == curLat && Long == curLong);
}

function updateSysManual() {
	var Lat = latitude.value - 0;
	var Long = longitude.value - 0;
	if (testInputValues()) return;
	var exitcode = Shell.run("gksudo --description='" + document.title + "' 'update-location --force " + Lat + " " + Long + "'", true);
	var msg = "";
	switch(exitcode) {
		case 0:
			Shell.run("gksudo update-location --reload", true);
			Shell.run("autolocation set", true);
			break;
		case 1:
			break;
		case 65:
			msg = "No address was found for this location.";
			break;
		case 69:
			msg = "Your location has not changed. There is no need to update.";
			break;
		case 75:
			msg = "Unable to retrieve location details. Please check if your computer is \nconnected to the Internet.";
			break;
		case 255:
			break;
		default:
			msg = "Your location was not updated. Error number: " + exitcode;
	}
	if (msg) alert(msg);
	if (exitcode == 0 || exitcode == 69) window.close();
}

window.addEventListener("load", window_load, false);
window.addEventListener("load", window_resize, false);
window.addEventListener("resize", window_resize, false);
window.addEventListener("keydown", window_keydown, false);

