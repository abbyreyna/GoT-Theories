var queryURL="https://www.anapioficeandfire.com/api/characters";

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
