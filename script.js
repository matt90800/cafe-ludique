fetch("http://localhost:8000/data.json")
    .then(response => response.json())
    .then(msg=>(console.log(msg)))
