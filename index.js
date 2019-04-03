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
	$s.categoriasCtrl = { //lista base PRINCIPAL das categorias. é a lista que define quais categorias estão previamente cadastradas.
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
			$s.perfilCtrl.listNewCategorias.splice(index, 1);
		},

		add: function(){
			this.list.unshift({ id: this.list.length+1, label: this.newCategoria});
			$s.perfilCtrl.listNewCategorias.unshift({ id: this.list.length+1, label: this.newCategoria});
			this.newCategoria = '';
			console.log(this.list);
		},
	};

	$s.perfilCtrl = { //controlador geral dos perfis (criação, edição e gerenciamento)
		list: [
			{ id: 1,
				perfilName: 'Portaria Social',
				categorias: [
					{ id: 1,
						label: 'Funcionamento',
						eventosList: [
							{ id: 1, nome: 'Portão Funcionando', 			hasQtd: true, qtd: 4 },
							{ id: 2, nome: 'Câmeras funcionando', 		hasQtd: true, qtd: 6 },
							{ id: 3, nome: 'Interfone funcionando', 	hasQtd: true, qtd: 2 },
						],
					},
					{ id: 2,
						label: 'Acontecimento',
						eventosList: [
							{ id: 1, nome: 'Entrada de fornecedores', hasQtd: false, qtd: 0 },
							{ id: 2, nome: 'Retirada de chaves de espaço comum', hasQtd: true, qtd: 10 },
						],
					},
				],
			},
			{ id: 2,
				perfilName: 'Portaria de Serviço',
				categorias: [
					{ id: 1,
						label: 'Funcionamento',
						eventosList: [
							{ id: 1, nome: 'Porrtão Funcionando', 			hasQtd: true, qtd: 10 },
							{ id: 2, nome: 'Câmeras funcionando', 		hasQtd: true, qtd: 10 },
							{ id: 3, nome: 'Interfone funcionando', 	hasQtd: true, qtd: 10 },
						],
					},
					{ id: 2,
						label: 'Acontecimento',
						eventosList: [
							{ id: 1, nome: 'Entrada de fornecedores', hasQtd: true, qtd: 10 },
						],
					},
					{ id: 3,
						label: 'Teste',
						eventosList: [
							{ id: 1, nome: 'Testando', hasQtd: true, qtd: 10 },
						],
					},
				],
			},
		],
		categorias: [],
		novaCategoria: false,
		listNewCategorias: [],
		newItem: false,
		newItemHasQtd: false,
		newItemQtd: 0,
		itens: [],

		perfilNovo: false, // toggle do formulário de novo perfil

		novoPerfil: function(){
			this.perfilNovo = !this.perfilNovo;
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

		cadastrarItem: function(categoria){ //toggle do input de item name
			this.newItem = !this.newItem;
		},

		addItem:function(){ //adiciona um item à categoria
			this.itens.push({ id: this.itens.length+1, itemName: this.newItemName, hasQtd: this.newItemHasQtd, qtd: this.newItemQtd});
			this.newItemName = '';
			this.newItemHasQtd = false;
			this.newItemQtd = 0;
			console.log(this.itens);
		},

		deleteItem: function(index){
			this.itens.splice(index, 1);
		},

		salvarNovoPerfil: function(){
			this.list.push({ id: this.list.length+1, nome: this.newPerfilName, categorias: this.categorias});
			console.log(this.list);
		},

		init: function(perfil){ // init dos controles do perfil, para o menu e para as ações.
			perfil.edit = new scToggle()
			perfil.menu = new scToggle()
		},

		modal: new scModal(),

		modalToggle: function () { // abrir/fechar modal
			this.modal.open()
		},

		close: function () {
			this.modal.close()
		},
	}

	$s.listCtrl = { //lista de passagens
		list: [
			{	id: 1,
				entrou: 'Porteiro 1',
				saiu: 'Porteiro 2',
				data: 20032019,
				horario: 203031,
				status: 'Pendente',
				perfilName: 'Portaria Social',
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
				obs: 'blablablabla teste teste teste'
			},

			{	id: 2,
				entrou: 'Porteiro 2',
				saiu: 'Porteiro 1',
				data: 21032019,
				horario: 203031,
				status: 'Realizada',
				perfilName: 'Portaria de Serviço',
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
				obs: 'teste blablaldfdskfsdkf teste'
			},

			{	id: 3,
				entrou: 'Porteiro 1',
				saiu: 'Porteiro 2',
				data: 22032019,
				horario: 203031,
				status: 'Realizada',
				perfilName: 'Portaria Social',
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
				obs: 'teste lsfksdofpskakofskfs sdfopsdkfsdo teste'
			},
		],
	}

	$s.itemCtrl = { //controlador geral das passagens (exibição de conteúdo e ações)
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

/*		set: function(perfil){
			console.log($s.currentPerfil);
			this.currentPerfil = $s.perfilCtrl.list.copy();
		}*/
	}

	$s.novaPassagemCtrl = { //controle e exibição do cadastro de uma nova passagem
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

  $s.admCtrl = { //lista fictícia da administraçao
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

	$s.porteirosCtrl = { //lista fictícia de porteiros
		porteirosList: [
			{nome: 'Porteiro 1'},
			{nome: 'Porteiro 2'},
			{nome: 'Porteiro 3'},
			{nome: 'Porteiro 4'},
		],
	}

	$s.filtroCtrl = { //controle e exibição do filtro avançado na tela principal
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

	$s.menuAdmCtrl = { //controle de exibição do toolbar principal (gerenciamento de perfis e histórico)
		toggleMenu: function() {
			this.menuOpen = !this.menuOpen
		}
	}

}]);
