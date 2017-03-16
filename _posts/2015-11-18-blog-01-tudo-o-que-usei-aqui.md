---
layout: post
title: 'Tecnologias presentes nesse blog - #1. Tudo o que usei aqui'
twitter_text: 'Nessa primeira parte veremos tudo o que usei no blog.'
description: 'Nessa primeira parte veremos tudo o que usei no blog.'
introduction: 'Falaremos sobre Gulp, Node.js e NPM.'
imagem: tecs-do-blog-parte-1/main.png
serie: 'Tecnologias presentes nesse blog'
categories:
- 'Making Of'
session: js
tags:
  - making-of
  - tecnologias
  - linguagens
---

Pra iniciar a primeira série do blog, irei falar e revelar todos os segredinhos que estão aqui nesse blog.

### sem "delongas"

Não vou me atentar em explicar cada "coisinha" que tem no blog em um primeiro momento; aos poucos vou falando e me aprofudando com os temas e assuntos assim como nas tecnologias empregadas nesse blog.

## Tecnologias do blog

Se tem uma coisa que sou, são necessariamente duas: uma, sou bem curioso e procuro sempre coisas novas e inovadoras; dois, costumo ser bem determinado no que quero e no que faço. Por esse motivo, as tecnologias aqui presentes são *relativamente* novas. Vamos a lista:

-   **[Jekyll](https://jekyllrb.com/)** - como base do blog, sendo um gerador de páginas estáticas. No momento o meu preferido :)
-   **[Gulp.js](http://gulpjs.com/)** - o primeiro automatizador que conheci, e até agora, o que eu mais amo.
-   **[SVG](https://pt.wikipedia.org/wiki/SVG)** - ícones escaláveis, fáceis de utilizar e super leves, ou seja, vetores no navegador &lt;3. Tem coisa melhor \*-\* ?
-   **[Sass](http://sass-lang.com/)** - Não tem como nao amar esse pre-processador. Simplesmente perfeito!
- **[Github Pages](https://pages.github.com/)** - onde fica hospedado o blog e seu código-fonte.


Antes de tudo você vai precisar de duas coisas ja preparadas no seu desktop. São elas: **[Node.js](https://nodejs.org/en/)** e **[Ruby](https://www.ruby-lang.org/pt/)**, mas pra nao saírem por ai falando que nao ensino nada, aqui vai um dica rápida sobre ambos:


#### Instalando o Node.js

A intalação é feita de acordo com o seu sistema: vou ser bem superficial em relação a isso:

Para Windows e Mac, você pode fazer o download do pacote compilado por meio [desse link](https://nodejs.org/en/download/). Se o seu caso é o linux tambem tem lá o pacote do node para download, mas é relativamente *mais complicado*. Vou mostra como eu fiz:

Eu uso uma distro baseada no ubuntu; Esse procedimento irá funcionar em qualquer distro baseada no Ubuntu, assim como a minha.

A instalação que ensinarei aqui, será através do repositório do Node.js, presente no [Github](https://github.com/nodejs/node) ; Com o terminal aberto, você vai seguir os dois passos abaixo para instalar o Node através do repositório git:

- Instale todas as dependências:
<pre><code class="bash">sudo apt-get install g++ curl libssl-dev apache2-utils
sudo apt-get install git-core
</code></pre>

- Depois, rode os seguintes comandos:
<pre><code class="bash">git clone git:///github.com/nodejs/node.git
cd node
./configure
make
sudo make install
</code></pre>

Pronto tá instalado!
Para conferir se realemente está instalado, você pode rodar dois comandos a baixo:
<pre><code class="bash">node -v
v4.2.2
</code></pre>
*O primeiro comando verifica a versão node.js instalada e retorna na segunda linha a versão que encontrou;*

<pre><code class="bash">npm -v
2.14.7
</code></pre>
*O segundo comando verifica o gerenciador de pacotes do node.js e também retorna na segunda linha a versão que encontrou;*


#### Intalando o Ruby

Já fui usuário <s>Ruindows</s> Windows, no momento uso linux. A maior dificuldade que tive com o windows foi fazer com que tudo funcionasse certinho, o que nunca acontecia. Com o Node.js era relativamente fácil, mas com o ruby era quase impossível.

Se você é usuário windows, você pode baixar o instalador através do site [rubyinstaller.org](http://rubyinstaller.org/downloads/).
Tem um site que encontrei na rede que explica tudinho: desde a instalação do ruby, o devkit e até mesmo a instalção do jekyll. O site é [esse](http://jekyll-windows.juthilo.com/) (em inglês).

Se você é usuário mac, é bem certo que já venha instalado, mas recomendo atualizar!

Agora, se você é usuário linux(distros baseadas em ubuntu) vou ensinar o método que usei.

#### 1. Instalando o RVM
Primeiro, antes de tudo, precisamos instalar a chave pública do autor do RVM (Ruby Version Manager):

<pre><code class="bash">gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
</code></pre>

Antes de prosseguirmos, você precisa ter o **cURL** instalado, caso não tenha basta rodar o comando: `sudo apt-get install curl`.

Vamos instalar o RVM para caso precisarmos ter outras versões do Ruby instalado na máquina conseguirmos usar facilmente, rode o comando abaixo:

<pre><code class="bash">curl -L https://get.rvm.io | bash -s stable
</code></pre>

Se tudo ocorreu bem, agora você pode ter o RVM instalado, vamos adcionar ele ao shell, para isso adcione o comando abaixo no arquivo `.bashrc` ou `.bash_profile` na home do usuário.

Copie e cole o comando no terminal para incluir o RVM no shell:

<pre><code class="bash">PATH=$PATH:$HOME/.rvm/bin # Add RVM to PATH for scripting
[[ -s "/usr/local/rvm/scripts/rvm" ]] && source "/usr/local/rvm/scripts/rvm"
[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm"
</code></pre>

O código acima serve para que toda vez que abrirmos o terminal podermos executar comandos do RVM apenas usando o comando `rvm`.

> Caso algum comando com `rvm` não funcione daqui para frente, você deve acessar as preferências (`Edit -> Profile Preferences`) do terminal e marcar a opção para executar os comandos com login.

![editing Profile](/assets/img/tecs-do-blog-parte-1/shell.jpg)


#### 2. Instalando o Ruby

Agora vamos instala o versão do ruby que desejamos. O jekyl é o que vai rodar sobre o ruby. Ele tem, como requerimento mínimo, possuir uma versão do ruby acima de 2.0.0.
Vamos usar aqui no caso a versão 2.2.3. Para isso basta rodar os comandos a seguir:

Primeiro vamos instalar as dependências:
<pre><code class="bash">rvm install requirements</code></pre>

Segundo, iremos instalar propriamente o ruby:
<pre><code class="bash">rvm install ruby-2.2.3
</code></pre>

Terceiro setamos para o sistema usar essa versão:
<pre><code class="bash">rvm use ruby-2.2.3 --default
</code></pre>


Agora verificamos se está instalado:

<pre><code class="bash">ruby -v
# se a menssagem abaixo aparecer é poque foi instalado corretamente :)
ruby 2.2.3p173 (2015-08-18 revision 51636) [x86_64-linux]
</code></pre>
<pre><code class="bash">gem -v
# se a menssagem abaixo aparecer é poque foi instalado corretamente :)
2.4.8
</code></pre>

Prontinho!
Agora temos os node.js e ruby instalado. No Próximo post, falaremos sobre como instalar o gulp(e seus plugins) e jekyll.

Até a próxima pessoal!
