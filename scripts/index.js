function viewMore() {
    console.log("View more called")
    let viewMoreBtn = document.getElementById("view-more-btn");
    let viewMoreBtnContent = document.getElementById("view-more-btn").innerText;
    console.log(viewMoreBtnContent);
    let viewMoreDiv = document.getElementById("view-more-cards");
    if(viewMoreBtnContent === "View More") {
        viewMoreDiv.style.display = "flex";
       viewMoreBtn.innerText = "View Less";
    }
    else if(viewMoreBtnContent === "View Less") {
        viewMoreDiv.style.display = "none";
        viewMoreBtn.innerText = "View More";
    }
}