# Teste Mutual

### Desenvolvimento de uma API REST em NodeJS

Desenvolvimento feito em NodeJs com o Framework Adonisjs com typescript

### Bibliotécias utilzadas
* Japa - Para testes automatizados


### Rodando o projeto

Clonando projeto:
~~~shell
$ git clone https://
~~~

Rodando com docker
~~~shell
$ docker compose up
~~~
Rodando migrations
~~~shell
$ docker exec api_mutual node ace migration:run
~~~

Acessando: http://localhost:3000

Para fins de testes rodar:
~~~shell
$ docker exec api_mutual yarn test
~~~

### Documentação

POSTMAN: importar arquivo na raiz do projeto "postman.json"


## Considerações

O projeto foi feito em Adonisjs, um framework interessante que até então não tinha tido muito contato.
Nele há algumas certas semelhanças com o Laravel do PHP, por incrível que pareça.

Todos os endpoints estão cobertos por testes e por uma própria recomendação da comunidade do Adonis, utilizei o Japatest
ao invés dos mais convencionais como Jasmine ou Mocha.

Um dos requisitos do desafio, era utilziar a mesma implementação do crédito e débito. Abistrai as implementações para 
repositories, porém, toda parte de valicação é feita meio que no request, então nesse endpoint ficou um pouco repetitivo 
por não ser tão desacoplado.

Um ponto interessante é que utilizei o redis para armazenar o saldo da conta. Talvez seja um endpoint muito utilizado
no app, então para alivar um pouco acarga do banco, achei válido.

Vale vender o meu peixe, dizendo que todo o código está usando o ESlint para a parte de identação então ficou tudo xuxubeleza

Não fiz uma doc automática com o Swagger, pois as implementações do Adonis pra isso, ficavam um pouco verbosa pois
utilizam "Annotations" no controller. Não gosto muito dessa implementação.
