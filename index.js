const app = document.getElementById("app");
const creepyBtn = document.querySelector(".creepy__btn");

//after - next page
//limit - limit results
// https://www.reddit.com/r/creepy.json?after=t3_dkee20&limit=5

//show more btn to get more creepy json data
function showMoreBtn() {
  const btn = createHtmlElement("button");
  btn.textContent = "More Creepy Json?";
  btn.classList.add("more-creepy-json");
  btn.addEventListener("click", () => {
    app.innerHTML = "";
    initApp();
  });
  app.appendChild(btn);
}

// fetchRedditData();

async function fetchRedditData() {
  const res = await fetch("https://www.reddit.com/r/creepy/random.json");
  const data = await res.json();

  return data[0].data.children[0].data;
}

//get image and title from data
async function getTitleAndImg() {
  const match = /.(jpg|gif)$/;
  const data = await fetchRedditData();

  //check if there is img and return img and title
  return {
    title: data.title,
    img: match.test(data.url)
      ? data.url
      : "https://images.pexels.com/photos/1480861/pexels-photo-1480861.jpeg?cs=srgb&dl=calendar-carved-carving-1480861.jpg&fm=jpg"
  };
}

function createHtmlElement(tag) {
  const el = document.createElement(tag);
  return el;
}

function appendHtmlElementsToApp(el) {
  app.appendChild(el);
}

async function initApp() {
  creepyBtn.parentElement.remove();

  const data = await getTitleAndImg();

  const box = createHtmlElement("div");
  const img = createHtmlElement("img");
  const title = createHtmlElement("h2");

  box.classList.add("creepy-box");
  img.classList.add("creepy-box__img");
  title.classList.add("creepy-box__title");

  img.setAttribute("src", data.img);
  title.textContent = data.title;
  box.appendChild(img);
  box.appendChild(title);

  appendHtmlElementsToApp(box);

  showMoreBtn();
}

creepyBtn.addEventListener("click", initApp);

// initApp();
