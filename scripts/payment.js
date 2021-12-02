function enableDisablePayBtn() {

    let loginBtn = document.getElementById("login");
    let payNowBtn = document.getElementById("pay-now-btn");
    payNowBtn.disabled = true;
    if (loginBtn.innerText === "Logout") {
        payNowBtn.disabled = false;
    }

}


enableDisablePayBtn();




// -------------------------------------- GLOBAL SCOPE ------------------------------------------


// global scope

var currentUrl = window.location.href;
var currentUrlObject = new URL(currentUrl);
var params = currentUrlObject.searchParams;

var currentHotel = params.get("location_id");
var numAdults = params.get("adults");

var fromDate = params.get("fromDate");

var toDate = params.get("toDate");
var name = params.get("name");
var amount = params.get("totalAmount");
// global scope ends



//   ----------------------------------------BOOKING DETAILS----------------------------------------


function fetchBookingDetails() {
    
    

    let fromDateObject = new Date(fromDate);
    let toDateObject = new Date(toDate);
    
    let fromDateNumber = fromDateObject.getDate();
    let toDateNumber = toDateObject.getDate();
    let fromDateMonth = fromDateObject.getMonth() + 1;
   
    
    let toDateMonth = toDateObject.getMonth() + 1;
    
    let fromDateYear = fromDateObject.getFullYear();
    let toDateYear = toDateObject.getFullYear();

    let modifiedFromDate = `${fromDateNumber}-${fromDateMonth}-${fromDateYear}`;
    let modifiedToDate = `${toDateNumber}-${toDateMonth}-${toDateYear}`;

    let nights = toDateNumber - fromDateNumber;

    let booking_name = document.getElementById("booking_name");
    let booking_numOfAdults = document.getElementById("booking_numOfAdults");
    let booking_fromDate = document.getElementById("booking_fromDate");
    let booking_toDate = document.getElementById("booking_toDate");
    let booking_totalAmount = document.getElementById("booking_totalAmount");
    let tariff_breakdown = document.getElementById("tariff_breakdown");
    
    booking_name.innerText = name;
    booking_numOfAdults.innerText = numAdults;
    booking_fromDate.innerText = modifiedFromDate;
    booking_toDate.innerText = modifiedToDate;
    booking_totalAmount.innerText = amount;
    tariff_breakdown.innerText = `Rs 1000 x ${numAdults} Adults x ${nights} Nights`;




}

fetchBookingDetails();



//   ----------------------------------------HOTEL DETAILS----------------------------------------


function fetchHotelDetails() {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            var output = JSON.parse(this.responseText);
            console.log(output);
            let imageContainer = document.getElementById("image_container");
            let imageTemplate = `
        <img class="payment_hotel_images"
        src="${output.data[0].photo.images.medium.url}"
        alt="${output.data[0].name}" />
        `
            imageContainer.innerHTML = imageTemplate;

            let hotel_name = document.getElementById("hotel_name");
            let hotel_ranking = document.getElementById("hotel_ranking");
            let hotel_address = document.getElementById("hotel_address");

            hotel_name.innerText = output.data[0].name;
            hotel_ranking.innerText = output.data[0].ranking;
            hotel_address.innerText = output.data[0].address;



        }
    });

    xhr.open("GET", `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${currentHotel}`);
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "9f5d56ec55msh1e3c10949a4c770p10dfe0jsn158cb7f34bbc");

    xhr.send(data);
}

fetchHotelDetails();