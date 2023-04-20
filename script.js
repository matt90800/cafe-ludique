const API_KEY = 'ekqy5rdgWnrr11Hl-QisrP6PikE2kwuOh1cE0Fk_pfk';
let searchTitle="Ticket to Ride";
const API_URL = `https://api.unsplash.com/search/photos?page=1&query=${searchTitle}`;

headers = {
    headers: {
        'Authorization': `Client-ID ${API_KEY}`,
        'Accept-Version': 'v1',
        'Content-Type': 'application/json'
    }
    }

    const fetchUnsplash = (search) => {
        const imageUrls = [];
        searchTitle = search;
        return fetch(API_URL, headers)
          .then(response => response.json())
          .then(data => {
            if (data.results != null)
              data = data.results;
            data.forEach(element => {
              imageUrls.push(element.urls.regular);
            });
            return imageUrls;
          })
          .catch(error => console.error(error));
      }




fetch("http://localhost:8000/")
    .then(response => response.json())
    .then(json=>{
        json=json.games;
        console.log(json)
        json.forEach(
            element => {
                createGameCard(element);
            }
        );
        }        
    );


const main = document.querySelector("main");
const createGameCard =async (element)=>{
    let rand=Math.round(Math.random()*10);
    await fetchUnsplash(element.title).then(img => {
        element.image=img[rand];
    });

    const card = document.createElement("div");
    card.className="card col-4";
    card.innerHTML=
    `
    <h5 class="card-title">${element.title}</h5>
    <img class="card-img-top" src=${element.image} alt="${element.image}">
      <p> ${element.info}</p>
      <p> ${element.genre}</p>
      <p> ${element.designer}</p>
      <p> ${element.players}</p>
    `;
    main.append(card);
}


