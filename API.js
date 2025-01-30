function clickLogin(){
  alert("Design lang to HAHAHAHA")
}
const mContainer = document.getElementById("movieDisplay");

//API URLs//
//const mostPopularUrl = 'https://imdb236.p.rapidapi.com/imdb/most-popular-movies'; //ENDPOINT 1 (POPULAR MOVIES)
//const searchBaseUrl_1 = `https://imdb236.p.rapidapi.com/imdb/search?primaryTitle=`; //ENDPOINT 2.1 (MOVIE SEARCH)
const searchBaseUrl_2 = `&rows=25&startYearFrom=2000&sortOrder=DESC&sortField=numVotes`; //ENDPOINT 2.2
//MY PERSONAL API KEY//
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '99fab7a341mshc1aaf0b5f7e0891p127e78jsn23b86503c36c',
		'x-rapidapi-host': 'imdb236.p.rapidapi.com'
	}
};
//FETCHING POPULAR MOVIES DATA//
async function displayPopular() {
  
  //mContainer.innerHTML= ''; //THIS WILL EMPTY THE CONTAINER BEFORE LOOPING
  
  try {
  	const response = await fetch(mostPopularUrl, options);
  	const result1 = await response.json();
  	//console.log(result);
  	//loop the result
  	result1.forEach((movies) =>{
      const moviesDiv = document.createElement("div");
      moviesDiv.className = "movieContainer";
      moviesDiv.innerHTML = `<div>
          <div class="posterContainer">
            <div class="movieType">MOVIE</div>
            <div class="overview">
              <p>OVERVIEW</p>
              <span>${movies.description}</span>
            </div>
            <img src="${movies.primaryImage}" alt="NO IMAGE FOUND, TRY REFRESHING THE PAGE." class="poster" id="moviePoster">
          </div>
            <div class="movieDetailsContainer">
              <p class="movieDetails" id="movieTitle">${movies.primaryTitle} </p>
              <span class="movieDetails" id=ratingsContainer>
                <p class="ratings">${movies.averageRating}</p>
              </span>
              <span class="genreContainer">
                <p class="genre movieDetails">${movies.genres}</p>
                </span>
              <span class="movieDetails" id="duration">${movies.runtimeMinutes}m</span>
           </div>
        </div>`;
        
        const theRate = moviesDiv.querySelector(".ratings");
        if(theRate) {
          const rating = movies.averageRating;
          if (rating < 4 || rating === "null"){
            theRate.style.color = "red";
          }else if (rating < 8 ) {
            theRate.style.color = "orange";
          }
        }
        
        mContainer.appendChild(moviesDiv);
    });
  	
  } catch (error) {
  	console.error(error);
  }
};
//DISPLAYPOPULAR MOVIES SYNTAX END//
displayPopular(); //initial call Displaying Popular Movies

//USER SEARCH FOR MOVIE//
let apiSearchUrl; //For the full API URL INCLUDING USERS INPUT
const form = document.getElementById("searchForm");
const searchInput = document.getElementById("searchForMovie");
//formatting Users Input
function formatUserInput(input) {
  return input.toLowerCase().replace(/ /g, '%20');
}

form.addEventListener('submit', async (inputEvent) => {
  inputEvent.preventDefault();
  const userInput = searchInput.value.trim();
  const formattedValue = formatUserInput(userInput);
  const apiSearchUrl = searchBaseUrl_1+formattedValue+searchBaseUrl_2;
  
  if(!userInput){
    await displayPopular(); // Display Popular if (Entered) blank search
    return;
  };
    try {
      const response = await fetch(apiSearchUrl, options);
      const result2 = await response.json();
      //console.log(result2);//
      
      
      mContainer.innerHTML = ''; //THIS WILL EMPTY THE CONTAINER BEFORE LOOPING
      
      //Loops the result2.results
      result2.results.forEach((movie) =>{
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
              <p class="movieDetails" id="movieTitle">${movie.primaryTitle} </p>
              <span class="movieDetails" id=ratingsContainer>
                <p class="ratings">${movie.averageRating}</p>
              </span>
              <span class="genreContainer">
                <p class="genre movieDetails">${movie.genres}</p>
                </span>
              <span class="movieDetails" id="duration">${movie.runtimeMinutes}m</span>
           </div>
        </div>`;
        
        const movieType = moviesDiv.querySelector(".movieType");
        const durationSpan = moviesDiv.querySelector("#duration");
        if(movie.type === "movie"){
          movieType.textContent = 'MOVIE';
        }else if(movie.type === "tvSeries"){
          movieType.textContent = 'TV SERIES';
          durationSpan.textContent = `...`;
        }else{
          movieType.textContent = '...';
        }

        const theRate = moviesDiv.querySelector(".ratings");
        if(theRate) {
          const rating = movie.averageRating;
          if (rating < 4 || rating === "null"){
            theRate.style.color = "red";
          }else if (rating < 7 ){
            theRate.style.color = "orange"; // Chnage color of the rating text depends of number
          }
        }
        
        mContainer.appendChild(moviesDiv);
    });
 
    } catch (error) {
      console.log("Error Fetching Data", error);
    }
});