const accesskey="rf1ewvLVGrol1CmnL-vcp1OTNqaTGtbY98fBFyno45Y"

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResult = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImage(){
    
    inputData = inputEl.value;
    const url =  `http://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        searchResult.innerHTML = "";
    }
    results.map((result)=>{
        const wrapImage = document.createElement("div");
        wrapImage.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink =  document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        wrapImage.appendChild(image);
        wrapImage.appendChild(imageLink);
        searchResult.appendChild(wrapImage);
        
    })
    page++;

    if(page > 1){
        showMore.style.display = "block";    
    }
}
formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page = 1;
    searchImage();
})
showMore.addEventListener("click",()=>{
    searchImage();
})