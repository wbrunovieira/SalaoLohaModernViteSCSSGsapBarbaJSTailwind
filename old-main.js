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

 //Variáveis Globais
 let scene, camera, renderer, model, controls;


 function initializeThreeJS() {
    

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

 	const group = new THREE.Group();

     loader.load('models/Hairdryer.glb', (gltf) => {
 		model = gltf.scene;
 		model.scale.set(0.5, 0.5, 0.5);
 		model.position.set(0, -1.5, 0);
		
 		group.add(model);  // Adicionando o modelo ao grupo
 		scene.add(group);

 		const dragControls = new DragControls([group], camera, renderer.domElement);


 		dragControls.addEventListener('dragstart', function (event) {
 			controls.enabled = false; // Desativa os OrbitControls enquanto arrasta
 		});
		
 		dragControls.addEventListener('dragend', function (event) {
 			controls.enabled = true; // Reativa os OrbitControls após arrastar
 		});
	
        
     });

     // Controles
     controls = new OrbitControls(camera, renderer.domElement);

 }

 let isDragging = false;

 let previous



 document.addEventListener('mousedown', (e) => {
     isDragging = true;
 });
 document.addEventListener('mousemove', (e) => {
     if (isDragging) {
         var deltaMove = {
             x: e.offsetX - previousMousePosition.x,
             y: e.offsetY - previousMousePosition.y
         };

       

         previousMousePosition.x = e.offsetX;
         previousMousePosition.y = e.offsetY;
     }
 });


 document.addEventListener('mouseup', (e) => {
     isDragging = false;
 });

 function onWindowResize() {
     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
     renderer.setSize(window.innerWidth, window.innerHeight);
 }


 function animateThreeJS() {

     function animate() {
         requestAnimationFrame(animate);
         renderer.render(scene, camera);
         controls.update();
     }

     animate();
   
 }
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
   
    let selector = namespace === 'servicos' ? 'a[href*="servicos.html"]' : 
                   namespace === 'destaque' ? 'a[href*="destaque.html"]' : 
                   'a[href*="index.html"]'; // Adicione mais condições conforme necessário
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
					duration: 1, 
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
        
		pageContent.style.visibility = 'visible';
        pageContent.style.display = 'block';
		pageContent.style.opacity = '1';
        
        // Aplicando animações e estilos com GSAP
        gsap.to('html', {
            duration: 1,
            backgroundImage: 'url(/svg/pattern-randomized.svg)',
            backgroundSize: 'cover',
            ease: 'power1.in',
            opacity: 1
        });

		let tl = gsap.timeline({delay: 2});

		tl.to("#text3", {text: " Espaço de Beleza e Bem-estar Integral",ease: "power1.in" , duration: 1})
		tl.to("#text4", {text: "Realce sua beleza natural com cuidados que vão da cabeça aos pés ",ease: "power1.in" , duration: 1.5})
		
		gsap.to('.pixel', {
			duration: 2,
			scale: 40,
			x: 1500,
			y: 1500,
		});
		

		document.querySelectorAll('.card-tilt').forEach(card => {

			const light = card.querySelector('.light');

            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.5,
                    rotationY: 15,
                    rotationX: 15,
                    ease: 'back',
					
                });

				gsap.to(light, {
					duration: 5,
					ease: 'linear',
					repeat: -1,
					// Animação de rotação
					rotateZ: 360
				});

			

				gsap.to(card.querySelector('.card-img'), {
					duration: 0.5,
					opacity: 1, // Aumentar a opacidade
					ease: 'back',
					
				});
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.5,
                    rotationY: 0,
                    rotationX: 0,
                    ease: 'back',
					
                });

				gsap.to(light, {
					duration: 0.5,
					ease: 'linear',
					rotateZ: 0,
					clearProps: "rotateZ"
				});
            });

            
        });

        gsap.from('.card', { 
            duration: 2, 
            opacity: 1, 
            y: 200, 
            stagger: 1, 
            ease: 'power1.in',
            onStart: () => {
                
                document.querySelectorAll('.card-img').forEach(img => {
                    gsap.set(img, {filter: 'grayscale(50%)',width: '100%', height: '15rem', objectFit: 'cover' });
                });

				const cardWidth = '300px'; 
                document.querySelectorAll('.card').forEach(card => {
                    gsap.set(card, { width: cardWidth });
                });

			
			
				

            }
        });
    } else {
        console.log('Elemento .index-servicos não encontrado');
    }
}

