function getAdults() {
    numberOfAdults = document.getElementById("num_of_adults").value;
    // console.log(numberOfAdults);
    return numberOfAdults; 
}

function getFromDate() {
    let fromDate = document.getElementById("book_from_date");
    let date = new Date(fromDate.value);
    let fromDateNumber = date.getDate();
    // console.log(fromDateNumber);
    return fromDateNumber;
}



function getToDate() {
    let toDate = document.getElementById("book_to_date");
    let date = new Date(toDate.value);
    let toDateNumber = date.getDate();
    let fromDate = getFromDate();
     
    // console.log(toDateNumber);
    return toDateNumber;
}


function getPrice() {
    let total = document.getElementById("book_total");
    let numAdults =  getAdults();
    let fromDate =  getFromDate();
    let toDate =   getToDate(); 
    let price = (toDate - fromDate) * numAdults * 1000;
   
    // console.log("Price ",price);
    if(price == Number.NaN) { 
        total.value = "";
       
    }
    else if(price != NaN){
        total.value = `Rs. ${price}`;
    }
       
}

function hidePreviousDates() {
    let fDate = document.getElementById("book_from_date");
    console.log(fDate.value);
    let tDate = document.getElementById("book_to_date");
    tDate.setAttribute('min',fDate.value);
}
