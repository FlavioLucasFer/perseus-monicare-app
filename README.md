# Executando a aplicação

## Antes de começar...

Garanta que os seguintes softwares e serviços estejam instalados em seu computador:

- [Node.js](https://nodejs.org/en/)

Recomendamos também que leia as documentações do [React](https://pt-br.reactjs.org/), [React Native](https://reactnative.dev/) e a do [TypeScript](https://www.typescriptlang.org/) caso esse seja seu primeiro contato com as tecnologias.

****

## 1 - Instalando as dependências

O gerenciador de pacotes utilizado no projeto é o *yarn*, portanto, será necessário instalá-lo primeiro. Para instalar o *yarn* execute o seguinte comando no terminal:

```
npm install --global yarn
```

Agora que o *yarn* está instalado, abra um terminal na raiz do projeto e execute o comando baixo para instalar as dependências do projeto:

```
yarn install
```

**O comando falhou?**

Caso o comando falhe, exclua o arquivo *yarn.lock* da raiz do projeto e execute o comando ```yarn install``` novamente.

## 2 - Iniciando a aplicação

### Iniciando o servidor da API

Antes de iniciar a aplicação, garanta que a *API* da aplicação esteja rodando corretamente. **Caso não tenha clonado a API ainda** acesse o repositório clicando [aqui](https://github.com/FlavioLucasFer/perseus-monicare-api-server) e leia o README.md para ter o passo-a-passo de como rodar corretamente a *API*. 

Para clonar a *API*, execute o seguinte comando:

```
git clone https://github.com/FlavioLucasFer/perseus-monicare-web.git
```

**ATENÇÃO!**

O passo-a-passo de como rodar a *API* irá te ensinar a iniciar o servidor usando o comando ```php artisan serve```, porém, para que o app consiga acessar a *API* você precisará iniciá-la com o comando abaixo:

```
php artisan serve --host=IPv4_DA_SUA_MÁQUINA --port=8000
```

**Por que isso?** 

Caso esteja rodando a *API* junto com o MoniCare Web, o comando ```php artisan serve``` irá funcionaar corretamente pois ambos estão rodando localhost, porém, esteja o app rodando em um dispositivo físico ou em um emulador, ele não estará rodando localhost, portanto, faz-se necessário o comando exposto acima.

**Como sei qual meu IPv4?**

Caso não saiba como descobrir o *IPv4* da sua máquina, basta abrir um terminal e executar o comando ```ipconfig```. Na saída note que existirá uma linha *Endereço IPv4* com o valor ```192.168.1.X``` (*X* é variável), este é seu *IPv4*.

### Configurando a classe HttpRequestService

Você também precisará configurar a classe *HttpRequestService*. Para isso abra o arquivo *HttpRequestService* no caminho ```/src/api/services/``` e na chave *host* do objeto *config* coloque como valor o seu *IPv4* como no exemplo abaixo:

``` TypeScript
private static config: HttpRequestConfigT = {
	protocol: 'http',
	host: '192.168.1.2', // AQUI VAI O SEU IPv4
	port: 8000,
	prefix: 'api',
};
```

### Conectando um dispositivo

Além de rodar a *API* e configurar a classe *HttpRequestService* será necessário conectar um dispositivo físico com depuração por USB habilitada em uma porta USB do seu computador ou então usar um emulador.

### Finalmente! Executando a aplicação

Por fim, abra um terminal na raiz do projeto e execute o seguinte comando para inciar a aplicação:

```
yarn android
```

E pronto, a aplicação está inciada e rodando. 

## Executando os testes

Para executar os testes automatizados basta executar o seguinte comando:

```
yarn test
```

## Não conseguiu iniciar a aplicação?

Caso tenha seguido o passo a passo corretamente e mesmo assim não tenha conseguido iniciar a aplicação, abra um *issue* no repositório que iremos ajudá-lo. 