function showPageContentDestaque() {
    const pageContent = document.querySelector('.index-destaque');

    if (pageContent) {

		pageContent.style.visibility = 'visible';
        pageContent.style.display = 'block';
		pageContent.style.opacity = '1';
        
        // Aplicando animações e estilos com GSAP
        gsap.to('html', {
            duration: 1,
            backgroundImage: "url('data:image/svg+xml;base64,77u/PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnICB3aWR0aD0nMzEwJyBoZWlnaHQ9JzE1NScgdmlld0JveD0nMCAwIDE2MDAgODAwJz48cmVjdCBmaWxsPScjYWEzMzMzJyB3aWR0aD0nMTYwMCcgaGVpZ2h0PSc4MDAnLz48cGF0aCAgZmlsbD0nIzMxMkUyRScgZD0nTTExMDIuNSA3MzQuOGMyLjUtMS4yIDI0LjgtOC42IDI1LjYtNy41LjUuNy0zLjkgMjMuOC00LjYgMjQuNUMxMTIzLjMgNzUyLjEgMTEwNy41IDczOS41IDExMDIuNSA3MzQuOHpNMTIyNi4zIDIyOS4xYzAtLjEtNC45LTkuNC03LTE0LjItLjEtLjMtLjMtMS4xLS40LTEuNi0uMS0uNC0uMy0uNy0uNi0uOS0uMy0uMi0uNi0uMS0uOC4xbC0xMy4xIDEyLjNjMCAwIDAgMCAwIDAtLjIuMi0uMy41LS40LjggMCAuMyAwIC43LjIgMSAuMS4xIDEuNCAyLjUgMi4xIDMuNiAyLjQgMy43IDYuNSAxMi4xIDYuNSAxMi4yLjIuMy40LjUuNy42LjMgMCAuNS0uMS43LS4zIDAgMCAxLjgtMi41IDIuNy0zLjYgMS41LTEuNiAzLTMuMiA0LjYtNC43IDEuMi0xLjIgMS42LTEuNCAyLjEtMS42LjUtLjMgMS4xLS41IDIuNS0xLjlDMTIyNi41IDIzMC40IDEyMjYuNiAyMjkuNiAxMjI2LjMgMjI5LjF6TTMzIDc3MC4zQzMzIDc3MC4zIDMzIDc3MC4zIDMzIDc3MC4zYzAtLjctLjUtMS4yLTEuMi0xLjItLjEgMC0uMyAwLS40LjEtMS42LjItMTQuMy4xLTIyLjIgMC0uMyAwLS42LjEtLjkuNC0uMi4yLS40LjUtLjQuOSAwIC4yIDAgNC45LjEgNS45bC40IDEzLjZjMCAuMy4yLjYuNC45LjIuMi41LjMuOC4zIDAgMCAuMSAwIC4xIDAgNy4zLS43IDE0LjctLjkgMjItLjYuMyAwIC43LS4xLjktLjMuMi0uMi40LS42LjQtLjlDMzIuOSA3ODMuMyAzMi45IDc3Ni4yIDMzIDc3MC4zeicvPjxwYXRoICBmaWxsPScjNWZmJyBkPSdNMTcxLjEgMzgzLjRjMS4zLTIuNSAxNC4zLTIyIDE1LjYtMjEuNi44LjMgMTEuNSAyMS4yIDExLjUgMjIuMUMxOTguMSAzODQuMiAxNzcuOSAzODQgMTcxLjEgMzgzLjR6TTU5Ni40IDcxMS44Yy0uMS0uMS02LjctOC4yLTkuNy0xMi41LS4yLS4zLS41LTEtLjctMS41LS4yLS40LS40LS43LS43LS44LS4zLS4xLS42IDAtLjguM0w1NzQgNzEyYzAgMCAwIDAgMCAwLS4yLjItLjIuNS0uMi45IDAgLjMuMi43LjQuOS4xLjEgMS44IDIuMiAyLjggMy4xIDMuMSAzLjEgOC44IDEwLjUgOC45IDEwLjYuMi4zLjUuNC44LjQuMyAwIC41LS4yLjYtLjUgMCAwIDEuMi0yLjggMi00LjEgMS4xLTEuOSAyLjMtMy43IDMuNS01LjUuOS0xLjQgMS4zLTEuNyAxLjctMiAuNS0uNCAxLS43IDIuMS0yLjRDNTk2LjkgNzEzLjEgNTk2LjggNzEyLjMgNTk2LjQgNzExLjh6TTcyNy41IDE3OS45QzcyNy41IDE3OS45IDcyNy41IDE3OS45IDcyNy41IDE3OS45Yy42LjIgMS4zLS4yIDEuNC0uOCAwLS4xIDAtLjIgMC0uNC4yLTEuNCAyLjgtMTIuNiA0LjUtMTkuNS4xLS4zIDAtLjYtLjItLjgtLjItLjMtLjUtLjQtLjgtLjUtLjIgMC00LjctMS4xLTUuNy0xLjNsLTEzLjQtMi43Yy0uMy0uMS0uNyAwLS45LjItLjIuMi0uNC40LS41LjYgMCAwIDAgLjEgMCAuMS0uOCA2LjUtMi4yIDEzLjEtMy45IDE5LjQtLjEuMyAwIC42LjIuOS4yLjMuNS40LjguNUM3MTQuOCAxNzYuOSA3MjEuNyAxNzguNSA3MjcuNSAxNzkuOXpNNzI4LjUgMTc4LjFjLS4xLS4xLS4yLS4yLS40LS4yQzcyOC4zIDE3Ny45IDcyOC40IDE3OCA3MjguNSAxNzguMXonLz48ZyBmaWxsLW9wYWNpdHk9JzAuNDYnICBmaWxsPScjRkZGJz48cGF0aCBkPSdNNjk5LjYgNDcyLjdjLTEuNSAwLTIuOC0uOC0zLjUtMi4zLS44LTEuOSAwLTQuMiAxLjktNSAzLjctMS42IDYuOC00LjcgOC40LTguNSAxLjYtMy44IDEuNy04LjEuMi0xMS45LS4zLS45LS44LTEuOC0xLjItMi44LS44LTEuNy0xLjgtMy43LTIuMy01LjktLjktNC4xLS4yLTguNiAyLTEyLjggMS43LTMuMSA0LjEtNi4xIDcuNi05LjEgMS42LTEuNCA0LTEuMiA1LjMuNCAxLjQgMS42IDEuMiA0LS40IDUuMy0yLjggMi41LTQuNyA0LjctNS45IDctMS40IDIuNi0xLjkgNS4zLTEuMyA3LjYuMyAxLjQgMSAyLjggMS43IDQuMy41IDEuMSAxIDIuMiAxLjUgMy4zIDIuMSA1LjYgMiAxMi0uMyAxNy42LTIuMyA1LjUtNi44IDEwLjEtMTIuMyAxMi41QzcwMC42IDQ3Mi42IDcwMC4xIDQ3Mi43IDY5OS42IDQ3Mi43ek03NDAuNCA0MjEuNGMxLjUtLjIgMyAuNSAzLjggMS45IDEuMSAxLjguNCA0LjItMS40IDUuMy0zLjcgMi4xLTYuNCA1LjYtNy42IDkuNS0xLjIgNC0uOCA4LjQgMS4xIDEyLjEuNC45IDEgMS43IDEuNiAyLjcgMSAxLjcgMi4yIDMuNSAzIDUuNyAxLjQgNCAxLjIgOC43LS42IDEzLjItMS40IDMuNC0zLjUgNi42LTYuOCAxMC4xLTEuNSAxLjYtMy45IDEuNy01LjUuMi0xLjYtMS40LTEuNy0zLjktLjItNS40IDIuNi0yLjggNC4zLTUuMyA1LjMtNy43IDEuMS0yLjggMS4zLTUuNi41LTcuOS0uNS0xLjMtMS4zLTIuNy0yLjItNC4xLS42LTEtMS4zLTIuMS0xLjktMy4yLTIuOC01LjQtMy40LTExLjktMS43LTE3LjggMS44LTUuOSA1LjgtMTEgMTEuMi0xNEM3MzkuNCA0MjEuNiA3MzkuOSA0MjEuNCA3NDAuNCA0MjEuNHpNMjYxLjMgNTkwLjljNS43IDYuOCA5IDE1LjcgOS40IDIyLjQuNSA3LjMtMi40IDE2LjQtMTAuMiAyMC40LTMgMS41LTYuNyAyLjItMTEuMiAyLjItNy45LS4xLTEyLjktMi45LTE1LjQtOC40LTIuMS00LjctMi4zLTExLjQgMS44LTE1LjkgMy4yLTMuNSA3LjgtNC4xIDExLjItMS42IDEuMi45IDEuNSAyLjcuNiAzLjktLjkgMS4yLTIuNyAxLjUtMy45LjYtMS44LTEuMy0zLjYuNi0zLjguOC0yLjQgMi42LTIuMSA3LS44IDkuOSAxLjUgMy40IDQuNyA1IDEwLjQgNS4xIDMuNiAwIDYuNC0uNSA4LjYtMS42IDQuNy0yLjQgNy43LTguNiA3LjItMTUtLjUtNy4zLTUuMy0xOC4yLTEzLTIzLjktNC4yLTMuMS04LjUtNC4xLTEyLjktMy4xLTMuMS43LTYuMiAyLjQtOS43IDUtNi42IDUuMS0xMS43IDExLjgtMTQuMiAxOS0yLjcgNy43LTIuMSAxNS44IDEuOSAyMy45LjcgMS40LjEgMy4xLTEuMyAzLjctMS40LjctMy4xLjEtMy43LTEuMy00LjYtOS40LTUuNC0xOS4yLTIuMi0yOC4yIDIuOS04LjIgOC42LTE1LjkgMTYuMS0yMS42IDQuMS0zLjEgOC01LjEgMTEuOC02IDYtMS40IDEyIDAgMTcuNSA0QzI1Ny42IDU4Ni45IDI1OS42IDU4OC44IDI2MS4zIDU5MC45eicvPjxjaXJjbGUgY3g9JzEwMTMuNycgY3k9JzE1My45JyByPSc3LjEnLz48Y2lyY2xlIGN4PScxMDI0LjMnIGN5PScxMzIuMScgcj0nNy4xJy8+PGNpcmNsZSBjeD0nMTAzNy4zJyBjeT0nMTQ4LjknIHI9JzcuMScvPjxwYXRoIGQ9J00xNTA4LjcgMjk3LjJjLTQuOC01LjQtOS43LTEwLjgtMTQuOC0xNi4yIDUuNi01LjYgMTEuMS0xMS41IDE1LjYtMTguMiAxLjItMS43LjctNC4xLTEtNS4yLTEuNy0xLjItNC4xLS43LTUuMiAxLTQuMiA2LjItOS4xIDExLjYtMTQuNSAxNi45LTQuOC01LTkuNy0xMC0xNC43LTE0LjktMS41LTEuNS0zLjktMS41LTUuMyAwLTEuNSAxLjUtMS41IDMuOSAwIDUuMyA0LjkgNC44IDkuNyA5LjggMTQuNSAxNC44LTEuMSAxLjEtMi4zIDIuMi0zLjUgMy4yLTQuMSAzLjgtOC40IDcuOC0xMi40IDEyLTEuNCAxLjUtMS40IDMuOCAwIDUuMyAwIDAgMCAwIDAgMCAxLjUgMS40IDMuOSAxLjQgNS4zLS4xIDMuOS00IDguMS03LjkgMTIuMS0xMS43IDEuMi0xLjEgMi4zLTIuMiAzLjUtMy4zIDQuOSA1LjMgOS44IDEwLjYgMTQuNiAxNS45LjEuMS4xLjEuMi4yIDEuNCAxLjQgMy43IDEuNSA1LjIuMkMxNTEwIDMwMS4yIDE1MTAuMSAyOTguOCAxNTA4LjcgMjk3LjJ6TTMyNy42IDI0OC42bC0uNC0yLjZjLTEuNS0xMS4xLTIuMi0yMy4yLTIuMy0zNyAwLTUuNSAwLTExLjUuMi0xOC41IDAtLjcgMC0xLjUgMC0yLjMgMC01IDAtMTEuMiAzLjktMTMuNSAyLjItMS4zIDUuMS0xIDguNS45IDUuNyAzLjEgMTMuMiA4LjcgMTcuNSAxNC45IDUuNSA3LjggNy4zIDE2LjkgNSAyNS43LTMuMiAxMi4zLTE1IDMxLTMwIDMyLjFMMzI3LjYgMjQ4LjZ6TTMzMi4xIDE3OS4yYy0uMiAwLS4zIDAtLjQuMS0uMS4xLS43LjUtMS4xIDIuNy0uMyAxLjktLjMgNC4yLS4zIDYuMyAwIC44IDAgMS43IDAgMi40LS4yIDYuOS0uMiAxMi44LS4yIDE4LjMuMSAxMi41LjcgMjMuNSAyIDMzLjcgMTEtMi43IDIwLjQtMTguMSAyMy0yNy44IDEuOS03LjIuNC0xNC44LTQuMi0yMS4zbDAgMEMzNDcgMTg4LjEgMzQwIDE4MyAzMzUgMTgwLjMgMzMzLjYgMTc5LjUgMzMyLjYgMTc5LjIgMzMyLjEgMTc5LjJ6TTUxNi4zIDYwLjhjLS4xIDAtLjIgMC0uNC0uMS0yLjQtLjctNC0uOS02LjctLjctLjcgMC0xLjMtLjUtMS40LTEuMiAwLS43LjUtMS4zIDEuMi0xLjQgMy4xLS4yIDQuOSAwIDcuNi44LjcuMiAxLjEuOS45IDEuNkM1MTcuMyA2MC40IDUxNi44IDYwLjggNTE2LjMgNjAuOHpNNTA2LjEgNzAuNWMtLjUgMC0xLS4zLTEuMi0uOC0uOC0yLjEtMS4yLTQuMy0xLjMtNi42IDAtLjcuNS0xLjMgMS4yLTEuMy43IDAgMS4zLjUgMS4zIDEuMi4xIDIgLjUgMy45IDEuMSA1LjguMi43LS4xIDEuNC0uOCAxLjZDNTA2LjQgNzAuNSA1MDYuMiA3MC41IDUwNi4xIDcwLjV6TTQ5NC4xIDY0LjRjLS40IDAtLjgtLjItMS0uNS0uNC0uNi0uMy0xLjQuMi0xLjggMS44LTEuNCAzLjctMi42IDUuOC0zLjYuNi0uMyAxLjQgMCAxLjcuNi4zLjYgMCAxLjQtLjYgMS43LTEuOS45LTMuNyAyLTUuMyAzLjNDNDk0LjcgNjQuMyA0OTQuNCA2NC40IDQ5NC4xIDY0LjR6TTUwMC41IDU1LjNjLS41IDAtLjktLjMtMS4yLS43LS41LTEtMS4yLTEuOS0yLjQtMy40LS4zLS40LS43LS45LTEuMS0xLjQtLjQtLjYtLjMtMS40LjItMS44LjYtLjQgMS40LS4zIDEuOC4yLjQuNS44IDEgMS4xIDEuNCAxLjMgMS42IDIuMSAyLjYgMi43IDMuOS4zLjYgMCAxLjQtLjYgMS43QzUwMC45IDU1LjMgNTAwLjcgNTUuMyA1MDAuNSA1NS4zek01MDYuNyA1NWMtLjMgMC0uNS0uMS0uOC0uMi0uNi0uNC0uNy0xLjItLjMtMS44IDEuMi0xLjcgMi4zLTMuNCAzLjMtNS4yLjMtLjYgMS4xLS45IDEuNy0uNS42LjMuOSAxLjEuNSAxLjctMSAxLjktMi4yIDMuOC0zLjUgNS42QzUwNy40IDU0LjggNTA3LjEgNTUgNTA2LjcgNTV6TTEwMjkuMyAzODIuOGMtLjEgMC0uMiAwLS40LS4xLTIuNC0uNy00LS45LTYuNy0uNy0uNyAwLTEuMy0uNS0xLjQtMS4yIDAtLjcuNS0xLjMgMS4yLTEuNCAzLjEtLjIgNC45IDAgNy42LjguNy4yIDEuMS45LjkgMS42QzEwMzAuMyAzODIuNCAxMDI5LjggMzgyLjggMTAyOS4zIDM4Mi44ek0xMDE5LjEgMzkyLjVjLS41IDAtMS0uMy0xLjItLjgtLjgtMi4xLTEuMi00LjMtMS4zLTYuNiAwLS43LjUtMS4zIDEuMi0xLjMuNyAwIDEuMy41IDEuMyAxLjIuMSAyIC41IDMuOSAxLjEgNS44LjIuNy0uMSAxLjQtLjggMS42QzEwMTkuNCAzOTIuNSAxMDE5LjIgMzkyLjUgMTAxOS4xIDM5Mi41ek0xMDA3LjEgMzg2LjRjLS40IDAtLjgtLjItMS0uNS0uNC0uNi0uMy0xLjQuMi0xLjggMS44LTEuNCAzLjctMi42IDUuOC0zLjYuNi0uMyAxLjQgMCAxLjcuNi4zLjYgMCAxLjQtLjYgMS43LTEuOS45LTMuNyAyLTUuMyAzLjNDMTAwNy43IDM4Ni4zIDEwMDcuNCAzODYuNCAxMDA3LjEgMzg2LjR6TTEwMTMuNSAzNzcuM2MtLjUgMC0uOS0uMy0xLjItLjctLjUtMS0xLjItMS45LTIuNC0zLjQtLjMtLjQtLjctLjktMS4xLTEuNC0uNC0uNi0uMy0xLjQuMi0xLjguNi0uNCAxLjQtLjMgMS44LjIuNC41LjggMSAxLjEgMS40IDEuMyAxLjYgMi4xIDIuNiAyLjcgMy45LjMuNiAwIDEuNC0uNiAxLjdDMTAxMy45IDM3Ny4zIDEwMTMuNyAzNzcuMyAxMDEzLjUgMzc3LjN6TTEwMTkuNyAzNzdjLS4zIDAtLjUtLjEtLjgtLjItLjYtLjQtLjctMS4yLS4zLTEuOCAxLjItMS43IDIuMy0zLjQgMy4zLTUuMi4zLS42IDEuMS0uOSAxLjctLjUuNi4zLjkgMS4xLjUgMS43LTEgMS45LTIuMiAzLjgtMy41IDUuNkMxMDIwLjQgMzc2LjggMTAyMC4xIDM3NyAxMDE5LjcgMzc3ek0xMzI5LjcgNTczLjRjLTEuNCAwLTIuOS0uMi00LjUtLjctOC40LTIuNy0xNi42LTEyLjctMTguNy0yMC0uNC0xLjQtLjctMi45LS45LTQuNC04LjEgMy4zLTE1LjUgMTAuNi0xNS40IDIxIDAgMS41LTEuMiAyLjctMi43IDIuOCAwIDAgMCAwIDAgMC0xLjUgMC0yLjctMS4yLTIuNy0yLjctLjEtNi43IDIuNC0xMi45IDctMTggMy42LTQgOC40LTcuMSAxMy43LTguOC41LTYuNSAzLjEtMTIuOSA3LjQtMTcuNCA3LTcuNCAxOC4yLTguOSAyNy4zLTEwLjFsLjctLjFjMS41LS4yIDIuOS45IDMuMSAyLjMuMiAxLjUtLjkgMi45LTIuMyAzLjFsLS43LjFjLTguNiAxLjItMTguNCAyLjUtMjQgOC40LTMgMy4yLTUgNy43LTUuNyAxMi40IDcuOS0xIDE3LjcgMS4zIDI0LjMgNS43IDQuMyAyLjkgNy4xIDcuOCA3LjIgMTIuNy4yIDQuMy0xLjcgOC4zLTUuMiAxMS4xQzEzMzUuMiA1NzIuNCAxMzMyLjYgNTczLjQgMTMyOS43IDU3My40ek0xMzExIDU0Ni43Yy4xIDEuNS40IDMgLjggNC40IDEuNyA1LjggOC43IDE0LjIgMTUuMSAxNi4zIDIuOC45IDUuMS41IDcuMi0xLjEgMi43LTIuMSAzLjItNC44IDMuMS02LjYtLjEtMy4yLTItNi40LTQuOC04LjNDMTMyNi43IDU0Ny41IDEzMTcuNyA1NDUuNiAxMzExIDU0Ni43eicvPjwvZz48L3N2Zz4=')",
            backgroundSize: 'cover',
            ease: 'power1.in',
            opacity: 1,
			
        });

		let tl = gsap.timeline({delay: 2});

		tl.to("#text3", {text: " Espaço de Beleza e Bem-estar Integral",ease: "power1.in" , duration: 1})
		tl.to("#text4", {text: "Realce sua beleza natural com cuidados que vão da cabeça aos pés ",ease: "power1.in" , duration: 1.5})
		
		gsap.to('.pixel', {
			duration: 2,
			scale: 40,
			x: 1500,
			y: 1500,
		});
		

		

    } else {
        console.log('Elemento .index-servicos não encontrado');
    }
}


