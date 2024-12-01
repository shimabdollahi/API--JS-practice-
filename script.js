let request= new XMLHttpRequest();
let multiSelectCoins=document.getElementById("select-coins");
let coinsForm=document.getElementById("coins-form");
let coins=[];

coinsForm.onsubmit=function(event){
    event.preventDefault();
    //event.target.submit();

    let selectedCoins = [];
    for(let option of multiSelectCoins.options){
        if (option.selected) {
            selectedCoins.push({name:option.value, price_usd:option.getAttribute("price")});
        }
    }

    let table=document.getElementById("table");
    table.innerText="";
    for(let coin of selectedCoins){
        let tr = document.createElement("tr");
        let td1= document.createElement("td");
        let td2= document.createElement("td");
        td1.innerText=coin.name;
        td2.innerText=coin.price_usd;
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);       
    }
};

request.onload= function(){
    let response = JSON.parse(this.responseText);
    coins= response.data.slice(0,20);

    //add coins into the multiselet options:
    multiSelectCoins.innerText="";
    for(let coin of coins){
        let option=document.createElement("option");
        option.value=coin.name;
        option.innerText=coin.name;
        option.setAttribute("price", coin.price_usd);
        multiSelectCoins.appendChild(option);
    }
};

let call = function(){
    request.open("GET", "https://api.coinlore.net/api/tickers/");
    request.send();
};
call();
setInterval(call , 60000); //do every minute