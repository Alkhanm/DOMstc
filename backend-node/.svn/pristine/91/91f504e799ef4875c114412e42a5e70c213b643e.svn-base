AUTOR: THIAGO RODRIGUES PEREIRA
DATA: 26/03/2022
PROJETO: API DO SISTEMA REFILTEK

TUTORIAL:
Apoi a criacao do server
https://bezkoder.com/vue-node-express-postgresql/#Nodejs_Express_Back-end
https://bezkoder.com/node-express-sequelize-postgresql/
jwt seguranca
https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/
https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/

DEPENDENCIA:
https://expressjs.com/pt-br/starter/installing.html
http://expressjs.com/en/resources/middleware/morgan.html
http://expressjs.com/en/resources/middleware/cookie-parser.html
https://www.npmjs.com/package/http-errors
https://www.npmjs.com/package/debug/
https://sequelize.org/master/manual/getting-started.html
'nodemon' para reiniciar servico ao modificar arquivo
'jsonwebtoken' para gerar token assinado para login api
'dotenv' para gerenciar variaveis de ambiente com seguranca
'crypto-js' para gerar hash SHA256 ou MD5
'cors' para evitar erro de 'CORS policy 'Access-Control-Allow-Origin' header is present' do chrome
'moment' utilitario para datas

INSTALL:
npm init

npm install express morgan cookie-parser debug http-errors cors dotenv sequelize mysql2 jsonwebtoken crypto-js moment --save

npm install -D typescript ts-node @types/cookie-parser @types/cors @types/crypto-js @types/debug @types/express @types/http-errors @types/jsonwebtoken @types/morgan @types/sequelize @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise --save

PADRÃO DE PROJETO
https://medium.com/@diomalta/como-organizar-e-estruturar-projetos-com-node-js-4845be004899
Google JavaScript Style Guide
https://google.github.io/styleguide/jsguide.html

src
│ app.js # Classe app
│ server.js # Server para iniciar o app
└───api  
└───controllers # Funções da controllers do express route
└───models # Modelos do banco de dados
└───services # Regras de negócio
└───subscribers # Eventos async
└───repositories\* # Query builders
└───config # Configuração das variaveis de ambiente
└───jobs # Tarefas de rotinas
└───loaders # Modulos para utilizado no app
└───utils # Trechos de código pequeno
└───helpers # Trechos de arquitetura de código
└───routes # Definição de rotas express
└───types # Tipagem (d.ts) para Typescript
