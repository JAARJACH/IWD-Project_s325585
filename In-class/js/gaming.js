const resultList = document.querySelector('#results');
const url = 'https://content.guardianapis.com/search?q=gaming&api-key=';
const apiKey = '87eb1bd2-be60-4cb9-81c9-4d51620f6dcf';
fetch(url + apiKey)
.then((response) => response.json())
.then((data) => {
    data.response.results.forEach(function (value) {
        console.log(value);
        const articleElement = `
        <div>
            <div class="bg-white rounded shadow border-2 p-4 mb-4">
                <h5 class="text-lg font-semibold mb-2">${value.webTitle}</h5>
                <p class="text-gray-600 mb-3">${value.sectionName}</p>
                <a target="_blank" href="${value.webUrl}" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    View Article
                </a>
            </div>
        </div> `;

        resultList.insertAdjacentHTML('beforeend', articleElement);
    });
});