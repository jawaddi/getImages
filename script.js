// select our DOM
// this where we will appear our images that we will get from unsplash
const imgContainer = document.querySelector(".img-container");
// we have to make a loader to tell to user that his request is going;
const loader = document.querySelector(".loader");
// we want to add tags to help the user get his photos
const btnsTag = document.querySelector(".btn-tags");
let imageTags;

// getPhotos function will take two parameters type is tag the has been entered by the user and num it has been genrated becouse we need it to specify the page number for the Api

async function getImages(type, num) {
  // if the component that siad "there is no photos" we should hide it first
  document.querySelector(".error").classList.remove("appear-error");
  // initial tagsImages with empty array every time we call getImages because we want to get rid of the ancient tags that we have stored before
  imageTags = [];
  // clean innerHTML from the the old btns and tags
  btnsTag.innerHTML = "";
  // the apikey that unsplash has given us
  const apiKey = "r4f4oAp0b5Knk0JmLaTZPruEgA2O1EcAyV4-nkUr4GU";
  // our url
  const UrlApi = `https://api.unsplash.com/search/collections?page=${num}&query=${type}&client_id=${apiKey}`;
  try {
    // display a loader to tell to the user request is going.
    document.querySelector(".loader").style.display = "block";
    // send the request and wait for it the finish
    const response = await fetch(UrlApi);
    // transform response to json format
    arrayImgs = await response.json();
    // jus imagine the user entered something not valid or not relevent
    // arrayImgs will be empty
    if (arrayImgs.results.length < 1) {
      throw "there are no photos for the tag that you has entered :(";
    }

    // we want to take out tags before show the photos
    // these tags it will help the user find what he is looking for.
    arrayImgs.results[0].tags.map((e) => {
      if (e.title) {
        imageTags.push(e.title);
      }
    });

    // send our objects (images) to the function that will show the photos
    // one be one
    arrayImgs.results.forEach((img) => {
      // call the function displayImages
      displayImages(img);
    });
    // display tags
    displayTags();
    document.querySelector(".loader").style.display = "none";
  } catch (error) {
    // hide loader
    document.querySelector(".loader").style.display = "none";
    // if there is an error wi should play this component

    document.querySelector(".error").classList.add("appear-error");
  }
}
// first call with tag car and random number
getImages("car", Math.random() * 100);

// dispay images
function displayImages(photo) {
  // we will get photo as object and after that we well take what we want to display photos
  // first of all we should create img element
  const img = document.createElement("img");
  // creat dev element because we want to get image inside this div card
  // if the user hover on the images we want to appear nice dark color and user could see to buttons
  // one for if he/she want to go to Unsplash website and the second if he/she want to doanload the image
  const devElement = document.createElement("div");
  // here we add attribute src to the image
  img.setAttribute("src", photo.preview_photos[0].urls["regular"]); //item.urls["regular"]
  // here we add class attribute
  img.setAttribute("class", "img");
  // here we add class attribute card to div element
  devElement.setAttribute("class", "card");

  // this element contains links that will lead the user to unsplash or download the image
  element = `

  <div class="social-media">
      <a href=${photo.links.html} target="_blank" class="link-social-media">
        <i class="fab fa-unsplash"></i>
      </a>
       <a href=${photo.links.download}+&force=true class="link-social-media" download target="_blank"><i class="fas fa-angle-double-down"></i></a>
      </div>`;

  //append the image to the devElement
  devElement.appendChild(img);
  // add our devElement to our html page
  devElement.innerHTML += element;
  // append devElement to imgContainer
  imgContainer.append(devElement);
}

function displayTags() {
  // wrap every tag in button element
  imageTags.forEach((e, index) => {
    // create button element
    element = document.createElement("button");
    p_element = document.createElement("p");
    p_element.innerText = e;
    p_element.setAttribute("class", `p_tag`);
    // add  attrubutes class and value
    element.setAttribute("class", `btn__tag btn_${index}`);
    element.appendChild(p_element);
    // display element
    btnsTag.appendChild(element);
  });
}
// if the user entered new tag to search we should change the content of our page
function getTags() {
  // remove the old images
  imgContainer.innerHTML = "";
  // create new number for the page that we want to get images for
  let rundomNum = Math.floor(Math.random() * 100);
  // call etImages function with tag that user entred and the rundomNum that we have created
  getImages(document.querySelector("input").value, rundomNum);
  // call displayTags to display new tags
  // displayTags();
}

// event if the user click on the search will happen something/

document.querySelector(".search").addEventListener("submit", (e) => {
  // stop refrech the page
  e.preventDefault();
  // call get tag function
  getTags();
  document.querySelector("input").value = "";
});

// if the user click on the tag?
// search new images and display them change tags the display them as well
btnsTag.addEventListener("click", (e) => {
  if (e.target.classList[0] === "p_tag") {
    document.querySelector("input").value = e.target.innerText;
  } else if (e.target.classList[0] === "btn__tag") {
    document.querySelector("input").value === e.target.childNode;
    document.querySelector("input").value = e.target.childNodes[0].innerText;
  }

  getTags();
});
