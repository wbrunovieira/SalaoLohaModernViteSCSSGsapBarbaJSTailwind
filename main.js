// Importação dos estilos SCSS
import "./src/scss/reset.scss";
import "./src/scss/style.scss";
import "./src/scss/tailwind.scss" 

// Importações de bibliotecas
import barba from "@barba/core"
import gsap from "gsap";

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
	initBarba();

	// Aqui você pode adicionar qualquer outra inicialização ou lógica específica
	// Por exemplo, inicializar componentes, manipular eventos, etc.
}

// Carrega tudo quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", main);
