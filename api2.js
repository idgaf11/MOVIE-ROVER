function clickLogin(){
  alert("Design lang to HAHAHAHAHA")
}
//GLOBAL VARIABLES
const mContainer = document.querySelector(".container2");
const topLabel = document.querySelector(".topHeading");
const mvSearch = document.getElementById("mvSearchForm");
const tvSearch = document.getElementById("tvSearchForm");

//API ENDPOINTS URL FROM TMDB
const movieByID = 'https://api.themoviedb.org/3/movie/';
const seriesByID = 'https://api.themoviedb.org/3/tv/';
const getIdLast = '?language=en-US'

const movieTrend = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const tvTrend = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';

const searchMovie = 'https://api.themoviedb.org/3/search/movie?query=';
const searchTV = 'https://api.themoviedb.org/3/search/tv?query=';
const plusUrl = '&include_adult=false&language=en-US&page=1';

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
//API KEY 
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjcyMjQyZTJmYTU3NTZhYzJhZGVmNjMzMDM1OWNkNyIsIm5iZiI6MTczODE2NjE1NC4wNzAwMDAyLCJzdWIiOiI2NzlhNGY4YWEwNWI2MzQzNWNhOTdhMDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.T91a241m09-Sj5KSVAT-SLKsWwu4nx9aFqGFGlv8Z-c'
  }
};

async function fetchData(url){
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const data = result.results;
    //console.log(result);
    getID(data);
    
  } catch (error) {
    console.log(error);
  }
};

function toDisplay(){
  if(tvSearch){
    fetchData(tvTrend);
  }else if (mvSearch){
    fetchData(movieTrend);
  }
}
toDisplay();
//GET MOVIE/SERIES ID TO DISPLAY
function getID(dataObjects){
  mContainer.innerHTML=' ';

  dataObjects.forEach((inData)=>{
      const trueID = inData.id; //This will get only the ID
      async function fetchByID(url) {
        try {
          const response = await fetch(url+trueID+getIdLast, options);
          const data = await response.json();
          //console.log(data);
          
          const newDiv = document.createElement('div');
          newDiv.className = 'movieContainer';
          newDiv.innerHTML = `<div>
            <div class="posterContainer">
              <div class="movieType">MOVIE</div>
              <div class="overview">
                <p>OVERVIEW</p>
                <span>${data.overview}</span>
              </div>
              <img src="${imageBaseUrl}${data.poster_path}" alt="NO IMAGE FOUND, TRY REFRESHING THE PAGE." class="poster" id="moviePoster">
            </div>
              <div class="movieDetailsContainer">
                <p class="movieDetails movieTitle">${data.title || data.name}</p>
                <span class="movieDetails ratingsContainer">
                  <p class="ratings">${data.vote_average}</p>
                </span>
                <span class="genreContainer">
                  <p class="genre movieDetails">none</p>
                  </span>
                <span class="movieDetails duration">${data.runtime || `S${data.number_of_seasons}E${data.number_of_episodes}`}</span>
             </div>
          </div>`;
         
         mContainer.appendChild(newDiv);
        } catch (error) {
          console.log(error);
        }
      };
      if(tvSearch){
        fetchByID(seriesByID);
      }else if (mvSearch){
        fetchByID(movieByID);
      }
      
  })//for each 
};



/**
//FOR EACH LOOP
function renderAll(results){
  results.forEach((data) =>{
    const newDiv = document.createElement('div');
    newDiv.className = 'movieContainer';
    newDiv.innerHTML = `<div class="movieContainer">
        <div class="posterContainer">
          <div class="movieType">MOVIE</div>
          <div class="overview">
            <p>OVERVIEW</p>
            <span>${data.overview}</span>
          </div>
          <img src="${imageBaseUrl}${data.poster_path}" alt="NO IMAGE FOUND, TRY REFRESHING THE PAGE." class="poster" id="moviePoster">
        </div>
          <div class="movieDetailsContainer">
            <p class="movieDetails movieTitle">${data.title}</p>
            <span class="movieDetails ratingsContainer">
              <p class="ratings">${data.vote_average}</p>
            </span>
            <span class="genreContainer">
              <p class="genre movieDetails">none</p>
              </span>
            <span class="movieDetails duration">${data.runtime}</span>
         </div>
      </div>`;
      
      movieDiv.appendChild(newDiv);
      seriesDiv.appendChild(newDiv);
  });
} **/