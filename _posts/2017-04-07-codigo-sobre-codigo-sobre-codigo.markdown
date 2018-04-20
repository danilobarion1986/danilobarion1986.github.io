---
layout: post
title:  "Código Sobre Código Sobre Código..."
date:   2017-04-07 21:24:12 -0300
categories: c# csharp backend metaprogramming xml
---

![source-code](https://i2.wp.com/devdanilo.files.wordpress.com/2017/04/thematrixincode99.jpg)

Olá pessoal! Andei um pouco (muito) sumido, mas não esqueci do blog não!

Desde o último post decidi que escreveria o próximo sobre algo mais técnico. Só não conseguia escolher dentre as infinitas possibilidades! Mas afinal pensei: "Esquece o perfeccionismo e escreve logo!". Então lá vai!

## Contextualizando

Recentemente, precisei desenvolver uma funcionalidade para corrigir um problema tenso de integração entre 2 sistemas. O processo anterior acontecia por meio de tabelas intermediárias e _jobs_ no banco de dados que as populavam, para que o sistema destino pudesse (por meio de outro _job_) gravar as informações nas tabelas finais! Era um processo que apesar de muito sujeito a erros, até que funcionava bem, já estava há um certo tempo em produção.

Porém, ao começar a existir alguns códigos internos divergentes entre os dois, muitos erros passaram a acontecer, inclusive no processo de vendas, que geralmente sempre geram um grande impacto, afinal "_Time is Money_"!

## Solução e Novo Desafio

Para resolver o problema, após diversas análises e sugestões, chegamos à única solução possível: alterar toda a lógica da integração e todos os processos relacionados, substituir as tabelas temporárias e _jobs_ por chamadas ao _WebService_ do sistema destino, utilizando também o código deste como "chave-primária" (que antes era gerada na origem).

Não posso descrever os detalhes do processo em si, mas em resumo, para esta solução funcionar, eu teria que montar um XML com todos os dados que seriam gravados, pois era o único parâmetro recebido pelo _WebService_. Em parte, o trabalho de criação do objeto que seria enviado e suas muuuitas propriedades (inclusive sendo algumas delas outros objetos) já estava codificado. Porém, surgiu um novo probleminha: no parâmetro a ser enviado, os campos que não estivessem preenchidos (por exemplo, o campo Complemento em um endereço) não poderiam nem fazer parte do XML.

Depois de um tempo montando diversos _if_'_s_ para verificar se cada uma das propriedades tinha valor e, caso tivesse, montando o elemento XML "na mão" e com _strings hard-coded_, parei e refleti um pouco mais... "Vou usar _Reflection_!".

## Refletindo Sobre o Código

A meta-programação sempre me chamou muito a atenção. Já havia usado um pouco em outros projetos, mas quando encarei este problema de montar um XML dinâmico, vi uma oportunidade de usar ainda mais.

Então comecei a desenvolver, desde o mais genérico e prático, até alguns detalhes que foram surgindo para lidar com casos específicos ou mesmo opções para tornar a geração ainda mais flexível. O esqueleto da classe e método foi esse:

{% gist 9c90830a9668d50eab82a9961fa7cedf %}

Portanto, ao receber qualquer objeto, que no caso seriam minhas classes já existentes, eu iria retornar uma _string_, que seria o XML dinâmico. Basicamente, teria que obter os nomes das propriedades, escrevendo aquelas que tivesse algum valor no formato de um elemento XML, ou seja, _Valor da propriedade_. Então, como percorrer as propriedades?

Assim:

{% gist 514e8cb6af2e70d849dea593f0119034 %}

Agora sim as coisas estão ficando mais interessantes! :)

Toda a "mágica" começa na linha 5, onde obtemos qual é o tipo do objeto recebido, e com isso todas as informações daquela classe e suas propriedades! Mas para isso precisamos complementar nosso código inserindo o _using_ do _namespace_ _System.Reflection_, que nos permitirá percorrer estas propriedades e usar outros métodos (linha 7 e seguintes).

Os detalhes de cada propriedade ficam contidas na classe _PropertyInfo_, que usamos dentro do _foreach_, e que nos permitirão obter seu nome e valor.

Na linha 9, verificamos se a propriedade pode ser lida (ou seja, se possui um método _get_ acessível). Caso tenha, obtemos seu nome na linha 9, pela propriedade _Name_. Também já criamos a variável _tagValue_ do tipo _dynamic_, que armazenará o valor da propriedade atual, independente de seu tipo.

Bem, a solução final tem mais alguns detalhes bem interessantes, que compartilharei no próximo(s) post(s)! Estou também preparando os arquivos com a solução completa para compartilhar no _GitHub_, vamos ver quando sai do forno!

Enquanto isso, comente o que achou até aqui! Você já usou _Reflection_? Como? Faria algo diferente do que eu fiz?

Compartilha aí! ;)
