import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, controls;

export function initializeThreeJS() {
  console.log('🚀 ~ initializeThreeJS ~ initializeThreeJS:', initializeThreeJS);
  scene = new THREE.Scene();
  console.log('🚀 ~ initializeThreeJS ~ scene:', scene);

  //Mesh

  const geometry = new THREE.BoxGeometry(0, 0, 0);
  console.log('🚀 ~ initializeThreeJS ~ geometry:', geometry);
  const material = new THREE.MeshBasicMaterial();
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

  scene.add(camera);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, 1);
  light.castShadow = true;

  scene.add(light);
  scene.add(ambientLight);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.shadowMap.enabled = true;

  const width = 1200;
  const height = 900;

  renderer.setSize(width, height);
  controls = new OrbitControls(camera, renderer.domElement);

  const loaderHeart = new GLTFLoader();

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
        const heartMaterial = new THREE.MeshPhongMaterial({ color: 0xff69b4 });
        const scale = Math.random() * 5.5 + 5.5;
        heart.scale.set(scale, scale, scale);

        heart.traverse(function (node) {
          if (node.isMesh) {
            node.material = heartMaterial;
            node.castShadow = true;
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

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onMouseMove(event) {
    const bounds = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    console.log('🚀 ~ onMouseMove ~ intersects:', intersects);

    if (intersects.length > 0) {
      renderer.domElement.style.pointerEvents = 'auto';
      console.log('coracao achou');
    } else {
      renderer.domElement.style.pointerEvents = 'none';
      console.log('coracao nao tem');
    }
  }

  document.getElementById('model-container').appendChild(renderer.domElement);
  console.log('🚀 terminou', renderer);
  window.addEventListener('mousemove', onMouseMove);

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
  }

  animate();
}
