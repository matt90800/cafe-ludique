fetch("https://10.113.28.69:8443/data.json")
    .then(response => response.json())
    .then(msg=>(console.log(msg)))
