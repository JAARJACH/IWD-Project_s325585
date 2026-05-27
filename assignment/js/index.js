// nav buttons
const pcActorsButton = document.querySelector('#actors');
const mobileActorsButton = document.querySelector('#actors_mobile');

// where the results of selected show/actors go
const wizardNav = document.querySelector('#wizard');
const resultList = document.querySelector('#results');
const showInfo = document.querySelector('#showInfo');
const detailsList = document.querySelector('#details');
const extraDetailsList = document.querySelector('#extraDetails');

// next and previous buttons for switch pages
const previousButton = document.querySelector('#previousButton');
const nextButton = document.querySelector('#nextButton');

let currentDetailspage = "show";
let currentShowID = "";
let currentActorID = "";
let currentSeasonID = "";

let currentShowPage = 0;
let currentActorPage = 0;
let currentWepPage = "home";


function searchShows(){
    event.preventDefault();
    wizardNav.innerHTML = "";
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
                    src="${show.image?.medium ?? 'https://www.dummyimage.com/400x600/919191/000000.jpg&text=' + show.name}" 
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
        return;
    });
    const url = 'https://api.tvmaze.com/search/people?q=' + keyword;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach((item) => {
            const person = item.person;
            const actorElement = `
            <button class="bg-white rounded shadow border-2 p-4 mb-4" onclick="actorDetails(${person.id})">
                <img 
                    src="${person.image?.medium ?? 'https://www.dummyimage.com/400x600/919191/000000.jpg&text='+ person.name }" 
                    alt="${person.name}"
                    class="w-full rounded mb-4"
                >
                <h5 class="text-lg font-semibold mb-2 break-words">${person.name}</h5>
            </button>`;
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
        return;
    });
    document.querySelector('#keywords').value = "";
}

function homePageShows(){
    resultList.style.display = "";
    currentDetailspage = "show";
    wizardNav.innerHTML =''; 
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
                    src="${show.image?.medium ?? 'https://www.dummyimage.com/400x600/919191/000000.jpg&text=' + show.name}" 
                    alt="${show.name}"
                    class="w-full rounded hover:scale-105 duration-100 easy-in"
                >
            </button>`;
            resultList.insertAdjacentHTML('beforeend', ShowElement);
            
        });
    })
    .catch((error) => {
        return;
    });
    nextButton.style.display = 'block';
    previousButton.style.display = 'block';
}

function actorsPage(){
    resultList.style.display = "";
    currentDetailspage = "actor";
    wizardNav.innerHTML = "";
    const url = 'https://api.tvmaze.com/people?page=' + currentActorPage;
    currentWepPage = "actors";
    clearResults();
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach((person) => {
            const personElement = `
            <button class="bg-white rounded shadow border-2 p-4 mb-4 w-full rounded hover:scale-105 duration-100 easy-in" onclick="actorDetails(${person.id})">
                <img 
                    src="${person.image?.medium ?? 'https://www.dummyimage.com/400x600/919191/000000.jpg&text=' + person.name}"
                    alt="${person.name}"
                    class="w-full rounded mb-4"
                >
                <h5 class="text-lg font-semibold mb-2 break-words">${person.name}</h5>
            </button>`;
            resultList.insertAdjacentHTML('beforeend', personElement);
        });
    })
    .catch((error) => {
        return;
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
    .then((show) => {
        currentShowID = show.id;
        showName = show.name;
        const ShowElement = `
        <img class="w-full rounded mb-4 row-start-1"
            src="${show.image?.medium ?? 'https://www.dummyimage.com/400x600/919191/000000.jpg&text=' + show.name}" 
            alt="${show.name}">
        </img>
        <div class="ml-4 md:col-span-2 row-start-2 col-span-2 md:row-end-1">
            <h2><strong>${show.name}</strong></h2>
            <p>Rating: ${show.rating?.average || "Unknown"}</p>
            <p>Genres: ${show?.genres || "Unknown"}</p>
            <p>Network: ${show.network?.name || "Unknown"}</p>
            <p>${show.premiered.split("-").reverse().join("/")} - ${show.ended?.split("-").reverse().join("/") || "ongoing"}</p>
            <br>
            <p>${show?.summary || ""}</p>
            <br>
            <a target="_blank" href="${show.officialSite || ''}" class="inline-block bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 float-right">
                Visit Official Site
            </a>
        </div>
        
        <h2 class="float-left col-span-2 md:col-span-3 mb-2">Seasons:</h2>
        <br>
        `;
        detailsList.insertAdjacentHTML('beforeend', ShowElement);
    })
    .catch((error) => {
        return;
    });
    const seasonUrl = 'https://api.tvmaze.com/shows/' + showId + '/seasons';
    fetch(seasonUrl)
    .then((response) => response.json())
    .then((data) => {
        let seasonAmount = 0;
        data.forEach((season) => {
            seasonAmount++;
            const seasonElement = `
                <button onclick="seasonDetails(${season.id})">
                    <img 
                        src="${season.image?.medium ?? 'https://www.dummyimage.com/400x600/919191/000000.jpg&text=' + showName + ' Season ' + seasonAmount}" 
                        alt="${showName} season ${seasonAmount}"
                        class="w-full rounded hover:scale-105 duration-100 easy-in"
                    >
                </button>`;
            extraDetailsList.insertAdjacentHTML('beforeend', seasonElement);
        });
        const paragraphElement = `<h2 class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 mb-2">Actors:</h2>`;
        extraDetailsList.insertAdjacentHTML('beforeend', paragraphElement);
        
        const actorsUrl = 'https://api.tvmaze.com/shows/' + showId + '/cast';
        fetch(actorsUrl)
        .then((response) => response.json())
        .then((data) => {
            const actorList = [];
            data.forEach((people) => {
                actor = people.person;
                if (!actorList.includes(actor.name)){
                    const actorElement = `
                        <button class="bg-white rounded shadow border-2 w-full rounded hover:scale-105 duration-100 easy-in" onclick="actorDetails(${actor.id})">
                            <img 
                                src="${actor.image?.medium ?? 'https://www.dummyimage.com/400x600/919191/000000.jpg&text=' + actor.name}" 
                                alt="${actor.name}"
                                class="w-full rounded mb-4"
                            >
                            <h5 class="text-lg font-semibold mb-2 break-words">${actor.name}</h5>
                        </button>`;
                    extraDetailsList.insertAdjacentHTML('beforeend', actorElement);
                }
                actorList.push(actor.name);
            });

        })
        .catch((error) => {
            return;
        });
    })
    .catch((error) => {
        return;
    });

    resultList.style.display = "none";
    wizardNav.innerHTML = '';
    if(wizardNav.children.length <= 0){
        const homeButtonElement = `
            <button class="p-2" onclick="homePageShows()">
                Home
            </button>
            <p class="inline-block"> / </P>
            `;
        wizardNav.insertAdjacentHTML('beforeend', homeButtonElement);
        if(currentDetailspage == "actor"){
            const actorButtonElement = `
                <button class="p-2" onclick="actorDetails(${currentActorID})">
                    actor
                </button>
                <p class="inline-block"> / </P>
                `;
            wizardNav.insertAdjacentHTML('beforeend', actorButtonElement);
            
            currentDetailspage = "show";
        }
        
    }
}

