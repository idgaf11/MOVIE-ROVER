function clickLogin(){
  alert("Design lang to HAHAHAHAHA")
};
//DOM REF.
const mContainer = document.querySelector(".container2");
const topLabel = document.querySelector(".topHeading");
let origTopLabel = topLabel.textContent;
const mvPage = document.getElementById("moviePage");
const tvPage = document.getElementById("seriesPage");
const searchForm = document.getElementById("searchForm");
const userInput = document.getElementById("userInput");
const displayError = document.getElementById("displayError");
const loadCon = document.querySelector(".loadCon");
const loadCon2 = document.querySelector(".loadCon2");

//API ENDPOINTS URL FROM TMDB ↓↓↓
//search by ID to get "COMPLETE" Data
const movieByID = 'https://api.themoviedb.org/3/movie/';
const seriesByID = 'https://api.themoviedb.org/3/tv/';
const getIdLast = '?language=en-US'
//all trend //will display first
const mvTrend = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const tvTrend = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
//to get movie/series id's purpose  only
const searchMovie = 'https://api.themoviedb.org/3/search/movie?query=';
const searchTV = 'https://api.themoviedb.org/3/search/tv?query=';
const plusUrl = '&include_adult=false&language=en-US&page=1';
//↑↑↑
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
//API KEY 
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjcyMjQyZTJmYTU3NTZhYzJhZGVmNjMzMDM1OWNkNyIsIm5iZiI6MTczODE2NjE1NC4wNzAwMDAyLCJzdWIiOiI2NzlhNGY4YWEwNWI2MzQzNWNhOTdhMDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.T91a241m09-Sj5KSVAT-SLKsWwu4nx9aFqGFGlv8Z-c'
  }
};

//1. INITIAL FETCH API TO GET ID ONLY - INCOMPLETE DATA
async function fetchData(url){
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const data = result.results;
    //console.log(result);
    if(result.total_results == 0){
      displayError.style.display = 'block';
      mContainer.innerHTML=' ';
    }else{
      displayError.style.display = 'none';
      getID(data);
    }
  } catch (error) {
    console.log(error);
  }
};
//func to fetch either movie || tvShow API
async function displayAll(tv, mv){
  if(tvPage){
    await fetchData(tv);
  }else if(mvPage){
    await fetchData(mv);
  }
};
//Initial Call - Display Trending - Complete Data
displayAll(tvTrend, mvTrend); 

//GET MOVIE/SERIES DATA BY ID FROM (1)
function getID(data_1){
  mContainer.innerHTML='';
  loadCon.style.display= 'none';
  //LOOPS THE ID's FROM (1) ALONG WITH FULL INFORMATIONS
  data_1.forEach((data_2)=>{
      const data_id = data_2.id; //GETS EVERY ID
      //console.log(trueID);
      //FIND INFORMATIONS USING ID
      async function fetchByID(url) {
        try {
          //FETCH URL WITH ID
          const response = await fetch(url+data_id+getIdLast, options);
          const data = await response.json();
          //console.log(data);
          
          const genreNames = data.genres?.map(genre => genre.name).join(',')??'No genre available';
          const newDiv = document.createElement('div');
          newDiv.className = 'movieContainer';
          newDiv.innerHTML = `<div>
            <div class="posterContainer">
              <div class="movieType">${data.first_air_date || data.release_date}</div>
              <div class="overview movieDetails">
                <p>OVERVIEW</p>
                <span>${data.overview}</span>
              </div>
              <img src="${imageBaseUrl}${data.poster_path}" alt="${data.title || data.name} POSTER" class="poster" id="moviePoster">
            </div>
              <div class="movieDetailsContainer">
                <p class="movieDetails movieTitle">${data.title || data.name}</p>
                <span class="movieDetails ratingsContainer">
                  <p class="ratings">${roundOff(data.vote_average)}</p>
                </span>
                <span class="genreContainer">
                  <p class="genre movieDetails">${genreNames}</p>
                  </span>
                <span class="movieDetails duration">N/A</span>
             </div>
          </div>`;
          //DIV CONFIGURATIONS↓↓↓
         const theRate = newDiv.querySelector(".ratings");
         if(theRate){
           const rating = data.vote_average;
           if(rating < 4 || rating === "null"){
             theRate.style.color = "red";
           }else if (rating < 8){
             theRate.style.color = "orange";
           }
         };
         
         const duration = newDiv.querySelector(".duration");
         if(duration){
           const runtime = data.runtime;
           const season = data.number_of_seasons;
           const episode = data.number_of_episodes;
           if(runtime){
             duration.textContent = `${runtime}m`;
           }else if (season && episode){
             duration.textContent = `S${season} E${episode}`;
           }
         };
         //DIV CONFIGURATIONS↑↑↑
         mContainer.appendChild(newDiv); // To display new div ceated
         
        } catch (error) {
          console.log(error);
        }
      }; 
        
      if(tvPage){
        fetchByID(seriesByID);
      }else if(mvPage){
        fetchByID(movieByID);
      };
  })//for each end
};//function end

function roundOff(num){
  return Math.round(num * 10)/10;
};

//IF USER SEARCH THIS EVENT LISTERNER TRIGGER
searchForm.addEventListener('submit', async (searchEvent)=>{
  searchEvent.preventDefault();
  const inputValue = userInput.value;
  mContainer.innerHTML=' ';
  loadCon.style.display = 'flex';
  
  try{
    if(!inputValue){
      await displayAll(tvTrend, mvTrend);
      topLabel.textContent = origTopLabel;
    }else{
      const tvSearchURL = searchTV+inputValue+plusUrl;
      const mvSearchURL = searchMovie+inputValue+plusUrl;
      await displayAll(tvSearchURL, mvSearchURL);
      topLabel.textContent = `Result(s) for "${inputValue}"`;
    }
  }catch(error){
    console.log(error);
  }finally{
    loadCon.style.display = 'none';
  }
  
});