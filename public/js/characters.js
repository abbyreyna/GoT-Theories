var queryURL="https://www.anapioficeandfire.com/api/characters";

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

  //   var results = response.name;

  // console.log(results);
  
  // for (var i = 0; i<results.length;i++){
    
  //   let p = document.createElement("p");
  //   let name = document.createTextNode(results[i].name);
  //   p.appendChild(name);
  //   document.body.appendChild(p);
  //   // var tableRow = $("<tr>");
  //   // var nameTd = $("<td scope = 'col'>");
  //   // var cultureTd = $("<td scope = 'col'>");
  //   // var bornTd = $("<td scope = 'col'>");
  //   // var diedTd = $("<td scope = 'col'>");
  //   // var titlesTd = $("<td scope = 'col'>");
  //   // var aliasesTd = $("<td scope = 'col'>");
  //   // var allegianceTd = $("<td scope = 'col'>");
  //   // var playedByTd = $("<td scope = 'col'>");

  //   nameTd.text(results[i].name);
  //   cultureTd.text(results[i].culture);

  //   tableRow.append(nameTd,cultureTd);
  // };

  });

  