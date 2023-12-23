// Importação dos estilos SCSS
import "./src/scss/reset.scss";
import "./src/scss/style.scss";
import "./src/scss/tailwind.scss" 

// Importações de bibliotecas
import barba from "@barba/core"
import gsap from "gsap";

document.addEventListener("DOMContentLoaded", main);
function hideLoadingScreen() {
    const loadingScreen = document.querySelector(".screen-loading");
    if (loadingScreen) {
        gsap.to(loadingScreen, {
            duration: 1,
            opacity: 0,
            display: 'none',
            onComplete: () => {
                loadingScreen.style.display = 'none';
            }
        });
    }
}


// Função para iniciar a animação da barra de carregamento


// Inicializações de Barba.js e GSAP
function initBarba() {
	barba.init({
		views: [
		  {
			namespace: 'home',
			beforeEnter(data) {
			  // Atualize a navegação ou qualquer outra coisa que você precisa fazer quando entra nesta visualização
			},
			afterEnter(data) {
			  // Atualizações após a entrada completa na nova página
			}
		  }
		  // ... outras visualizações para outras páginas
		],
		transitions: [
		  {
			name: 'fade',
			once(data) {
			  // Uma transição inicial quando o site é carregado pela primeira vez
			},
			leave(data) {
			  // Uma transição para a página que está saindo
			},
			enter(data) {
			  // Uma transição para a página que está entrando
			}
		  }
		]
	  });
	
	
	// Aqui você pode configurar animações específicas do Barba.js com GSAP
}

// Função de inicialização principal
function main() {

	setTimeout(hideLoadingScreen, 3000);

	gsap.to(".logo", {
		duration: 3, 
		opacity: 1,
		scale: 1, 
		ease: "bounce.out", // escolha um efeito de easing suave
	});

	initBarba();

	// Aqui você pode adicionar qualquer outra inicialização ou lógica específica
	// Por exemplo, inicializar componentes, manipular eventos, etc.
}

