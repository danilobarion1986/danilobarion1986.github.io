var app = angular.module("FinanceApp", []);

app.controller('DespesasCtrl', function($scope, $http) {
	$scope.data = '';
	$scope.descricao = '';
	$scope.valor = 0;
	$scope.pago = false;
	$scope.pagar = function () {
		$scope.pago = !$scope.pago;
	};
	
	$http.get("http://danilobarion1986.github.io/Data/JSON/despesas.json")
	.success(function (response) {$scope.lista_despesas = response;});
});

app.controller('ReceitasCtrl', function($scope, $http) {
	$scope.data = '';
	$scope.descricao = '';
	$scope.valor = 0;
	$scope.recebido = false;
	$scope.receber = function () {
		$scope.recebido = !$scope.recebido;
	};

	$http.get("http://danilobarion1986.github.io/Data/JSON/receitas.json")
	.success(function (response) {$scope.lista_receitas = response;});
});
