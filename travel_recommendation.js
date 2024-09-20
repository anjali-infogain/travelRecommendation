let searchBtnEle = document.getElementById("nav-search-btn");
let clearBtnEle = document.getElementById("nav-clear-btn");
let navInputEle = document.getElementById("nav-input-id");
let bookNowBtn = document.getElementById("book-now-btn");

searchBtnEle.addEventListener("click", function(){
    console.log("search input: ", navInputEle.value);
    navInputEle.value = ""
});

clearBtnEle.addEventListener("click", function() {
    navInputEle.value = ""
});

bookNowBtn.addEventListener("click", function(){
    console.log("Book now Button got clicked!",);
})