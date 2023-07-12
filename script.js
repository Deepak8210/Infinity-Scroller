const apiKey = "J50j5o3MB-P7QExBQYbXYYab6uGyfDdJtbHCYiVyk6w";
let count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".btn");

//displaying photos

const displayPhotos = function (imageArray) {
  imageArray.forEach((photos) => {
    const photoUrl = photos.urls.regular;
    const alt = photos.alt_description;
    const photoLink = photos.links.html;
    const imageHtml = `<a href="${photoLink}" target="_blank"><img src="${photoUrl}" alt="${alt}" title="${alt}" class="image"/></a>
  
  `;
    imageContainer.insertAdjacentHTML("beforeEnd", imageHtml);
  });
};

// getting photos from api
const getPhotos = async function () {
  try {
    const response = await fetch(apiUrl);
    let data = await response.json();
    //calling the display photos fn and passing array of photos
    displayPhotos(data);
    loader.style.display = "none";
  } catch (error) {
    console.log(error);
  }
};

//on loading the page
getPhotos();

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight) {
    getPhotos();
  }
});
