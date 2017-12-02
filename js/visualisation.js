// ----------
// Set up map
// ----------

// L.mapbox.accessToken = "KEY_GOES_HERE";
// var mapGeo = L.mapbox.map("map_geo", "mapbox.light")
//   .setView([37.8, -96], 4);

let mapGeo = L.map("map_geo", {attributionControl: false}).setView([37.8, -96], 3.9);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Visualisation by Tom',
//     maxZoom: 18,
//     id: 'mapbox.satellite',
//     accessToken: 'KEY_GOES_HERE'
// }).addTo(mapGeo);

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

let people =
{
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-72.6850932, 41.7637111],
      },
      properties: {
          name: "Yung Wing",
          location: "Hartford, Connecticut",
          popupContent: "Yung Wing: TODO: More details + image here",
          icon: "res/yung.png",
          "marker-size": "large",
          "marker-symbol": "y",
          "marker-color": "#ace",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-118.243683,  34.052235],
      },
      properties: {
          name: "Charles Beech Boothe",
          location: "Los Angeles, California",
          popupContent: "Charles Beach Boothe: TODO: More details + image here",
          icon: "res/boothe.png",
          "marker-size": "large",
          "marker-symbol": "b",
          "marker-color": "#bdf",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-117.243683,  33.052235],
      },
      properties: {
          name: "Homer Lea",
          location: "Los Angeles, California",
          popupContent: "Homer Lea: TODO: More details + image here",
          icon: "res/lea.png",
          "marker-size": "large",
          "marker-symbol": "h",
          "marker-color": "#bdf",
      },
    },
  ]
};

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

// -----------
// Letter data
// -----------

let locations = {
  "Sun Yat Sen": [0,0],
  "Yung Wing": [41.7637111, -72.6850932],
  "Charles Beech Boothe": [34.052235, -118.243683],
  "Homer Lea": [0,0],
};

let letters = [
  {
    type: "letter",
    from: "Yung Wing",
    to: "Charles Beech Boothe",
    fromLocation: locations["Yung Wing"],
    toLocation: locations["Charles Beech Boothe"],
    sent: "1908-10-21",
    received: "1908-12-23",
    summary: "Thanks Boothe for their meeting 2 weeks prior. Indicates interest in further discussion.",
  },
  {
    type: "letter",
    from: "Yung Wing",
    to: "Charles Beech Boothe",
    fromLocation: locations["Yung Wing"],
    toLocation: locations["Charles Beech Boothe"],
    sent: "1908-12-5",
    received: "1908-12-23",
    summary: "Approves long conference. Asks for their input on a political letter. <br/> Includes Hartford Courant article on death of Puyi.",
  },
  {
    type: "letter",
    from: "Yung Wing",
    to: "Charles Beech Boothe",
    fromLocation: locations["Yung Wing"],
    toLocation: locations["Charles Beech Boothe"],
    sent: "1908-12-6",
    received: "1908-12-23",
    summary: "Follow-up on previous letter. Explains role of provisional government.",
  },
  {
    type: "letter",
    from: "Yung Wing",
    to: "Charles Beech Boothe",
    fromLocation: locations["Yung Wing"],
    toLocation: locations["Charles Beech Boothe"],
    sent: "1908-12-14",
    received: "1908-12-23",
    summary: "Update to plan from December 5th letter.",
  },
  {
    type: "letter",
    from: "Charles Beech Boothe",
    to: "Yung Wing",
    fromLocation: locations["Charles Beech Boothe"],
    toLocation: locations["Yung Wing"],
    sent: "1908-12-28",
    received: "1909-1-2",
    summary: "Has spoken with Lea. Both approve of Yung's plan. <br/> Financial backing will come from Allen, whom Wing should meet.",
  },
  {
    type: "letter",
    from: "Yung Wing",
    to: "Charles Beech Boothe",
    fromLocation: locations["Yung Wing"],
    toLocation: locations["Charles Beech Boothe"],
    sent: "1909-1-4",
    received: "1909-1-16",
    summary: "Refers to dismissal of Yuan Shikai, and indicates 'we must eliminate Kang Youwei'.",
  },
  {
    type: "letter",
    from: "Yung Wing",
    to: "Charles Beech Boothe",
    fromLocation: locations["Yung Wing"],
    toLocation: locations["Charles Beech Boothe"],
    sent: "1909-1-16",
    received: "1909-2-2",
    summary: "Expresses idea of recruiting Yuan Shikai. Reiterates dislike of Kang Youwei. Explains why he hasn't met Wing yet.",
  },
  {
    type: "letter",
    from: "Charles Beech Boothe",
    to: "Yung Wing",
    fromLocation: locations["Charles Beech Boothe"],
    toLocation: locations["Yung Wing"],
    sent: "1909-1-16",
    received: "1909-1-21",
    summary: "Asks why Yung hasn't yet met Allen. Complains about difficulties of getting information on China.",
  },
  {
    type: "letter",
    from: "Yung Wing",
    to: "Charles Beech Boothe",
    fromLocation: locations["Yung Wing"],
    toLocation: locations["Charles Beech Boothe"],
    sent: "1909-1-25",
    received: "1909-2-2",
    summary: "Explains his opinions on Yuan incident, showing Yuan to be interested in Chinese reform and Kang to be a paper reformer.",
  },
];

