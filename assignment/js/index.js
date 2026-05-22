// nav buttons
const pcActorsButton = document.querySelector('#actors');
const mobileActorsButton = document.querySelector('#actors_mobile');
const Top100ShowsButton = document.querySelector('#Top_100_shows');
const Top100NewestShowsButton = document.querySelector('#Top_100_newest_shows');
const Top100EpisodesButton = document.querySelector('#Top_100_episodes');
const Top100NewestEpisodesButton = document.querySelector('#Top_100_newest_episodes');

// where the results of selected show/actors go
const resultList = document.querySelector('#results');
const detailsList = document.querySelector('#details');
const seasonsList = document.querySelector('#seasons');

// next and previous buttons for switch pages
const previousButton = document.querySelector('#previousButton');
const nextButton = document.querySelector('#nextButton');

let currentShowPage = 0;
let currentActorPage = 0;
let currentWepPage = "home";


function searchShows(){
    event.preventDefault();
    const keyword = document.querySelector('#keywords').value;
    console.log("keyword: "+ keyword.trim());
    if(keyword.trim() == ""){
        return;
    }
    const showUrl = 'https://api.tvmaze.com/search/shows?q=' + keyword;
    clearResults();
    fetch(showUrl)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach((item) => {
            const show = item.show;
            const ShowElement = `
            <button class="bg-white rounded shadow border-2 mb-4 " onclick="showDetails(${show.id})">
                <img 
                    src="${show.image?.medium}" 
                    alt="${show.name}"
                    class="w-full rounded hover:scale-105 duration-100 easy-in"
                >
            </button>`;
            resultList.insertAdjacentHTML('beforeend', ShowElement);
        });
    })
    .catch((error) => {
        console.log(error);
    });
    const url = 'https://api.tvmaze.com/search/people?q=' + keyword;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach((item) => {
            const person = item.person;
            const actorElement = `
            <div class="bg-white rounded shadow border-2 p-4 mb-4">
                <img 
                    src="${person.image?.medium}" 
                    alt="${person.name}"
                    class="w-full rounded mb-4"
                >
                <h5 class="text-lg font-semibold mb-2 break-words">${person.name}</h5>
                <p class="text-gray-600 mb-3 break-words">From: ${person.country ? person.country.name: 'Unknown'}</p>
                <p class="text-gray-600 mb-3 break-words">Date of birth: ${person.birthday ? person.birthday.split("-").reverse().join("/"): 'Unknown'}</p>
            </div>`;
            resultList.insertAdjacentHTML('beforeend', actorElement);
        });
    })
    .catch((error) => {
        console.log(error);
    });
}

function homePageShows(){
    const url = 'https://api.tvmaze.com/shows?page=' + currentShowPage;
    currentWepPage = "show";
    clearResults();
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((show) => {
            const ShowElement = `
            <button class="bg-white rounded shadow border-2 mb-4 " onclick="showDetails(${show.id})">
                <img 
                    src="${show.image?.medium}" 
                    alt="${show.name}"
                    class="w-full rounded hover:scale-105 duration-100 easy-in"
                >
            </button>`;
            resultList.insertAdjacentHTML('beforeend', ShowElement);
            
        });
    })
    .catch((error) => {
        console.log(error);
    });
    nextButton.style.display = 'block';
    previousButton.style.display = 'block';
}

pcActorsButton.addEventListener('click', () => {
    actorsPage();
});

mobileActorsButton.addEventListener('click', () => {
    actorsPage();
});

function actorsPage(){
    const url = 'https://api.tvmaze.com/people?page=' + currentActorPage;
    currentWepPage = "actors";
    clearResults();
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach((Actor) => {
            const ShowElement = `
            <div class="bg-white rounded shadow border-2 p-4 mb-4">
                <img 
                    src="${Actor.image?.medium}" 
                    alt="${Actor.name}"
                    class="w-full rounded mb-4"
                >
                <h5 class="text-lg font-semibold mb-2 break-words">${Actor.name}</h5>
                <p class="text-gray-600 mb-3 break-words">From: ${Actor.country ? Actor.country.name: 'Unknown'}</p>
                <p class="text-gray-600 mb-3 break-words">Date of birth: ${Actor.birthday ? Actor.birthday.split("-").reverse().join("/"): 'Unknown'}</p>
            </div>`;
            resultList.insertAdjacentHTML('beforeend', ShowElement);
        });
    })
    .catch((error) => {
        console.log(error);
    });
    nextButton.style.display = 'block';
    previousButton.style.display = 'block';
}

