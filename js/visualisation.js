let mapGeo = L.map("map_geo", {attributionControl: false}).setView([10, 0], 2);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Visualisation by Tom',
    maxZoom: 18,
    id: 'mapbox.satellite',
    accessToken: 'MAPBOX TOKEN GOES HERE',
    noWrap: false,
}).addTo(mapGeo);

mapGeo.scrollWheelZoom.disable();

// -------
// Buttons
// -------

let paused = true;

document.getElementById("play_button").onmousedown = () => {
  paused = false;
};

document.getElementById("pause_button").onmousedown = () => {
  paused = true;
};

// -----------------
// Add people to map
// -----------------

// var peopleLayer = L.mapbox.featureLayer().setGeoJSON(people).addTo(mapGeo);
let peopleLayer = L.geoJSON(people, {
  onEachFeature: (feature, layer) => {
    layer.setIcon(L.icon({
      iconUrl: feature.properties.icon,
      iconSize: [35, 90],
    }));
    layer.bindPopup(feature.properties.popupContent);
  },
}).addTo(mapGeo);

// let letterIcon = L.icon({
//     iconUrl: "res/letter-icon.png",
//     iconSize: [32, 32],
// });

let dateDiv = document.getElementById('date');
let eventsDiv = document.getElementById('events_container');
let currentAnimations = [,];

function runAnimation(runTime, startDate, endDate) {
  var parsedEndDate = moment(endDate);
  var parsedStartDate = moment(startDate);
  var totalTime = parsedEndDate.diff(parsedStartDate);
  var animationDelay = runTime / parsedEndDate.diff(parsedStartDate, 'days');
  eventsDiv.innerHTML = '';
  return recurseAnimation(parsedStartDate, parsedEndDate, totalTime, animationDelay, runTime);
}

function recurseAnimation(currentDate, parsedEndDate, totalTime, animationDelay, runTime) {
  if(paused) {
    currentAnimations.forEach((marker) => {
      marker.pause();
    });
  } else {
    currentAnimations.forEach((marker) => {
      marker.resume();
    });
  }
  while(paused) {
    return setTimeout(() => recurseAnimation(currentDate, parsedEndDate, totalTime, animationDelay, runTime), 1);
  }
  if (currentDate.isSame(parsedEndDate, 'day')) {
    paused = true;
    return runAnimation(180000, startDate, endDate);
  } else {
    dateDiv.innerHTML = currentDate.format('LL');
    animateEvents(currentDate);
    animateLetters(totalTime, runTime, currentDate);
    return setTimeout(() => recurseAnimation(currentDate.add(1, 'days'), parsedEndDate, totalTime, animationDelay, runTime), animationDelay);
  }
}

function animateLetters(totalTime, runTime, currentDate) {
  letters.forEach((letter) => {
    if (moment(letter.sent).isSame(currentDate, 'day')) {
      var animationTime = (moment(letter.received) - moment(letter.sent)) / totalTime * runTime;

      var current =
        L.Marker.movingMarker(
          [letter.fromLocation, letter.toLocation],
          animationTime,
          {autostart: true})
          .bindPopup(`<dl style="font-family: 'Karla', sans-serif;"><dt>Sent</dt><dd>${letter.from}</dd><dd>${moment(letter.sent).format('LL')}</dd><dt>Received</dt><dd>${letter.to}</dd><dd>${moment(letter.received).format('LL')}</dd></dl>${letter.summary}`,
          {autoClose: false, closeOnClick: true});

      current.setIcon(L.icon({
          iconUrl: letter.iconUrl,
          iconSize: [32, 32],
      }));

      current.on("start", () => {
        current.openPopup();
        currentAnimations.push(current);
      });

      current.on("end", () => {
        mapGeo.removeLayer(current);
        var index = currentAnimations.indexOf(current);
        if (index > -1) {
          currentAnimations.splice(index, 1);
        }
      });

      current.addTo(mapGeo);
    }
  });
}

function animateEvents(currentDate) {
  events.forEach((event) => {
    if (moment(event.date).isSame(currentDate, 'day')) {
      var newEvent = document.createElement("div");
      newEvent.className = 'event';
      newEvent.innerHTML = `${currentDate.format(`LL`)}<br/>${event.summary}`;
      eventsDiv.appendChild(newEvent);
      eventsDiv.scrollTop = eventsDiv.scrollHeight;
    }
  });
}

runAnimation(180000, startDate, endDate);
