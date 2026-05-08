const resultList = document.querySelector('#results');
let curretnWebPage = "home";
let currentPage = 0;

const searchShows = (event) => {
    event.preventDefault();
    const keyword = document.querySelector('#keywords').value;
    const url = 'https://api.tvmaze.com/search/shows?q=' + keyword;
    resultList.innerHTML = '';
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
}

const homePageShows = () =>{
    event.preventDefault();
    const url = 'https://api.tvmaze.com/shows?page=' + currentPage;
    resultList.innerHTML = '';
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
    homePageShows();    
});