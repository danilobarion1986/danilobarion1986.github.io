##Desenvolvendo em C# no Linux com .NET Core

Para começar, você precisa instalar o .NET Core SDK em seu ambiente local:

https://www.microsoft.com/net/download/linux



Clique no botão _Install .NET Core 2.1 SDK_ (versão v2.1.300 no momento da escrita deste artigo). Selecione sua distribuição Linux e execute os comandos próprios que serão exibidos nesta mesma página.

Eu utilizei a distribuição Ubuntu 18.04. sendo necessário baixar aproximadamente 377 MB em arquivos para o uso do SDK completo.



Após a instalação, você terá à disposição o comando `dotnet`, que é o seu CLI para uso do .NET Core.  Se rodar o comando dotnet --help verá uma lista dos principais comandos e opções globais do SDK.

A própria documentação da Microsoft ensina a criar seu 1º programa com a ferramenta, onde você terá uma amostra da estrutura básica de um projeto C#.



Com um simples `dotnet new console`você terá um projeto do tipo _ Console_ , que ao ser executado escreve _Hello World!_ no terminal e finaliza.

> Nas versões 1.x era necessário executar `dotnet restore` para geração dos arquivos binários e demais objetos necessários do projeto. Porém, a partir da versão 2.x o restore é executado logo após a criação do projeto, como você poderá ver no em seu terminal.



A partir deste ponto, é possível simplesmente seguir o fluxo normal que você já está acostumado, ir criando suas classes, namespaces, testes, e o que mais for necessário! Ao alterar o projeto, basta rodar ele novamente com `dotnet run` que as alterações serão recompiladas e já executadas. Se precisar incluir algum pacote para trazer funcionalidades de outros projetos, será necessário rodar o comando `dotnet restore` antes, para que os arquivos de dependências sejam atualizados corretamente. 