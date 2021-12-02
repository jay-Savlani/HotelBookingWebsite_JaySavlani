
var position_names = [];
var cityLatitude;
var cityLongitude;
var hotelObjectReturned;



function getHotelsList(callback) {

    var currentUrl = window.location.href;
    var currentUrlObject = new URL(currentUrl);
    var params = currentUrlObject.searchParams;
    var currentCity = params.get("city");

    var cityUrl = `https://travel-advisor.p.rapidapi.com/locations/search?query=${currentCity}`;
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    var promise = new Promise((resolve, reject) => {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {

                var output = JSON.parse(this.responseText);
                console.log("Output is: ", output);
                var articleDiv = document.getElementById("list-view");
                output.data.forEach(element => {
                    if (element.result_type === "lodging") {
                        let hotelCardTemplate = `
                                    
                                    <div class="list_view_cards">
                                    <a href="detail.html?location_id=${element.result_object.location_id}" class="clickableDiv"></a>
                                    <div class="image_div">
                                    <img class="list_hotel_images"
                                    src="${element.result_object.photo.images.small.url}"
                                    alt="The Lalit New Delhi" />
                                    </div>
                                        
                                        <div class="list_view_description">
                                        <h3> ${element.result_object.name}</h3>
                                        <p>
                                            Rating: ${element.result_object.rating}
                                        </p>
                                        <p>
                                            ${element.result_object.address}
                                         </p>
                                        <p>Goa</p>
                                        </div>
                                    </div>
                                     `;

                        articleDiv.innerHTML += hotelCardTemplate;

                        // Pushing position of hotel and name into array for google maps

                        position_names.push({
                            latitude: element.result_object.latitude,
                            longitude: element.result_object.longitude,
                            hotelName: element.result_object.name,
                            location_id: element.result_object.location_id
                        });


                    }
                    resolve(output);
                });
                resolve(output);
            }
        });
    }) // Promise ends here

    promise.then(((output) => {
        cityLatitude = output.data[0].result_object.latitude;
        cityLongitude = output.data[0].result_object.longitude;

        console.log(cityLongitude);
        console.log(cityLatitude);

        hotelObjectReturned = {
            position_names_array: position_names,
            cityLatitude: cityLatitude,
            cityLongitude: cityLongitude,

        }

        callback();
    }),
        (error) => console.log("Promise failed with error: ", error)

    );


    xhr.open("GET", cityUrl, true);
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "9f5d56ec55msh1e3c10949a4c770p10dfe0jsn158cb7f34bbc");
    xhr.withCredentials = false;
    xhr.send(data);

}

getHotelsList(initMap);

// -------------------------------------------------------- Google Maps ------------------------------------ 


function initMap() {
    console.log("Function being called from initMap", hotelObjectReturned);


    let map_latitude = Number(hotelObjectReturned.cityLatitude);
    let map_longitude = Number(hotelObjectReturned.cityLongitude);


    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: map_latitude, lng: map_longitude },
        zoom: 12
    });

    hotelObjectReturned.position_names_array.forEach(element => {
        let marker_latitude = Number(element.latitude);
        let marker_longitude = Number(element.longitude);
        let contentTemplate = `
                <p>${element.hotelName}</p>
                <div><a style="text-decoration: underline;" href="detail.html?location_id=${element.location_id}">Book Hotel</a></div>
            `
        let infoWindow = new google.maps.InfoWindow({
            content: contentTemplate,
        });
        let marker = new google.maps.Marker({
            position: { lat: marker_latitude, lng: marker_longitude },
            map,
            title: element.hotelName
        })
        marker.addListener("click", () => {
            infoWindow.open({
              anchor: marker,
              map,
              shouldFocus: false,
            });
          });
    });
}












// position_names.forEach(element => {
    //     
    // });


    // var firstMarker = new google.maps.Marker({
    //     position: { lat: 15.379227, lng: 73.89193 },
    //     map,
    //     title: "Hellow World",
    //     optimized: false
    // });

    // var infoWindow = new google.maps.InfoWindow();

    // firstMarker.addListener("click", () => {
    //     infoWindow.close();
    //     infoWindow.setContent(firstMarker.getTitle());
    //     infoWindow.open(firstMarker.getMap(), firstMarker);
    // });
