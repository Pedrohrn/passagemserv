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
	$s.oneAtAtime = true;

	$s.addItemCtrl = {
		items: [],
		addItem: function() {
	    newItemNo: this.items.length + 1;
	    this.items.push('Item ' + newItemNo);
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
		},

		newPeriodo: false,

		addPeriodo: function(){
			this.newPeriodo = !this.newPeriodo;

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

	$s.perfilCtrl = {
		perfis: [
			{ id: 1, nome: 'Portaria Social' },
			{ id: 2, nome: 'Portaria de Serviço' },
		],

		modal: new scModal(),

		init: function () {
			console.log(this.modal)
			this.modal.open()
		},
		close: function () {
			this.modal.close()
		}
	};

	$s.listCtrl = {
		list: [
			{	id: 1,
				entrou: 'Porteiro 1',
				saiu: 'Porteiro 2',
				dia: 20,
				mes: 3,
				ano: 2019,
				status: 'Pendente',
				perfil: 'Portaria Social',
				categorias: [
					{ id: 1,
						key: 'Funcionamento',
						eventosList: [
							{ id: 1, nome: 'Portão funcionando', hasQtd: true, qtd: 2 },
							{ id: 2, nome: 'Câmeras funcionando', hasQtd: true, qtd: 6 },
							{ id: 3, nome: 'Interfone funcionando', hasQtd: true, qtd: 7 },
						],
					},
					{ id: 2,
						key: 'Acontecimentos',
						eventosList: [
							{ id: 1, nome: 'Discussão ', local: 'Hall', ocorrido: 'Fulano discutiu com beltrano' },
						],
					},
					{ id: 3,
						key: 'Emprestimos',
						eventosList: [
							{ id: 1, item: 'Bola', acao: 'Devolução', unidade_pessoa: 'Apto 101', tipoPessoa: 'Morador' },
						],
					},
				],
			},

			{	id: 2,
				entrou: 'Porteiro 2',
				saiu: 'Porteiro 1',
				dia: 21,
				mes: 3,
				ano: 2019,
				status: 'Realizada',
				perfil: 'Portaria de Serviço',
				categorias: [
					{ id: 1,
						key: 'Funcionamento',
						eventosList: [
							{ id: 1, nome: 'Portão funcionando', hasQtd: true, qtd: 2 },
							{ id: 2, nome: 'Câmeras funcionando', hasQtd: true, qtd: 6 },
							{ id: 3, nome: 'Interfone funcionando', hasQtd: true, qtd: 7 },
						],
					},
					{ id: 2,
						key: 'Acontecimentos',
						eventosList: [
							{ id: 1, nome: 'Discussão ', hasQtd: false, qtd: '-', local: 'Hall', ocorrido: 'Fulano discutiu com beltrano' },
						],
					},
					{ id: 3,
						key: 'Emprestimos',
						eventosList: [
							{ id: 1, item: 'Bola', acao: 'Empréstimo', unidade_pessoa: 'Fulano - Apto 101', tipoPessoa: 'Visitante' },
						],
					},
				],
			},

			{	id: 3,
				entrou: 'Porteiro 1',
				saiu: 'Porteiro 2',
				dia: 22,
				mes: 3,
				ano: 2019,
				status: 'Realizada',
				perfil: 'Portaria Social',
				categorias: [
					{ id: 1,
						key: 'Funcionamento',
						eventosList: [
							{ id: 1, nome: 'Portão funcionando', hasQtd: true, qtd: 2 },
							{ id: 2, nome: 'Câmeras funcionando', hasQtd: true, qtd: 6 },
							{ id: 3, nome: 'Interfone ', hasQtd: true, qtd: 7 },
						],
					},
					{ id: 2,
						key: 'Acontecimentos',
						eventosList: [
							{ id: 4, nome: 'Objeto danificado', hasQtd: false, qtd: '-', local: 'Hall', ocorrido: 'Morador X quebrou o vidro da portaria' },
						],
					},
					{ id: 3,
						key: 'Empréstimos',
						eventosList: [
							{ id: 1, item: 'Bola', acao: 'Devolução', unidade_pessoa: 'Apto 201', tipoPessoa: 'Morador' },
						],
					},
				],
			},
		]
	};

	$s.accordionCtrl = {
		accOpened: false,

		openAcc: function(id) {
			this.accOpened = !this.accOpened;
		}
	};

	$s.formCtrl = {
		params: {},

		init: function(passagem) {
			obj = passagem || {}

			// usar alguma coias para copiar o obj 'passagem'
			this.newRecord = !obj.id

			if (newRecord) {
				$s.listCtrl.list.push(obj)
			} else {
				this.params = obj
			}
		}
	};

	$s.novaPassagemCtrl = {
		new: false,

		novaPassagem: function(){
			this.new = !this.new;
		}
	}

}]);
