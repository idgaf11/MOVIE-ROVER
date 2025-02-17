function clickLogin(){
  alert("Design lang to HAHAHAHAHA")
}
//GLOBAL VARIABLES
const mContainer = document.getElementById("movieDisplay");
const movieHeading = document.querySelector(".movieHeading");

//API URLs//
const mostPopularUrl = 'https://imdb236.p.rapidapi.com/imdb/most-popular-movies'; //ENDPOINT 1 (POPULAR MOVIES)
const searchBaseUrl_1 = `https://imdb236.p.rapidapi.com/imdb/search?primaryTitle=`; //ENDPOINT 2.1 (BEFORE USER INPUT)
const searchBaseUrl_2 = `&rows=25&startYearFrom=2000&sortOrder=DESC&sortField=numVotes`; //ENDPOINT 2.2 (AFTER USER INPUT)
//PERSONAL API KEY//
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '99fab7a341mshc1aaf0b5f7e0891p127e78jsn23b86503c36c',
		'x-rapidapi-host': 'imdb236.p.rapidapi.com'
	}
};

//FETCHING POPULAR MOVIES DATA//
async function displayPopular() {
  
  mContainer.innerHTML= ''; //THIS WILL EMPTY THE CONTAINER BEFORE LOOPING
  
  try {
  	const response = await fetch(mostPopularUrl, options);
  	const result = await response.json();
  	//console.log(result);
  	//loop the result
  	renderMovies(result); //LOOP FUNC
  } catch (error) {
  	console.error(error);
  }
};

displayPopular(); //initial call Displaying Popular Movies


//USER SEARCH FOR MOVIE//
  //GLOBAL VARIABLES
let apiSearchUrl; //For the full API URL INCLUDING USERS INPUT
const form = document.getElementById("searchForm");
const searchInput = document.getElementById("userInput");

form.addEventListener('submit', async (searchEvent) => { //Only Triggers if User try to Search
  searchEvent.preventDefault();
  const userInput = searchInput.value;
  const apiSearchUrl = searchBaseUrl_1+userInput+searchBaseUrl_2;
  
  const showError = document.querySelector("#displayError");
  
  if(!userInput){
    movieHeading.textContent = "Most Popular Movies";
    showError.style.display = "none";
    await displayPopular(); // Display Popular if (Entered) blank search
    return;
  }else{
    movieHeading.textContent = `Result(s) from "${userInput}"`;
  };
  
    try {
      const response = await fetch(apiSearchUrl, options);
      const result = await response.json();
      const searchResult = result.results;
      //console.log(result);//
      
      mContainer.innerHTML = ''; //THIS WILL EMPTY THE MOVIES CONTAINER BEFORE LOOPING
      
      if(result.numFound === 0){
        showError.style.display = "block";
      }else{
      //Loops the result.results
      renderMovies(searchResult);
      showError.style.display = "none";
      }
    }catch (error) {
      console.log("Error Fetching Data", error);
    }
});

//FUNCTION TO LOOP THE MOVIES
function renderMovies(data) {
  data.forEach((movie) =>{
        const moviesDiv = document.createElement("div");
        moviesDiv.className = "movieContainer";
        moviesDiv.innerHTML = `<div>
            <div class="posterContainer">
              <div class="movieType">MOVIE</div>
              <div class="overview">
                <p>OVERVIEW</p>
                <span>${movie.description}</span>
              </div>
              <img src="${movie.primaryImage}" alt="NO IMAGE FOUND, TRY REFRESHING THE PAGE." class="poster" id="moviePoster">
            </div>
              <div class="movieDetailsContainer">
                <p class="movieDetails movieTitle">${movie.primaryTitle} </p>
                <span class="movieDetails ratingsContainer">
                  <p class="ratings">${movie.averageRating}</p>
                </span>
                <span class="genreContainer">
                  <p class="genre movieDetails">${movie.genres}</p>
                  </span>
                <span class="movieDetails duration">${movie.runtimeMinutes}m</span>
             </div>
          </div>`;
          
          const movieType = moviesDiv.querySelector(".movieType");
          const durationSpan = moviesDiv.querySelector(".duration");
          if(movie.type === "movie"){
            movieType.textContent = 'MOVIE';
          }else if(movie.type === "tvSeries"){
            movieType.textContent = 'TV SERIES';
            durationSpan.textContent = `...`;
          }else{
            movieType.textContent = '...';
          };
  
          const theRate = moviesDiv.querySelector(".ratings");
          if(theRate) {
            const rating = movie.averageRating;
            if (rating < 4 || rating === "null"){
              theRate.style.color = "red";
            }else if (rating < 7 ){
              theRate.style.color = "orange"; // Chnage color of the rating text depends of number
            }
          };
          mContainer.appendChild(moviesDiv);
          
        });
};
