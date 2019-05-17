var queryURL = "https://www.anapioficeandfire.com/api/characters";

$.ajax({
  url: queryURL,
  method: "GET"
}).done(function (response) {
  // $("#div1").text(JSON.stringify(response));

  console.log(response);


  for (var i = 0; i<response.length;i++){

    var tableRow = $("<tr>");
    var nameTd = $("<td scope = 'col'>");
    var cultureTd = $("<td scope = 'col'>");
    var bornTd = $("<td scope = 'col'>");
    var diedTd = $("<td scope = 'col'>");
    var titlesTd = $("<td scope = 'col'>");
    var aliasesTd = $("<td scope = 'col'>");
    var allegianceTd = $("<td scope = 'col'>");
    var playedByTd = $("<td scope = 'col'>");

    nameTd.text(response[i].name);
    cultureTd.text(response[i].culture);
    bornTd.text(response[i].born);
    diedTd.text(response[i].died);
    titlesTd.text(response[i].titles);
    aliasesTd.text(response[i].aliases);
    allegianceTd.text(response[i].allegiance);
    playedByTd.text(response[i].playedBy);

    tableRow.append(nameTd,cultureTd, bornTd, diedTd, titlesTd, aliasesTd, allegianceTd, playedByTd);;

    $("#tableBody").append(tableRow);

  };
});

