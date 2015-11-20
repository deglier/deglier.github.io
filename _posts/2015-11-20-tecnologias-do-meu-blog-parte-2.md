---
layout: post
title: 'Tecnologias presentes nesse blog parte 2'
twitter_text: 'Nessa segunda parte falaremos sobre Gulp, Node.js e npm.'
description: 'Falaremos sobre Gulp, Node.js e NPM.'
introduction: 'Falaremos sobre Gulp, Node.js e NPM.'
imagem: /assets/img/vamos-combinar/main.jpg
erie:
  - 'Tecnologias do blog'
     link: tecnologias-do-blog
tags:
  - planos
  - conteudoDoSite
  - novidades
permalink: /tecnologias-do-meu-blog-parte-2/
---


## Ahá!
Sim, vou contar. A primeira série do blog será sobre todas as tecnologias que usei para a criação desse blog. Como tema do segundo artigo da série vamos falar de: **Gulp**!

### Gulp
![Gulp logo](http://jakesharp.co/wp-content/uploads/2015/03/gulp-logotype-300x187.png "Gulp logo")

Imagine se tivesse uma maneira de fazer tudo o que você faz ao chegar no trabalho até efetivamente trabalhar de verdade? É disso que se trata o Gulp.
Vamos colocar numa situação hipotética de que todos os dias você precisa abrir a porta, abrir as janelas, ligar o ar condicionado, ligar as luzes, ligar os computadores, 'logar' na sua estação de trabalho e enfim começar a trabalhar. Você pode até achar normal, já que faz todos os dias, mas se tivesse alguma tecnologia e que só com um click faça tudo isso? Bom, em questão de desenvolvimento e mais precisamente, 'frontend', existe! E mais de um, mas o foco aqui será o Gulp.

O Gulp é conhecido como um *task runner*. uma tecnologia baseada em JavaScript que roda sobre um outra tecnologia(também desenvolvida em js), o [Node.js](https://nodejs.org/ "site do Node.js" ).

## Node.js

![Node.js](https://nodejs.org/static/images/logos/nodejs.png "Logo do Node.js" )

Definição que encontramos na Wikipédia sobre Node.js:

>"Node.js é um interpretador de código JavaScript que funciona do lado do servidor. Seu objetivo é ajudar programadores na criação de aplicações de alta escalabilidade (como um servidor web), com códigos capazes de manipular dezenas de milhares de conexões simultâneas, numa única máquina física. O Node.js é baseado no interpretador V8. Foi criado por Ryan Dahl em 2009, e seu desenvolvimento é mantido pela empresa Joyent, onde Dahl trabalha." - *Referência do site [Wikipédia](https://pt.m.wikipedia.org/wiki/Node.js "Página da wikipédia que fala sobre o Node.js" ) visualizada em 20 de Novembro de 2015*

Para poder usar o Gulp, você vai precisar ter o nodeJs instalado em sua máquina.
O download do Node.js pode ser feito por meio desse [link](https://nodejs.org/en/download/ " Página de download do Node.js" ) (em inglês).

Após a instalação do node.js, instalaremos o Gulp. Vamos usar o terminal (no linux e mac) ou prompt de comandos (no windows). A instalação é feita praticamente da mesma maneira em ambos. Vamos usar a flag `-g` para instalar globalmente o Gulp.

A instalação no windows via prompt fica assim:
````bash
npm install gulp -g

````

E no terminal é a mesma coisa, com a diferença apenas do `sudo`, que invoca o [**super user**](https://pt.m.wikipedia.org/wiki/Sudo "Página da wikipédia sobre SUDO (SuperUser)" ) do sistema:
````bash
sudo npm install gulp -g
````

## Explicando os comandos

### NPM

![npm logo](https://cdn-images-1.medium.com/max/800/1*0fr3PbT2XqjsMD52sc2-NQ.png " NPM logo" )
NPM é o nome reduzido de Node Package Manager (Gerenciador de Pacotes do Node). A NPM é duas coisas: Primeiro, e mais importante, é um repositório online para publicação de projetos de código aberto para o Node.js; Segundo, ele é um utilitário de linha de comando que interage com este repositório online, que ajuda na instalação de pacotes, gerenciamento de versão e gerenciamento de dependências e nesse caso o Gulp. Se você quiser ver todos os pacotes que a npm tem clique nesse [link](https://www.npmjs.com/ "site da NPM" ).

O comando `install`, bom acho que não preciso nem dizer né. Enfim, ele é um comando do npm e tem a função de instalar um pacote, projeto ou biblioteca presente no repositório online da npm, nesse caso, procura e instala o Gulp.

A flag `-g` faz com esse pacote seja instalado globalmente em sua máquina. O que isso significa? Significa que quando você precisar instalar o Gulp em um projeto, ele vai buscar na sua máquina primeiro e então instala no seu projeto. Veremos isso mais a frente em outro post.