function showDetails(showId){
    clearResults();
    const showUrl = 'https://api.tvmaze.com/shows/' + showId;
    clearResults();
    let showName = "";
    fetch(showUrl)
    .then((response) => response.json())
    .then((data) => {
        const show = data;
        showName = show.name;
        const ShowElement = `
        <img class="w-full rounded mb-4 md:col-span-1 col-span-1"
            src="${show.image?.medium}" 
            alt="${show.name}">
        </img>
        <div class="ml-4 md:col-span-2 col-span-1">
            <h2><strong>${show.name}</strong></h2>
            <p>Rating: ${show.rating.average}</p>
            <p>Genres: ${show.genres}</p>
            <br>
            <p>${show.summary}</p>
            <br>
            <a target="_blank" href="${show.officialSite || ''}" class="inline-block bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 float-right">
                Visit Official Site
            </a>
        </div>
        <h2 class="float-left col-span-5">Seasons:</h2>
        `;
        detailsList.insertAdjacentHTML('beforeend', ShowElement);
    })
    .catch((error) => {
        console.log(error);
    });
    const seasonUrl = 'https://api.tvmaze.com/shows/' + showId + '/seasons';
    clearResults();
    fetch(seasonUrl)
    .then((response) => response.json())
    .then((data) => {
        let seasonAmount = 0;
        data.forEach((season) => {
            seasonAmount++;
            const ShowElement = `
                <button class="bg-white m-4">
                    <img 
                        src="${season.image?.medium}" 
                        alt="${showName} season ${seasonAmount}"
                        class="w-full rounded hover:scale-105 duration-100 easy-in"
                    >
                </button>`;
            seasonsList.insertAdjacentHTML('beforeend', ShowElement);
        });

    })
    .catch((error) => {
        console.log(error);
    });
}

//#region dont know if to use

Top100ShowsButton.addEventListener('click', () => {
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
                resultList.insertAdjacentHTML('beforeend', ShowElement);
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
                resultList.insertAdjacentHTML('beforeend', ShowElement);
            }
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

Top100NewestShowsButton.addEventListener('click', () => {
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
                resultList.insertAdjacentHTML('beforeend', ShowElement);
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
                resultList.insertAdjacentHTML('beforeend', ShowElement);
            }
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

Top100EpisodesButton.addEventListener('click', () => {
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
                resultList.insertAdjacentHTML('beforeend', ShowElement);
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
                resultList.insertAdjacentHTML('beforeend', ShowElement);
            }
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

Top100NewestEpisodesButton.addEventListener('click', () => {
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
                resultList.insertAdjacentHTML('beforeend', ShowElement);
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
                resultList.insertAdjacentHTML('beforeend', ShowElement);
            }
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

//#endregion


function clearResults(){
    nextButton.style.display = 'none';
    previousButton.style.display = 'none'; 
    resultList.innerHTML = '';
    details.innerHTML = '';
}

nextButton.addEventListener('click', () => {
    if(currentWepPage == "show"){
        currentShowPage++;
        homePageShows();
    }
    else if(currentWepPage == "actors"){
        currentActorPage++;
        actorsPage();
    }
    window.scrollTo(0, 0);
});

previousButton.addEventListener('click', () => {
    if (currentShowPage > 0){
        if(currentWepPage == "show"){
            currentShowPage--;
            homePageShows();
        }
        else if(currentWepPage == "actors"){
            currentActorPage--;
            actorsPage();
        }
        window.scrollTo(0, 0);
    }
});

window.addEventListener("load", () => {
    nextButton.style.display = 'block';
    previousButton.style.display = 'block'; 
    homePageShows();    
});