const Top100Shows = document.querySelector('#Top_100_shows');
const Top100NewestShows = document.querySelector('#Top_100_newest_shows');
const Top100Episodes = document.querySelector('#Top_100_episodes');
const Top100NewestEpisodes = document.querySelector('#Top_100_newest_episodes');

const searchResultList = document.querySelector('#search_results');
const homeResultsList = document.querySelector('#home_results');
const Top100ShowsResultsList = document.querySelector('#Top_100_shows_results');
const Top100newestShowsResultsList = document.querySelector('#Top_100_newest_shows_results');
const Top100EpisodesResultsList = document.querySelector('#Top_100_episodes_results');
const Top100NewestEpisodesResultsList = document.querySelector('#Top_100_newest_episodes_results');


const previousButton = document.querySelector('#previousButton');
const nextButton = document.querySelector('#nextButton');

let currentPage = 0;

Top100Shows.addEventListener('click', () => {
    event.preventDefault();
    const url = 'https://api.tvmaze.com/shows'
    clearResults();
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const sortedShows = data
                .filter(show => show.weight != null)
                .sort((a, b) => b.weight - a.weight)
                .slice(0, 100);
            console.log(sortedShows);
            sortedShows.forEach((show) => {
            if(show.officialSite != null){
                const ShowElement = `
                <div class="bg-white rounded shadow border-2 p-4 mb-4">
                    <img 
                        src="${show.image?.medium}" 
                        alt="${show.name}"
                        class="w-full rounded mb-4"
                    >
                    <h5 class="text-lg font-semibold mb-2 break-words">${show.name}</h5>
                    <p class="text-gray-600 mb-3 break-words">${show.genres}</p>
                    <a target="_blank" href="${show.officialSite || ''}" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Visit Official Site
                    </a>
                </div>`;
                Top100ShowsResultsList.insertAdjacentHTML('beforeend', ShowElement);
            }
            else{
                const ShowElement = `
                <div class="bg-white rounded shadow border-2 p-4 mb-4">
                    <img 
                        src="${show.image?.medium}" 
                        alt="${show.name}"
                        class="w-full rounded mb-4"
                    >
                    <h5 class="text-lg font-semibold mb-2 break-words">${show.name}</h5>
                    <p class="text-gray-600 mb-3 break-words">${show.genres}</p>
                    <p class="inline-block text-gray-600 px-4 py-2 rounded">
                        Official Site Not Available
                    </p>
                </div>`;
                Top100ShowsResultsList.insertAdjacentHTML('beforeend', ShowElement);
            }
            nextButton.style.display = 'none';
            previousButton.style.display = 'none'; 
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

Top100NewestShows.addEventListener('click', () => {
    event.preventDefault();
    const url = 'https://api.tvmaze.com/shows'
    clearResults();
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const sortedShows = data
                .filter(show => show.premiered)
                .sort((a, b) => new Date(b.premiered) - new Date(a.premiered))
                .slice(0, 100);
            console.log(sortedShows);
            sortedShows.forEach((show) => {
            if(show.officialSite != null){
                const ShowElement = `
                <div class="bg-white rounded shadow border-2 p-4 mb-4">
                    <img 
                        src="${show.image?.medium}" 
                        alt="${show.name}"
                        class="w-full rounded mb-4"
                    >
                    <h5 class="text-lg font-semibold mb-2 break-words">${show.name}</h5>
                    <p class="text-gray-600 mb-3 break-words">${show.genres}</p>
                    <a target="_blank" href="${show.officialSite || ''}" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Visit Official Site
                    </a>
                </div>`;
                Top100newestShowsResultsList.insertAdjacentHTML('beforeend', ShowElement);
            }
            else{
                const ShowElement = `
                <div class="bg-white rounded shadow border-2 p-4 mb-4">
                    <img 
                        src="${show.image?.medium}" 
                        alt="${show.name}"
                        class="w-full rounded mb-4"
                    >
                    <h5 class="text-lg font-semibold mb-2 break-words">${show.name}</h5>
                    <p class="text-gray-600 mb-3 break-words">${show.genres}</p>
                    <p class="inline-block text-gray-600 px-4 py-2 rounded">
                        Official Site Not Available
                    </p>
                </div>`;
                Top100newestShowsResultsList.insertAdjacentHTML('beforeend', ShowElement);
            }
            nextButton.style.display = 'none';
            previousButton.style.display = 'none'; 
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

Top100Episodes.addEventListener('click', () => {
    event.preventDefault();
    const url = 'https://api.tvmaze.com/shows?episode'
    clearResults();
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const sortedEpisodes = data
                .filter(episode => episode.weight != null)
                .sort((a, b) => b.weight - a.weight)
                .slice(0, 100);
            console.log(sortedEpisodes);
            sortedEpisodes.forEach((episode) => {
            if(episode.officialSite != null){
                const ShowElement = `
                <div class="bg-white rounded shadow border-2 p-4 mb-4">
                    <img 
                        src="${episode.image?.medium}" 
                        alt="${episode.name}"
                        class="w-full rounded mb-4"
                    >
                    <h5 class="text-lg font-semibold mb-2 break-words">${episode.name}</h5>
                    <p class="text-gray-600 mb-3 break-words">${episode.genres}</p>
                    <a target="_blank" href="${episode.officialSite || ''}" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Visit Official Site
                    </a>
                </div>`;
                Top100EpisodesResultsList.insertAdjacentHTML('beforeend', ShowElement);
            }
            else{
                const ShowElement = `
                <div class="bg-white rounded shadow border-2 p-4 mb-4">
                    <img 
                        src="${episode.image?.medium}" 
                        alt="${episode.name}"
                        class="w-full rounded mb-4"
                    >
                    <h5 class="text-lg font-semibold mb-2 break-words">${episode.name}</h5>
                    <p class="text-gray-600 mb-3 break-words">${episode.genres}</p>
                    <p class="inline-block text-gray-600 px-4 py-2 rounded">
                        Official Site Not Available
                    </p>
                </div>`;
                Top100EpisodesResultsList.insertAdjacentHTML('beforeend', ShowElement);
            }
            nextButton.style.display = 'none';
            previousButton.style.display = 'none'; 
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

Top100NewestShows.addEventListener('click', () => {
    event.preventDefault();
    const url = 'https://api.tvmaze.com/shows'
    clearResults();
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const sortedShows = data
                .filter(show => show.premiered)
                .sort((a, b) => new Date(b.premiered) - new Date(a.premiered))
                .slice(0, 100);
            console.log(sortedShows);
            sortedShows.forEach((show) => {
            if(show.officialSite != null){
                const ShowElement = `
                <div class="bg-white rounded shadow border-2 p-4 mb-4">
                    <img 
                        src="${show.image?.medium}" 
                        alt="${show.name}"
                        class="w-full rounded mb-4"
                    >
                    <h5 class="text-lg font-semibold mb-2 break-words">${show.name}</h5>
                    <p class="text-gray-600 mb-3 break-words">${show.genres}</p>
                    <a target="_blank" href="${show.officialSite || ''}" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Visit Official Site
                    </a>
                </div>`;
                Top100newestShowsResultsList.insertAdjacentHTML('beforeend', ShowElement);
            }
            else{
                const ShowElement = `
                <div class="bg-white rounded shadow border-2 p-4 mb-4">
                    <img 
                        src="${show.image?.medium}" 
                        alt="${show.name}"
                        class="w-full rounded mb-4"
                    >
                    <h5 class="text-lg font-semibold mb-2 break-words">${show.name}</h5>
                    <p class="text-gray-600 mb-3 break-words">${show.genres}</p>
                    <p class="inline-block text-gray-600 px-4 py-2 rounded">
                        Official Site Not Available
                    </p>
                </div>`;
                Top100newestShowsResultsList.insertAdjacentHTML('beforeend', ShowElement);
            }
            nextButton.style.display = 'none';
            previousButton.style.display = 'none'; 
        });
    })
    .catch((error) => {
        console.log(error);
    });
});



const searchShows = () => {
    event.preventDefault();
    const keyword = document.querySelector('#keywords').value;
    const url = 'https://api.tvmaze.com/search/shows?q=' + keyword;
    clearResults();
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach((item) => {
            const show = item.show;
            if(show.officialSite != null){
                const ShowElement = `
                <div class="bg-white rounded shadow border-2 p-4 mb-4">
                    <img 
                        src="${show.image?.medium}" 
                        alt="${show.name}"
                        class="w-full rounded mb-4"
                    >
                    <h5 class="text-lg font-semibold mb-2 break-words">${show.name}</h5>
                    <p class="text-gray-600 mb-3 break-words">${show.genres}</p>
                    <a target="_blank" href="${show.officialSite || ''}" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Visit Official Site
                    </a>
                </div>`;
                searchResultList.insertAdjacentHTML('beforeend', ShowElement);
            }
            else{
                const ShowElement = `
                <div class="bg-white rounded shadow border-2 p-4 mb-4">
                    <img 
                        src="${show.image?.medium}" 
                        alt="${show.name}"
                        class="w-full rounded mb-4"
                    >
                    <h5 class="text-lg font-semibold mb-2 break-words">${show.name}</h5>
                    <p class="text-gray-600 mb-3 break-words">${show.genres}</p>
                    <p class="inline-block text-gray-600 px-4 py-2 rounded">
                        Official Site Not Available
                    </p>
                </div>`;
                searchResultList.insertAdjacentHTML('beforeend', ShowElement);
            }  
            nextButton.style.display = 'none';
            previousButton.style.display = 'none';
        });
    })
    .catch((error) => {
        console.log(error);
    });
}

const homePageShows = () =>{
    event.preventDefault();
    const url = 'https://api.tvmaze.com/shows?page=' + currentPage;
    clearResults();
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach((item) => {
            const show = item;
            if(show.officialSite != null){
                const ShowElement = `
                <div class="bg-white rounded shadow border-2 p-4 mb-4">
                    <img 
                        src="${show.image?.medium}" 
                        alt="${show.name}"
                        class="w-full rounded mb-4"
                    >
                    <h5 class="text-lg font-semibold mb-2 break-words">${show.name}</h5>
                    <p class="text-gray-600 mb-3 break-words">${show.genres}</p>
                    <a target="_blank" href="${show.officialSite || ''}" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Visit Official Site
                    </a>
                </div>`;
                homeResultsList.insertAdjacentHTML('beforeend', ShowElement);
            }
            else{
                const ShowElement = `
                <div class="bg-white rounded shadow border-2 p-4 mb-4">
                    <img 
                        src="${show.image?.medium}" 
                        alt="${show.name}"
                        class="w-full rounded mb-4"
                    >
                    <h5 class="text-lg font-semibold mb-2 break-words">${show.name}</h5>
                    <p class="text-gray-600 mb-3 break-words">${show.genres}</p>
                    <p class="inline-block text-gray-600 px-4 py-2 rounded">
                        Official Site Not Available
                    </p>
                </div>`;
                homeResultsList.insertAdjacentHTML('beforeend', ShowElement);
            }
            nextButton.style.display = 'block';
            previousButton.style.display = 'block';
        });
    })
    .catch((error) => {
        console.log(error);
    });
}

const clearResults = () => {
    nextButton.style.display = 'none';
    previousButton.style.display = 'none'; 
    searchResultList.innerHTML = '';
    homeResultsList.innerHTML = '';
    Top100ShowsResultsList.innerHTML = '';
    Top100newestShowsResultsList.innerHTML = '';
    Top100EpisodesResultsList.innerHTML = '';
    Top100NewestEpisodesResultsList.innerHTML = '';
}

nextButton.addEventListener('click', () => {
    currentPage++;
    homePageShows();
    window.scrollTo(0, 0);
});

previousButton.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        homePageShows();
        window.scrollTo(0, 0);
    }
});

window.addEventListener("load", () => {
    nextButton.style.display = 'block';
    previousButton.style.display = 'block'; 
    homePageShows();    
});