// --------------------------
// Run basic letter animation
// --------------------------

let letterIcon = L.icon({
    iconUrl: "res/letter-icon.png",
    iconSize: [32, 32],
});

// function runAnimation(letters, runTime, startDate, endDate) {
//   var currentAnimations = [];
//   var totalTime = moment(endDate) - moment(startDate);
//   letters.forEach((letter) => {
//     var animationTime = (moment(letter.received) - moment(letter.sent)) / totalTime * runTime;
//     var animationDelay = (moment(letter.sent) - moment(startDate)) / totalTime * runTime;
//     setTimeout(() => {
//       var current =
//         L.Marker.movingMarker(
//           [letter.fromLocation, letter.toLocation],
//           animationTime,
//           {autostart: true})
//           .bindPopup(`<dl><dt>Sent</dt><dd>${letter.from}</dd><dd>${letter.sent}</dd><dt>Received</dt><dd>${letter.to}</dd><dd>${letter.received}</dd></dl>${letter.summary}`,
//           {autoClose: false, closeOnClick: true});
//
//       current.setIcon(letterIcon);
//
//       current.on("start", () => {
//         current.openPopup();
//       });
//
//       current.on("end", () => {
//         mapGeo.removeLayer(current);
//       });
//
//       current.addTo(mapGeo);
//     }, animationDelay);
//   });
// };

let dateDiv = document.getElementById('date');
let eventsDiv = document.getElementById('events_container');
let currentAnimations = [,];

function runAnimation(runTime, startDate, endDate) {
  var parsedEndDate = moment(endDate);
  var parsedStartDate = moment(startDate);
  var totalTime = parsedEndDate.diff(parsedStartDate);
  var animationDelay = runTime / parsedEndDate.diff(parsedStartDate, 'days');
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
    return runAnimation(40000, "1908-10-21", "1909-2-2");
  } else {
    dateDiv.innerHTML = currentDate.format('YYYY-MM-DD');
    var event = document.createElement("div");
    event.className = 'event';
    event.innerHTML = currentDate.format('YYYY-MM-DD');
    eventsDiv.appendChild(event);
    eventsDiv.scrollTop = eventsDiv.scrollHeight;
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
          .bindPopup(`<dl style="font-family: 'Karla', sans-serif;"><dt>Sent</dt><dd>${letter.from}</dd><dd>${letter.sent}</dd><dt>Received</dt><dd>${letter.to}</dd><dd>${letter.received}</dd></dl>${letter.summary}`,
          {autoClose: false, closeOnClick: true});

      current.setIcon(letterIcon);
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

runAnimation(40000, "1908-10-21", "1909-2-2");
