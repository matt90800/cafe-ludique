fetch("https://localhost:8443/data.json")
    .then(response => response.json())
    .then(json=>{
        json.forEach(
            element => {
                createGameCard(element);
            }
        );
            console.log(json);
        }        
    );

const main = document.querySelector("main");
const createGameCard = (element)=>{
    
    console.log(element);
    element=element.games;
    const card = document.createElement("div");
    card.className="card col-4";
    card.innerHTML=
    `
    <h5 class="card-title">${element.title}</h5>
    <img class="card-img-top" src=${element.image} alt="${element.image}">
      <p> ${element.info}</p>
      <p> ${element.year}</p>
      <p> ${element.year}</p>
      <p> ${element.year}</p>
      <p> ${element.year}</p>
      <p> ${element.year}</p>
    `;
    main.append(card);
}
