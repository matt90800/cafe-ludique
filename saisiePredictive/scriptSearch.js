const search =document.querySelector("#search");
const label=document.querySelector("#searchLabel");;
//on ne lance le script que si la balise existe
if(label!=null) {
  console.log("balise label trouvée")
  let firstLog=true;
  search.addEventListener("input",(e)=>{
    if(firstLog){
      console.log("eventListener inputSearch ok");
      firstLog=false ;
    }
    const searchValue =search.value;
    console.log(searchValue)
    label.innerHTML="Saisie Prédictive à implémenter"
    /* entrée pour valider et tabulation pour changer d'entrées */
  });
}
