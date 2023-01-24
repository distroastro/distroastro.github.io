var DistroAstro = {
	loadPrefs: function() {
		// Distro Astro Default Preferences

		// Set the UserAgent
		var userAgent = navigator.userAgent.replace("Ubuntu", "Distro Astro");
		pref("general.useragent.override", userAgent);
		pref("general.useragent.vendor", "Distro Astro");
		pref("general.useragent.vendorComment", "Linux for Astronomers");
		pref("general.useragent.vendorSub", "3.0.2+");

		// Set the About page
		pref("distribution.about", "Mozilla Firefox for Distro Astro");
		pref("distribution.id", "Distro Astro");
		pref("distribution.version", "3.0.2 Juno");

		// Set the Homepage defaults
		pref("browser.startup.homepage", "http://www.distroastro.org/welcome/");
		pref("browser.startup.homepage_override.mstone", "ignore");
		pref("browser.EULA.override", true);

		// Handle apturl correctly
		pref("network.protocol-handler.app.apt", "/usr/bin/apturl");
		pref("network.protocol-handler.app.apt+http", "/usr/bin/apturl");
		pref("network.protocol-handler.warn-external.apt", true);
		pref("network.protocol-handler.warn-external.apt+http", true);
		pref("network.protocol-handler.expose.apt", false);
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

window.addEventListener("load", DistroAstro.loadPrefs, false);
