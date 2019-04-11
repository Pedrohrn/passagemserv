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

.controller( 'PassagemServico::IndexCtrl', [ '$scope', '$scModal', 'scToggle', 'scAlert', function($s, scModal, scToggle, scAlert) {
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
				$s.perfilCtrl.listObjetos.unshift({ id: $s.perfilCtrl.listObjetos.length+1, label: this.newCategoria});
			} else {
				$s.formCtrl.listObjetos.unshift({ id: $s.formCtrl.listObjetos.length+1, label: this.newCategoria});
			};
			this.newCategoria = '';
			console.log(this.list);
			console.log($s.formCtrl.listObjetos);
		},
	};

	$s.listCtrl = { //lista de passagens
		list: [
			{	id: 1,
				pessoa_entrou: { id: 1, nome: 'Porteiro 1'},
				pessoa_saiu: { id: 2, nome: 'Porteiro 2'},
				data: 20032019,
				horario: 203031,
				status: 'Pendente',
				perfil: 'Portaria Social',
				objetos: [
					{ categoria: { id: 1, label: 'Funcionamento'} ,
						itens: [
							{ nome: 'Portão funcionando', qtd: 2 },
							{ nome: 'Câmeras funcionando', qtd: 6 },
							{ nome: 'Interfone funcionando', qtd: 7 },
						],
					},
					{ categoria: { id: 2, label: 'Acontecimento'} ,
						itens: [
							{ nome: 'Discussão ', local: 'Hall', ocorrido: 'Fulano discutiu com beltrano' },
						],
					},
					{ categoria: { id: 3, label: 'Empréstimos'} ,
						itens: [
							{ nome: 'Bola', acao: 'Devolução', unidade_pessoa: 'Apto 101', tipoPessoa: 'Morador' },
						],
					},
				],
				obs: 'blablablabla teste teste teste'
			},

			{	id: 2,
				pessoa_entrou: { id: 2, nome:'Porteiro 2' },
				pessoa_saiu: { id: 1, nome: 'Porteiro 1'},
				data: 21032019,
				horario: 203031,
				status: 'Realizada',
				perfil: 'Portaria de Serviço',
				objetos: [
					{ categoria: { id: 1, label: 'Funcionamento'} ,
						itens: [
							{ nome: 'Portão funcionando', qtd: 2 },
							{ nome: 'Câmeras funcionando', qtd: 6 },
							{ nome: 'Interfone funcionando', qtd: 7 },
						],
					},
					{ categoria: { id: 2, label: 'Acontecimento'} ,
						itens: [
							{ nome: 'Discussão ', qtd: '-', local: 'Hall', ocorrido: 'Fulano discutiu com beltrano' },
						],
					},
					{ categoria: { id: 3, label: 'Empréstimos'} ,
						itens: [
							{ nome: 'Bola', acao: 'Empréstimo', unidade_pessoa: 'Fulano - Apto 101', tipoPessoa: 'Visitante' },
						],
					},
				],
				obs: 'teste blablaldfdskfsdkf teste'
			},

			{	id: 3,
				pessoa_entrou: { id: 1, nome: 'Porteiro 1' },
				pessoa_saiu: { id: 2, nome: 'Porteiro 2' },
				data: 22032019,
				horario: 203031,
				status: 'Realizada',
				perfil: 'Portaria Social',
				objetos: [
					{	categoria: { id: 1, label: 'Funcionamento'} ,
						itens: [
							{ nome: 'Portão funcionando', qtd: 2 },
							{ nome: 'Câmeras funcionando', qtd: 6 },
							{ nome: 'Interfone ', qtd: 7 },
						],
					},
					{ categoria: { id: 2, label: 'Acontecimento'} ,
						itens: [
							{ nome: 'Objeto danificado', qtd: '-', local: 'Hall', ocorrido: 'Morador X quebrou o vidro da portaria' },
						],
					},
					{ categoria: { id: 3, label: 'Empréstimos'} ,
						itens: [
							{ nome: 'Bola', acao: 'Devolução', unidade_pessoa: 'Apto 201', tipoPessoa: 'Morador' },
						],
					},
				],
				obs: 'teste lsfksdofpskakofskfs sdfopsdkfsdo teste'
			},
		],
	};

	$s.perfilCtrl = { //controlador geral dos perfis (criação, edição e gerenciamento)
		list: [
			{ id: 1,
				perfil: 'Portaria Social',
				objetos: [
					{ categoria: { id: 1, label: 'Funcionamento' },
						itens: [
							{ nome: 'Portão Funcionando', 		 qtd: 4 },
							{ nome: 'Câmeras funcionando', 	 qtd: 6 },
							{ nome: 'Interfone funcionando',  qtd: 2 },
						],
					},
					{ categoria: { id: 2, label: 'Acontecimento' },
						itens: [
							{ nome: 'Entrada de fornecedores', qtd: 38 },
							{ nome: 'Retirada de chaves de espaço comum', qtd: 10 },
						],
					},
				],
				porteiros_podem_adicionar_itens: true,
				disabled: false,
			},
			{ id: 2,
				perfil: 'Portaria de Serviço',
				objetos: [
					{ categoria: { id: 1, label: 'Funcionamento' },
						itens: [
							{ nome: 'Portão Funcionando',  	 qtd: 10 },
							{ nome: 'Câmeras funcionando', 	 qtd: 5 },
							{ nome: 'Interfone funcionando',  qtd: 2 },
						],
					},
					{ categoria: { id: 2, label: 'Acontecimento' },
						itens: [
							{ nome: 'Entrada de fornecedores', qtd: 7 },
						],
					},
					{ categoria: { id: 3, label: 'Empréstimos' },
						itens: [
							{ nome: 'Testando', qtd: 6 },
						],
					},
				],
				porteiros_podem_adicionar_itens: false,
				disabled: false,
			},
			{ id: 3,
				perfil: 'Portaria de Serviço desativada',
				objetos: [
					{ categoria: { id: 1, label: 'Funcionamento' },
						itens: [
							{ nome: 'Portão Funcionando',  	 qtd: 10 },
							{ nome: 'Câmeras funcionando', 	 qtd: 5 },
							{ nome: 'Interfone funcionando',  qtd: 2 },
						],
					},
					{ categoria: { id: 2, label: 'Acontecimento' },
						itens: [
							{ nome: 'Entrada de fornecedores', qtd: 7 },
						],
					},
					{ categoria: { id: 3, label: 'Empréstimos' },
						itens: [
							{ nome: 'Testando', qtd: 6 },
						],
					},
				],
				porteiros_podem_adicionar_itens: false,
				disabled: true,
			},
		],
		new: false,
		listObjetos: [],
		novaCategoria: false,
		itens: [],

		perfilNovo: false, // toggle do formulário de novo perfil

		current: "",

		init: function(perfil){ // init dos controles do perfil, para o menu e para as ações.
			perfil.edit = new scToggle()
			perfil.menu = new scToggle()
			if (perfil.edit.opened == true) {
				this.listObjetos = angular.copy(perfil.objetos)
				this.current = angular.copy(perfil.perfil)
				console.log(this.listObjetos)
			}
			console.log(this.listObjetos)
		},

		set: function() { //set do perfil, que muda o form
			if (this.current == "") { return }
			console.log('alçsdf')

			scAlert.open({
				title: "Atenção!",
				messages: [
					{ msg: 'O perfil de passagem foi alterado, o que pode causar a perda de dados dos objetos atuais do formulário.' },
					{ msg: 'O que deseja fazer?' },
					],
				buttons: [
					{ label: "Mesclar", color: 'blue', action: function() {
							$s.formCtrl.listObjetos = $s.formCtrl.listObjetos.concat($s.perfilCtrl.current.objetos)
						},
						tooltip: 'Mescla objetos/itens abaixo com os do perfil selecionado.',
					},
					{
						label: "Sobreescrever", color: 'yellow', action: function() {
							$s.formCtrl.listObjetos = angular.copy($s.perfilCtrl.current.objetos)
						},
						tooltip: 'Sobreescreve objetos/itens abaixo pelos itens do perfil selecionado.',
					},
					{ label: "Cancelar", color: 'gray', action: scAlert.close() },
				]
			})

			//$s.formCtrl.listObjetos = angular.copy($s.perfilCtrl.current.objetos)
		},

		novoPerfil: function(){
			this.perfilNovo = !this.perfilNovo;
			this.new_perfil = '';
			this.listObjetos = [];
		},

		criarCategoria: function(){ //toggle do campo de adicionador de categoria
			this.novaCategoria = !this.novaCategoria;
		},

		addCategoria: function(){ //adiciona uma nova categoria à lista de objetos DO PERFIL
			this.listObjetos.unshift({id: this.listObjetos.length+1, itens: []});
		},

		removerCategoria: function(index){ //remover da lista de objetos do perfil, e não da lista principal de objetos
			this.listObjetos.splice(index, 1);
		},

		cadastrarItem: function(categoria){ //adicionador de itens
			categoria.itens.unshift({})
		},

		deleteItem: function(categoria, index){
			categoria.itens.splice(index, 1);
		},

		salvarNovoPerfil: function(){
			this.list.push({ id: this.list.length+1, perfil: this.new_perfil, objetos: this.listObjetos, porteiros_podem_adicionar_itens: this.porteiros_podem_adicionar_itens, disabled: false});
			console.log(this.list);
		},

		disable_enable: function(perfil){
			title: '';
			if (perfil.disabled) {
				this.title = 'Deseja reativar o perfil?'
			} else {
				this.title = 'Deseja desativar o perfil?'
			}
			scAlert.open({
				title: this.title,
				buttons: [
					{ label: 'Sim', color: 'yellow', action: function() {
						perfil.disabled = !perfil.disabled;
					},},
					{ label: 'Não', color: 'gray', action: scAlert.close()}
				],
			})
		},

		modal: new scModal(),

		modalToggle: function () { // abrir/fechar modal
			this.modal.open()
		},

		close: function () {
			this.modal.close()
		},

		rmv: function(perfil) {
			scAlert.open({
				title: "Atenção!",
				messages: [
					{ msg: 'Deseja realmente excluir este perfil? Essa ação não pode ser desfeita e o registro não poderá ser recuperado.' },
					{ msg: 'As passagens cadastradas anteriormente não serão afetadas, a menos que sejam editadas manualmente pelo usuário.' },
				],
				buttons: [
				 { label: "Sim", color: 'yellow', action: function(perfil) { $s.perfilCtrl.list.splice(perfil, 1) } },
				 { label: "Cancelar", color: 'gray', action: scAlert.close() },
				]
			})
		},
	};

	$s.formCtrl = {
		params: [],
		edit: false,
		new: false,
		newRecord: false,

		new: false,
		listObjetos: [],
		novaCategoria: false,
		itens: [],
		current: '',

		novaPassagem: function(){ //abrir o formulário
			this.new = !this.new;
		},

		/*init: function(passagem) {
			obj = passagem || {}

			// usar alguma coias para copiar o obj 'passagem'
			this.newRecord = !obj.id

			if (this.newRecord) {
				$s.listCtrl.list.push(obj)
			} else {
				this.params = obj
			}
		},*/

		init: function(passagem) {
			passagem.acc = new scToggle()
			passagem.menu = new scToggle()
			passagem.notificacoes = new scToggle()
			passagem.edit = new scToggle()
			if (!passagem.id) {this.accToggle(passagem) }
			if (passagem.edit.opened == true) {
				$s.formCtrl.listObjetos = angular.copy(passagem)
			}
		},

		accToggle: function(passagem) {
			passagem.acc.toggle()
			if (!passagem.id) { passagem.edit.toggle() }
		},

		alerta: function(){ //alerta ao clicar no accordion da nova passagem.
			scAlert.open({
				title: 'Atenção!',
				messages: [
					{ msg: 'Deseja realmente fechar o formulário? Todos os dados não salvos serão perdidos.'}
				],
				buttons: [
					{ label: 'Sim', color: 'yellow', action: function(){
						this.new = !this.new;
					} },
					{ label: 'Não', color: 'gray', action: scAlert.close() },
				]
			})
			console.log(this.new);
		},

		criarCategoria: function(){
			this.novaCategoria = !this.novaCategoria;
		},

		addCategoria: function(){ //adiciona uma nova categoria à lista de objetos DO PERFIL
			this.listObjetos.unshift({id: this.listObjetos.length+1, itens: []});
			console.log(this.listObjetos);
		},

		removerCategoria: function(index){ //remove a categoria apenas do corpo do formulário, e não da lista principal com as categorias
			this.listObjetos.splice(index, 1);
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
															pessoa_entrou: passagem.pessoa_entrou,
															pessoa_saiu: passagem.pessoa_saiu,
															data: new Date(),
															horario: passagem.horario,
															status: 'Realizada',
															perfil: $s.perfilCtrl.current.perfil,
															objetos: this.listObjetos,
															obs: passagem.detalhes,
														});
			console.log($s.listCtrl.list);
		},

		salvar: function(passagem){
			if (this.new == true) {
				$s.listCtrl.list.push({ id: $s.listCtrl.list.length+1,
																pessoa_entrou: passagem.pessoa_entrou,
																pessoa_saiu: passagem.pessoa_saiu,
																data: new Date(),
																horario: passagem.horario,
																status: 'Pendente',
																perfil: $s.perfilCtrl.current.perfil,
																objetos: this.listObjetos,
																obs: passagem.detalhes,
															});
				console.log($s.listCtrl.list);
			}
		},
	};

	$s.itemCtrl = { //controlador geral das passagens (exibição de conteúdo e ações)
		duplicar: false,
		new: false,
		duplicata: [],
		init: function(passagem) {
			passagem.acc = new scToggle()
			passagem.menu = new scToggle()
			passagem.notificacoes = new scToggle()
			passagem.edit = new scToggle()
			if (!passagem.id) { this.accToggle(passagem) }
			if (passagem.edit.opened == true) {
				$s.formCtrl.listObjetos = angular.copy(passagem)
			}

		},

		novaPassagem: function(){ //abrir o formulário
			this.new = !this.new;
		},


		accToggle: function(passagem) {
			passagem.acc.toggle()
			if (!passagem.id) { passagem.edit.toggle() }
		},

		duplicate: function(passagem){
			$s.formCtrl.novaPassagem()
			this.duplicar = !this.duplicar
			this.duplicata = angular.copy(passagem)
			console.log(this.duplicata)
			console.log($s.formCtrl.listObjetos);
		},

		rmv: function() {
			scAlert.open({
				title: 'Atenção!',
				messages: [
					{ msg: 'Deseja realmente excluir essa passagem? Essa ação não pode ser desfeita e o registro não poderá ser recuperado.'},
				],
				buttons: [
					{ label: 'Excluir', color: 'red', action: function(index) {
							$s.listCtrl.list.splice(index, 1);
					}},
					{ label: 'Cancelar', color: 'gray', action: scAlert.close() },
				],
			})
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
			{ id: 1, nome: 'Porteiro 1'},
			{ id: 2, nome: 'Porteiro 2'},
			{ id: 3, nome: 'Porteiro 3'},
			{ id: 4, nome: 'Porteiro 4'},
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
