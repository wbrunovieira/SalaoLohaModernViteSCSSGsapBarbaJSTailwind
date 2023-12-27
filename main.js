import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import barba from "@barba/core";
import gsap from "gsap";
import { TextPlugin } from 'gsap/TextPlugin';

import "./src/scss/reset.scss";
import "./src/scss/style.scss";
import "./src/scss/tailwind.scss";

// Variáveis Globais
// let scene, camera, renderer, model, controls;


// function initializeThreeJS() {
    

//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 5;

//     renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
   
//     document.getElementById('model-container').appendChild(renderer.domElement);

//     // Luzes
//     const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(1, 1, 1).normalize();
   
//     scene.add(directionalLight);

//     // Carregar Modelo 3D
//     const loader = new GLTFLoader();
//     const dracoLoader = new DRACOLoader();

//     dracoLoader.setDecoderPath('../../node_modules/three/examples/jsm/libs/draco/')


//     loader.setDRACOLoader(dracoLoader);

// 	const group = new THREE.Group();

//     loader.load('models/Hairdryer.glb', (gltf) => {
// 		model = gltf.scene;
// 		model.scale.set(0.5, 0.5, 0.5);
// 		model.position.set(0, -1.5, 0);
		
// 		group.add(model);  // Adicionando o modelo ao grupo
// 		scene.add(group);

// 		const dragControls = new DragControls([group], camera, renderer.domElement);


// 		dragControls.addEventListener('dragstart', function (event) {
// 			controls.enabled = false; // Desativa os OrbitControls enquanto arrasta
// 		});
		
// 		dragControls.addEventListener('dragend', function (event) {
// 			controls.enabled = true; // Reativa os OrbitControls após arrastar
// 		});
	
        
//     });

//     // Controles
//     controls = new OrbitControls(camera, renderer.domElement);

// }

// let isDragging = false;

// let previous


// Position = {
//     x: 0,
//     y: 0
// };

// document.addEventListener('mousedown', (e) => {
//     isDragging = true;
// });
// document.addEventListener('mousemove', (e) => {
//     if (isDragging) {
//         var deltaMove = {
//             x: e.offsetX - previousMousePosition.x,
//             y: e.offsetY - previousMousePosition.y
//         };

       

//         previousMousePosition.x = e.offsetX;
//         previousMousePosition.y = e.offsetY;
//     }
// });


// document.addEventListener('mouseup', (e) => {
//     isDragging = false;
// });

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }


// function animateThreeJS() {

//     function animate() {
//         requestAnimationFrame(animate);
//         renderer.render(scene, camera);
//         controls.update();
//     }

//     animate();
   
// }
function circleTransition() {
    return gsap.timeline({ paused: true })
        .to("#transition-circle", {
            duration: 0.5,
            scale: 1,
            ease: "power1.inOut"
        })
        .to("#transition-circle", {
            duration: 0.5,
            scale: 0,
            ease: "power1.inOut",
            clearProps: "all" // Limpa os estilos após a animação
        });
}

const transition = circleTransition();
function fadeIn(content) {
	gsap.to(content, { duration: 1, visibility: 'visible', opacity: 1 });
  }
  
function fadeOut(content) {
	return gsap.to(content, { duration: 1, visibility: 'hidden', opacity: 0 });
  }

function updateActiveLink(namespace) {
    // Primeiro, remova a classe ativa e a animação de todos os links
    gsap.to('.link-ativo', { borderColor: 'transparent', duration: 0.3 });
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('link-ativo');
    });

    // Em seguida, adicione a classe ativa e anime o novo link ativo
    let selector;
    if (namespace === 'servicos') {
        selector = 'a[href*="servicos.html"]';
    } else if (namespace === 'home') {
        selector = 'a[href*="index.html"]';
    }

    const activeLink = document.querySelector(selector);
    if (activeLink) {
        activeLink.classList.add('link-ativo');
        gsap.to(activeLink, { borderColor: 'red', duration: 0.3 });
    }
}

