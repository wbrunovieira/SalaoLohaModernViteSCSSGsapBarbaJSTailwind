import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, controls;

export function initializeThreeJS() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

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
  controls.enableZoom = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;

  const loader = new GLTFLoader();
  let rose;
  loader.load(
    '/models/rose/rose-new.glb',
    function (gltf) {
      gltf.scene.traverse(function (child) {
        if (child.isMesh && child.name === 'rose') {
          rose = child;
          rose.material.needsUpdate = true;
        }
      });

      if (rose) {
        rose.rotation.y = -Math.PI / 6;
      }

      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  document.getElementById('model-container').appendChild(renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
  }

  animate();
}
