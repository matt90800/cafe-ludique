const API_URL="https://api.npoint.io/33fe536f3a3bc2f018fb";
//durée en jours
const rentDuration = 90;

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
    const response = await fetch(API_URL);
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
            invalidFeedbackMessage=`La date de retour doit être valide, supérieure à la date d'emprunt, et la durée doit être inférieure à ${rentDuration} jours.`
            break;
          }
        }
        console.log(element.nextElementSibling)
        // Vérifie si le message d'erreur pour la case à cocher a déjà été créé
        console.log(element.valid)
        if (element.nextElementSibling===null&&!element.valid) {
          // Si le prochain élément est une étiquette, cela signifie que la case à cocher a une étiquette associée, donc le message d'erreur doit être ajouté après l'étiquette.
          // Crée le message d'erreur
          const invalid = document.createElement("div")
          // Définit le message d'erreur avec la variable invalidFeedbackMessage
          invalid.innerHTML=invalidFeedbackMessage
          // Ajoute la classe « invalid-feedback » pour styliser le message d'erreur
          invalid.classList.add("invalid-feedback")
          // Ajoute le message d'erreur après l'élément parent de la case à cocher
          element.parentElement.append(invalid)
        } 
      }   
      else {
        console.log("Valide")
        // Si l'élément est valide, supprime la classe « is-invalid » et l'attribut « placeholder »
        element.classList.remove("is-invalid")
        element.removeAttribute('placeholder')
      }
    }
   }
 }



let borrowDateValue = null;
let returnDateValue = null;
const today = new Date();
const futureDate = new Date(today.getTime() + (rentDuration * 24 * 60 * 60 * 1000));

borrowDateValue = today;
borrowDateValue.setHours(23);
borrowDateValue.setMinutes(59);
borrowDateValue.setSeconds(59);
borrowDateValue.setMilliseconds(999);
const formattedDate = today.toISOString().slice(0, 10);
form.borrowDate.value = formattedDate;

// Ajout des écouteurs d'événements pour chaque champ du formulaire
form.borrowDate.addEventListener("change", () => {
  borrowDateValue = new Date(form.borrowDate.value);
  borrowDateValue.setHours(23);
  borrowDateValue.setMinutes(59);
  borrowDateValue.setSeconds(59);
  borrowDateValue.setMilliseconds(999);
  if (borrowDateValue < today||isNaN(borrowDateValue)) {
    console.log("borrow invalid (c'est bon)")
    form.borrowDate.valid=false;
  } else {
    form.borrowDate.valid=true;
  }
  checkElement(form.borrowDate);
});

form.returnDate.addEventListener("change", () => {
  returnDateValue = new Date(form.returnDate.value);
  returnDateValue.setHours(23);
  returnDateValue.setMinutes(59);
  returnDateValue.setSeconds(59);
  returnDateValue.setMilliseconds(999);
  console.log( "")
  console.log('returnDateValue  : '+returnDateValue )
  console.log('borrowDateValue  : '+borrowDateValue )
  console.log('returnDateValue >= today : '+returnDateValue >= today)
  console.log('isNaN(returnDateValue) : '+isNaN(returnDateValue))
  if (borrowDateValue > returnDateValue || returnDateValue>futureDate||isNaN(returnDateValue)) {
    console.log("return invalid (c'est bon)")
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
