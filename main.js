// Importação dos estilos SCSS

import "./src/scss/reset.scss";
import "./src/scss/style.scss";
import "./src/scss/tailwind.scss" 

import { initializeThreeJS, animateThreeJS } from '/src/js/threeSetup.js';


// Importações de bibliotecas
import barba from "@barba/core"

import gsap from "gsap";
import { TextPlugin } from 'gsap/TextPlugin';
gsap.registerPlugin(TextPlugin);



document.addEventListener("DOMContentLoaded", main);

initializeThreeJS()
animateThreeJS()

function showPageContent() {



   
    const pageContent = document.querySelector('.index'); 
    gsap.to(pageContent, {
        duration: 1,
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
				gsap.to(botao, { scale: 1, backgroundColor: "transparent", color: "#ed3237", duration: 0.3 });
			  });

			 gsap.to('.imagem-reveal', {
				
				
			});
			
	
}



barba.init({
	transitions: [{
	// 	name: "entrada transition",
	// },
	// {
	// 	name: "meio transition",
	// },
	// {
	 	name: "saida transition",
		sync: true,
		once() {

			gsap.to(".logo", {
				duration: 3, 
				opacity: 1,
				scale: 1, 
				ease: "bounce.out", 
				onComplete: showPageContent
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
				
			console.log("uma vez na página")
		},
		before(){
			console.log("Antes na página")
		},
		after(){
			console.log("Saindo da página")
		},
		beforeEnter() {
			console.log("before enter na página")
		},

		enter() {
			
			console.log("Entrando na página")
		}
	 }

	 
]

})

function LoadingScreen() {
	
	gsap.to(".logo", {
		duration: 3, 
		opacity: 1,
		scale: 1, 
		ease: "bounce.out", // escolha um efeito de easing suave
	});

	
     gsap.to(loadingScreen, {
            duration: 1,
            opacity: 0,
            display: 'none',
            
        });

		gsap.to(".bar-loading", {
			duration: 3, 
			width: '100%', // Completa a barra
			// Chama a função para esconder a tela de carregamento
		});
    
}


// Função para iniciar a animação da barra de carregamento


// Inicializações de Barba.js e GSAP
function initBarba() {
	
	
	
	// Aqui você pode configurar animações específicas do Barba.js com GSAP
}

// Função de inicialização principal
function main() {

	



	initBarba();

	// Aqui você pode adicionar qualquer outra inicialização ou lógica específica
	// Por exemplo, inicializar componentes, manipular eventos, etc.
}

