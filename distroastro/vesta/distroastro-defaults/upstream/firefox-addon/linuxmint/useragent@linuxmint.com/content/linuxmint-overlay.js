var LinuxMint = {
	loadPrefs: function() {
		var userAgent = navigator.userAgent.replace("Ubuntu", "Linux Mint");
		pref("general.useragent.override", userAgent);
		pref("general.useragent.vendor", "Linux Mint");
	}
}

function pref(aPrefRootName, aValue) {
	var aPrefRoot = /(?:^(.+\.))?/.exec(aPrefRootName)[1];
	var aPrefName = /(?:\.([^.]+))?$/.exec(aPrefRootName)[1];
	var nsIPrefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	var nsIPrefBranch = nsIPrefService.getDefaultBranch(aPrefRoot);
	switch (typeof aValue) {
	case "boolean": nsIPrefBranch.setBoolPref(aPrefName, aValue);
	case "number":  nsIPrefBranch.setIntPref(aPrefName, aValue);
	case "string":  nsIPrefBranch.setCharPref(aPrefName, aValue);
	}
}

window.addEventListener("load", LinuxMint.loadPrefs, false);
