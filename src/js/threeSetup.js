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
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;

  const textureLoader = new THREE.TextureLoader();

  const diffuseTexture = textureLoader.load(
    '/models/rose/textures/Red_rose_diffuse.jpeg'
  );
  const normalTexture = textureLoader.load(
    'models/rose/textures/Red_rose_normal.png'
  );
  const occlusionTexture = textureLoader.load(
    '/pamodels/rose/textures/Red_rose_occlusion.png'
  );

  const loader = new GLTFLoader();

  loader.load(
    '/models/rose/rose-new.glb',
    function (gltf) {
      gltf.scene.traverse(function (child) {
        if (child.isMesh) {
          child.material.needsUpdate = true;

          console.log(child);
        }
      });
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onMouseMove(event) {
    const bounds = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      renderer.domElement.style.pointerEvents = 'auto';
    } else {
      renderer.domElement.style.pointerEvents = 'none';
    }
  }

  document.getElementById('model-container').appendChild(renderer.domElement);
  window.addEventListener('mousemove', onMouseMove);

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
  }

  animate();
}
