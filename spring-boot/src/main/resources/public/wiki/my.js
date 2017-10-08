var searchWikipedia = function(criteria) {
  console.log("Criteria = " + criteria);
  console.log("Encoded criteria = " + encodeURIComponent(criteria));
  var url = "/api/wiki?search=" + encodeURIComponent(criteria);

  $.getJSON(url, function(result) {
    var resultTitles = result[1];
    var resultSnippets = result[2];
    var resultLinks = result[3];
    $("#searched").text(result[0]);
    var resultsTag = $("#results");
    resultsTag.empty();
    for (i = 0; i < resultTitles.length; i++) {
      var a = resultsTag.append('<a href="' + resultLinks[i] + '" class="list-group-item list-group-item-action"');
      a.append('<p><h2>' + resultTitles[i] + '</h2></p>');
      a.append('<p>' + resultSnippets[i] + '</p>');
    }
  })
}

var searchClick = function() {
  var searchInput = $("#searchInput").val();
  if (searchInput != "") {
    searchWikipedia(searchInput);
  }
}
