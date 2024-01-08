import barba from "@barba/core";
import gsap from "gsap";
import { TextPlugin } from 'gsap/TextPlugin';

import('https://cdn.lordicon.com/lordicon.js');

import { Gradient } from './src/js/Gradient';

import "./src/scss/reset.scss";

import "./src/scss/tailwind.scss";
import "./src/scss/style.scss";

import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/brands.css'; 





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
				   namespace === 'portfolio' ? 'a[href*="portfolio.html"]' :
				   namespace === 'contato' ? 'a[href*="contato.html"]' :
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

	gsap.to('html', {
		duration: 1,
		backgroundColor: '#fff',
		
		ease: 'power1.in',
	})
	
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


function showPageContentServicos() {

    const pageContent = document.querySelector('.index-servicos');

    if (pageContent) {
        
		pageContent.style.visibility = 'visible';
        pageContent.style.display = 'block';
		pageContent.style.opacity = '1';
        
		
        gsap.to('html', {
            duration: 2,
            backgroundImage: 'url(/svg/pattern-randomized.svg)',
            backgroundSize: 'cover',
            ease: 'power1.in',
            opacity: 1
        });

		let tl = gsap.timeline({delay: 2});

		tl.to("#text3", {text: " Espaço de Beleza e Bem-estar Integral",ease: "power1.in" , duration: 1})
		tl.to("#text4", {text: "Realce sua beleza natural com cuidados que vão da cabeça aos pés ",ease: "power1.in" , duration: 1.5})
			
		
        gsap.from('.card', { 
            duration: 2, 
            opacity: 1, 
            y: 200, 
            stagger: 1, 
            ease: 'power1.in',
            onStart: () => {
                
            document.querySelectorAll('.card-img').forEach(img => {
                    gsap.set(img, {width: '100%', height: '15rem', objectFit: 'cover', opacity: 1 });
                });

				const cardWidth = '300px'; 
                document.querySelectorAll('.card').forEach(card => {
                    gsap.set(card, { width: cardWidth });

					card.addEventListener('mouseenter', () => {
						gsap.to(card, {
							duration: 0.5,
							rotationY: 15,
							rotationX: 15,
							ease: 'back'
						});
					});

					card.addEventListener('mouseleave', () => {
						gsap.to(card, {
							duration: 0.5,
							rotationY: 0,
							rotationX: 0,
							ease: 'back'
						});
					});
                });

            }

			
        });

    } else {
        console.log('Elemento .index-servicos não encontrado');
    }
}


function showPageContentDestaque() {
	document.body.classList.add('bg-special');
    const pageContent = document.querySelector('.index-destaque');

    if (pageContent) {

		pageContent.style.visibility = 'visible';
        pageContent.style.display = 'block';
		pageContent.style.opacity = '1';
        
     

		let tl = gsap.timeline({delay: 2});

		tl.to("#text1", {text: " Saúde é tudo",ease: "power1.in" , duration: 1})
		tl.to("#text1", {text: " ",ease: "power1.in" , delay: 1, duration: 1})
		
		
		

		

    } else {
        console.log('Elemento .index-destaque não encontrado');
    }
}

function showPageContentPortfolio() {
	document.body.classList.add('page-portfolio');
	const gradient = new Gradient();
		gradient.initGradient('#gradient-canvas');

	const pageContent = document.querySelector('.page-portfolio');

    if (pageContent) {

		pageContent.style.visibility = 'visible';
        pageContent.style.display = 'block';
		pageContent.style.opacity = '1';

        
 
    } else {
        console.log('Elemento page-portfolio não encontrado');
    }


	if (document.getElementById('gradient-canvas')) {
		const gradient = new Gradient();
		gradient.initGradient('#gradient-canvas');
		}	 

	function randomBetween(min, max) {
		return Math.random() * (max - min) + min;
	  }

	const positions = [
		{ top: "40%", left: "40%" },
		{ top: "0%", left: "30%" },
		{ top: "0%", left: "60%" },
		{ top: "16%", left: "15%" },
		{ top: "16%", left: "40%" },
		{ top: "16%", left: "90%" },
		{ top: "32%", left: "50%" },
		{ top: "32%", left: "75%" },
		{ top: "48%", left: "0%" },
		{ top: "64%", left: "30%" },
		{ top: "64%", left: "50%" },
		{ top: "64%", left: "90%" },
		{ top: "80%", left: "20%" },
		{ top: "80%", left: "70%" }
	  ];
	  
	const imgs = document.querySelectorAll(".img");
	  
	gsap.set(".img", {
		top: "45%",
		left: "50%",
		transform: "translate(-50%, -70%) scale(0)"
	  });
	
	 
	  
	  gsap.from("p", {
		y: 40,
		ease: "power4.inOut",
		duration: 1,
		stagger: {
		  amount: 0.15
		},
		delay: 0.5
	  });

	  gsap.to(".img", {
		scale: 1,
		width: "300px",
		height: "400px",
		stagger: 0.25,
		duration: 1,
		ease: "power2.out",
		delay: 1,
		onComplete: scatterAndShrink
	  });

	  gsap.to("p", {
		top: "40px",
		ease: "power4.inOut",
		duration: 1,
		stagger: {
		  amount: 0.15
		},
		delay: 3,
		onComplete: () => {
		  document.querySelector(".header").remove();
		}
	  });
	  
	  function scatterAndShrink() {
		imgs.forEach((img, i) => {
		  const originalPosition = JSON.parse(img.getAttribute('data-original-position'));
		  const rotation = randomBetween(-10, 10); // Gera uma rotação aleatória novamente
		  gsap.to(img, {
			top: originalPosition.top,
			left: originalPosition.left,
			transform: `rotate(${rotation}deg)`, // Aplica a rotação
			width: "150px",
			height: "200px",
			ease: "power2.out",
			duration: 0.75
		  });
		});
	  }
	  
	  
	  function applyBlurEffect() {
		const elementsToBlur = document.querySelectorAll('.img:not([data-enlarged="true"])');
		gsap.to(elementsToBlur, {
		  filter: 'blur(20px)',
		  duration: 0.75,
		  ease: 'power2.out'
		});
	  }
	  
	  function removeBlurEffect() {
		const elementsToBlur = document.querySelectorAll('.img:not([data-enlarged="true"])');
		gsap.to(elementsToBlur, {
		  filter: 'blur(0px)',
		  duration: 1,
		  ease: 'power2.out'
		});
	  }
	  
	  function toggleImageSize(event) {
		const img = event.currentTarget;
		const isEnlarged = img.getAttribute('data-enlarged') === 'true';
		const originalPosition = JSON.parse(img.getAttribute('data-original-position'));
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
	  
		if (!isEnlarged) {
		  const enlargedWidth = 500; 
		  const enlargedHeight = 600; 
		  const centeredLeft = (viewportWidth - enlargedWidth) / 2;
		  const centeredTop = (viewportHeight - enlargedHeight) / 2;
		  const topCorrection = -40; 
		  const correctedTop = centeredTop - topCorrection;
	  
		  gsap.to(img, {
			zIndex: 1000,
			top: correctedTop + 'px',
			left: centeredLeft + 'px',
			width: enlargedWidth + 'px',
			height: enlargedHeight + 'px',
			ease: 'power4.out',
			duration: 1
		  });
		  img.setAttribute('data-enlarged', 'true');
		  applyBlurEffect();
		} else {
		  setTimeout(() => removeBlurEffect(), 100);
	  
		gsap.to(img, {
			zIndex: 1,
			top: originalPosition.top,
			left: originalPosition.left,
			width: '175px',
			height: '100px',
			ease: 'power4.out',
			duration: 1
		  });
		  img.setAttribute('data-enlarged', 'false');
		}
	  }
	  
	  imgs.forEach((img, i) => {
		
		img.setAttribute('data-original-position', JSON.stringify(positions[i]));
		img.setAttribute('data-enlarged', 'false');
		img.addEventListener('click', toggleImageSize);
		const rotation = randomBetween(-10, 10);
		gsap.to(img, { rotation: rotation, duration: 0 });
	  });
	  
	
}

