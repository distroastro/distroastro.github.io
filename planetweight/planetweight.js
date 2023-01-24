
function getWeight(planet, weightOnEarth) {
	var earthMasses, earthRadii;
	if (weightOnEarth) {
		switch(planet) {
		case "mercury":
			earthMasses = 0.0552735261;
			earthRadii = 0.382512033;
			break;
		case "venus":
			earthMasses = 0.814997513;
			earthRadii = 0.948840564;
			break;
		case "earth":
			earthMasses = 1;
			earthRadii = 1;
			break;
		case "moon":
			earthMasses = 0.0123031469;
			earthRadii = 0.272400872;
			break;
		case "mars":
			earthMasses = 0.107446849;
			earthRadii = 0.532603753;
			break;
		case "jupiter":
			earthMasses = 317.828133;
			earthRadii = 11.2089807;
			break;
		case "saturn":
			earthMasses = 95.1609041;
			earthRadii = 9.44920901;
			break;
		case "uranus":
			earthMasses = 14.5357566;
			earthRadii = 4.00730625;
			break;
		case "neptune":
			earthMasses = 17.1478134
			earthRadii = 3.88266098;
			break;
		case "pluto":
			earthMasses = 0.00219182578
			earthRadii = 0.185008075;
			break;
		}
		return roundOff(weightOnEarth * earthMasses / Math.pow(earthRadii, 2));
	}
	else {
		return "";
	}
}

function getAge(planet, ageOnEarth) {
	var earthYears;
	if (ageOnEarth) {
		switch(planet) {
		case "mercury":
			earthYears = 0.240846
			break;
		case "venus":
			earthYears = 0.615
			break;
		case "earth":
			earthYears = 1;
			break;
		case "moon":
			earthYears = 1;
			break;
		case "mars":
			earthYears = 1.881;
			break;
		case "jupiter":
			earthYears = 11.86;
			break;
		case "saturn":
			earthYears = 29.46;
			break;
		case "uranus":
			earthYears = 84.32;
			break;
		case "neptune":
			earthYears = 164.8;
			break;
		case "pluto":
			earthYears = 248.1;
			break;
		}
		return roundOff(ageOnEarth / earthYears);
	}
	else {
		return "";
	}
}
function calculate() {

	// Calculate the weight
	document.getElementById("mercury-weight").innerHTML = getWeight("mercury", document.getElementById("weight").value);
	document.getElementById("venus-weight").innerHTML = getWeight("venus", document.getElementById("weight").value);
	document.getElementById("earth-weight").innerHTML = getWeight("earth", document.getElementById("weight").value);
	document.getElementById("moon-weight").innerHTML = getWeight("moon", document.getElementById("weight").value);
	document.getElementById("mars-weight").innerHTML = getWeight("mars", document.getElementById("weight").value);
	document.getElementById("jupiter-weight").innerHTML = getWeight("jupiter", document.getElementById("weight").value);
	document.getElementById("saturn-weight").innerHTML = getWeight("saturn", document.getElementById("weight").value);
	document.getElementById("uranus-weight").innerHTML = getWeight("uranus", document.getElementById("weight").value);
	document.getElementById("neptune-weight").innerHTML = getWeight("neptune", document.getElementById("weight").value);
	document.getElementById("pluto-weight").innerHTML = getWeight("pluto", document.getElementById("weight").value);

	// Calculate the age
	document.getElementById("mercury-age").innerHTML = getAge("mercury", document.getElementById("age").value);
	document.getElementById("venus-age").innerHTML = getAge("venus", document.getElementById("age").value);
	document.getElementById("earth-age").innerHTML = getAge("earth", document.getElementById("age").value);
	document.getElementById("moon-age").innerHTML = getAge("moon", document.getElementById("age").value);
	document.getElementById("mars-age").innerHTML = getAge("mars", document.getElementById("age").value);
	document.getElementById("jupiter-age").innerHTML = getAge("jupiter", document.getElementById("age").value);
	document.getElementById("saturn-age").innerHTML = getAge("saturn", document.getElementById("age").value);
	document.getElementById("uranus-age").innerHTML = getAge("uranus", document.getElementById("age").value);
	document.getElementById("neptune-age").innerHTML = getAge("neptune", document.getElementById("age").value);
	document.getElementById("pluto-age").innerHTML = getAge("pluto", document.getElementById("age").value);
}

function roundOff(num) {
	return Math.round(num * 10) / 10;
}

function Page_ClearValues() {
	document.getElementById("weight").value = "";
	document.getElementById("age").value = "";
}

function Page_AutoFocus() {
	var textInputElements = new Array();
	var inputElements = document.getElementsByTagName("input");
	for (var i = 0; i < inputElements.length; i++) {
		if ((inputElements[i].type == "text") && inputElements[i].getAttribute("autofocus") !== null) {
			textInputElements.push(inputElements[i]);
		}
	}
	if (textInputElements.length) {
		setTimeout(function() { textInputElements[0].focus(); }, 100);
	}
}

function Page_EnableFullscreen() {
	if (typeof App !== "undefined" && typeof App.enableKey !== "undefined") {
		App.enableKey("f11-fullscreen");
	}
}

function Page_Zoom() {
	var zoom_w = innerWidth / 1366;
	var zoom_h = innerHeight / 768;
	var zoom = Math.min(zoom_w, zoom_h);
	var html = document.getElementsByTagName("html")[0];
	if (html.style.MozTransform !== undefined) {
		// Using moz-transform:
		html.style.MozTransformOrigin = "0 0";
		html.style.MozTransform = "scale(" + zoom + ")";
		html.style.backgroundSize = (1366 * zoom) + "px " + (1536 * zoom) + "px";
	}
	else {
		// Using zoom:
		html.style.zoom = zoom;
		html.style.backgroundSize = "1366px 1536px";
	}
}

function Page_DisplayCloseButton() {
	var close = document.getElementById("close");
	var isFullScreen = window.fullScreen !== undefined ? window.fullScreen : !window.screenTop && !window.screenY;
	close.style.display = isFullScreen ? "block" : "none";
}

function Page_ToggleFullscreen() {
	window.fullScreen = !window.fullScreen;
}

function Window_Load() {
	Page_ClearValues();
	Page_AutoFocus();
	Page_EnableFullscreen();
	Window_Resize();
}

function Window_DblClick() {
	Page_ToggleFullscreen();
}

function Window_Resize() {
	Page_Zoom();
	Page_DisplayCloseButton();
}

function WindowEventHandlers(bool) {
	if (bool) {
		if (typeof Window_Load === "function") window.addEventListener("load", Window_Load, false);
		if (typeof Window_Resize === "function") window.addEventListener("resize", Window_Resize, false);
	}
}

WindowEventHandlers(1);

