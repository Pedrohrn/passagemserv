app = angular.module('passagem-servico',['ngRoute', 'sc.commons.directives.modal', 'sc.commons.directives.scStopClick', 'sc.commons.factories.toggle'])

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

.controller( 'PassagemServicoCtrl', [ '$scope', '$scModal', 'scToggle', function($s, scModal, scToggle) {
	$s.categoriasCtrl = {
		list: [
		 { id: 1, label: 'Funcionamento' },
		 { id: 2, label: 'Acontecimento' },
		 { id: 3, label: 'Empréstimos' },
		],
		novaCategoria: false,
		showOpts: false,

		showOptions: function(){
			this.showOpts = !this.showOpts;
		},

		new: function(){
			this.novaCategoria = !this.novaCategoria;
		},

		rmv: function(index){
			this.list.splice(index, 1);
			$s.newPerfilCtrl.listNewCategorias.splice(index, 1);
		},

		add: function(){
			this.list.unshift({ id: this.list.length+1, label: this.newCategoria});
			this.newCategoria = '';
			console.log(this.list);
		},
	};

	$s.perfilCtrl = {
		list: [
			{ id: 1,
				nome: 'Portaria Social',
				categorias: [
					{ id: 1,
						label: 'Funcionamento',
						eventosList: [
							{ nome: 'Portão Funcionando', 		hasQtd: true, qtd: 4 },
							{ nome: 'Câmeras funcionando', 		hasQtd: true, qtd: 6 },
							{ nome: 'Interfone funcionando', 	hasQtd: true, qtd: 2 },
						],
					},
					{ id: 2,
						label: 'Acontecimento',
						eventosList: [
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
						eventosList: [
							{ nome: 'Portão Funcionando', 		hasQtd: true, qtd: 10 },
							{ nome: 'Câmeras funcionando', 		hasQtd: true, qtd: 10 },
							{ nome: 'Interfone funcionando', 	hasQtd: true, qtd: 10 },
						],
					},
					{ id: 2,
						label: 'Acontecimento',
						eventosList: [
							{ nome: 'Entrada de fornecedores', hasQtd: true, qtd: 10 },
						],
					},
				],
			},
		],

		modal: new scModal(),

		perfilNovo: false,

		novoPerfil: function(){
			this.perfilNovo = !this.perfilNovo;
		},

		modalToggle: function () {
			this.modal.open()
		},

		init: function(perfil){
			perfil.edit = new scToggle()
			perfil.menu = new scToggle()
		},

		close: function () {
			this.modal.close()
		},

		menuPerfilOpen: false,

		togglePerfisMenu: function(){
			this.menuPerfilOpen = !this.menuPerfilOpen;
		},
	}

	$s.newPerfilCtrl = {
		categorias: [],
		listNewCategorias: [],
		novaCategoria: false,
		itens: [],
		newItem: false,

		salvarNovoPerfil: function(){
			$s.perfilCtrl.list.push({ id: $s.perfilCtrl.list.length+1, nome: this.newPerfilName, categorias: this.categorias});
			console.log($s.perfilCtrl.list);
		},

		criarCategoria: function(){ //toggle do campo de adicionador de categoria
			this.novaCategoria = !this.novaCategoria;
			console.log(this.novaCategoria);
		},

		addCategoria: function(){ //adiciona uma nova categoria à lista de categorias DO PERFIL
			this.listNewCategorias.push({id: this.listNewCategorias.length+1, label: this.newCategoria});
			console.log(this.listNewCategorias);
		},

		removerCategoria: function(index){ //remover da lista de categorias do perfil, e não da lista principal de categorias
			this.listNewCategorias.splice(index, 1);
		},

		cadastrarItem: function(){
			this.newItem = !this.newItem;
		},

		addItem:function(){
			this.itens.push({ id: this.itens.length+1, itemName: this.newItemName, hasQtd: this.newItemHasQtd, qtd: this.newItemQtd});
			this.newItemName = '';
			this.newItemHasQtd = false;
			this.newItemQtd = 0;
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
				data: 20032019,
				horario: 203031,
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
				data: 21032019,
				horario: 203031,
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
				data: 22032019,
				horario: 203031,
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
	}

	$s.itemCtrl = {
		init: function(passagem) {
			passagem.acc = new scToggle()
			passagem.menu = new scToggle()
			passagem.notificacoes = new scToggle()
			passagem.edit = new scToggle()
			if (!passagem.id) { this.accToggle(passagem) }
		},

		accToggle: function(passagem) {
			passagem.acc.toggle()
			if (!passagem.id) { passagem.edit.toggle() }
		},
	}

	$s.formCtrl = {
		params: [],
		edit: false,
		new: false,
		newRecord: false,

		init: function(passagem) {
			this.obj = passagem || {}

			// usar alguma coias para copiar o obj 'passagem'
			this.newRecord = !obj.id

			if (newRecord) {
				$s.listCtrl.list.push(obj)
			} else {
				this.params = obj
			}
		},

		set: function(perfil){
			console.log($s.currentPerfil);
			this.currentPerfil = $s.perfilCtrl.list.copy();
		}
	}

	$s.novaPassagemCtrl = {
		new: false,
		listCategorias: [],
		novaCategoria: false,
		itens: [],
		newItem: false,
		itensTamanho: false,
		newItemHasQtd: false,

		novaPassagem: function(){ //abrir o formulário
			this.new = !this.new;
		},

		tamanhos: function(){ //função para exibir a linha de títulos somente se a lista tiver algum elemento.
			if (this.itens.length > 0){
				this.itensTamanho = !this.itensTamanho;
			};
			console.log(itensTamanho);
		},

		criarCategoria: function(){
			this.novaCategoria = !this.novaCategoria;
			console.log(this.novaCategoria);
		},

		addCategoria: function(){
			this.listCategorias.push({id: this.listCategorias.length+1, label: this.newCategoria});
			console.log(this.listCategorias);
		},

		removerCategoria: function(index){ //remove a categoria apenas do corpo do formulário, e não da lista principal com as categorias
			this.listCategorias.splice(index, 1);
		},

		cadastrarItem: function(){
			this.newItem = !this.newItem;
		},

		addItem:function(){
			if (this.newItemHasQtd == false) {
				this.newItemQtd = 0;
			};
			this.itens.push({ id: this.itens.length+1, itemName: this.newItemName, hasQtd: this.newItemHasQtd, qtd: this.newItemQtd});
			console.log(this.itens);
		},

		deleteItem: function(index){
			this.itens.splice(index, 1);
		},
	}

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
		filtroParams: [],
		count: 0,

		abrirFiltroAvancado: function() {
			this.avancado = !this.avancado;
		},

		newFiltroPeriodo: false,

		addPeriodo: function(){
			this.newFiltroPeriodo = !this.newFiltroPeriodo;
		},

		newPeriodo: function(){
			this.filtroParams.push({dataInicial: this.newDataInicial, dataFinal: this.newDataFinal, tipoData: this.newTipoData});
			this.newDataFinal = '';
			this.newDataInicial = '';
			this.newTipoData = '';
		},
	}

	$s.menuAdmCtrl = {
		toggleMenu: function() {
			this.menuOpen = !this.menuOpen
		}
	}

}]);
