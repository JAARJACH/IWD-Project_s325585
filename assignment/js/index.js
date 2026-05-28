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

// these are used to store all the ID numbers to be used inside the wizard buttons
let currentDetailspage = "show";
let currentShowID = "";
let currentActorID = "";
let currentSeasonID = "";

// used for the page navigation between the show and people page
let currentShowPage = 0;
let currentActorPage = 0;
let currentWepPage = "home";


function searchShows(event){
    /*  used to search through shows and people and display them based 
        on if they are a show which just shows an image of the tv show 
        and for the people they get an image of them and their name 
        displayed underneith the image
    */
    event.preventDefault();
    // makes sure that all content can be seen 
    resultList.style.display = "";
    wizardNav.innerHTML = "";
    // takes the input inside the search bar to be used for the URL
    const keyword = document.querySelector('#keywords').value;
    // if the search is empty the function ends here to not wait resorces
    if(keyword.trim() == ""){
        return;
    }

    // the URL for the data to be fetched
    const showUrl = 'https://api.tvmaze.com/search/shows?q=' + keyword;
    // cleans the webpage of any tv shows or people  
    clearResults();
    /* fetches the data that is needed to find tv shows and people
       that is simular to the searched keyword so the data can be manipulated
       and displayed properly
    */
    fetch(showUrl)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((item) => {
            // for each object found it creats a button that will lead to the shows details
            const show = item.show;
            const ShowElement = `
            <button onclick="showDetails(${show.id})">
                <img 
                    src="${show.image?.medium ?? 'https://www.dummyimage.com/400x600/919191/000000.jpg&text=' + show.name}" 
                    alt="${show.name}"
                    class="w-full rounded hover:scale-105 duration-100 easy-in"
                >
            </button>`;
            // used to insert all the tv show buttons 
            resultList.insertAdjacentHTML('beforeend', ShowElement);
        });
        // used to show an human friendly error that there are no shows with the keyword
        if(data === null || data.length == 0 ){
            const errorElement = `
                <p class="text-gray-600 mb-3 break-words">Sorry no TV shows were found</p>
            </div>`;
            resultList.insertAdjacentHTML('beforeend', errorElement);
        }
        // does the same exact thing just for the people(cast/crew members)
        const url = 'https://api.tvmaze.com/search/people?q=' + keyword;
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
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
    })
    // if any error occurs the program is terminated and stop the error from happening 
    .catch((error) => {
        return;
    });
    
    // makes the search bar empty for the next use of it
    document.querySelector('#keywords').value = "";
}

