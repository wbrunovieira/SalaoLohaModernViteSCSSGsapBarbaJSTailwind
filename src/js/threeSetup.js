import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';




let scene, camera, renderer, model, controls;


export function initializeThreeJS() {
    

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
   
    document.getElementById('model-container').appendChild(renderer.domElement);

    // Luzes
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
   
    scene.add(directionalLight);

    // Carregar Modelo 3D
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath('../../node_modules/three/examples/jsm/libs/draco/')


    loader.setDRACOLoader(dracoLoader);

    loader.load('models/Hairdryer.glb', (gltf) => {
        model = gltf.scene;
        model.traverse(function (object) {
            if (object.isMesh) {
              
            }
        });
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, -1.5, 0);
        scene.add(model);
        
    });

    // Controles
    controls = new OrbitControls(camera, renderer.domElement);

    const dragControls = new DragControls([model], camera, renderer.domElement);

    dragControls.addEventListener('dragstart', function (event) {
        controls.enabled = false; // Desativa os OrbitControls enquanto arrasta
    });
    
    dragControls.addEventListener('dragend', function (event) {
        controls.enabled = true; // Reativa os OrbitControls após arrastar
    });

    let isDragging = false;

let previousMousePosition = {
    x: 0,
    y: 0
};

document.addEventListener('mousedown', (e) => {
    isDragging = true;
});

document.addEventListener('mousemove', (e) => {
    var deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
    };

    if(isDragging) {
        
        const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));
        
        model.quaternion.multiplyQuaternions(deltaRotationQuaternion, model.quaternion);
    }
    
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});

document.addEventListener('mouseup', (e) => {
    isDragging = false;
});

function toRadians(angle) {
    return angle * (Math.PI / 180);
}


    // Evento de Redimensionamento
    window.addEventListener('resize', onWindowResize, false);


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

}

export function animateThreeJS() {

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update();
    }

    animate();
   
}
