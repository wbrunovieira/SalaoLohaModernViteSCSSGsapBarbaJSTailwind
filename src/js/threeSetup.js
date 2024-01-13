import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

let scene, camera, renderer, model, controls;

export function initializeThreeJS() {
  console.log('🚀 ~ initializeThreeJS ~ initializeThreeJS:', initializeThreeJS);
  scene = new THREE.Scene();
  console.log('🚀 ~ initializeThreeJS ~ scene:', scene);
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 5;
  console.log('🚀 ~ initializeThreeJS ~ camera:', camera);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  console.log('🚀 ~ initializeThreeJS ~ renderer:', renderer);

  document.getElementById('model-container').appendChild(renderer.domElement);
  console.log('🚀 ~ initializeThreeJS ~ document:', document);

  // Luzes
  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
  console.log('🚀 ~ initializeThreeJS ~ ambientLight:', ambientLight);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  console.log('🚀 ~ initializeThreeJS ~ directionalLight:', directionalLight);
  directionalLight.position.set(1, 1, 1).normalize();

  scene.add(directionalLight);

  const loader = new GLTFLoader();
  console.log('🚀 ~ initializeThreeJS ~ loader:', loader);
  const dracoLoader = new DRACOLoader();

  dracoLoader.setDecoderPath(
    '../../node_modules/three/examples/jsm/libs/draco/'
  );

  loader.setDRACOLoader(dracoLoader);
  console.log('🚀 ~ initializeThreeJS do draco ~ loader:', loader);

  loader.load('models/Hairdryer.glb', (gltf) => {
    model = gltf.scene;
    console.log('model chegou', model);
    model.traverse(function (object) {
      if (object.isMesh) {
      }
    });
    model.scale.set(0.5, 0.5, 0.5);
    model.position.set(0, -1.5, 0);
    scene.add(model);
  });

  model.quaternion.multiplyQuaternions(
    deltaRotationQuaternion,
    model.quaternion
  );
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function animateThreeJS() {
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
  }

  animate();
}
