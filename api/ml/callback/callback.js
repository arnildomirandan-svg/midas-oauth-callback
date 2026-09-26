// Repassa o retorno do login do Mercado Livre (code + state) para o backend local do MIDAS.
// Não guarda nada, não chama nenhum servidor e só encaminha para um destino FIXO (localhost).
(function () {
  var DESTINO = 'http://localhost:3001/api/ml/callback';
  var mensagem = document.getElementById('mensagem');
  var p = new URLSearchParams(location.search);

  function falhar(texto) { mensagem.textContent = texto; }

  var state = p.get('state') || '';
  var code = p.get('code');
  var erro = p.get('error');

  // Só encaminha valores com formato esperado; o restante é ignorado (nunca repassado).
  if (!/^[A-Za-z0-9_-]{16,128}$/.test(state)) {
    return falhar('Retorno inválido (parâmetro "state" ausente ou malformado). Comece a autorização de novo pelo MIDAS.');
  }
  var saida = new URLSearchParams();
  saida.set('state', state);
  if (code) {
    if (!/^[A-Za-z0-9._-]{8,256}$/.test(code)) return falhar('Retorno inválido (código malformado). Comece de novo pelo MIDAS.');
    saida.set('code', code);
  } else if (erro) {
    if (!/^[a-z_]{1,64}$/.test(erro)) return falhar('Retorno inválido (erro malformado). Comece de novo pelo MIDAS.');
    saida.set('error', erro);
  } else {
    return falhar('Nada a fazer aqui: abra esta página só pelo retorno do login do Mercado Livre.');
  }

  // Tira o código do endereço e do histórico desta página antes de sair.
  history.replaceState(null, '', location.pathname);
  mensagem.textContent = 'Retornando ao MIDAS no seu computador… Se nada acontecer, o servidor do MIDAS não está ligado: ligue o backend e refaça a autorização.';
  location.replace(DESTINO + '?' + saida.toString());
})();
