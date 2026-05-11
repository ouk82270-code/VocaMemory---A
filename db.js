function getDB(){
    return JSON.parse(localStorage.getItem("db")||"{}");
    }
    
    function saveDB(db){
    localStorage.setItem("db",JSON.stringify(db));
    }