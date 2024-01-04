import barba from "@barba/core";
import gsap from "gsap";
import { TextPlugin } from 'gsap/TextPlugin';

import('https://cdn.lordicon.com/lordicon.js');

import "./src/scss/reset.scss";

import "./src/scss/tailwind.scss";
import "./src/scss/style.scss";




function fadeOut(content) {
	return gsap.to(content, { duration: 1, visibility: 'hidden', opacity: 0  });
  }  

function fadeIn(content) {
 	gsap.to(content, { duration: 2, visibility: 'visible', opacity: 1,delay: 3 });
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
                   'a[href*="index.html"]';
    const newActiveLink = document.querySelector(selector);

    if (newActiveLink) {
        newActiveLink.classList.add('link-ativo');
        gsap.to(newActiveLink, { borderColor: '#ed1c24', duration: 0.3, ease
		: 'power1.in' });
    } else {
        console.log('Não foi possível encontrar o link ativo para o namespace:', namespace);
    }
}

function showPageContentHome() {

	
 let tl = gsap.timeline();

	

	tl.to(".imagem-reveal", {
		clipPath: 'inset(0 0 0 0)',
		duration: 1, 
		ease: 'elastic.out(1,0.3)', 

		}, )		
	tl.to ("#text1", {text: "Atendimento personalizado ",ease: "power1.in" , duration: 1})
	tl.to ("#text2", {text: "Beleza atualizada ",ease: "power1.in" , duration: 1})
			
	tl.to ("#text4", {text: "Salão Loha ",ease: "power1.in" , duration: 1})
	tl.to ("#text5", {text: "Aqui no Salão Loha oferecemos uma experiência acolhedora  com serviços  personalizados de beleza por profissionais qualificados e atualizados com as últimas tendências.",ease: "power4.in" , duration: 2 })
	.to("#text6", {text: "Te esperamos", ease: "power1.in", duration: 2})

	  tl.to("#text6", {text: "", ease: "reverse", duration: 2}, "+=2")
	 tl.to(".hover-link", {scale: 1.1, ease: "power1.in", duration: 0.5 })
	 tl.to(".hover-link", {scale: 1, ease: "power1.in", duration: 1 })
	 tl.to("#coracao", {
		scale: 1.2, 
		skewX: 12, 
		skewY: 12, 
		rotateX: 10, 
		rotateY: 10, 
		translateZ: 20,
		boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.5)", 
		ease: "power1.in", 
		duration: 1
	}, "-=1.5")
	  .to("#coracao", {
		scale: 1, 
		skewX: 0, 
		skewY: 0, 
		rotateX: 0, 
		rotateY: 0, 
		translateZ: 0,
		boxShadow: "none", // Remove a sombra
		ease: "power1.in", 
		duration: 1
	  });
	 
	 tl.to("html", {duration: 2,
		backgroundColor: '#fffff0',
		
		ease: 'power1.in',})
	



}	

function showBeforePageContentHome() {
	gsap.to('html', {
		duration: 1,
		backgroundColor: '#fff',
		
		ease: 'power1.in',
	})
	

    const pageContent = document.querySelector('.index'); 

	if (pageContent) {
       
        
        pageContent.style.visibility = 'visible';

    	 gsap.to(pageContent, {
         duration: 0.1,
         opacity: 1,
        
		});

		var path = document.querySelector("#borda-hero");
		if (path) {
			var length = path.getTotalLength();
			
		}
			
		path.style.strokeDasharray = length;
		path.style.strokeDashoffset = length;

		gsap.to(path.style, {
			delay: 1,
			strokeDashoffset: 0,
			duration: 2, 
			ease: "back.inOut",
		}); 
		
	
}


			
	
}





function main() {
   
    gsap.registerPlugin(TextPlugin);
   
    
   

	barba.init({
		views: [
		  {
			namespace: 'home',
			beforeEnter() {

			
			 
			showBeforePageContentHome();
			},
			afterEnter() {
				fadeIn('.index')
				showPageContentHome();

			},
			beforeLeave() {
				fadeOut('.index');
			}
		  },
		  

		],
	
	});
	  


}
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    let namespace = 'home'; 

    if (path.includes('servicos.html')) {
        namespace = 'servicos';
    }

	if (path.includes('destaque.html')) {
        namespace = 'destaque';
    }

    updateActiveLink(namespace);
});


document.addEventListener("DOMContentLoaded", main);

