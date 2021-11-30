function getAdults() {
    let numberOfAdults = document.getElementById("num_of_adults").value;
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
    let numAdults = getAdults();
    let fromDate = getFromDate();
    let toDate = getToDate();
    let price = (toDate - fromDate) * numAdults * 1000;

    // console.log("Price ",price);
    if (price == Number.NaN) {
        total.value = "";

    }
    else if (price != NaN) {
        total.value = `Rs. ${price}`;
    }

}

function hidePreviousDates() {
    let fDate = document.getElementById("book_from_date");
    console.log(fDate.value);
    let tDate = document.getElementById("book_to_date");
    tDate.setAttribute('min', fDate.value);
}


// Global Scope

var currentUrl = window.location.href;
var currentUrlObject = new URL(currentUrl);
var params = currentUrlObject.searchParams;

let currentHotel = params.get("location_id");



// Global scope ends


function getHotelDetails() {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            var output = JSON.parse(this.responseText);
            //console.log(output);
            //console.log(output.data[0].name);
            document.getElementById("hotel_name").innerText = output.data[0].name;
            console.log(output.data[0].rating);
            document.getElementById("rating_para").innerText = `Rating: ${output.data[0].rating}`;
            document.getElementById("description_para").innerText = output.data[0].description;



            output.data[0].amenities.forEach(element => {
                let amenitiesUi = document.getElementById("amenities_list");
                let amenitiesTemplate = `<li>${element.name}</li>`;
                amenitiesUi.innerHTML += amenitiesTemplate;
            });

        }
    });


    var hotelUrl = `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${currentHotel}`;

    xhr.open("GET", hotelUrl);
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "9f5d56ec55msh1e3c10949a4c770p10dfe0jsn158cb7f34bbc");

    xhr.send(data);


}

getHotelDetails();

function getHotelImages() {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            var output = JSON.parse(this.responseText);
            console.log(output);
            var image_container = document.getElementById("carousel_image_container");

            let firstImage = `
        <div class="carousel-item active">
        <img class=" d-block w-100 hotel_image "
            src="${output.data[0].images.large.url}"
            alt="First slide">
    </div>
        `

            image_container.innerHTML += firstImage;

            for (let i = 1; i < output.data.length; i++) {
                let carouselTemplate = `
           <div class="carousel-item ">
        <img class=" d-block w-100 hotel_image "
            src="${output.data[i].images.large.url}"
            alt="First slide">
    </div>
           `
                image_container.innerHTML += carouselTemplate;
            }





        }
    });

    xhr.open("GET", `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${currentHotel}`);
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "9f5d56ec55msh1e3c10949a4c770p10dfe0jsn158cb7f34bbc");

    xhr.send(data);
}

getHotelImages();


function saveBookingDetails() {
    let payment_link_href = document.getElementById("payment_link_href");
    payment_link_href.setAttribute("href",`./payment.html?location_id=${currentHotel}&adults=${num_of_adults.value}&fromDate=${book_from_date.value}&toDate=${book_to_date.value}&name=${book_name.value}&totalAmount=${book_total.value}`)
}

