# midas-oauth-callback

Página estática de **retorno do login OAuth** usada por um aplicativo de uso interno da MIDAS 3D.

Ela recebe o redirecionamento do Mercado Livre em `/api/ml/callback` e apenas repassa os parâmetros `state` e `code` (ou `error`) ao computador do próprio usuário, em `http://localhost`. Não guarda nada, não chama nenhum servidor e não carrega recursos externos.

- Este repositório **não contém** senhas, tokens, chaves de aplicativo nem configurações privadas.
- Nenhum outro código do sistema está aqui.
- Sem formulário, sem coleta de dados, sem cookies, sem rastreamento.
