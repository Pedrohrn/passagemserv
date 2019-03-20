app = angular.module('passagem-servico',['ngRoute', 'sc.commons.directives.modal'])

.config(function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide){
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });

  app.lazy = {
    controller: $controllerProvider.register,
    directive: $compileProvider.register,
    filter: $filterProvider.register,
    factory: $provide.factory,
    service: $provide.service
  };
})

.controller( 'PassagemServicoCtrl', [ '$scope', '$scModal', function($s, scModal) {
	$s.listCtrl = {
		list: [
			{	id: 1, entrou: 'Porteiro 1', saiu: 'Porteiro 2', dia: 20, mes: 3, ano: 2019, status: 'Pendente'},
			{	id: 2, entrou: 'Porteiro 2', saiu: 'Porteiro 1', dia: 21, mes: 3, ano: 2019, status: 'Realizada'},
			{	id: 3, entrou: 'Porteiro 1', saiu: 'Porteiro 2', dia: 22, mes: 3, ano: 2019, status: 'Realizada'},
		]
	};

	$s.perfilCtrl = {
		modal: new scModal(),

		init: function () {
			console.log(this.modal)
			this.modal.open()
		},
		close: function () {
			this.modal.close()
		}
	};

	$s.formCtrl = {
		params: {},

		init: function(passagem) {
			obj = passagem || {}

			// usar alguma coias para copiar o obj 'passagem'
			this.newRecord = !obj.id

			if (newRecord) {
				$s.listCtrl.list.unshift(obj)
			} else {
				this.params = obj
			}
		}
	};

	$s.porteirosCtrl = {
		porteirosList: [
			{nome: 'Porteiro 1'},
			{nome: 'Porteiro 2'},
			{nome: 'Porteiro 3'},
			{nome: 'Porteiro 4'},
		],
	}

	$s.filtroCtrl = {
		avancado: false,

		abrirFiltroAvancado: function() {
			this.avancado = !this.avancado;
		}
	}

	$s.menuAdmCtrl = {
		menuOpen: false,

		toggleMenu: function(){
			this.menuOpen = !this.menuOpen;
		},

		perfilOpen: false,

		abrirModalPerfil: function(){
			this.perfilOpen = !this.perfilOpen;
		},

		logOpen: false,

		abrirModalLog: function(){
			this.logOpen = !this.logOpen;
		}
	}

	$s.menuPassagemCtrl = {
		menuOpen: false,

		toggleMenu: function(){
			this.menuOpen = !this.menuOpen;
		}
	}

	$s.novaPassagemCtrl = {
		new: false,

		novaPassagem: function(){
			this.new = !this.new;
		}
	}
}]);
