const API_URL="https://api.npoint.io/33fe536f3a3bc2f018fb";

//---------------------   Unsplash API ---------------------------//
const API_KEY = null;
const NAV_URL_COMP=`&client_id=${API_KEY}`;
let searchTitle/* ="Ticket to Ride" */;

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
    const API_URL = `https://api.unsplash.com/search/photos?page=1&query=${searchTitle}`;
    console.log(API_URL+NAV_URL_COMP)
    return fetch(API_URL, headers)
        .then(response => response.json())
        .then(data => {
          console.error(data)
        if (data.results != null)
            data = data.results;
        data.forEach(element => {
            imageUrls.push(element.urls.regular);
        });
        return imageUrls;
        })
        .catch(error => console.error(error));
      }

//---------------------                ---------------------------//



fetch(API_URL)
    .then(response => response.json())
    .then(json=>{
        json=json.games;
        json.forEach(
            element => {
                createGameCard(element);
            }
        );
        }        
    );


const main = document.querySelector("main");
const createGameCard =async (element)=>{
  if (API_KEY!=null){
    let rand=Math.round(Math.random()*10);
    await fetchUnsplash(element.title).then(img => {
        element.image=img[rand];
    });
  }

    const card = document.createElement("div");
    card.content=element;
    card.href="#offcanvas";
    card.className="card col-lg-3 col-md-5 col-sm-12 m-lg-4 m-md-4";
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
        sessionStorage.setItem("cardJSON",JSON.stringify(HTMLcard.content));
        /* offcanvas.classList.add("show");  */
        offcanvas= new bootstrap.Offcanvas(offcanvas);
        offcanvas.show();
    }


    ["click"].forEach(event => {
        card.addEventListener(event, () => {
            updateOffcanvas(card)
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

