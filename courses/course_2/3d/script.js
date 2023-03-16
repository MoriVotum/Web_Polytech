let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
let renderer = new THREE.WebGLRenderer();

// const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// renderer.shadowMapEnabled = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// create the ground plane
let planeGeometry = new THREE.PlaneGeometry(60, 35, 1, 1);
let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
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
let material_2 = new THREE.MeshBasicMaterial({ color: 0xc0c0c0 });
let polygon = new THREE.Mesh(mesh, material_2);
scene.add(polygon);

// create a cube
let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;

// position the cube
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;

// add the cube to the scene
scene.add(cube);

let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
let sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// position the sphere
sphere.position.x = 20;
sphere.position.y = 0;
sphere.position.z = 2;
sphere.castShadow = true;
console.log(sphere.castShadow);

// add the sphere to the scene
scene.add(sphere);

// pyramid

// Создание вершин треугольной пирамиды
const verticesPyr = [
  0, 4, 0,  // вершина пирамиды
  -2, 0, 2, // левая точка треугольника
  2, 0, 2,  // правая точка треугольника
  2, 0, -2, // нижняя точка треугольника
  -2, 0, -2 // верхняя точка треугольника
];

const indicesPyr = [
  0, 1, 2,  // передняя грань
  0, 2, 3,  // правая грань
  0, 3, 4,  // задняя грань
  0, 4, 1,  // левая грань
  1, 2, 3,  // нижняя грань
  3, 4, 1   // верхняя грань
];

const normalsPyr = [
  // нормали передней грани
  0, 0.4472, 0.8944,
  0, 0.4472, 0.8944,
  0, 0.4472, 0.8944,

  // нормали правой грани
  0.8944, 0.4472, 0,
  0.8944, 0.4472, 0,
  0.8944, 0.4472, 0,

  // нормали задней грани
  0, 0.4472, -0.8944,
  0, 0.4472, -0.8944,
  0, 0.4472, -0.8944,

  // нормали левой грани
  -0.8944, 0.4472, 0,
  -0.8944, 0.4472, 0,
  -0.8944, 0.4472, 0,

  // нормали нижней грани
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,

  // нормали верхней грани
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
];

// Создание буферной геометрии
const geometryPyr = new THREE.BufferGeometry();
const indexBufferPyr = new THREE.BufferAttribute(new Uint16Array(indicesPyr), 1);

geometryPyr.setAttribute('position', new THREE.Float32BufferAttribute(verticesPyr, 3));
geometryPyr.setAttribute('normal', new THREE.Float32BufferAttribute(normalsPyr, 3));
geometryPyr.setIndex(indicesPyr);
geometryPyr.setIndex(indexBufferPyr);

// Создание материала
const materialPyr = new THREE.MeshBasicMaterial({ color: "#e6a7f1" });

// Создание меша и добавление его на сцену
const meshPyr = new THREE.Mesh(geometryPyr, materialPyr);
meshPyr.position.z = 10;
meshPyr.position.y = 0;
meshPyr.position.x = 15;
meshPyr.castShadow = true;
meshPyr.receiveShadow = true;
meshPyr.material.shadowSide = THREE.BackSide; 
scene.add(meshPyr);

// position and point the camera to the center of the scene
camera.position.set(15, 20, 45);
camera.rotation.x = -0.3;

// add subtle ambient lighting
let spotLight = new THREE.AmbientLight('lightblue');
spotLight.position.set(0, 100, 0);
spotLight.castShadow = true;
scene.add(spotLight);

// add spotlight for the shadows
let pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(60, 60, 20);
pointLight.castShadow = true;

scene.add(pointLight);

// call the render function
let step = 0;

// const helper = new THREE.CameraHelper(spotLight.shadow.camera);
// const helper2 = new THREE.CameraHelper(pointLight.shadow.camera);
// scene.add(helper, helper2);

function render() {
  // rotate the cube around its axes
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;
  cube.rotation.z += 0.02;

  meshPyr.rotation.y += 0.02;

  // bounce the sphere up and down
  sphere.position.x = 20 + 10 * Math.cos((step += 0.01));
  sphere.position.y = 2 + 10 * Math.abs(Math.sin((step += 0.03)));

  // render using requestAnimationFrame
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
