import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, controls, gltf;

export function initializeThreeJS() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  camera.position.y = 7;

  scene.add(camera);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, 1);
  light.castShadow = true;

  scene.add(light);
  scene.add(ambientLight);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.shadowMap.enabled = true;

  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;

  const loader = new GLTFLoader();

  loader.load(
    '/models/rose/rose-new.glb',
    function (loadedGltf) {
      gltf = loadedGltf;
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          child.material.needsUpdate = true;

          // gltf.scene.position.y = 6;
        }
      });
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
  let rotationSpeed = 0.005;

  const modelContainer = document.getElementById('model-container');

  if (modelContainer) {
    modelContainer.appendChild(renderer.domElement);
  } else {
    console.error('Elemento "model-container" não encontrado.');
  }

  function animate() {
    requestAnimationFrame(animate);
    if (gltf && gltf.scene) {
      gltf.scene.rotation.y += rotationSpeed;
    }
    controls.update();

    renderer.render(scene, camera);
  }

  animate();
}
