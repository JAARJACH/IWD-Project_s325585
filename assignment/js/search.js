const resultList = document.querySelector('#results');

const searchShows = (event) => {
    event.preventDefault();
    const keyword = document.querySelector('#keywords').value;
    localStorage.setItem("search value", JSON.stringify(keyword));
    const url = 'https://api.tvmaze.com/search/shows?q=' + keyword;
    resultList.innerHTML = '';
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        localStorage.setItem("shows", JSON.stringify(data));
        data.forEach((item) => {
            const show = item.show;
            const ShowElement = `
            <div class="bg-white rounded shadow border-2 p-4 mb-4">
                <img 
                    src="${show.image?.medium}" 
                    alt="${show.name}"
                    class="w-full rounded mb-4"
                >
                <h5 class="text-lg font-semibold mb-2 break-words">${show.name}</h5>
                <p class="text-gray-600 mb-3 break-words">${show.genres}</p>
                <a target="_blank" href="${show.officialSite || '#'}" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Visit Show
                </a>
            </div>`;
            resultList.insertAdjacentHTML('beforeend', ShowElement);
        });
    })
    .catch((error) => {
        console.log(error);
    });
}

const displayShows = (data, searchValue) => {

    resultList.innerHTML = '';
    document.querySelector('#keywords').value = searchValue;

    data.forEach((item) => {

        const show = item.show;

        const ShowElement = `
        <div class="bg-white rounded shadow border-2 p-4 mb-4">
                <img 
                    src="${show.image?.medium}" 
                    alt="${show.name}"
                    class="w-full rounded mb-4"
                >
                <h5 class="text-lg font-semibold mb-2 break-words">${show.name}</h5>
                <p class="text-gray-600 mb-3 break-words">${show.genres}</p>
                <a target="_blank" href="${show.officialSite || '#'}" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Visit Show
                </a>
            </div>`;

        resultList.insertAdjacentHTML('beforeend', ShowElement);
    });
};

window.addEventListener("load", () => {
    
    const savedShows = localStorage.getItem("shows");
    const savedSearchValue = localStorage.getItem("search value");

    if (savedShows) {

        const showData = JSON.parse(savedShows);
        const searchValueData = JSON.parse(savedSearchValue);

        displayShows(showData, searchValueData);
    }
});