function Loading() {

tl = gsap.timeline();

tl.to(".logo", {
	duration: 1, 
	opacity: 0,
	scale: 1, 
	ease: "bounce.out", 
	
});

tl.to(".screen-loading", {
	duration: 1,
	opacity: 1,
	display: 'none',
})

	
tl.to(".bar-loading", {
	duration: 1,
	'--bar-width': '100%',
	ease: "bounce.out",
	
}, "-=1")	


	
}


function main() {
    // Função principal
    gsap.registerPlugin(TextPlugin);
     initializeThreeJS();
     animateThreeJS();
   

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
		  },
		  {
			namespace: 'destaque',
			beforeEnter() {
			  // Código específico para a página de serviços
			  showPageContentDestaque();
			}
		  },




		],
		transitions: [{
			name: 'default-transition',
			sync: true,


			once(data) {

				if (data.next.namespace === 'home') {
					// Executa a animação de loading na primeira carga da página home
					Loading();
					fadeIn(data.next.container);
				  }
				// A animação inicial quando a página é carregada pela primeira vez
				 fadeIn(data.next.container);
			},
		 async leave(data) {
			// Animação de saída
			const done = this.async();
			transition.play();
			

            gsap.to(data.current.container, {
                opacity: 0,
               
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

	if (path.includes('destaque.html')) {
        namespace = 'destaque';
    }

    updateActiveLink(namespace);
});


document.addEventListener("DOMContentLoaded", main);

