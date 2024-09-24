let searchBtnEle = document.getElementById("nav-search-btn");
let clearBtnEle = document.getElementById("nav-clear-btn");
let navInputEle = document.getElementById("nav-input-id");
let bookNowBtn = document.getElementById("book-now-btn");
const searchResultDiv = document.getElementById("search-result-id");

searchBtnEle.addEventListener("click", function () {
    console.log("search input: ", navInputEle.value);
    searchDestination(navInputEle.value);
    navInputEle.value = "";
});

clearBtnEle.addEventListener("click", function () {
    navInputEle.value = "";
    searchResultDiv.innerHTML = '';
});

bookNowBtn.addEventListener("click", function () {
    console.log("Book now Button got clicked!",);
})

function searchDestination(keyword) {
    let searchResult;
    fetch("http://127.0.0.1:8080/travel_recommendation_api.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            for (let key in data) {
                if (key.includes(keyword.toLowerCase())) {
                    searchResult = data[key];
                }
            }
            console.log('searchResult1', searchResult);
            if (!searchResult) {
                data.countries.forEach(country => {
                    console.log('country', country);
                    if (country.name.toLowerCase().includes(keyword.toLowerCase())) {
                        searchResult = country.cities;
                    }
                })
            }
            console.log('searchResult2', searchResult);
            showSearchResult(searchResult);
            return searchResult;
        })
        .catch((error) =>
            console.error("Unable to fetch data:", error));
}

function showSearchResult(searchResult) {
    searchResultDiv.innerHTML = '';
    searchResult.forEach(item => {
        const searchResEleDiv = document.createElement('div');
        searchResEleDiv.classList.add('search-result-element');

        searchResEleDiv.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}">
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <button>Visit</button>
      `;
        console.log('searchResEleDiv: ', searchResEleDiv);
        searchResultDiv.appendChild(searchResEleDiv);
    });
}