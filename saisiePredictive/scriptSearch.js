const search =document.querySelector(".form-control");
let div=null;
//on crée l'element et on le superpose au search
if(document.querySelector("#searchFront")==null) {
  div=document.createElement("div");
  div.id="searchFront";
  search.append(div);
  console.log("div créé")
}

div.width =search.clientWidth;
div.innerHTML
search.addEventListener("input",(e)=>{

})
