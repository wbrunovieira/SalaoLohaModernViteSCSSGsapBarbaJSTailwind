// Importação dos estilos SCSS
import "./src/scss/reset.scss";
import "./src/scss/style.scss";
import "./src/scss/tailwind.scss" 

// Importações de bibliotecas
import barba from "@barba/core"
import gsap from "gsap";
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
		// Configurações do Barba.js
		// Aqui você pode adicionar transições, views, etc.
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

// Carrega tudo quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", main);
// Função para esconder a tela de carregamento
