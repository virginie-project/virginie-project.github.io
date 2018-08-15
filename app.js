var marker = [];
var maMap = new Map();

function search() {
  clearAll()
  $('#searchResult').empty()
  document.getElementById("slider-value").innerHTML = "Tout"
	var toSearch = document.getElementById('name_search').value;

  var dude;
  var dudeToShow = [];

  for (dude in data) {
    if (data[dude].name.toLowerCase() == toSearch.toLowerCase()) {
        var mar = createMarker(data[dude])
        maMap.set(data[dude].id, mar)
        dudeToShow.push(data[dude])
    }
  }

  var groupBegin = "<ul class=\"list-group\">"
  var groupEnd = "</ul>"
  var append = ""
  for (showMe in dudeToShow){
    var name = dudeToShow[showMe].name;
    var firstname = dudeToShow[showMe].firstname;
    var pop = "\'" + dudeToShow[showMe].id + "\'" ;
     append += "<button onClick=\"addrClick("+ pop +")\" type=\"button\" class=\"list-group-item list-group-item-action\">Dapibus ac facilisis in</button>"
  }
  var res = groupBegin + append + groupEnd
if (dudeToShow.length > 0) {
  var myEl = $("<div class=\"card\" style=\"width: 18rem;\"><div class=\"card-body\"><h5 class=\"card-title\">" + name + " "+ firstname+ "</h5>" + res  + "</div></div><br />");
  $('#searchResult').append(myEl);
}else {
  var myEl = $("<p>Pas de résultats</p><br />");
  $('#searchResult').append(myEl);
}
}

function addrClick(popup) {
  console.log(popup)
  maMap.get(popup).togglePopup();
}

function displayAll() {
  clearAll()
  $('#searchResult').empty()
  var man;
  for (man in data) {
    createMarker(data[man])
  }
  document.getElementById("slider-value").innerHTML = "Tout"
}

function clearAll() {
  for (ma in marker) {
    marker[ma].remove()
  }
}

function createMarker(createMe) {
  var myIcon = L.icon({
    iconUrl: 'marker.png'
});
var m = L.marker([createMe.lat, createMe.long], {icon: myIcon}).addTo(map) 
  m.bindPopup(
      "<h3>" + createMe.name + " " + createMe.firstname  +"</h3>"
      + "<p>(1234 - 1789)</p>"
      );
    marker.push(m)
    return m
}

var map = L.map('map').setView([48.864716, 2.349014], 13);

L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.tileLayer('https://mapwarper.net/maps/tile/28345/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


function initSlider() {
  var slider = document.getElementById('slider');

  noUiSlider.create(slider, {
    start: [ 1700 ],
    step: 1,
    range: {
      'min': [ 1643 ],
      'max': [ 1755 ]
    },
    format: wNumb({
      decimals: 0
    })
  });
  
  
  slider.noUiSlider.on('update', function( values, handle ) {
    document.getElementById("slider-value").innerHTML = slider.noUiSlider.get()
    $('#searchResult').empty()
    for (ma in marker) {
      marker[ma].remove()
    }
  
    var x;
    for (x in data) {

      if (data[x].live_year.toString().includes("-")){
        var yearBetween = data[x].live_year.toString().split('-');
        if (yearBetween[0] <= slider.noUiSlider.get() && yearBetween[1] >= slider.noUiSlider.get()) {
          createMarker(data[x])
        }
      }else {
        if (data[x].live_year == slider.noUiSlider.get())
        {
         createMarker(data[x])
        }
      }
    }
  });
}
initSlider()
document.getElementById("slider-value").innerHTML = "Tout"
displayAll()


