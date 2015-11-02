var app = angular.module('TesteJSON', []);

app.controller('TesteCtrl', function($scope, $http) {
		$scope.nome = '';
		$scope.idade = -1;
		$scope.profissao = '';
		
		$http.get("http://danilobarion1986.github.io/Data/JSON/json_teste.json")
		.success(function (response) {$scope.usuarios = response;});

		$http.get("http://danilobarion1986.github.io/Data/XML/xml_teste.xml")
		.success(function (response) {$scope.usuarios_xml = response.usuarios;});
});
