// nav buttons
const pcActorsButton = document.querySelector('#actors');
const mobileActorsButton = document.querySelector('#actors_mobile');

// where the results of selected show/actors go
const resultList = document.querySelector('#results');
const showInfo = document.querySelector('#showInfo');
const detailsList = document.querySelector('#details');
const extraDetailsList = document.querySelector('#extraDetails');

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
            <button onclick="showDetails(${show.id})">
                <img 
                    src="${show.image?.medium}" 
                    alt="${show.name}"
                    class="w-full rounded hover:scale-105 duration-100 easy-in"
                >
            </button>`;
            resultList.insertAdjacentHTML('beforeend', ShowElement);
        });
        if(data === null || data.length == 0 ){
            const errorElement = `
                <p class="text-gray-600 mb-3 break-words">Sorry no TV shows were found</p>
            </div>`;
            resultList.insertAdjacentHTML('beforeend', errorElement);
        }
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
            </div>`;
            resultList.insertAdjacentHTML('beforeend', actorElement);
        });
        if(data === null || data.length == 0 ){
            const errorElement = `
                <p class="text-gray-600 mb-3 break-words">Sorry no actors were found</p>
            </div>`;
            resultList.insertAdjacentHTML('beforeend', errorElement);
        }
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
            <button onclick="showDetails(${show.id})">
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

