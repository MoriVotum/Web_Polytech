let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
let renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth / 1.6, window.innerHeight / 1.6);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.BoxGeometry(7, 7, 7);
let material = new THREE.MeshBasicMaterial({ color: "#8AC" });
let cube = new THREE.Mesh(geometry, material);

const planeSize = 40;

let meshSh = new THREE.Mesh(geometry, material);
meshSh.position.set(-5, 0, -5);

// Горизонтальная плоскость
const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshBasicMaterial({ color: "#CA8" });
const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = Math.PI * -0.5;

scene.add(mesh);

// Вертикальная плоскость
const planeVecGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeVecMat = new THREE.MeshBasicMaterial({ color: "lightgray" });
const meshVec = new THREE.Mesh(planeVecGeo, planeVecMat);
// meshVec.rotation.x = Math.PI * -.5;
meshVec.position.z = -3;
scene.add(meshVec);

// const color = 0xFFFFFF;
const skyColor = 0xb1e1ff; // light blue
const groundColor = 0xb97a20; // brownish orange
const intensity = 1;
const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light);

// Свет для теней
const lightShadow = new THREE.DirectionalLight("green", 1);
lightShadow.position.set(0, 10, 20);
lightShadow.castShadow = true;

lightShadow.shadow.mapSize.width = 1024;
lightShadow.shadow.mapSize.height = 1024;
lightShadow.shadow.camera.near = 0.1;
lightShadow.shadow.camera.far = 100;
lightShadow.shadow.bias = -0.01;

scene.add(lightShadow);

cube.castShadow = true;
cube.position.y = 7;
cube.position.x = -7;

scene.add(cube);

camera.position.z = 22;
camera.position.y = 10;
let cameraTarget = new THREE.Vector3(0, 0.5, 0);
camera.lookAt(cameraTarget);

// Создание вершин треугольной пирамиды
const vertices = [
  // Вершины основания
  -2, 0, -2, 
  2, 0, -2, 
  2, 0, 2, 
  -2, 0, 2,
  // Вершина вершины пирамиды
  0, 4, 0,
];

const indices = [
  // Индексы для граней основания
  0, 1, 2, 
  2, 3, 0,
  // Индексы для граней боковых сторон
  0, 4, 1, 
  1, 4, 2, 
  2, 4, 3, 
  3, 4, 0,
];

// Создание буферной геометрии
const geometryPyr = new THREE.BufferGeometry();

// Создание буфера вершин
const positionBufferPyr = new THREE.BufferAttribute(
  new Float32Array(vertices),
  3
);
geometryPyr.setAttribute("position", positionBufferPyr);

// Создание буфера индексов
const indexBufferPyr = new THREE.BufferAttribute(new Uint16Array(indices), 1);
geometryPyr.setIndex(indexBufferPyr);

// Создание материала
const materialPyr = new THREE.MeshBasicMaterial({ color: "#e6a7f1" });

// Создание меша и добавление его на сцену
const meshPyr = new THREE.Mesh(geometryPyr, materialPyr);
meshPyr.position.z = 10;
meshPyr.position.y = 8;
meshPyr.position.x = 5;
meshPyr.castShadow = true;
scene.add(meshPyr);

function render() {
  requestAnimationFrame(render);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  meshPyr.rotation.x += 0.01;
  meshPyr.rotation.y += 0.01;
  renderer.render(scene, camera);
}
render();
