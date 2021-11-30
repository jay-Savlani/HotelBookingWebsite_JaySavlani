function getHotelsList() {

    var currentUrl = window.location.href;
    var currentUrlObject = new URL(currentUrl);
    var params = currentUrlObject.searchParams;
    var currentCity = params.get("city");
    
    
    var cityUrl = `https://travel-advisor.p.rapidapi.com/locations/search?query=${currentCity}`;
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            var output = JSON.parse(this.responseText);
            console.log("Output is: ", output);
            console.log(output.data[2].result_object.name);
            var articleDiv = document.getElementById("list-view");
            // let hotelArray = output.data;
            // let hotels = hotelArray.map(element => element.result_object.name);
            // console.log(hotels);

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
                }
            });




        }
    });



    xhr.open("GET", cityUrl, true);
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "9f5d56ec55msh1e3c10949a4c770p10dfe0jsn158cb7f34bbc");
    xhr.withCredentials = false;
    xhr.send(data);








}


getHotelsList();