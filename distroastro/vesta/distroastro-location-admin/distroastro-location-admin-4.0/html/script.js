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
	checkLocationInfo();
	checkAutoUpdateStatus();
}

function window_resize(event) {
	var messagearea = document.getElementsByClassName("messagearea")[0];
	var settingsarea = document.getElementsByClassName("settingsarea")[0];

	var messageareaHeight = messagearea.clientHeight;
	var settingsareaHeight = settingsarea.clientHeight;
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;

	var buttonbar = document.getElementsByClassName("buttonbar")[0];
	buttonbar.style.top = Math.max(windowHeight - 60, 500) + "px";
	buttonbar.style.width = windowWidth - 40 + "px";
	var buttonbarHeight = buttonbar.clientHeight;

	var outputbox = document.getElementsByClassName("outputbox")[0];
	outputbox.style.top = messageareaHeight + "px";
	outputbox.style.height = windowHeight - messageareaHeight - settingsareaHeight - buttonbarHeight - 120 + "px" ;
	outputbox.style.width = windowWidth - 60 + "px";
}

function checkLocationInfo() {
	var locationinfo = Shell.eval("/usr/bin/location --all", true) + "\n";
	var showmapbutton = document.getElementById("showmapbutton");
	var editlocbutton = document.getElementById("editlocbutton");
	var outputbox = document.getElementsByClassName("outputbox")[0];
	outputbox.innerHTML = showmapbutton.innerHTML + locationinfo + editlocbutton.innerHTML;
	return setTimeout(checkLocationInfo, 1000);
}

function checkAutoUpdateStatus() {
	document.getElementById("updateappsauto").checked = FileSystem.exist(Env.read("HOME") + "/.config/autostart/autolocation.desktop");
	document.getElementById("updatesysauto").checked = FileSystem.exist("/etc/network/if-up.d/autolocation");
	return setTimeout(checkAutoUpdateStatus, 200);
}

function updateSysAuto(checkbox) {
	if (checkbox.checked) {
		var exitcode = Shell.run("gksudo --description='" + document.title + "' '/usr/bin/autolocation autostart'", true);
		if (exitcode) checkbox.checked = false;
	}
	else {
		var exitcode = Shell.run("gksudo --description='" + document.title + "' '/usr/bin/autolocation dontautostart'", true);
		if (exitcode) checkbox.checked = true;
	}
}

function updateAppsAuto(checkbox) {
	if (checkbox.checked) {
		var exitcode = Shell.run("/usr/bin/autolocation on", true);
	}
	else {
		var exitcode = Shell.run("/usr/bin/autolocation off", true);
	}
}

function updateSysNow() {
	var exitcode = Shell.run("gksudo --description='" + document.title + "' '/usr/bin/autolocation'", true);
	var msg = "";
	switch(exitcode) {
		case 0:
			msg = "Your location has been updated.";
			break;
		case 1:
			break;
		case 68:
			msg = "We were unable to retrieve updated location from the network. Please check if your computer is connected to the Internet or a GPS.";
			break;
		case 69:
			msg = "Your location has not changed. There is no need to update.";
			break;
		case 70:
			msg = "Your location has user-defined values. To protect the values you entered, it will not be updated automatically.\n\nYou can force an update by typing: 'sudo update-location --force'";
			break;
		case 77:
			msg = "Your location was not updated due to a permissions error."
			break;
		case 255:
			break;
		default:
			msg = "Your location was not updated. Error number: " + exitcode;
	}
	if (msg) alert(msg);
}

function updateAppsNow() {
	var exitcode = Shell.run("/usr/bin/autolocation set", true);
	var msg = exitcode ? "Your application settings were not updated." : "Your application location settings have been updated."
	alert(msg);
}

function showmap() {
	window.openApp('file:///usr/share/distroastro/location/map.html', '', 'width=640, height=640, icon=location-admin, title="Location Map"')
}

function editloc() {
	window.showModalDialog('input/input-location.html', '', 'dialogWidth: 350px; dialogHeight: 170px;')
}

function showhelp() {
	window.openApp('help/location-admin-help.html', '', 'width=480, height=640, icon=help, title="Location Settings Help"')
}

window.addEventListener("load", window_load, false);
window.addEventListener("load", window_resize, false);
window.addEventListener("resize", window_resize, false);

