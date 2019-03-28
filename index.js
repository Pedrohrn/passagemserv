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
	oneAtAtime = true;

  $s.admCtrl = {
  	grupos: [
	  	{ id: 1,
	  		label: 'Síndico',
	  		membros: [
	  			{ id: 1, user: 'Márcio' },
	  		],
	  	},
	  	{ id: 2,
	  		label: 'Subsíndico',
	  		membros: [
	  			{ id: 1, user: 'Rafael' },
	  		],
	  	},
	  	{ id: 3,
	  		label: 'Administração',
	  		membros: [
	  			{ id: 1, user: 'Ana' },
	  			{ id: 2, user: 'Maria' },
	  			{ id: 3, user: 'Lúcio' },
	  		],
	  	},
  	],
  }

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

	$s.perfilCtrl = {
		list: [
			{ id: 1,
				nome: 'Portaria Social',
				categorias: [
					{ id: 1,
						label: 'Funcionamento',
						eventos: [
							{ nome: 'Portão Funcionando', 		hasQtd: true, qtd: 4 },
							{ nome: 'Câmeras funcionando', 		hasQtd: true, qtd: 6 },
							{ nome: 'Interfone funcionando', 	hasQtd: true, qtd: 2 },
						],
					},
					{ id: 2,
						label: 'Acontecimento',
						eventos: [
							{ nome: 'Entrada de fornecedores', hasQtd: false, qtd: 0 },
							{ nome: 'Retirada de chaves de espaço comum', hasQtd: true, qtd: 10 },
						],
					},
				],
			},
			{ id: 2,
				nome: 'Portaria de Serviço',
				categorias: [
					{ id: 1,
						label: 'Funcionamento',
						eventos: [
							{ nome: 'Portão Funcionando', 		hasQtd: true, qtd: 10 },
							{ nome: 'Câmeras funcionando', 		hasQtd: true, qtd: 10 },
							{ nome: 'Interfone funcionando', 	hasQtd: true, qtd: 10 },
						],
					},
					{ id: 2,
						label: 'Acontecimento',
						eventos: [
							{ nome: 'Entrada de fornecedores', hasQtd: true, qtd: 10 },
						],
					},
				],
			},
		],

		categorias: [
/*		 { id: 1, label: 'Funcionamento' },
		 { id: 2, label: 'Acontecimento' },
		 { id: 3, label: 'Empréstimos' },*/
		],

		modal: new scModal(),

		perfilNovo: false,

		novoPerfil: function(){
			this.perfilNovo = !this.perfilNovo;
		},

		init: function () {
			this.modal.open()
		},
		close: function () {
			this.modal.close()
		},

		menuPerfilOpen: false,

		togglePerfisMenu: function(){
			this.menuPerfilOpen = !this.menuPerfilOpen;
		}
	};

	$s.newPerfilCtrl = {
		itemList: [],
		newTitulo: '',
		showCategoriaToolbar: false,
		currentPerfil: '',
		listCategorias: $s.perfilCtrl.categorias,
		novaCategoria: false,
		itens: [],
		newItem: false,

		addItem: function() {
			this.itemList.push({id: this.newCategoria.id, 'label': this.newCategoria, 'nome': this.newItem, 'hasQtd': this.newHasQtd, 'qtd': this.newQtd});
			this.newItem = '';
			this.newCategoria = '';
			this.newHasQtd = false;
			this.newQtd = 0;
			console.log(this.itemList);
		},

		deleteItem: function(index){
			this.itemList.splice(index, 1);
		},

		salvarNovoPerfil: function(){
			$s.perfilCtrl.list.push({ id: $s.perfilCtrl.list.length+1, nome: this.newPerfilName, categorias: this.itemList});
			console.log($s.perfilCtrl.list);
		},

		toggleCategoriaToolbar: function(){
			this.showCategoriaToolbar = !this.showCategoriaToolbar;
		},

		criarCategoria: function(){
			this.newCategoria = !this.newCategoria;
		},

		addCategoria: function(){
			$s.perfilCtrl.categorias.push({id: $s.perfilCtrl.categorias.length+1, label: this.novaCategoria});
		},

		criarCategoria: function(){
			this.novaCategoria = !this.novaCategoria;
			console.log(this.novaCategoria);
		},

		addCategoria: function(){
			this.listCategorias.push({id: this.listCategorias.length+1, label: this.newCategoria});
			console.log(this.listCategorias);
		},

		removerCategoria: function(index){
			this.listCategorias.splice(index, 1);
		},

		closeAddCategoria: function(){
			this.novaCategoria = !this.novaCategoria;
		},

		cadastrarItem: function(){
			this.newItem = !this.newItem;
		},

		closeAddItem: function(){
			this.newItem = !this.newItem;
		},

		addItem:function(){
			this.itens.push({ id: this.itens.length+1, itemName: this.newItemName, hasQtd: this.newItemHasQtd, qtd: this.newItemQtd});
			this.newItemHasQtd = false;
			console.log(this.itens);
		},

		deleteItem: function(index){
			this.itens.splice(index, 1);
		},
	}

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
						label: 'Funcionamento',
						eventosList: [
							{ id: 1, nome: 'Portão funcionando', hasQtd: true, qtd: 2 },
							{ id: 2, nome: 'Câmeras funcionando', hasQtd: true, qtd: 6 },
							{ id: 3, nome: 'Interfone funcionando', hasQtd: true, qtd: 7 },
						],
					},
					{ id: 2,
						label: 'Acontecimentos',
						eventosList: [
							{ id: 1, nome: 'Discussão ', local: 'Hall', ocorrido: 'Fulano discutiu com beltrano' },
						],
					},
					{ id: 3,
						label: 'Empréstimos',
						eventosList: [
							{ id: 1, nome: 'Bola', acao: 'Devolução', unidade_pessoa: 'Apto 101', tipoPessoa: 'Morador' },
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
						label: 'Funcionamento',
						eventosList: [
							{ id: 1, nome: 'Portão funcionando', hasQtd: true, qtd: 2 },
							{ id: 2, nome: 'Câmeras funcionando', hasQtd: true, qtd: 6 },
							{ id: 3, nome: 'Interfone funcionando', hasQtd: true, qtd: 7 },
						],
					},
					{ id: 2,
						label: 'Acontecimentos',
						eventosList: [
							{ id: 1, nome: 'Discussão ', hasQtd: false, qtd: '-', local: 'Hall', ocorrido: 'Fulano discutiu com beltrano' },
						],
					},
					{ id: 3,
						label: 'Empréstimos',
						eventosList: [
							{ id: 1, nome: 'Bola', acao: 'Empréstimo', unidade_pessoa: 'Fulano - Apto 101', tipoPessoa: 'Visitante' },
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
						label: 'Funcionamento',
						eventosList: [
							{ id: 1, nome: 'Portão funcionando', hasQtd: true, qtd: 2 },
							{ id: 2, nome: 'Câmeras funcionando', hasQtd: true, qtd: 6 },
							{ id: 3, nome: 'Interfone ', hasQtd: true, qtd: 7 },
						],
					},
					{ id: 2,
						label: 'Acontecimentos',
						eventosList: [
							{ id: 4, nome: 'Objeto danificado', hasQtd: false, qtd: '-', local: 'Hall', ocorrido: 'Morador X quebrou o vidro da portaria' },
						],
					},
					{ id: 3,
						label: 'Empréstimos',
						eventosList: [
							{ id: 1, nome: 'Bola', acao: 'Devolução', unidade_pessoa: 'Apto 201', tipoPessoa: 'Morador' },
						],
					},
				],
			},
		],

		menuOpen: false,

		toggleMenu: function(){
			this.menuOpen = !this.menuOpen;
		}
	};

	$s.accordionCtrl = {
		accOpened: false,
		showNotificacoes: false,

		openAcc: function() {
			this.accOpened = !this.accOpened;
		},

		displayNotificacoes: function(){
			this.showNotificacoes = !this.showNotificacoes;
		},

	};

	$s.formCtrl = {
		params: [],

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
		currentPerfil: '',
		listCategorias: $s.perfilCtrl.categorias,
		novaCategoria: false,
		itens: [],
		newItem: false,
		itensTamanho: false,

		tamanhos: function(){
			if (this.itens.length > 0){
				this.itensTamanho = !this.itensTamanho;
			};
		},

		novaPassagem: function(){
			this.new = !this.new;
		},

		criarCategoria: function(){
			this.novaCategoria = !this.novaCategoria;
			console.log(this.novaCategoria);
		},

		addCategoria: function(){
			this.listCategorias.push({id: this.listCategorias.length+1, label: this.newCategoria});
			console.log(this.listCategorias);
		},

		removerCategoria: function(index){
			this.listCategorias.splice(index, 1);
		},

		closeAddCategoria: function(){
			this.novaCategoria = !this.novaCategoria;
		},

		cadastrarItem: function(){
			this.newItem = !this.newItem;
		},

		closeAddItem: function(){
			this.newItem = !this.newItem;
		},

		addItem:function(){
			this.itens.push({ id: this.itens.length+1, itemName: this.newItemName, hasQtd: this.newItemHasQtd, qtd: this.newItemQtd});
			this.newItemHasQtd = false;
			console.log(this.itens);
		},

		deleteItem: function(index){
			this.itens.splice(index, 1);
		},
	}

}]);
