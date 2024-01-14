import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
  const width = 300; // Substitua com a largura desejada
  const height = 150; // Substitua com a altura desejada
  renderer.setSize(width, height);
  controls = new OrbitControls(camera, renderer.domElement);

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