function homePageShows(){
    // displays all the shows in pages of roughly 1000 shows a page

    // allows the results list to be displayed for the show buttons to be inserted
    resultList.style.display = "";
    // makes the wizard appear and 
    currentDetailspage = "show";
    wizardNav.innerHTML =''; 
    const url = 'https://api.tvmaze.com/shows?page=' + currentShowPage;
    currentWepPage = "show";
    clearResults();
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((show) => {
            /* creates a button with a image of the tv show if there is no image to 
               show a dummy image is created with the shows name to make it look better 
            */
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
    // makes the buttons that control the pages appear
    nextButton.style.display = 'block';
    previousButton.style.display = 'block';
}

function actorsPage(){
    // displays all the people in pages of roughly 1000 people per page
    resultList.style.display = "";
    currentDetailspage = "actor";
    wizardNav.innerHTML = "";
    const url = 'https://api.tvmaze.com/people?page=' + currentActorPage;
    currentWepPage = "actors";
    clearResults();
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
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
    /* displays the show all of its important details with 
       its seasons and cast members that are in the show
    */

    clearResults();
    const showUrl = 'https://api.tvmaze.com/shows/' + showId ;
    // gets the show name to use it in the other fetches of data
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
        
        // the fetch is done inside another one to make sure 
        // that all the saesons come first and then the actors
        const actorsUrl = 'https://api.tvmaze.com/shows/' + showId + '/cast';
        fetch(actorsUrl)
        .then((response) => response.json())
        .then((data) => {
            // makes sure that there are no duplicates of cast members displayed
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
    // creates the buttons for the wizard fo easy navigation for the user

    // creates the button to go back to the home page for the wizard
    if(wizardNav.children.length <= 0){
        const homeButtonElement = `
            <button class="p-2" onclick="homePageShows()">
                Home
            </button>
            <p class="inline-block"> / </P>
            `;
        // creats the button for actors in the wizard for if the user want to
        // go back and looka the person they were looking at
        wizardNav.insertAdjacentHTML('beforeend', homeButtonElement);
        if(currentDetailspage == "actor"){
            const actorButtonElement = `
                <button class="p-2" onclick="actorDetails(${currentActorID})">
                    actor
                </button>
                <p class="inline-block"> / </P>
                `;
            wizardNav.insertAdjacentHTML('beforeend', actorButtonElement);
            
        }
        
    }
}

function seasonDetails(seasonID){
    /* displays a specific season with all of its important details
       it also includes all of its epsidoes in that season
    */
    clearResults();
    const showUrl = 'https://api.tvmaze.com/seasons/' + seasonID;
    fetch(showUrl)
    .then((response) => response.json())
    .then((season) => {
        currentSeasonID = season.id;
        const seasonElement = `
        <img class="w-full rounded mb-4 row-start-1"
            src="${season.image?.medium ?? 'https://www.dummyimage.com/400x600/919191/000000.jpg&text=' + 'Season ' + season.number}" 
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
    // displays the episodes from the season 
    const seasonUrl = 'https://api.tvmaze.com/seasons/' + seasonID + '/episodes';
    fetch(seasonUrl)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((episode) => {
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
    // makes sure not to create another show button for the wizard
    if(!wizardNav.textContent.includes("show")){
        const showButtonElement = `
            <button class="p-2" onclick="showDetails(${currentShowID})"">
                show
            </button>
            <p class="inline-block"> / </P>
            `;
        wizardNav.insertAdjacentHTML('beforeend', showButtonElement);
    }
    // depending on the current details page it removes 
    // buttons and arrows after clicking back on one 
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
    // only displays the contents of the episode and nothing else
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
    // if there is no season button in the wizard it is created
    if(!wizardNav.textContent.includes("season")){
        const seasonButtonElement = `
            <button class="p-2" onclick="seasonDetails(${currentSeasonID})"">
                season
            </button>`;
        wizardNav.insertAdjacentHTML('beforeend', seasonButtonElement);
    }
}    

function actorDetails(actorId){
    // shows the user all of the details on the person
    // and displays all the tv shows that they have been in 
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
    // gets all shows that the person has been in
    const showUrl = 'https://api.tvmaze.com/people/' + actorId + '/castcredits?embed=show';
    fetch(showUrl)
    .then((response) => response.json())
    .then((data) => {
        // creats this list to make sure no duplicates are made
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
    // creates the home button for the wizard
    const homeButtonElement = `
        <button class="p-2" onclick="homePageShows()">
            Home
        </button>
        <p class="inline-block"> / </P>
        `;
    wizardNav.insertAdjacentHTML('beforeend', homeButtonElement);
    // allows users to go to the show they were just on if they came from one to a person
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

// the button used for desktop users to change the results to the actors pages
pcActorsButton.addEventListener('click', () => {
    actorsPage();
});

// the button used for mobile users to change the results to the actors pages
mobileActorsButton.addEventListener('click', () => {
    actorsPage();
});

// clears all reults lists so that in other function infomation can 
// be inserted into the results lists without mixing reults together
function clearResults(){
    nextButton.style.display = 'none';
    previousButton.style.display = 'none'; 
    resultList.innerHTML = '';
    details.innerHTML = '';
    extraDetailsList.innerHTML = '';
}

// used to go forward a page for either the tv shows or the people
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

// used to go back a page for either the tv shows or the people
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

// used for when a user loads the website, it loads all the shows 
window.addEventListener("load", () => {
    nextButton.style.display = 'block';
    previousButton.style.display = 'block';
    homePageShows();    
});