const searchShows = (event) => {
    event.preventDefault();
    console.log("hi");
    const keyword = document.querySelector('#keywords').value;
    const url = 'https://api.tvmaze.com/search/shows?q=' + keyword;
    const resultList = document.querySelector('#results');
    resultList.innerHTML = '';
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach((item) => {
            const show = item.show;
            const articleElement = `
            <div class="bg-white rounded shadow border-2 p-4 mb-4">
                <h5 class="text-lg font-semibold mb-2 break-words">${show.name}</h5>
                <p class="text-gray-600 mb-3 break-words">${show.genres}</p>
                <a target="_blank" href="${show.officialSite || '#'}" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Visit Show
                </a>
            </div>`;
            resultList.insertAdjacentHTML('beforeend', articleElement);
        });
    })
    .catch((error) => {
        console.log(error);
    });
}