const nature = "nature";
const dog = "dog";
let query1 = "https:api.pexels.com/v1/search?query=" + nature;
let query2 = "https:api.pexels.com/v1/search?query=" + dog;
const token = " brsev2z096sC494a9XarGS4nonLMX2kbrsW6sqb3Xsglt5qIGgmY5cGI";

const fetchFunction = function (URL) {
  fetch(URL, {
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella richiesta");
      }
    })
    .then((imgs) => {
      console.log(imgs);
      imgs.photos.forEach((img, i) => {
        const row = document.getElementById("img-row");
        const newCol = document.createElement("div");
        const card = document.createElement("div");
        newCol.classList.add("col", "col-md-4");
        card.classList.add("card", "mb-4", "shadow-sm");
        row.appendChild(newCol);
        newCol.appendChild(card);
        card.innerHTML = `
            <img
            src="${img.src.landscape}"
            class="bd-placeholder-img card-img-top" />
          <div class="card-body">
            <h5 class="card-title">${}</h5>
            <p class="card-text"> PH. ${img.photographer} </p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary">
                  View
                </button>
                <button id="hide-button${i}"
                  type="button"
                  class="btn btn-sm btn-outline-secondary">
                  Hide
                </button>
              </div>
              <small class="text-muted">${img.id}</small>
            </div>
          </div>
            `;

        const hideButton = document.getElementById(`hide-button${i}`);
        hideButton.addEventListener("click", () => {
          row.removeChild(newCol);
        });
      });
    })
    .catch((err) => {
      console.log("qualcosa è andato storto", err);
    });
};

const loadImage = document.getElementById("load-button");
loadImage.addEventListener("click", () => {
  fetchFunction(query1);
});

const loadSecondarydImage = document.getElementById("load-secondary-button");

loadSecondarydImage.addEventListener("click", () => {
  fetchFunction(query2);
});