function showPageContentContato() {
	console.log('Show Page Content Contato');
}


function main() {
   
    gsap.registerPlugin(TextPlugin);
   
    
   

	barba.init({
		views: [
		  {
			namespace: 'home',
			beforeEnter() {
				gsap.to('html', {
                    duration: 1,
                    backgroundColor: '#fff',
                    backgroundImage: 'none', 
                    ease: 'power1.in',
                });	
			updateActiveLink('home'); 
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
		  {
			namespace: 'servicos',
			beforeEnter() {
				document.body.classList.remove('bg-special');
				gsap.to('html', {
                    duration: 1,
                    backgroundColor: '#fff',
                    backgroundImage: 'none',
                    ease: 'power1.in',
                });		
				
			updateActiveLink('servicos');	
			

			},
			afterEnter() {
				fadeIn('.index-servicos');
				showPageContentServicos();
				
			},
			beforeLeave() {
				fadeOut('.index-servicos');
			}
		  },
		  {
			namespace: 'destaque',
			beforeEnter() {

				gsap.to('html', {
                    duration: 1,
                    backgroundColor: '#fff',
                    backgroundImage: 'none', 
                    ease: 'power1.in',
                });	
				
			updateActiveLink('destaque');	
			document.querySelector('.destaque').classList.add('bg-special');

			},
			afterEnter() {
				fadeIn('.index-destaque')
				showPageContentDestaque();
				
			},
			beforeLeave() {
				fadeOut('.index-destaque');
				document.body.classList.add('bg-special');
				document.querySelector('.destaque').classList.remove('bg-special');
			}
		  },

		  {
			namespace: 'portfolio',
			beforeEnter() {
				document.body.classList.remove('bg-special');
				document.body.classList.add('page-portfolio');
				gsap.to('html', {
                    duration: 1,
                    backgroundColor: 'none',
                    backgroundImage: 'none', 
                    ease: 'power1.in',
                });		

			if (document.querySelector('.page-portfolio')) {
					import('/src/scss/portfolio.scss');
					if (document.getElementById('gradient-canvas')) {
						const gradient = new Gradient();
						console.log('Gradiente chegou',gradient);
						gradient.initGradient('#gradient-canvas');
						}	 
					
				  }
				  
				
			updateActiveLink('portfolio');	
			showPageContentPortfolio();

			},
			afterEnter() {
				document.body.classList.add('page-portfolio');
				const gradient = new Gradient();
				console.log('Gradiente chegou no after enter',gradient);
				gradient.initGradient('#gradient-canvas');
				fadeIn('.index-portfolio')

			
				
			},
			beforeLeave() {
				
				
			}
		  },

		  {
			namespace: 'contato',
			beforeEnter() {
				document.body.classList.remove('bg-special');
				
				gsap.to('html', {
                    duration: 1,
                    backgroundColor: 'none',
                    backgroundImage: 'none', 
                    ease: 'power1.in',
                });		

		
				
			updateActiveLink('contato');	
			showPageContentContato();

			},
			afterEnter() {
				
				fadeIn('.index-contato')

			
				
			},
			beforeLeave() {
				
				
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

	if (path.includes('portolio.html')) {
        namespace = 'portfolio';
    }

	if (path.includes('contato.html')) {
        namespace = 'contato';
    }

    updateActiveLink(namespace);
});


document.addEventListener("DOMContentLoaded", main);

