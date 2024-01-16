import page from 'page';

function loadHtml(url) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById('app').innerHTML = html;
    });
}

page('/', () => loadHtml('/index.html'));
page('/contato', () => loadHtml('/src/pages/contato.html'));
page('/destaque', () => loadHtml('/src/pages/destaque.html'));
page('/portfolio', () => loadHtml('/src/pages/portfolio.html'));
page('/servicos', () => loadHtml('/src/pages/servicos.html'));

page.start();
