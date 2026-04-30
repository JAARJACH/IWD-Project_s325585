const url = 'https://content.guardianapis.com/search?q=sport&api-key=';
const apiKey = '87eb1bd2-be60-4cb9-81c9-4d51620f6dcf';
fetch(url + apiKey)
.then((response) => response.json())
.then((data) => console.log(data));