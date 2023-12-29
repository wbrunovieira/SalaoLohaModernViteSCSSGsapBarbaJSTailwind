import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import barba from "@barba/core";
import gsap from "gsap";
import { TextPlugin } from 'gsap/TextPlugin';

import('https://cdn.lordicon.com/lordicon.js');

import "./src/scss/reset.scss";

import "./src/scss/tailwind.scss";
import "./src/scss/style.scss";

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
    return gsap.timeline({ })
        .to("#transition-circle", {
            duration: 1,
            scale: 100,
			ease: "power1.inOut"
        })
        .to("#transition-circle", {
			
            duration: 1,
            scale: 0,
            ease: "power1.inOut",
           
        })
		
}

const transition = circleTransition();


 function fadeIn(content) {
 	gsap.to(content, { duration: 1, visibility: 'visible', opacity: 1 });
   }
  
function fadeOut(content) {
	return gsap.to(content, { duration: 1, visibility: 'hidden', opacity: 0 });
  }

function updateActiveLink(namespace) {
	const oldActiveLinks = document.querySelectorAll('.link-ativo');
    if (oldActiveLinks.length) {
        gsap.to(oldActiveLinks, { borderColor: 'transparent', duration: 0.3 });
        oldActiveLinks.forEach(link => {
            link.classList.remove('link-ativo');
        });
    }
    // Primeiro, remova a classe ativa e a animação de todos os links
   

    // Em seguida, adicione a classe ativa e anime o novo link ativo
	let selector = namespace === 'servicos' ? 'a[href*="servicos.html"]' : 'a[href*="index.html"]';
    const newActiveLink = document.querySelector(selector);
    if (newActiveLink) {
        newActiveLink.classList.add('link-ativo');
        gsap.to(newActiveLink, { borderColor: 'red', duration: 0.3 });
    } else {
        console.log('Não foi possível encontrar o link ativo para o namespace:', namespace);
    }

}

function showPageContentHome() {

	gsap.to('html', {
		duration: 1,
		backgroundColor: '#fff',
		
		ease: 'power1.in',
	})

  
    const pageContent = document.querySelector('.index'); 

	if (pageContent) {
        // Primeiro, garante que o elemento está visível e com display block
        
        pageContent.style.visibility = 'visible';

    	 gsap.to(pageContent, {
         duration: 1,
         opacity: 1,
        
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
					gsap.to(botao, { scale: 1.1, backgroundColor: "#fff", color: "#ed3237", duration: 0.3 });
				});
				
				// Animação de saída do hover
				botao.addEventListener('mouseleave', () => {
					gsap.to(botao, { scale: 1, backgroundColor: "#fff", color: "#ed3237", duration: 0.3 });
				});

			}	
			
	
}


function showPageContentServicos() {
    const pageContent = document.querySelector('.index-servicos');

    if (pageContent) {
        pageContent.style.display = 'block';
        
        // Aplicando animações e estilos com GSAP
        gsap.to('html', {
            duration: 1,
            backgroundImage: 'url(/svg/pattern-randomized.svg)',
            backgroundSize: 'cover',
            ease: 'power1.in',
            opacity: 1
        });

        gsap.from('.card', { 
            duration: 5, 
            opacity: 1, 
            y: 200, 
            stagger: 1, 
            ease: 'power1.in',
            onStart: () => {
                // Aplicar estilos específicos às imagens
                document.querySelectorAll('.card-img').forEach(img => {
                    gsap.set(img, { width: '100%', height: '15rem', objectFit: 'cover' });
                });

				const cardWidth = '300px'; // Defina a largura desejada aqui
                document.querySelectorAll('.card').forEach(card => {
                    gsap.set(card, { width: cardWidth });
                });
            }
        });
    } else {
        console.log('Elemento .index-servicos não encontrado');
    }
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
			name: 'default-transition',
			sync: true,
			once(data) {
				// A animação inicial quando a página é carregada pela primeira vez
				 fadeIn(data.next.container);
			},
		 async leave(data) {
			// Animação de saída
			const done = this.async();
			transition.play();
			

            gsap.to(data.current.container, {
                opacity: 0,
                onComplete: () => {
					setTimeout(() => done(), 500);
                    done();
                }
            });
			
			transition.play();
            

		  },
		 async enter(data) {
			const done = this.async();

			gsap.from(data.next.container, {
				opacity: 0,
				onComplete: () => {
					transition.reverse();
					done();
				}
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

