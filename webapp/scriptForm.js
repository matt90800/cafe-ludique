const main = document.querySelector("main");

// Récupération du formulaire
const form = document.form;

const inputGame = form.inputGame;

//crée la card en bas de page, soit en fonction de l'elément selectionné, soit avec la page précédente.
const card = document.createElement("div");
card.className="card col-10 m-5 ";

//fonction création card base de page.
const fillCard=(element)=>{
  card.innerHTML=
  `
  <h5 class="card-title">${element.title}</h5>
  <img class="card-img-top" src=${element.image} alt="${element.image}">
  <p> ${element.genre}</p>
  <p> ${element.designer}</p>
  <p> ${element.players}</p>
  `
}

const gamesArray=new Array();

//rempli le input select
async function fetchData() {
  try {
    const response = await fetch("https://api.npoint.io/33fe536f3a3bc2f018fb");
    const { games } = await response.json();
    
    games.forEach((element, index) => {
      gamesArray[index]=element;
      const opt = document.createElement("option");
      opt.value = index;
      opt.innerHTML = element.title;
      inputGame.appendChild(opt);
    });
    
    console.log(games);
    if (sessionStorage.getItem("cardJSON")!=null){
      //on cherche l'option égale à l'objet passé de la page précédente
      (form.inputGame.querySelectorAll("option")).forEach((message,index) =>{
        if(message.innerHTML==JSON.parse(sessionStorage.getItem("cardJSON")).title){
          form.inputGame.value=message.value; 
          return true;
        } 
      }
      );
    } else {
      form.inputGame.value=form.inputGame.querySelector("option").value;
    };
    fillCard(gamesArray[form.inputGame.value]);

  } catch (err) {
    console.error(err)
  }
}

fetchData();






main.append(card)


// Fonction qui vérifie si un champ du formulaire est valide sinon affiche une class BS 
const checkElement = (element) => {
  
  const submitButton = document.querySelector('input[type="submit"]');
  submitButton.disabled = !(form.borrowDate.valid  && form.borrowDate.valid);
  
  switch(element.tagName){
    // Ajout d'une information d'alerte pour chaque champ invalide
    case ("INPUT"): {
      if(!element.valid) {
        element.classList.add("is-invalid")
        let invalidFeedbackMessage;
        switch(element.name){
          case("borrowDate"): {
            element.placeholder="La date est obligatoire."
            invalidFeedbackMessage="La date doit être valide et supérieure ou égale à aujourd'hui."
            break;
          }
          case("returnDate"): {
            element.placeholder="La date est obligatoire."
            invalidFeedbackMessage="La date doit être valide et supérieure à la date d'emprunt."
            break;
          }
        }
        const invalid = document.createElement("div")
        invalid.innerHTML=invalidFeedbackMessage
        invalid.classList.add("invalid-feedback")
        element.parentElement.append(invalid)
        
      }
      else {
        element.classList.remove("is-invalid")
        element.removeAttribute('placeholder')
      }
    }
  }
}



const borrowDateValue = new Date(form.borrowDate.value);
const returnDateValue = new Date(form.returnDate.value);
const today = new Date();


// Ajout des écouteurs d'événements pour chaque champ du formulaire
form.borrowDate.addEventListener("focusout", () => {
  const borrowDateValue = new Date(form.borrowDate.value);
  if (borrowDateValue >= today||isNaN(returnDateValue)) {
    form.borrowDate.valid=false;
  } else {
    form.borrowDate.valid=true;
  }
  checkElement(form.borrowDate);
});

form.returnDate.addEventListener("focusout", () => {
  const returnDateValue = new Date(form.returnDate.value+"");
  if (returnDateValue < borrowDateValue||isNaN(returnDateValue)) {
    form.returnDate.valid=false;
  } else {
    form.returnDate.valid=true;
  }
  checkElement(form.returnDate);
});

form.querySelector("#inputGame").
addEventListener("input",(event) => {
  fillCard(gamesArray[form.inputGame.value]);
});
