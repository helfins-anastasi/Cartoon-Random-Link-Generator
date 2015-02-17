currentSeason = 26;
maxEpisode = {1:13,2:22,3:24,4:22,5:22,6:25,7:25,8:25,9:25,10:23,11:22,12:21,13:22,14:22,15:22,16:21,17:22,18:22,19:20,20:21,21:23,22:22,23:22,24:22,25:22,26:14}

function go() {
	var episodeSelector = document.getElementById("season1");
	for(var i = 1; i <= currentSeason; i++) {
		var option = document.createElement("option");
		option.setAttribute("value", i);
		option.innerHTML = i;
		episodeSelector.appendChild(option);
	}
	episodeSelector.selectedIndex = 0;
	episodeSelector = document.getElementById("season2");
	for(var i = 1; i <= currentSeason; i++) {
		var option = document.createElement("option");
		option.setAttribute("value", i);
		option.innerHTML = i;
		episodeSelector.appendChild(option);
	}
	episodeSelector.selectedIndex = currentSeason-1;
	style();
}

function style() {
}

function changeSeasonStart() {
	seasonChangeLocked = true;
	if(!seasonChangeLocked && document.getElementById("season1").value > document.getElementById("season2").value) {
		document.getElementById("season2").selectedIndex = document.getElementById("season1").value - 1;
	}
	setTimeout(function() {seasonChangeLocked=false;}, 100);
}

function changeSeasonEnd() {
	seasonChangeLocked = true;
	if(!seasonChangeLocked && document.getElementById("season2").value < document.getElementById("season1").value) {
		document.getElementById("season1").selectedIndex = document.getElementById("season2").value - 1;
	}
	setTimeout(function() {seasonChangeLocked = false;}, 100);
}

function randomInt (min, max) {
	var random = Math.random();
	var mult = max - min + 1;
	random = random * mult;
	random = Math.floor(random);
	random = parseInt(random) + parseInt(min);
	return random;
}

function Link() {
	this.season = randomInt(document.getElementById("season1").value, document.getElementById("season2").value);
	this.episode = randomInt(1, maxEpisode[this.season]);
	this.link = "http://www.watchcartoononline.com/the-simpsons-";
	if(this.season > 5) {
		this.link += "season-"+this.season+"-episode-"+this.episode;
	} else if(this.episode > 9) {
		this.link += "episode-"+this.season+this.episode;
	} else {
		this.link += "episode-"+this.season+"0"+this.episode;
	}
	var temp = document.getElementById("linkHolder");
	temp.innerHTML="<a href=\""+this.link+"\"target=\"_blank\">"+this.link+"</a>";
	this.ref = temp.firstChild;
}

function continuousEpisodes() {
	var l = new Link();
	l.ref.click();
	if(currentTimeout) {
		clearTimeout(currentTimeout);
	}
	if(l.season <= 10) {
		currentTimeout = setTimeout(continuousEpisodes, 1380000);
	} else if(l.season <= 25) {
		currentTimeout = setTimeout(continuousEpisodes, 1320000);
	} else {
		currentTimeout = setTimeout(continuousEpisodes, 1260000);
	}
}
