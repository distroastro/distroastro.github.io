// Distro Astro Default Preferences

// Set the UserAgent
user_pref("general.useragent.vendor", "Distro Astro");
user_pref("general.useragent.vendorComment", "Linux for Astronomers");
user_pref("general.useragent.vendorSub", "3.0.2+");

// Set the Homepage defaults
user_pref("browser.startup.homepage", "http://www.distroastro.org/welcome/");
user_pref("browser.startup.homepage_override.mstone", "ignore");
user_pref("browser.EULA.override", true);

// Tab options: Don't show new tab page
user_pref("browser.newtabpage.enabled", false);
user_pref("browser.newtab.url", "about:blank");

// Don't show browser rights
user_pref("browser.rights.version", 3);
user_pref("browser.rights.3.shown", true);

// Don't show data reporting policy
user_pref("toolkit.telemetry.reportingpolicy.firstRun", false);

// Tab options: Load links in background tab
user_pref("browser.tabs.loadBookmarksInBackground", true);
user_pref("browser.tabs.loadDivertedInBackground", true);

// Handle apturl correctly
user_pref("network.protocol-handler.app.apt", "/usr/bin/apturl");
user_pref("network.protocol-handler.app.apt+http", "/usr/bin/apturl");
user_pref("network.protocol-handler.warn-external.apt", true);
user_pref("network.protocol-handler.warn-external.apt+http", true);
user_pref("network.protocol-handler.expose.apt", false);

// Respect Nightvision mode
user_pref("browser.display.use_system_colors", true);

// Speed up Firefox
user_pref("network.http.pipelining", true);
user_pref("network.http.proxy.pipelining", true);
user_pref("network.http.pipelining.maxrequests", 32);
user_pref("network.http.max-persistent-connections-per-server", 32);
user_pref("network.http.max-persistent-connections-per-proxy", 32);
user_pref("network.prefetch-next", true);
user_pref("nglayout.initialpaint.delay", 0);
user_pref("ui.submenuDelay", 0);

// Save on RAM
user_pref("config.trim_on_minimize", true);
