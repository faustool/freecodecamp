var fahrenheit = function(celcius) {
  var converted = celcius * 1.8 + 32;
  return converted.toFixed(2);
};

var celcius = function(fahrenheit) {
  var converted = (fahrenheit - 32) / 1.8;
  return converted.toFixed(2);
};

var shiftUnits = function() {
  var unit = $("#unit").text();
  var unit_link = $("#unit_link").text();
  var temperature = $("#temperature").text();
  if (unit === "Cº") {
    $("#unit").text("Fº");
    $("#temperature").text(fahrenheit(temperature));
    $("#unit_link").text("Cº");
  } else {
    $("#unit").text("Cº");
    $("#temperature").text(celcius(temperature));
    $("#unit_link").text("Fº");
  }
};

var isDay = function() {
  var hour = new Date().getHours();
  return hour < 19;
};

var between = function(val, lower, upper) {
  return val >= lower && val <= upper;
}

var changeBackgroundPicture = function(conditionKey) {
  var url = "https://api.pexels.com/v1/search?query=weather+" + conditionKey + "&per_page=5&page=1";
  var randomPhoto = Math.floor(Math.random() * 5);
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    beforeSend: function(header) {
      header.setRequestHeader("Authorization", "563492ad6f9170000100000172db58b84338421e61e1b42fbfa8d7f1");
    },
    success: function(result) {
      $("body").css(
        "background-image",
        "url('" + result.photos[randomPhoto].src.landscape + "')"
      );
      $("#pexels").attr("href", result.photos[randomPhoto].url);
    }
  });
}

var getConditionKey = function(conditionId) {
  if (between(conditionId, 200, 232)) {rainy
    return "thunder+storm";
  } else if (between(conditionId, 300, 321)) {
    return "drizzle";
  } else if (between(conditionId, 500, 531)) {
    return "rainy";
  } else if (between(conditionId, 600, 622)) {
    return "snow";
  } else if (between(conditionId, 700, 721)) {
    return "haze";
  } else if (conditionId == 800) {
    if (isDay())
      return "clear+day";
    else
      return "clear+night";
  } else if (between(conditionId, 801, 804)) {
    return "clouds";
  }
}

var getWeather = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var url =
        "https://fcc-weather-api.glitch.me/api/current?lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude;
      $.getJSON(url, function(a) {
        $("#city").text(a.name);
        changeBackgroundPicture(getConditionKey(a.weather[0].id));
        $("#condition").text(a.weather[0].main);
        if ($("#unit").text() === "Cº") {
          $("#temperature").text(a.main.temp);
        } else {
          $("#temperature").text(fahrenheit(a.main.temp) + " Fº");
        }
        $("#icon").attr("src", a.weather[0].icon);
        $("#icon").attr("alt", condition + " icon");
      });
    });
  } else {
    $("#city").text(
      "... sorry, can't tell you the weather if you don't share your location :("
    );
  }
};

$("document").ready(function() {
  getWeather();
  $("#unit_link").on("click", function() {
    shiftUnits();
  });
});
