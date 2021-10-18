//Array of objects to store movies
const movieList = [];

// add event listener to button to perform actions
$("#newMovie").on("click",function(e){
    e.preventDefault();

    //collect input data 
    let movieTitle = $("#input1").val();
    let movieRating = $("#input2").val();
    
    //reset values of form
    $("#input1").val('');
    $("#input2").val('');

    //store movie in array
    let movie = {
        title: movieTitle,
        rating: movieRating,
    }
    movieList.push(movie);

    if (movieTitle.length >= 2 && movieRating <=10 && movieRating >=0){
       createTable(movie);
    } else{
        alert("Enter valid title (more than 2 characters) or valid rating (0-10)...");
    }
});

// add event listener to table (container of delete button) and will work on delete button even if it does not exist at load
$("table").on("click", "#delete", function(){
    // find ID of movie removed
    let movieToRemove= ($(this).parents("tr").find("td:eq(0)").text());
    //find index of the movie to be removed in movieList
    let index = movieList.findIndex(movie => movie.title === movieToRemove);
    // remove it
    movieList.splice(index,1);
    //delete row parent of delete button clicked
    $(this).parents("tr").remove();
});

// sorting movies by title (alphabetical)
$("#sortAlph").on("click", function(){
    movieList.sort(sortMovieByKey('title','asc'));
    $(".newRow").remove();
    for (let movie of movieList){
       createTable(movie);
    }
});

// sorting movies by rating (best to less)
$("#sortRating").on("click", function(){
    movieList.sort(sortMovieByKey('rating','desc'));
    $(".newRow").remove();
    for (let movie of movieList){
       createTable(movie);
    }
});


//FUNCTIONS

// function to create table of movies
function createTable(movie){
    $("table").append(`<tr class='newRow'> <td>${movie.title}</td> <td>${movie.rating}</td> <td><button id="delete">X</button></td> </tr>`);
}

//sorting function
function sortMovieByKey(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string')? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')? b[key].toUpperCase() : b[key];

    let comparison = 0;
    
    if (varA > varB) {
      comparison = 1;
    } 
    else if (varA < varB) {
      comparison = -1;
    }

    return ((order === 'desc') ? (comparison * -1) : comparison);
  };
}





