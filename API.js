function clickLogin(){
  alert("Design lang to HAHAHAHA")
}



const mContainer = document.getElementById("movieDisplay");

for(let i=0; i<5; i++){
  const moviesDiv = document.createElement("div");
  moviesDiv.className = "movieContainer";
  moviesDiv.innerHTML = `<div>
      <div class="posterContainer">
        <div class="overview">
          <p>OVERVIEW</p>
          <span>After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.</span>
        </div>
        <img src="img/poster2.jpg" alt="NO IMAGE FOUND, TRY REFRESHING THE PAGE." class="poster" id="moviePoster">
      </div>
        <div class="movieDetailsContainer">
          <p class="movieDetails" id="movieTitle">AVENGERS: ENDGAME </p>
          <span class="movieDetails" id=ratingsContainer>
            <p id="ratings">8.1</p>
          </span>
          <span class="genreContainer">
            <p class="genre movieDetails">Action/Sci-fi</p>
            </span>
          <span class="movieDetails" id="duration">1h 3m</span>
       </div>
    </div>`
    mContainer.appendChild(moviesDiv);
};