---
layout: post
title:  JSON Everywhere!
date:   2015-11-27 18:50:05 -0300
categories: web-development javascript json
---

Hoje gostaria de escrever sobre o formato de transmissão de dados JSON (_JavaScript Object Notation_).

Como o nome já diz, este padrão é baseado na mesma especificação sobre a qual a linguagem de programação Javascript é construída. (Se quiser aprofundar nos detalhes de **como uma linguagem de programação é especificada e implementada** , sugiro os links da própria página do [JSON](http://www.json.org/json-pt.html)- não me responsabilizo por sua sanidade mental! :) ).

A publicação deste formato é relativamente recente (1ª edição de Outubro de 2013), mas devido às suas qualidades e da grande difusão do _JavaScript_, principalmente por causa da _Web_, já está muito disseminado. Diversas [_API_](https://pt.wikipedia.org/wiki/Interface_de_programa%C3%A7%C3%A3o_de_aplica%C3%A7%C3%B5es)'s e [WebServices](https://pt.wikipedia.org/wiki/Web_service) já servem seus dados exclusivamente em _JSON_; outras ainda mantém a diversidade, utilizando também o _XML_, já mais consolidado.

Uma de suas grandes vantagens também é ser **independente de linguagem de programação** , principalmente por manipular estruturas de dados comuns à todas basicamente todas elas, como vetores , dicionários, hashes, mapas, registros, objetos, etc. Ela permite usar estas estruturas organizando-as em pares chave/valor, podendo misturá-las conforme for necessário.

Tudo inicia e termina com **chaves** ({}). Dentro delas são indicados seus pares chave/valor. Cada chave/valor é separado por dois pontos (:) e se encontra entre aspas (""), não sendo necessárias para números. Cada elemento de um vetor é separado por vírgula (,).

Cada chave e valor podem "ser" apenas um elemento, como um número ou uma sequência de caracteres. Mas nada impede deste também ser um vetor, com diversos elementos, ou até mesmo um **novo objeto JSON completo!**

Por exemplo, digamos que você deseja representar endereços completos no formato JSON. Uma possibilidade seria esta:

{% highlight javascript %}
     {
       "id":1,
       "endereco_completo":
       [
         {
           "tipo":"comercial",
           "tipo_logradouro":"rua",
           "nome":"da saudade",
           "numero":1234,
           "complemento":"",
           "bairro":"Nostalgia",
           "cidade":"São Paulo",
           "Estado":"SP",
           "pais":"Brasil"
         },
         {
           "tipo":"residencial",
           "tipo_logradouro":"rua",
           "nome":"do espeto",
           "numero":789,
           "complemento":"apto 1 bloco 2",
           "bairro":"Singelo",
           "cidade":"São Paulo",
           "Estado":"SP",
           "pais":"Brasil"
         }
       ]
     }
{% endhighlight %}

No exemplo acima demonstro isso. O objeto "Endereço", contém uma chave "id", com valor 1. Já o endereço, contém um vetor (afinal podemos querer armazenar mais de um endereço, certo?), e **cada elemento deste array é um objeto JSON** , com as diversas chaves/valores necessários para descrever o endereço completo.

Note que todo o vetor é apenas o valor da chave "endereco\_completo"!

Gosto muito deste padrão e não tenho dúvidas que devemos **apostar em seu aprendizado**. Claro que se você constrói sistemas que precisam se comunicar com outros que apenas "entendem" XML como formato de transmissão dos dados, não tem escapatória. Mas tornar sua aplicação _JSON-friendly_ ainda é o mais indicado, pois lhe trará grande flexibilidade no desenvolvimento, poderá usar tranquilamente o padrão [_REST_](https://pt.wikipedia.org/wiki/REST), transitará menos dados na rede (local ou não) e facilitará muito a leitura destes dados também por humanos (clientes, outros desenvolvedores e quem mais precisar).

E você, já conhecia o padrão JSON? Já utilizou em algum desenvolvimento? Qual sua opinião sobre ele?

Deixe aqui seus comentários e até o próximo post! :)
