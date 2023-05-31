const loginName = document.querySelector("#loginName");
const getApiKey = document.querySelector("#getApiKey");
const refresh = document.querySelector("#refresh");
const create = document.querySelector("#create");
const table = document.querySelector(".models");

// modal_model
const modal_model = document.querySelector(".modal_model");
const display_model = document.querySelector(".display_model");
const title_model = document.querySelector(
  ".modal_model__content__header__title"
);

const modal_content_body = document.querySelector(".modal_content_body");
const model_name = document.querySelector(".model_name");
const model_type = document.querySelector(".model_type");
const model_color = document.querySelector(".model_color");
const model_size = document.querySelector(".model_size");
const submit_model = document.querySelector(".submit_model");

let newColor;
let size;
let scale;
let x;
let id;
let type_bd = "create";

create.addEventListener("click", () => {
  console.log("x:", x);
  modal_model.classList.remove("modal_hidden");
  model_name.value = "";
  if (jsonmodel instanceof THREE.BoxGeometry) {
    model_type.value = "cube";
  } else if (jsonmodel instanceof THREE.SphereGeometry) {
    model_type.value = "sphere";
  }
  if (model_size.value === "") {
    model_size.value = 4;
    size = model_size.value;
    x = 1;
  }
  model_color.value = "#" + jsonmodel.material.color.getHexString();
  type_bd = "create";
});