function seasonDetails(seasonID){
    clearResults();
    const showUrl = 'https://api.tvmaze.com/seasons/' + seasonID;
    fetch(showUrl)
    .then((response) => response.json())
    .then((season) => {
        currentSeasonID = season.id;
        const seasonElement = `
        <img class="w-full rounded mb-4 row-start-1"
            src="${season.image?.medium ?? 'https://www.dummyimage.com/400x600/919191/000000.jpg&text=' + 'Season ' + sesason.name}" 
            alt="Season ${season.number}">
        </img>
        <div class="ml-4 md:col-span-2 row-start-2 col-span-2 md:row-end-1">
            <h2><strong>Season ${season.number}</strong></h2>
            <p>${season.premiereDate.split("-").reverse().join("/")} - ${season.endDate?.split("-").reverse().join("/") || "ongoing"}</p>
            <p>Episodes: ${season?.episodeOrder || "Unknown"}</p>
            <p>Network: ${season.network?.name || "Unknown"}</p>
            <br>
            <p>${season?.summary || ""}</p>
            <br>
        </div>
        
        <h2 class="float-left col-span-5">Epsiodes:</h2>
        <br>
        `;
        detailsList.insertAdjacentHTML('beforeend', seasonElement);
    })
    .catch((error) => {
        return;
    });
    const seasonUrl = 'https://api.tvmaze.com/seasons/' + seasonID + '/episodes';
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
                        src="${episode.image?.medium ?? 'https://www.dummyimage.com/400x600/919191/000000.jpg&text=' + episode.name}" 
                        alt="${episode.name}"
                        class="w-full rounded hover:scale-105 duration-100 easy-in"
                    >
                </button>`;
            extraDetailsList.insertAdjacentHTML('beforeend', episodeElement);
        });

    })
    .catch((error) => {
        return;
    });
    if(!wizardNav.textContent.includes("show")){
        const showButtonElement = `
            <button class="p-2" onclick="showDetails(${currentShowID})"">
                show
            </button>
            <p class="inline-block"> / </P>
            `;
        wizardNav.insertAdjacentHTML('beforeend', showButtonElement);
    }
    if(currentDetailspage == "show"){
        if(wizardNav.children.length > 4){
            wizardNav.lastElementChild.remove();
        }
    }
    if(currentDetailspage == "actor"){
        if(wizardNav.children.length > 6){
            wizardNav.lastElementChild.remove();
        }
    }
    
}

function episodeDetails(episodeID){
    clearResults();
    const showUrl = 'https://api.tvmaze.com/episodes/' + episodeID + '?embed=show';
    fetch(showUrl)
    .then((response) => response.json())
    .then((episode) => {
        const seasonElement = `
        <img class="w-full rounded mb-4 row-start-1"
            src="${episode.image?.medium ?? 'https://www.dummyimage.com/400x600/919191/000000.jpg&text=' + episode.name}" 
            alt="${episode.name}">
        </img>
        <div class="ml-4 md:col-span-2 row-start-2 col-span-2 md:row-end-1">
            <h2><strong>${episode.name}</strong></h2>
            <p>Airdate: ${episode?.airdate || "Unknown"}</p>
            <p>Rating: ${episode.rating?.average || "Unknown"}</p>
            <p>Genres: ${episode._embedded.show?.genres || "Unknown"}</p>
            <br>
            <p>${episode?.summary || ""}</p>
            <br>
        </div>
        `;
        detailsList.insertAdjacentHTML('beforeend', seasonElement);
    }).catch((error) => {
        return;
    });
    if(!wizardNav.textContent.includes("season")){
        const seasonButtonElement = `
            <button class="p-2" onclick="seasonDetails(${currentSeasonID})"">
                season
            </button>`;
        wizardNav.insertAdjacentHTML('beforeend', seasonButtonElement);
    }
}    

function actorDetails(actorId){
    clearResults();
    const actorUrl = 'https://api.tvmaze.com/people/' + actorId;
    fetch(actorUrl)
    .then((response) => response.json())
    .then((actor) => {
        currentActorID = actor.id;
        const personElement = `
        <img class="w-full rounded mb-4 row-start-1"
            src="${actor.image?.medium ?? 'https://www.dummyimage.com/400x600/919191/000000.jpg&text=' + actor.name}" 
            alt="${actor.name}">
        </img>
        <div class="ml-4 md:col-span-2 row-start-2 col-span-2 md:row-end-1">
            <h2><strong>${actor.name}</strong></h2>
            <p>from: ${actor.country?.name || "Unknown"}</p>
            <p>birthday: ${actor.birthday?.split("-").reverse().join("/") || "Unknown"}</p>
        </div>
        
        <h2 class="float-left col-span-5 mb-2">shows:</h2>
        <br>
        `;
        detailsList.insertAdjacentHTML('beforeend', personElement);
    })
    .catch((error) => {
        return;
    });
    const showUrl = 'https://api.tvmaze.com/people/' + actorId + '/castcredits?embed=show';
    fetch(showUrl)
    .then((response) => response.json())
    .then((data) => {
        let showsList = []
        data.forEach((person) => {
            show = person._embedded.show.name;
            if (!showsList.includes(show)){
                const ShowElement = `
                    <buttons onclick="showDetails(${person._embedded.show.id})">
                        <img 
                            src="${person._embedded.show.image?.medium ?? 'https://www.dummyimage.com/400x600/919191/000000.jpg&text=' + person._embedded.show.name}" 
                            alt="${person._embedded.show.name}"
                            class="w-full rounded hover:scale-105 duration-100 easy-in"
                        >
                    </buttons>`;
                extraDetailsList.insertAdjacentHTML('beforeend', ShowElement);
            }
            showsList.push(show);
        });

    })
    .catch((error) => {
        return;
    });
    resultList.style.display = "none";
    wizardNav.innerHTML = "";
    const homeButtonElement = `
        <button class="p-2" onclick="homePageShows()">
            Home
        </button>
        <p class="inline-block"> / </P>
        `;
    wizardNav.insertAdjacentHTML('beforeend', homeButtonElement);
    if(currentDetailspage == "show"){
        const showButtonElement = `
            <button class="p-2" onclick="showDetails(${currentShowID})">
                show
            </button>
            <p class="inline-block"> / </P>
            `;
        wizardNav.insertAdjacentHTML('beforeend', showButtonElement);
        
        currentDetailspage = "actor";
    }
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