import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, controls;

export function initializeThreeJS() {
  console.log('🚀 ~ initializeThreeJS ~ initializeThreeJS:', initializeThreeJS);
  scene = new THREE.Scene();
  console.log('🚀 ~ initializeThreeJS ~ scene:', scene);

  //Mesh

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  console.log('🚀 ~ initializeThreeJS ~ geometry:', geometry);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  console.log('🚀 ~ initializeThreeJS ~ material:', material);
  const mesh = new THREE.Mesh(geometry, material);
  console.log('🚀 ~ initializeThreeJS ~ mesh:', mesh);

  scene.add(mesh);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  console.log('🚀 ~ initializeThreeJS ~ camera:', camera);
  scene.add(camera);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

  scene.add(ambientLight);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  const width = 1200;
  const height = 900;
  renderer.setSize(width, height);
  controls = new OrbitControls(camera, renderer.domElement);

  const loaderHeart = new GLTFLoader();

  const heartMaterial = new THREE.MeshPhongMaterial({ color: 0xff69b4 });

  loaderHeart.load(
    '/models/heart.glb',
    function (gltf) {
      for (let i = 0; i < 20; i++) {
        const heart = gltf.scene.clone();

        heart.position.set(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        );

        heart.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        const scale = Math.random() * 5.5 + 5.5;
        heart.scale.set(scale, scale, scale);

        heart.traverse(function (node) {
          if (node.isMesh) {
            node.material = heartMaterial;
          }
        });

        scene.add(heart);
      }
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  document.getElementById('model-container').appendChild(renderer.domElement);
  console.log('🚀 terminou', renderer);

  function animate() {
    requestAnimationFrame(animate);

    // Atualiza os OrbitControls
    controls.update();

    // Renderiza a cena
    renderer.render(scene, camera);
  }

  animate(); // Inicia o loop de animação
}
