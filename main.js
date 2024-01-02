import barba from "@barba/core";
import gsap from "gsap";
import { TextPlugin } from 'gsap/TextPlugin';

import('https://cdn.lordicon.com/lordicon.js');

import "./src/scss/reset.scss";

import "./src/scss/tailwind.scss";
import "./src/scss/style.scss";



let cursor = document.getElementById('cursor');
const onMouseMove = (event) => {
	cursor.style.left = event.pageX + 'px';
	cursor.style.top = event.pageY + 'px';

	if(event.target.hasAttribute('cursor-type')) {
		let cursorSize = event.target.getAttribute('cursor-type');
		cursor.classList.add(cursorSize);

	} else {
		cursor.classList = '';
	}

}

document.addEventListener('mousemove', onMouseMove);

function fadeIn(content) {
 	gsap.to(content, { duration: 1, visibility: 'visible', opacity: 1 });
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
		tl.to ("#text5", {text: "Aqui no Salão Loha oferecemos uma experiência acolhedora  com serviços  personalizados de beleza por profissionais qualificados e atualizados com as últimas tendências.",ease: "power1.in" , duration: 2})
		tl.to(".imagem-reveal", {
		clipPath: 'inset(0 0 0 0)',
		duration: 1, 
		ease: 'elastic.out(1,0.3)', 
					
		}, "-=7")

		const botao = document.querySelector('#agendar');

		botao.addEventListener('mouseenter', () => {
			gsap.to(botao, { scale: 1.1, backgroundColor: "#fff", color: "#ed3237", duration: 0.3 });
		});
				
				
		botao.addEventListener('mouseleave', () => {
			gsap.to(botao, { scale: 1, backgroundColor: "#fff", color: "#ed3237", duration: 0.3 });
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
			 
			  showPageContentHome();
			}
		  },
		  

		],
	
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

