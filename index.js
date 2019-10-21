const app = document.getElementById("app");
const creepyBtn = document.querySelector(".creepy__btn");

//ztobic random afeter

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
  document.body.appendChild(btn);
}

// fetchRedditData();

async function fetchRedditData() {
  const res = await fetch(
    "https://www.reddit.com/r/creepy.json?after=t3_dc3pcp&limit=50"
  );
  const { data } = await res.json();
  //   console.log(data.children);
  return data.children;
}

//get image and title from data
async function getTitleAndImg() {
  const match = /.(jpg)$/;
  const data = await fetchRedditData();

  //check if there is img and return img and title
  const arr = data.map(el => {
    if (match.test(el.data.url)) {
      return {
        title: el.data.title,
        img: el.data.url
      };
    }
  });

  //remove undefined values
  const result = arr.filter(el => {
    if (el != "undefined") {
      return el;
    }
  });

  return result;
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
  console.log(data);

  data.forEach(el => {
    const box = createHtmlElement("div");
    const img = createHtmlElement("img");
    const title = createHtmlElement("h2");

    box.classList.add("creepy-box");
    img.classList.add("creepy-box__img");
    title.classList.add("creepy-box__title");

    img.setAttribute("src", el.img);
    title.textContent = el.title;
    box.appendChild(img);
    box.appendChild(title);

    appendHtmlElementsToApp(box);
  });

  showMoreBtn();
}

creepyBtn.addEventListener("click", initApp);

// initApp();
