
//Contacts
const apiKey = "92e213e12edf1503ca259d9218f37abf";
const apiEndPoint = "https://api.themoviedb.org/3";
const imagePath = "https://image.tmdb.org/t/p/original";

//Api Paths
const apiPaths = {
    fetchAllCategories : `${apiEndPoint}/genre/movie/list?api_key=${apiKey}`,
    fetchMovieList : (id) => `${apiEndPoint}/discover/movie?api_key=${apiKey}&with_genres=${id}`,
    fetchTrending : `${apiEndPoint}/trending/all/week?api_key=${apiKey}&language=en-US`,
}

//helper function
const helper = {

    buildBannerSection : (movie) => {
        console.log(movie);
        const bannerContainer = document.getElementById('banner-section');
        bannerContainer.style.backgroundImage = `url('${imagePath}${movie.backdrop_path}')`;

        const div = document.createElement('div');
        div.innerHTML = `
        <h2 class="banner-title">${movie.name || movie.title}</h2>
        <p class="banner-info">Trending This Week</p>
        <p class="banner-overview">${movie.overview && movie.overview.length > 200 ? movie.overview.slice(0,200).trim() + '...' : movie.overview}</p>
        <div class="action-buttons-container">
            <button class="action-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
                &nbsp;&nbsp; Play
            </button>
            <button class="action-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg>    
                &nbsp;&nbsp; More Info
            </button>
        </div>
        `;

        div.className = 'banner-content container';
        bannerContainer.append(div);
    },

    buildMovieSection : (moviesByCategory, categoryName) => {

        const moviesContainer = document.getElementById('movies-container');

        const movieItemHtml = moviesByCategory.map(item => {
            return `
                <img src="${imagePath}${item.poster_path}" alt="${item.title}" class="movie-item"} />
            `
        }).join('');

        
        const moviesRowHtml = `
        <h2 class="movie-section-header">
        ${categoryName}
        <span class="explore-nudge">Explore All</span>
        </h2>
        <div class="movies-row">
        ${movieItemHtml}
        </div>
        `;
        
        const div = document.createElement('div');
        div.className = "movies-section";
        div.innerHTML = moviesRowHtml;

        //append html into movies container
        moviesContainer.append(div);
    },

    fetchTrendingMovies : () => {
        helper.fetchAndBuildMovieSection(apiPaths.fetchTrending, "Trending Now")
        .then(list => {
            const randomIndex = parseInt(Math.random() * list.length);
            helper.buildBannerSection(list[randomIndex]);
        })
        .catch(err => {
            console.log('Error in BuildMovie Section', err);
        })
    },

    fetchAndBuildMovieSection : (fetchUrl, categoryName) => {
        return fetch(fetchUrl)
        .then(res => res.json())
        .then(res => {
            const moviesByCategory = res.results;
            if(Array.isArray(moviesByCategory) && moviesByCategory.length){
                helper.buildMovieSection(moviesByCategory, categoryName);
                return moviesByCategory;
            }
        })
        .catch(err => console.log(err));
    },

    fetchAndBuildAllSection : () => {
        fetch(apiPaths.fetchAllCategories)
        .then(res => res.json())
        .then(res => {
            const categories = res.genres;
            if(Array.isArray(categories) && categories.length){
                categories.forEach(category => {
                    helper.fetchAndBuildMovieSection(apiPaths.fetchMovieList(category.id), category.name);
                })
            }
        })
        .catch((err) => console.log('Error in fetchAndBuildAllSection', err));
    },

    

}

//controllers
const controller = {
    fetchAndBuildAllSection : helper.fetchAndBuildAllSection,
    fetchAndBuildTrendingNow : helper.fetchTrendingMovies
}


// Boosts up the app
function init() {
    controller.fetchAndBuildTrendingNow();
    controller.fetchAndBuildAllSection();
}

window.addEventListener('load', function(){
    init();
    window.addEventListener('scroll', function(){
        //header ui update
        const header = this.document.getElementById('header');
        if(window.scrollY > 5) header.classList.add('black-bg');
        else header.classList.remove('black-bg');
    })
})