function actorsPage(){
    const url = 'https://api.tvmaze.com/people?page=' + currentActorPage;
    currentWepPage = "actors";
    clearResults();
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach((person) => {
            const personElement = `
            <button class="bg-white rounded shadow border-2 p-4 mb-4" onclick="actorDetails(${person.id})">
                <img 
                    src="${person.image?.medium}" 
                    alt="${person.name}"
                    class="w-full rounded mb-4"
                >
                <h5 class="text-lg font-semibold mb-2 break-words">${person.name}</h5>
            </button>`;
            resultList.insertAdjacentHTML('beforeend', personElement);
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
    const showUrl = 'https://api.tvmaze.com/shows/' + showId ;
    let showName = "";
    fetch(showUrl)
    .then((response) => response.json())
    .then((data) => {
        const show = data;
        showName = show.name;
        const ShowElement = `
        <img class="w-full rounded mb-4 row-start-1"
            src="${show.image?.medium}" 
            alt="${show.name}">
        </img>
        <div class="ml-4 md:col-span-2 row-start-2 col-span-2 md:row-end-1">
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
        <br>
        `;
        detailsList.insertAdjacentHTML('beforeend', ShowElement);
    })
    .catch((error) => {
        console.log(error);
    });
    const seasonUrl = 'https://api.tvmaze.com/shows/' + showId + '/seasons';
    fetch(seasonUrl)
    .then((response) => response.json())
    .then((data) => {
        let seasonAmount = 0;
        data.forEach((season) => {
            seasonAmount++;
            const ShowElement = `
                <button onclick="seasonDetails(${season.id})">
                    <img 
                        src="${season.image?.medium}" 
                        alt="${showName} season ${seasonAmount}"
                        class="w-full rounded hover:scale-105 duration-100 easy-in"
                    >
                </button>`;
            extraDetailsList.insertAdjacentHTML('beforeend', ShowElement);
        });

    })
    .catch((error) => {
        console.log(error);
    });
}

function seasonDetails(seasonID){
    clearResults();
    const showUrl = 'https://api.tvmaze.com/seasons/' + seasonID;
    fetch(showUrl)
    .then((response) => response.json())
    .then((season) => {
        const seasonElement = `
        <img class="w-full rounded mb-4 row-start-1"
            src="${season.image?.medium}" 
            alt="${season.name}">
        </img>
        <div class="ml-4 md:col-span-2 row-start-2 col-span-2 md:row-end-1">
            <h2><strong>Season ${season.number}</strong></h2>
            <p>${season.premiereDate.split("-").reverse().join("/")} - ${season.endDate?.split("-").reverse().join("/") || "ongoing"}</p>
            <p>Episodes: ${season.episodeOrder}</p>
            <br>
            <p>${season?.summary}</p>
            <br>
        </div>
        
        <h2 class="float-left col-span-5">Epsiodes:</h2>
        <br>
        `;
        detailsList.insertAdjacentHTML('beforeend', seasonElement);
    })
    .catch((error) => {
        console.log(error);
    });
    const seasonUrl = 'https://api.tvmaze.com/seasons/' + seasonID + '/episodes?embed=show';
    fetch(seasonUrl)
    .then((response) => response.json())
    .then((data) => {
        let episodeAmount = 0;
        data.forEach((episode) => {
            episodeAmount++;
            const episodeElement = `
                <button onclick="episodeDetails(${episode.id})">
                    <p class="float-left mb-2">${episode.name}</p>
                    <img 
                        src="${episode.image?.medium}" 
                        alt="${episode._embedded.show.name} episode ${episode.name}"
                        class="w-full rounded hover:scale-105 duration-100 easy-in"
                    >
                </button>`;
            extraDetailsList.insertAdjacentHTML('beforeend', episodeElement);
        });

    })
    .catch((error) => {
        console.log(error);
    });
}

function episodeDetails(episodeID){
    clearResults();
    const showUrl = 'https://api.tvmaze.com/episodes/' + episodeID;
    fetch(showUrl)
    .then((response) => response.json())
    .then((episode) => {
        const seasonElement = `
        <img class="w-full rounded mb-4 row-start-1"
            src="${episode.image?.medium}" 
            alt="${episode.name}">
        </img>
        <div class="ml-4 md:col-span-2 row-start-2 col-span-2 md:row-end-1">
            <h2><strong>${episode.name}</strong></h2>
            <p>Airdate: ${episode.airdate}</p>
            <p>Rating: ${episode.rating.average}</p>
            <br>
            <p>${episode?.summary}</p>
            <br>
        </div>
        `;
        detailsList.insertAdjacentHTML('beforeend', seasonElement);
    })
}

function actorDetails(actorId){
    clearResults();
    const actorUrl = 'https://api.tvmaze.com/people/' + actorId;
    fetch(actorUrl)
    .then((response) => response.json())
    .then((data) => {
        const actor = data;
        const personElement = `
        <img class="w-full rounded mb-4 row-start-1"
            src="${actor.image?.medium}" 
            alt="${actor.name}">
        </img>
        <div class="ml-4 md:col-span-2 row-start-2 col-span-2 md:row-end-1">
            <h2><strong>${actor.name}</strong></h2>
            <p>from: ${actor.country?.name || "Unknown"}</p>
            <p>birthday: ${actor.birthday?.split("-").reverse().join("/") || "Unknown"}</p>
            <br>
            <br>
        </div>
        
        <h2 class="float-left col-span-5">shows:</h2>
        <br>
        `;
        detailsList.insertAdjacentHTML('beforeend', personElement);
    })
    .catch((error) => {
        console.log(error);
    });
    const showUrl = 'https://api.tvmaze.com/people/' + actorId + '/guestcastcredits?embed=episode';
    fetch(showUrl)
    .then((response) => response.json())
    .then((data) => {
        let currentShow = []
        data.forEach((person) => {
            show = person._embedded.episode._links.show.name;
            console.log(show)
            if (!currentShow.includes(show)){
                const ShowElement = `
                    <div>
                        <p>${person._embedded.episode._links.show.name}</p>
                        <img 
                            src="${person._embedded.episode.image?.medium}" 
                            alt="${person._embedded.episode._links.show.name}"
                            class="w-full rounded"
                        >
                    </div>`;
                extraDetailsList.insertAdjacentHTML('beforeend', ShowElement);
            }
            currentShow.push(show);
        });

    })
    .catch((error) => {
        console.log(error);
    });
}

pcActorsButton.addEventListener('click', () => {
    actorsPage();
});

mobileActorsButton.addEventListener('click', () => {
    actorsPage();
});

function clearResults(){
    nextButton.style.display = 'none';
    previousButton.style.display = 'none'; 
    resultList.innerHTML = '';
    details.innerHTML = '';
    extraDetailsList.innerHTML = '';
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