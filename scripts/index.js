function viewMore() {
    console.log("View more called")
    let viewMoreBtn = document.getElementById("view-more-btn");
    let viewMoreBtnContent = document.getElementById("view-more-btn").innerText;
    console.log(viewMoreBtnContent);
    let viewMoreDiv = document.getElementById("view-more-cards");
    if (viewMoreBtnContent === "View More") {
        viewMoreDiv.style.display = "flex";
        viewMoreBtn.innerText = "View Less";
    }
    else if (viewMoreBtnContent === "View Less") {
        viewMoreDiv.style.display = "none";
        viewMoreBtn.innerText = "View More";
    }
}




function autoComplete() {
    // document.getElementById("search_bar").innerHTML = `<input id="search_input"  class="search_city_input" type="text" name="searched_city" placeholder="City" oninput="autoComplete()" style="display: block;" />`

    let search_input = document.getElementById("search_input");
    if(search_input.value.length < 3 ) {
        document.getElementById("autoComplete_items").innerHTML = "";
    }
    if (search_input.value.length >= 3) {
        console.log("Value is equal to more than 3");
        const data = null;



        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                var output = JSON.parse(this.responseText);
                output.data.forEach(element => {
                    if (element.result_type === "geos") {
                        let autoComplete_items = document.getElementById("autoComplete_items");
                        let autoCompleteCity = element.result_object.name;
                        let autoCompleteHref = `list.html?city=${element.result_object.name}}`;
                        let autoCompleteTemplate = `
                        <div class="search_city_input search_city_input_autoComplete">
                            <a class="auto_complete_links" href=${autoCompleteHref}>${autoCompleteCity}</a>
                        </div>
                        
                        `
                        autoComplete_items.innerHTML += autoCompleteTemplate;
                    }
                });
            }
        });

        xhr.open("GET", `https://travel-advisor.p.rapidapi.com/locations/auto-complete?query=${search_input.value}&units=km`);
        xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "9f5d56ec55msh1e3c10949a4c770p10dfe0jsn158cb7f34bbc");

        xhr.send(data);
    }

}

autoComplete();