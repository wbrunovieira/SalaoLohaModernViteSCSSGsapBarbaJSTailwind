import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, controls, gltf;

export function initializeThreeJS() {
  scene = new THREE.Scene();
  const aspect = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  camera = new THREE.PerspectiveCamera(
    75,
    aspect.width / aspect.height,
    0.1,
    1000
  );
  camera.position.z = 5;
  camera.position.y = 7;

  scene.add(camera);
  const modelContainer = document.getElementById('model-container');

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

  controls = new OrbitControls(camera, modelContainer);

  controls.enableDamping = true;
  controls.dampingFactor = 0.51;
  controls.enableZoom = false;

  const loader = new GLTFLoader();

  loader.load(
    '/models/rose/rose-new.glb',
    function (loadedGltf) {
      gltf = loadedGltf;
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          child.material.needsUpdate = true;
        }
      });
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  if (modelContainer) {
    modelContainer.appendChild(renderer.domElement);
  } else {
    console.error('Elemento "model-container" não encontrado.');
  }

  window.addEventListener('resize', () => {
    aspect.width = window.innerWidth;
    aspect.height = window.innerHeight;

    camera.aspect = aspect.width / aspect.height;
    camera.updateProjectionMatrix();

    renderer.setSize(aspect.width, aspect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const clock = new THREE.Clock();

  const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    renderer.render(scene, camera);

    if (gltf && gltf.scene) {
      gltf.scene.rotation.y += elapsedTime * -0.0003;
    }

    window.requestAnimationFrame(animate);
  };

  animate();
}
