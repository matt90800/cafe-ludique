let card=sessionStorage.getItem("card");
console.log(JSON.parse(sessionStorage.getItem("JSONcard")));
console.log(JSON.parse(sessionStorage.getItem("cardHTML")));



const main = document.querySelector("main");
const div = document.createElement("div");
div.className="card col-10 m-5 ";
div.innerHTML=JSON.parse(sessionStorage.getItem("cardHTML"))
main.append(div)

// Récupération du formulaire
const form = document.form;

const inputGame = form.inputGame;
fetch("http://localhost:8000/")
    .then(response => response.json())
    .then(({ games }) => {
      games.forEach((element, index) => {
          const opt = document.createElement("option");
          opt.value = index;
          opt.innerHTML = element.title;
          inputGame.append(opt);
          console.log(element.title);
      });
  });



// Fonction qui vérifie si un élément de formulaire n'est pas nul
const nonNull = (element) => {
return (!(element.value === ""))
}


// Fonction qui vérifie si un champ du formulaire est valide sinon affiche une class BS 
const checkElement = (element) => {
  form.borrowDate.valid = form.borrowDate;

  const submitButton = document.querySelector('input[type="submit"]');
  submitButton.disabled = !(form.borrowDate.valid  && form.borrowDate.valid  && form.inputMessage.valid);

  switch(element.tagName){
  // Ajout d'une information d'alerte pour chaque champ invalide
    case ("INPUT"): {
      if(!element.valid) {
        console.log("Non valide")
        console.log(element.valid)

        element.classList.add("is-invalid")
        let invalidFeedbackMessage;
        switch(element.name){
          case("borrowDate"): {
            element.placeholder="La date est obligatoire."
            invalidFeedbackMessage="La date doit être valide et anterieure à aujourd'hui."
            break;
          }
        }
        if (element.nextElementSibling===null||element.nextElementSibling.tagName==="LABEL"&&!checkBoxInvalidCreated) {
          if (element.nextElementSibling.tagName==="LABEL")
          console.log("yeeeeeeeeeeees")
          const invalid = document.createElement("div")
          invalid.innerHTML=invalidFeedbackMessage
          invalid.classList.add("invalid-feedback")
          element.parentElement.append(invalid)
        }
        console.log(element.nextElementSibling)
      }
      else {
        console.log("Valide")
        element.classList.remove("is-invalid")
        element.removeAttribute('placeholder')
      }
   }
  }
}

// Ajout des écouteurs d'événements pour chaque champ du formulaire
form.borrowDate.addEventListener("focusout", () => {
const borrowDateValue = new Date(form.borrowDate.value);
const today = new Date();
if (borrowDateValue > today) {
console.log("La date est dans le futur");
} else {
console.log("La date est valide");
}
checkElement(form.borrowDate);
});