model_type.addEventListener("change", () => {
  scale = model_size.value / size;
  x = 1;
  console.log("model_type:", model_type.value);
  if (model_type.value === "sphere") {
    const geometry = new THREE.SphereGeometry(model_size.value, 32, 32);
    const material = new THREE.MeshLambertMaterial({
      color: model_color.value,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.remove(jsonmodel);
    sphere.scale = new THREE.Vector3(x * scale, x * scale, x * scale);
    sphere.castShadow = true;
    jsonmodel = sphere;
    jsonmodel.position.x = display_model.clientWidth / 50;
    jsonmodel.position.y = 10;
    jsonmodel.position.z = 8;
    scene.add(jsonmodel);
  } else if (model_type.value === "cube") {
    cubeGeometry = new THREE.BoxGeometry(
      model_size.value,
      model_size.value,
      model_size.value
    );
    cubeMaterial = new THREE.MeshLambertMaterial({ color: model_color.value });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.scale = new THREE.Vector3(x * scale, x * scale, x * scale);
    cube.castShadow = true;
    scene.remove(jsonmodel);
    jsonmodel = cube;
    jsonmodel.position.x = display_model.clientWidth / 50;
    jsonmodel.position.y = 10;
    jsonmodel.position.z = 8;
    scene.add(jsonmodel);
  }
});

model_color.addEventListener("input", () => {
  newColor = new THREE.Color(model_color.value); // Новый цвет (красный)
  jsonmodel.material.color = newColor;
});

model_size.addEventListener("input", () => {
  scale = model_size.value / size;
  console.log("scale:", scale);
  jsonmodel.scale.set(scale * x, scale * x, scale * x);
});

console.log("modal_model:", modal_model);

let shouldStop;
let jsonmodel;
let model;
let scene = new THREE.Scene();

submit_model.addEventListener("click", (e) => {
  // e.preventDefault();
  console.log("submit_model");
  console.log("shouldStop:", shouldStop);
  shouldStop = true;

  const name = model_name.value;
  const name_model = model_name.value;
  const type = model_type.value;
  const color = model_color.value;
  const size = model_size.value;
  const description = "some description";
  const comments = ["comment1", "comment2", "comment3"];

  // model to ObjectLoader and save to db
  const model = jsonmodel.toJSON();
  const jsonString = JSON.stringify(model);
  console.log(jsonString);

  const data = {
    name,
    name_model,
    type,
    color,
    size,
    description,
    comments,
    model: model,
  };

  console.log("data:", data);
  // const id = e.target.dataset.id;
  console.log("id:", id);

  console.log("type_bd:", type_bd);
  if (type_bd === "change") {
    fetch(`/v3/user/models/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        api_key: apiKey,
      },
      body: JSON.stringify(data),
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
        modal_model.classList.add("modal_hidden");
        table.innerHTML = "";
        getAllModels();
      })
      .catch((err) => {
        console.log("err:", err);
      });
  } else if (type_bd === "create") {
    fetch(`/v3/user/models`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        api_key: apiKey,
      },
      body: JSON.stringify(data),
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
        modal_model.classList.add("modal_hidden");
        table.innerHTML = "";
        getAllModels();
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }
});

modal_model.addEventListener("click", (e) => {
  console.log("modal_model click");
  console.log("e.target:", e.target);
  if (e.target.classList.contains("close_modal")) {
    console.log("close_modal");
    modal_model.classList.add("modal_hidden");
    shouldStop = true;
    console.log("shouldStop:", shouldStop);
  }
});

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
    id = e.target.dataset.id;
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
        type_bd = "change";

        modal_model.classList.remove("modal_hidden");
        model_name.value = data.name_model;
        model_type.value = data.type;
        if (data.color != null) model_color.value = data.color;
        model_size.value = data.size;

        size = data.size;

        shouldStop = false;

        const loader = new THREE.ObjectLoader();

        scene.remove(jsonmodel);

        jsonmodel = loader.parse(data.model);
        x = jsonmodel.scale.x;
        console.log("jsonmodel:", jsonmodel);
        console.log("cube", cube);

        scene.add(jsonmodel);

        jsonmodel.position.x = display_model.clientWidth / 50;
        jsonmodel.position.y = 10;
        jsonmodel.position.z = 8;

        console.log("x:", x);
      })
      .catch((err) => {
        console.log("err:", err);
        alert("Произошла ошибка при получении модели");
      });
  }
  if (e.target.classList.contains("btn_del")) {
    console.log("delete model");
    id = e.target.dataset.id;
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

// THREE JS

console.log("width", display_model.clientWidth);
console.log("height", display_model.clientHeight);

let camera = new THREE.PerspectiveCamera(
  45,
  display_model.clientWidth / display_model.clientHeight,
  0.1,
  1000
);
let renderer = new THREE.WebGLRenderer();

// const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(display_model.clientWidth, display_model.clientHeight);
display_model.appendChild(renderer.domElement);
// renderer.shadowMapEnabled = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// create the ground plane
let planeGeometry = new THREE.PlaneGeometry(60, 50, 1, 1);
let planeMaterial = new THREE.MeshLambertMaterial({ color: "#7a7171" });
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

// rotate and position the plane
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

// add the plane to the scene
scene.add(plane);

// background
let mesh = new THREE.BufferGeometry();

let vertices = new Float32Array([
  //полигон 1
  -200, -200, -15, 200, -200, -15, 200, 200, -15,
  //полигон 2
  200, 200, -15, -200, 200, -15, -200, -200, -15,
]);

mesh.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
let material_2 = new THREE.MeshBasicMaterial({ color: "#d3d0db" });
let polygon = new THREE.Mesh(mesh, material_2);
scene.add(polygon);

// create a cube
let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
let cubeMaterial = new THREE.MeshLambertMaterial({ color: "#6574c9" });
let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;

// position the cube
console.log("display_model.clientWidth", display_model.clientWidth);
cube.position.x = display_model.clientWidth / 50;
cube.position.y = 10;
cube.position.z = 8;

// add the cube to the scene
// scene.add(cube);
jsonmodel = cube;
scene.add(jsonmodel);

// position and point the camera to the center of the scene
camera.position.set(15, 20, 45);
camera.rotation.x = -0.3;

// add subtle ambient lighting
let spotLight = new THREE.SpotLight("#73aec9", 1.1);
spotLight.position.set(15, 70, 10);
spotLight.castShadow = true;
spotLight.visible = true;
scene.add(spotLight);

// add spotlight for the shadows
let pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(100, 100, 50);
pointLight.castShadow = true;
pointLight.visible = true;
scene.add(pointLight);

// const helper = new THREE.CameraHelper(spotLight.shadow.camera);
// scene.add(helper);
let step = 0;

function render() {
  // if (shouldStop) return;
  // rotate the cube around its axes
  jsonmodel.rotation.x += 0.02;
  jsonmodel.rotation.y += 0.02;
  jsonmodel.rotation.z += 0.02;

  // render using requestAnimationFrame
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
shouldStop = true;