function showPageContentHome() {

  
    const pageContent = document.querySelector('.index'); 

     gsap.to(pageContent, {
         duration: 4,
         opacity: 1,
          display: 'block'
     });

	 var path = document.querySelector("#borda-hero");
	 if (path) {
	 	var length = path.getTotalLength();
		
	 }
		
	path.style.strokeDasharray = length;
	path.style.strokeDashoffset = length;

	gsap.to(path.style, {
	 		strokeDashoffset: 0,
			duration: 2, 
			ease: "back.inOut",
	 		});

  

			let tl = gsap.timeline({delay: 1});

			tl.to ("#text1", {text: "Atendimento personalizado ",ease: "power1.in" , duration: 1})
			tl.to ("#text2", {text: "Beleza atualizada ",ease: "power1.in" , duration: 1})
			
			tl.to ("#text4", {text: "Salão Loha ",ease: "power1.in" , duration: 1})
			tl.to ("#text5", {text: "Aqui no Salão Loha oferecemos uma experiência acolhedora  com serviços  personalizadosde beleza por profissionais qualificados e atualizados com as últimas tendências.",ease: "power1.in" , duration: 2})
			tl.to(".imagem-reveal", {
				clipPath: 'inset(0 0 0 0)',
				duration: 2, 
				ease: 'elastic.out(1,0.3)', 
				
			}, "-=7")

			 const botao = document.querySelector('#agendar');

			 botao.addEventListener('mouseenter', () => {
			 	gsap.to(botao, { scale: 1.1, backgroundColor: "#fff", color: "${cor-primaria}", duration: 0.3 });
			   });
			  
			   // Animação de saída do hover
			   botao.addEventListener('mouseleave', () => {
			 	gsap.to(botao, { scale: 1, backgroundColor: "${cor-de-fundo}", color: "#ed3237", duration: 0.3 });
			   });

			
			
	
}


function showPageContentServicos() {

  
    const pageContent = document.querySelector('.index'); 

	gsap.to(pageContent, {
		duration: 4,
		opacity: 1,
		display: 'block',
		// Certifique-se de que a string do SVG esteja corretamente formatada e escape as aspas duplas
		backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'46\' height=\'46\' viewBox=\'0 0 200 200\'%3E%3Cdefs%3E%3ClinearGradient id=\'a\' gradientUnits=\'userSpaceOnUse\' x1=\'100\' y1=\'33\' x2=\'100\' y2=\'-3\'%3E%3Cstop offset=\'0\' stop-color=\'%23000\' stop-opacity=\'0\'/%3E%3Cstop offset=\'1\' stop-color=\'%23000\' stop-opacity=\'1\'/%3E%3C/linearGradient%3E%3ClinearGradient id=\'b\' gradientUnits=\'userSpaceOnUse\' x1=\'100\' y1=\'135\' x2=\'100\' y2=\'97\'%3E%3Cstop offset=\'0\' stop-color=\'%23000\' stop-opacity=\'0\'/%3E%3Cstop offset=\'1\' stop-color=\'%23000\' stop-opacity=\'1\'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill=\'%23c5c5c5\' fill-opacity=\'0.02\'%3E%3Crect x=\'100\' width=\'100\' height=\'100\'/%3E%3Crect y=\'100\' width=\'100\' height=\'100\'/%3E%3C/g%3E%3Cg fill-opacity=\'0.02\'%3E%3Cpolygon fill=\'url(%23a)\' points=\'100 30 0 0 200 0\'/%3E%3Cpolygon fill=\'url(%23b)\' points=\'100 100 0 130 0 100 200 100 200 130\'/%3E%3C/g%3E%3C/svg%3E")'
	});



	


  

			
			
			
	
}

function Loading() {
	gsap.to(".logo", {
		duration: 3, 
		opacity: 1,
		scale: 1, 
		ease: "bounce.out", 
		
	});

	
	gsap.to(".screen-loading", {
			duration: 3,
			opacity: 1,
			display: 'none',
			
			
		});

		gsap.to('.bar-loading', {
			duration: 3,
			'--bar-width': '100%' /* Anima a variável CSS */
		});
}


function main() {
    // Função principal
    gsap.registerPlugin(TextPlugin);
    // initializeThreeJS();
    // animateThreeJS();
   

	barba.init({
		views: [
		  {
			namespace: 'home',
			beforeEnter() {
			  // Código específico para a página inicial
			  showPageContentHome();
			}
		  },
		  {
			namespace: 'servicos',
			beforeEnter() {
			  // Código específico para a página de serviços
			  showPageContentServicos();
			}
		  }
		],
		transitions: [{
			sync: true,
		 async leave(data) {
			// Animação de saída
            return new Promise(resolve => {
                gsap.to(data.current.container, {
                    duration: 1,
                    opacity: 0,
                    onComplete: resolve
                });
                transition.play();
            });

		  },
		 async enter(data) {
			gsap.from(data.next.container, {
                duration: 1,
                opacity: 0,
                onComplete: () => transition.reverse()
            });
            updateActiveLink(data.next.namespace);
        	},
			

			once(data) {
				fadeIn(data.next.container);
			}
		}]
	  });
	  


}
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    let namespace = 'home'; // valor padrão

    if (path.includes('servicos.html')) {
        namespace = 'servicos';
    }

    updateActiveLink(namespace);
});


document.addEventListener("DOMContentLoaded", main);

