const loginName = document.querySelector("#loginName");
const getApiKey = document.querySelector("#getApiKey");
const refresh = document.querySelector("#refresh");
const table = document.querySelector(".models");

console.log("loginName:", loginName);
console.log("getApiKey:", getApiKey);

let apiKey = "";

getApiKey.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("getApiKey");
  const name = loginName.value;
  console.log("name:", name);
  fetch(`/v3/user/getUser?name=${name}`)
    .then((response) => {
      console.log("response:", response);
      return response.json();
    })
    .then((data) => {
      console.log("data:", data);
      if (data == null) {
        alert("Нет такого пользователя");
        apiKey = "";
        loginName.style.backgroundColor = "#FFFFFF";
        return;
      }
      loginName.style.backgroundColor = "#AAC789";
      apiKey = data.api_key;
      console.log("apiKey:", apiKey);
    })
    .catch((err) => {
      console.log("err:", err);
      alert("Произошла ошибка при получении api_key");
    });
});

// когда не было формы

// loginName.addEventListener("keydown", (e) => {
//   console.log("e.key:", e.key);
//   if (e.key == "Enter") {
//     console.log("Enter");
//     getApiKey.click();
//   }
// });

function getAllModels() {
  fetch(`/v3/user/models`)
    .then((response) => {
      console.log("response:", response);
      return response.json();
    })
    .then((data) => {
      console.log("data:", data);
      if (data == null || data.length == 0) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.innerHTML = "No models";
        tr.appendChild(td1);
        table.appendChild(tr);
        return;
      }
      console.log("table:", table);
      let i = 0;
      data.forEach((element) => {
        i++;
        console.log("element:", element);
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        // buttons for show model and delete model here
        const buttonShow = document.createElement("button");
        buttonShow.innerHTML = "Show";
        buttonShow.classList.add("btn_show");
        buttonShow.dataset.id = element._id;
        const buttonDelete = document.createElement("button");
        buttonDelete.innerHTML = "Delete";
        buttonDelete.classList.add("btn_del");
        buttonDelete.dataset.id = element._id;
        td1.innerHTML = "name model " + i + ": " + element.name_model;
        const divBut = document.createElement("div");
        divBut.appendChild(buttonShow);
        divBut.appendChild(buttonDelete);
        tr.appendChild(td1);
        tr.appendChild(divBut);
        table.appendChild(tr);
      });
    })
    .catch((err) => {
      console.log("err:", err);
      alert("Произошла ошибка при получении моделей");
    });
}

table.addEventListener("click", (e) => {
  console.log("e.target:", e.target);
  console.log("e.target.classList:", e.target.classList);
  console.log("e.target.dataset.id:", e.target.dataset.id);
  if (e.target.classList.contains("btn_show")) {
    console.log("show model");
    const id = e.target.dataset.id;
    console.log("id:", id);
    fetch(`/v3/user/models/${id}`)
      .then((response) => {
        console.log("response:", response);
        return response.json();
      })
      .then((data) => {
        console.log("data:", data);
        if (data == null) {
          alert("Нет такой модели лель");
          return;
        }
        // show model
        alert(
          "Model: " +
            data.name_model +
            "\n" +
            "Description: " +
            data.description +
            "\n" +
            "Comments: " +
            data.comments
        );
      })
      .catch((err) => {
        console.log("err:", err);
        alert("Произошла ошибка при получении модели");
      });
  }
  if (e.target.classList.contains("btn_del")) {
    console.log("delete model");
    const id = e.target.dataset.id;
    console.log("id:", id);
    console.log("apiKey:", apiKey);
    fetch(`/v3/user/models/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        api_key: apiKey,
      },
    })
      .then((response) => {
        console.log("response:", response);
        if (response.statusText == "Unauthorized") {
          alert("Не авторизован");
          return;
        }
        return response.json();
      })
      .then((data) => {
        console.log("data:", data);
        if (data == null) {
          //   alert("No such model");
          return;
        }
        // delete model
        alert("Model deleted");
        table.innerHTML = "";

        getAllModels();
      })
      .catch((err) => {
        console.log("err:", err);
        alert("Произошла ошибка при удалении модели");
      });
  }
});

refresh.addEventListener("click", () => {
  console.log("refresh");
  table.innerHTML = "";
  getAllModels();
});

getAllModels();
