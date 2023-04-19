const API_KEY = 'ekqy5rdgWnrr11Hl-QisrP6PikE2kwuOh1cE0Fk_pfk';
const API_URL = 'https://api.unsplash.com/search/photos?page=1&query=Catan';

headers = {
    headers: {
        'Authorization': `Client-ID ${API_KEY}`,
        'Accept-Version': 'v1',
        'Content-Type': 'application/json'
    }
    }

//const fetchUnsplash=(url)=>
    fetch(API_URL,headers )
    .then(response => response.json())
    .then(data => {
        if (data.results!=null)
            data=data.results;
        data.forEach(
        element=>{
            img=element.urls.regular;
            console.log(img)
        })})
    .catch(error => console.error(error));




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
const createGameCard = (element)=>{
    

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


