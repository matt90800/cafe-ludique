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
    card.content=element;
    card.href="#offcanvas";
    card.className="card col-lg-3 col-md-5 col-sm-12 m-4";
    card.ariaControls=element.title;
    card.setAttribute("data-bs-target", "#"+element.title);
    card.setAttribute("aria-controls", element.title);
    card.innerHTML=
    `
    <h5 class="card-title">${element.title}</h5>
    <img class="card-img-top" src=${element.image} alt="${element.image}">
      <p> ${element.genre}</p>
      <p> ${element.designer}</p>
      <p> ${element.players}</p>
    `;
    const updateOffcanvas=(HTMLcard)=>{
        const card=HTMLcard.content;
        let offcanvas = document.querySelector("#offcanvas");
        console.log(offcanvas.querySelector("#offcanvasTitle"))
        offcanvas.querySelector("#offcanvasTitle").innerText=card.title
        offcanvas.querySelector("#offcanvasImage").src=card.image
        offcanvas.querySelector("#offcanvasInfo").innerText=card.info
        offcanvas.querySelector("#offcanvasYear").innerText=card.year
        offcanvas.querySelector("#offcanvasGenre").innerText=card.genre
        offcanvas.querySelector("#offcanvasDesigner").innerText=card.designer
        offcanvas.querySelector("#offcanvasPlayers").innerText=card.players
        offcanvas.querySelector("#borrowButton").addEventListener("click",()=>{
  
        });

        sessionStorage.setItem("cardHTML",JSON.stringify(HTMLcard.innerHTML));
        /* offcanvas.classList.add("show");  */
        offcanvas= new bootstrap.Offcanvas(offcanvas);
        offcanvas.show();
    }


    ["click"].forEach(event => {
        card.addEventListener(event, () => {
            updateOffcanvas(card)
          console.log(localStorage.getItem("card"))
        });
      });
      
      let hoverTimeout;
      
      card.addEventListener("mouseenter", () => {
        const time =2000;
        hoverTimeout = setTimeout(() => {
          updateOffcanvas(card)
        }, time);
      });
      
      card.addEventListener("mouseleave", () => {
        clearTimeout(hoverTimeout);
      });

    main.append(card);
}


