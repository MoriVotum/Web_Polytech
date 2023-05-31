let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
let renderer = new THREE.WebGLRenderer();

// const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth / 1.6, window.innerHeight / 1.6);
document.body.appendChild(renderer.domElement);
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
let cubeMaterial = new THREE.MeshLambertMaterial({ color: "red" });
let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;

// position the cube
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;

// add the cube to the scene
scene.add(cube);

let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
let sphereMaterial = new THREE.MeshLambertMaterial({
  color: "red",
});
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
let verticesPyr = new Float32Array([
  -0.0, 0.0, 3.6, -3.6, 0.0, -0.0, 0.0, 0.0, -3.6,

  3.6, 0.0, 0.0, -0.0, 0.0, 3.6, 0.0, 0.0, -3.6,

  0.0, 8.1375, 0.0, 3.6, 0.0, 0.0, 0.0, 0.0, -3.6,

  0.0, 8.1375, 0.0, 0.0, 0.0, -3.6, -3.6, 0.0, -0.0,

  0.0, 8.1375, 0.0, -3.6, 0.0, -0.0, -0.0, 0.0, 3.6,

  -0.0, 0.0, 3.6, 3.6, 0.0, 0.0, 0.0, 8.1375, 0.0,
]);

// Создание буферной геометрии
let geometryPyr = new THREE.BufferGeometry();
geometryPyr.setAttribute("position", new THREE.BufferAttribute(verticesPyr, 3));
geometryPyr.computeVertexNormals();

// Создание материала
let materialPyr = new THREE.MeshPhongMaterial({ color: "red" });

// Создание меша и добавление его на сцену
let meshPyr = new THREE.Mesh(geometryPyr, materialPyr);
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

function render() {
  // rotate the cube around its axes
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
