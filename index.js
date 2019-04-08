app = angular.module('passagem-servico',['ngRoute', 'sc.commons.directives.modal', 'sc.commons.directives.scStopClick', 'sc.commons.factories.toggle', 'sc.commons.service.scAlert', 'sc.commons.scTopMessages', 'sc.commons.filters.nl2br' ])

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

.run(function($rootScope, scAlert, scTopMessages) {
	$rootScope.scAlert = scAlert
	$rootScope.scTopMessages = scTopMessages
})

.controller( 'PassagemServicoCtrl', [ '$scope', '$scModal', 'scToggle', 'scAlert', function($s, scModal, scToggle, scAlert) {
	$s.categoriasCtrl = { //lista base PRINCIPAL das categorias. é a lista que define quais categorias estão previamente cadastradas.
		list: [
		 { id: 1, label: 'Funcionamento' },
		 { id: 2, label: 'Acontecimento' },
		 { id: 3, label: 'Empréstimos' },
		],
		novaCategoria: false,
		showOpts: false,

		showOptions: function(categoria){
			categoria.showOpts = !categoria.showOpts;
		},

		new: function(){
			this.novaCategoria = !this.novaCategoria;
		},

		rmv: function(index){
			this.list.splice(index, 1);
			$s.perfilCtrl.objetos.splice(index, 1);
		},

		add: function(){
			this.list.push({ id: this.list.length+1, label: this.newCategoria});
			if ($s.perfilCtrl.perfilNovo) {
				$s.perfilCtrl.objetos.unshift({ id: $s.perfilCtrl.objetos.length+1, label: this.newCategoria});
			} else {
				$s.formCtrl.listCategorias.unshift({ id: $s.formCtrl.listCategorias.length+1, label: this.newCategoria});
			};
			this.newCategoria = '';
			console.log(this.list);
			console.log($s.perfilCtrl.objetos);
			console.log($s.formCtrl.listCategorias);
		},
	};

	$s.perfilCtrl = { //controlador geral dos perfis (criação, edição e gerenciamento)
		list: [
			{ id: 1,
				perfil: 'Portaria Social',
				categorias: [
					{ categoria: 'Equipamentos',
						itens: [
							{ id: 1, nome: 'Portão Funcionando', 			hasQtd: true, qtd: 4 },
							{ id: 2, nome: 'Câmeras funcionando', 		hasQtd: true, qtd: 6 },
							{ id: 3, nome: 'Interfone funcionando', 	hasQtd: true, qtd: 2 },
						],
					},
					{ categoria: 'Acontecimento',
						itens: [
							{ id: 1, nome: 'Entrada de fornecedores', hasQtd: false, qtd: 38 },
							{ id: 2, nome: 'Retirada de chaves de espaço comum', hasQtd: true, qtd: 10 },
						],
					},
				],
			},
			{ id: 2,
				perfil: 'Portaria de Serviço',
				categorias: [
					{ categoria: 'Funcionamento',
						itens: [
							{ id: 1, nome: 'Portão Funcionando',  		hasQtd: true, qtd: 10 },
							{ id: 2, nome: 'Câmeras funcionando', 		hasQtd: true, qtd: 5 },
							{ id: 3, nome: 'Interfone funcionando', 	hasQtd: true, qtd: 2 },
						],
					},
					{ categoria: 'Acontecimento',
						itens: [
							{ id: 1, nome: 'Entrada de fornecedores', hasQtd: true, qtd: 7 },
						],
					},
					{ categoria: 'Teste',
						itens: [
							{ id: 1, nome: 'Testando', hasQtd: true, qtd: 6 },
						],
					},
				],
			},
		],

		new: false,
		listCategorias: [],
		novaCategoria: false,
		itens: [],

		perfilNovo: false, // toggle do formulário de novo perfil

		current: "",

		set: function() { //set do perfil, que muda o form
			if (this.current == "") { return }
			console.log('alçsdf')

			scAlert.open({
				title: "Atenção!",
				messages: [
					{ msg: 'O perfil de passagem foi alterado, o que pode causar a perda de dados das categorias atuais do formulário.' },
					{ msg: 'O que deseja fazer?' },
					],
				buttons: [
					{ label: "Mesclar", color: 'blue', action: function() {
							$s.formCtrl.listCategorias = Object.assign($s.formCtrl.listCategorias, $s.formCtrl.listCategorias, $s.perfilCtrl.current.categorias)
						}
					},
					{
						label: "Sobreescrever", color: 'yellow', action: function() {
							$s.formCtrl.listCategorias = angular.copy($s.perfilCtrl.current.categorias)
						}
					},
					{ label: "Cancelar", color: 'gray', action: scAlert.close() },
				]
			})

			//$s.formCtrl.listCategorias = angular.copy($s.perfilCtrl.current.categorias)
		},

		novoPerfil: function(){
			this.perfilNovo = !this.perfilNovo;
		},

		criarCategoria: function(){ //toggle do campo de adicionador de categoria
			this.novaCategoria = !this.novaCategoria;
		},

		addCategoria: function(){ //adiciona uma nova categoria à lista de categorias DO PERFIL
			this.listCategorias.unshift({id: this.listCategorias.length+1, itens: []});
		},

		removerCategoria: function(index){ //remover da lista de categorias do perfil, e não da lista principal de categorias
			this.listCategorias.splice(index, 1);
		},

		cadastrarItem: function(categoria){ //adicionador de itens
			categoria.itens.unshift({})
		},

		deleteItem: function(categoria, index){
			categoria.itens.splice(index, 1);
		},

		salvarNovoPerfil: function(){
			this.list.push({ id: this.list.length+1, perfil: this.new_perfil, categorias: this.listCategorias});
			console.log(this.list);
		},

		init: function(perfil){ // init dos controles do perfil, para o menu e para as ações.
			perfil.edit = new scToggle()
			perfil.menu = new scToggle()
			if (perfil.edit.opened == true) {
				this.itens = this.list.categorias.itens;
			}
			console.log(perfil.edit.opened)
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
				pessoa_entrou: 'Porteiro 1',
				pessoa_saiu: 'Porteiro 2',
				data: 20032019,
				horario: 203031,
				status: 'Pendente',
				perfil: 'Portaria Social',
				objetos: [
					{ categoria: [ { id: 1, label: 'Funcionamento'} ],
						itens: [
							{ nome: 'Portão funcionando', hasQtd: true, qtd: 2 },
							{ nome: 'Câmeras funcionando', hasQtd: true, qtd: 6 },
							{ nome: 'Interfone funcionando', hasQtd: true, qtd: 7 },
						],
					},
					{ categoria: [ { id: 2, label: 'Acontecimento'} ],
						itens: [
							{ nome: 'Discussão ', local: 'Hall', ocorrido: 'Fulano discutiu com beltrano' },
						],
					},
					{ categoria: [ { id: 3, label: 'Empréstimos'} ],
						itens: [
							{ nome: 'Bola', acao: 'Devolução', unidade_pessoa: 'Apto 101', tipoPessoa: 'Morador' },
						],
					},
				],
				obs: 'blablablabla teste teste teste'
			},

			{	id: 2,
				pessoa_entrou: 'Porteiro 2',
				pessoa_saiu: 'Porteiro 1',
				data: 21032019,
				horario: 203031,
				status: 'Realizada',
				perfil: 'Portaria de Serviço',
				objetos: [
					{ categoria: [ { id: 1, label: 'Funcionamento'} ],
						itens: [
							{ nome: 'Portão funcionando', hasQtd: true, qtd: 2 },
							{ nome: 'Câmeras funcionando', hasQtd: true, qtd: 6 },
							{ nome: 'Interfone funcionando', hasQtd: true, qtd: 7 },
						],
					},
					{ categoria: [ { id: 2, label: 'Acontecimento'} ],
						itens: [
							{ nome: 'Discussão ', hasQtd: false, qtd: '-', local: 'Hall', ocorrido: 'Fulano discutiu com beltrano' },
						],
					},
					{ categoria: [ { id: 3, label: 'Empréstimos'} ],
						itens: [
							{ nome: 'Bola', acao: 'Empréstimo', unidade_pessoa: 'Fulano - Apto 101', tipoPessoa: 'Visitante' },
						],
					},
				],
				obs: 'teste blablaldfdskfsdkf teste'
			},

			{	id: 3,
				pessoa_entrou: 'Porteiro 1',
				pessoa_saiu: 'Porteiro 2',
				data: 22032019,
				horario: 203031,
				status: 'Realizada',
				perfil: 'Portaria Social',
				objetos: [
					{	categoria: [ { id: 1, label: 'Funcionamento'} ],
						itens: [
							{ nome: 'Portão funcionando', hasQtd: true, qtd: 2 },
							{ nome: 'Câmeras funcionando', hasQtd: true, qtd: 6 },
							{ nome: 'Interfone ', hasQtd: true, qtd: 7 },
						],
					},
					{ categoria: [ { id: 2, label: 'Acontecimento'} ],
						itens: [
							{ nome: 'Objeto danificado', hasQtd: false, qtd: '-', local: 'Hall', ocorrido: 'Morador X quebrou o vidro da portaria' },
						],
					},
					{ categoria: [ { id: 3, label: 'Empréstimos'} ],
						itens: [
							{ nome: 'Bola', acao: 'Devolução', unidade_pessoa: 'Apto 201', tipoPessoa: 'Morador' },
						],
					},
				],
				obs: 'teste lsfksdofpskakofskfs sdfopsdkfsdo teste'
			},
		],
	}

	$s.itemCtrl = { //controlador geral das passagens (exibição de conteúdo e ações)
		duplicar: false,
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

		duplicate: function(passagem){
			this.duplicar = !this.duplicar
		},
	}

	$s.formCtrl = {
		params: [],
		edit: false,
		new: false,
		newRecord: false,

		new: false,
		listCategorias: [],
		novaCategoria: false,
		itens: [],

		init: function(passagem) {
			obj = passagem || {}

			// usar alguma coias para copiar o obj 'passagem'
			this.newRecord = !obj.id

			if (this.newRecord) {
				$s.listCtrl.list.push(obj)
			} else {
				this.params = obj
			}
		},

		novaPassagem: function(){ //abrir o formulário
			this.new = !this.new;
		},

		criarCategoria: function(){
			this.novaCategoria = !this.novaCategoria;
		},

		addCategoria: function(){ //adiciona uma nova categoria à lista de categorias DO PERFIL
			this.listCategorias.unshift({id: this.listCategorias.length+1, itens: []});
		},

		removerCategoria: function(index){ //remove a categoria apenas do corpo do formulário, e não da lista principal com as categorias
			this.listCategorias.splice(index, 1);
		},

		cadastrarItem: function(categoria){
			console.log(categoria.itens)
			categoria.itens.unshift({})
		},

		deleteItem: function(categoria, index){
			categoria.itens.splice(index, 1);
		},

		salvarEPassar: function(passagem){
			$s.listCtrl.list.push({ id: $s.listCtrl.list.length+1,
															pessoa_entrou: passagem.entrando.nome,
															pessoa_saiu: passagem.saindo.nome,
															data: passagem.data,
															horario: passagem.horario,
															status: 'Realizada',
															perfil: $s.perfilCtrl.current.perfil,
															objetos: this.listCategorias,
															obs: passagem.detalhes,
														});
			console.log($s.listCtrl.list);
		},

		salvar: function(passagem){
			$s.listCtrl.list.push({ id: $s.listCtrl.list.length+1,
															pessoa_entrou: passagem.entrando.nome,
															pessoa_saiu: passagem.saindo.nome,
															data: passagem.data,
															horario: passagem.horario,
															status: 'Pendente',
															perfil: $s.perfilCtrl.current.perfil,
															objetos: passagem.listObjetos,
															obs: passagem.detalhes,
														});
			console.log($s.listCtrl.list);
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
