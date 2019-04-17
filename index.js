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

	window.onresize = function(){
    screenWidth = window.innerWidth

    $rootScope.$apply(function(){
      $rootScope.screen = {
        isXs: screenWidth < 479,
        isSm: screenWidth > 479 && screenWidth <= 768,
        isMd: screenWidth > 768 && screenWidth <= 1024,
        isLg: screenWidth > 1024,
      }
    })
  };
  window.onresize() // iniciando 'screen'
})

.filter('buscaParam', function(){
	return function(passagens, pessoa_entrou) {
		var passagensList = [];
		for (var i=0; i<passagens.length; i++) {
			if (passagens[i].pessoa_entrou != pessoa_entrou) {
				passagensList.push(passagens[i]);
			}
		}
	}
})

.controller( 'PassagemServico::IndexCtrl', [ '$scope', '$parse', '$scModal', 'scToggle', 'scAlert', function($s, $parse, scModal, scToggle, scAlert) {
	$s.categoriasCtrl = { //lista base PRINCIPAL das categorias. é a lista que define quais categorias estão previamente cadastradas.
		list: [
		 { id: 1, label: 'Funcionamento', disabled: false },
		 { id: 2, label: 'Acontecimento', disabled: false },
		 { id: 3, label: 'Empréstimos', disabled: false },
		],
		novaCategoria: false,
		showOpts: false,

		showOptions: function(categoria){
			categoria.showOpts = !categoria.showOpts;
		},

		new: function(categoria){
			categoria.novaCategoria = !categoria.novaCategoria;
			console.log(categoria.novaCategoria)
		},

		rmv: function(index){
			this.list.splice(index, 1);
			$s.perfilCtrl.objetos.splice(index, 1);
		},

		add: function(passagem){
			this.list.push({ id: this.list.length+1, label: this.newCategoria});
			if ($s.perfilCtrl.perfilNovo) {
				$s.perfilCtrl.listObjetos.unshift({ id: $s.perfilCtrl.listObjetos.length+1, label: this.newCategoria});
			} else {
				passagem.objetos.unshift({ id: passagem.objetos.length+1, label: this.newCategoria});
			};
			this.newCategoria = '';
		},

		edit: function(categoria){
			this.new = true
			this.newCategoria = categoria.label
		},

		/*disable_enable: function(categoria) {
			title: '';
			if (categoria.disabled) {
				this.title = 'Deseja reativar a categoria?'
			} else {
				this.title = 'Deseja desativar a categoria?'
			}
			scAlert.open({
				title: this.title,
				buttons: [
				{ label: 'Sim', color: 'yellow', action: function() {
				 		categoria.disabled = !categoria.disabled
				 		console.log($s.categoriasCtrl.list)
					}
				},
				{ label: 'Não', color: 'gray', action: scAlert.close()
				}
				],
			})
		}*/
	};

	$s.listCtrl = { //lista de passagens
		list: [
			{	id: 1,
				pessoa_entrou: { id: 1, nome: 'Porteiro 1'},
				pessoa_saiu: { id: 2, nome: 'Porteiro 2'},
				data: 20032019,
				horario: 203031,
				status: { label: 'Pendente', color: 'yellow' },
				perfil: { id: 1, perfil: 'Portaria Social' },
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
							{ nome: 'Discussão ', qtd: 1 },
						],
					},
					{ categoria: { id: 3, label: 'Empréstimos'} ,
						itens: [
							{ nome: 'Bola', qtd: 3 },
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
				status: { label: 'Realizada', color: 'green' },
				perfil: { id: 2, perfil: 'Portaria de Serviço' },
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
							{ nome: 'Discussão ', qtd: 2 },
						],
					},
					{ categoria: { id: 3, label: 'Empréstimos'} ,
						itens: [
							{ nome: 'Bola', qtd: 2 },
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
				status: { label: 'Realizada', color: 'green' },
				perfil: { id: 1, perfil: 'Portaria Social'},
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
							{ nome: 'Objeto danificado', qtd: 30 },
						],
					},
					{ categoria: { id: 3, label: 'Empréstimos'} ,
						itens: [
							{ nome: 'Bola', qtd: 7 },
						],
					},
				],
				obs: 'teste lsfksdofpskakofskfs sdfopsdkfsdo teste'
			},
		],
	};

	$s.itemCtrl = { //controlador geral das passagens (exibição de conteúdo e ações)
		passagem: [],
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
			$s.formCtrl.new = !$s.formCtrl.new
			this.duplicar = !this.duplicar
			this.passagem = angular.copy(passagem)
			console.log(this.passagem)
			console.log($s.formCtrl.new)
		},

		rmv: function(passagem) {
			scAlert.open({
				title: 'Atenção!',
				messages: [
					{ msg: 'Deseja realmente excluir essa passagem? Essa ação não pode ser desfeita e o registro não poderá ser recuperado.'},
				],
				buttons: [
					{ label: 'Excluir', color: 'red', action: function() {
							$s.listCtrl.list.remove(passagem)
							scTopMessages.open("Registro excluído com sucesso!", {timeout: 3000})
					}},
					{ label: 'Cancelar', color: 'gray', action: scAlert.close() },
				],
			})
		},
	}

	$s.perfilCtrl = { //controlador geral dos perfis (criação, edição e gerenciamento)
		permissoesList: [
			{ id: 1, label: 'Adicionar categorias/itens', checked: false },
			{ id: 2, label: 'Remover categorias/itens', checked: false },
			{ id: 3, label: 'Editar itens (nomes)', checked: false },
			{ id: 4, label: 'Editar itens (quantidade)', checked: false, },
		],
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
				permissoes: [
					{ id: 1, label: 'Adicionar categorias/itens', checked: false },
					{ id: 2, label: 'Remover categorias/itens', checked: false },
					{ id: 3, label: 'Editar itens (nomes)', checked: false },
					{ id: 4, label: 'Editar itens (quantidade)', checked: false, },
				],
				total_permissoes: 0,
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
				permissoes: [
					{ id: 1, label: 'Adicionar categorias/itens', checked: false },
					{ id: 2, label: 'Remover categorias/itens', checked: false },
					{ id: 3, label: 'Editar itens (nomes)', checked: false },
					{ id: 4, label: 'Editar itens (quantidade)', checked: false, },
				],
				total_permissoes: 0,
				porteiros_podem_adicionar_itens: false,
				disabled: false,
			},
			{ id: 3,
				perfil: 'Portaria de Serviço 2',
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
				permissoes: [
					{ id: 1, label: 'Adicionar categorias/itens', checked: false },
					{ id: 2, label: 'Remover categorias/itens', checked: false },
					{ id: 3, label: 'Editar itens (nomes)', checked: false },
					{ id: 4, label: 'Editar itens (quantidade)', checked: false, },
				],
				total_permissoes: 0,
				porteiros_podem_adicionar_itens: false,
				disabled: true,
			},
		],
		listObjetos: [],
		novaCategoria: false,
		itens: [],
		perfilNovo: false, // toggle do formulário de novo perfil
		permissoesMenu: false,
		count: 0,
		perfil: [],

		permissoesMenuToggle: function(perfil){
			perfil.permissoesMenu = !perfil.permissoesMenu
		},

		setPermissao: function(perfil, permissoes, permissao){
			permissao.checked = !permissao.checked;
			for (var i = 0; i<perfil.permissoes.length; i++) {
				if (permissao.checked == true) {
					perfil.total_permissoes++
				} else {
				perfil.total_permissoes--
				}
			}
			console.log(perfil.total_permissoes)
			console.log(permissao.checked)
		},

		total: function(perfil, permissoes, permissao){
			for (var i = 0; i<permissoes.length; i++) {
				if (permissao.checked == true) { perfil.total_permissoes++ }
			}
		},

		init: function(perfil){ // init dos controles do perfil, para o menu e para as ações.
			perfil.edit = new scToggle()
			perfil.menu = new scToggle()
			if (perfil.edit.opened == true) {
				this.listObjetos = angular.copy(perfil.objetos)
				this.current = angular.copy(perfil.perfil)
			}
		},

		set: function(passagem) { //set do perfil, que muda o form
			if (passagem.perfil == []) { passagem.objetos = [{ id: 1}] }
				console.log(passagem.perfil)
			console.log(passagem.objetos)

			scAlert.open({
				title: "Atenção!",
				messages: [
					{ msg: 'O perfil de passagem foi alterado, o que pode causar a perda de dados dos objetos atuais do formulário.' },
					{ msg: 'O que deseja fazer?' },
					],
				buttons: [
					{ label: "Mesclar", color: 'blue', action: function() {
							passagem.objetos = passagem.objetos.concat(passagem.perfil.objetos)
						},
						tooltip: 'Mescla objetos/itens abaixo com os do perfil selecionado.',
					},
					{
						label: "Sobreescrever", color: 'yellow', action: function() {
							passagem.objetos = angular.copy(passagem.perfil.objetos)
						},
						tooltip: 'Sobreescreve objetos/itens abaixo pelos itens do perfil selecionado.',
					},
					{ label: "Cancelar", color: 'gray', action: scAlert.close() },
				]
			})
		},

		novoPerfil: function(){
			this.perfilNovo = !this.perfilNovo;
			this.porteiros_podem_adicionar_itens = false;
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

		salvarPerfil: function(){
			this.list.push({ id: this.list.length+1, perfil: this.new_perfil, objetos: this.listObjetos, porteiros_podem_adicionar_itens: this.porteiros_podem_adicionar_itens, disabled: false});
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

		duplicate: function(perfil) {
			this.perfilNovo = !this.perfilNovo
		  this.listObjetos = angular.copy(perfil.objetos)
		  this.new_perfil = angular.copy(perfil.perfil)
		  this.porteiros_podem_adicionar_itens = angular.copy(perfil.porteiros_podem_adicionar_itens)
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
				 { label: "Sim", color: 'yellow', action: function() { $s.perfilCtrl.list.remove(perfil) } },
				 { label: "Cancelar", color: 'gray', action: scAlert.close() },
				]
			})
		},
	};

	$s.formCtrl = {
		new: false,
		itens: [],
		current: '',

		novaPassagem: function(){ //abrir o formulário
			this.new = !this.new;
		},

		init: function(passagem) {
			if ($s.itemCtrl.duplicar == true) {
				angular.extend(passagem, $s.itemCtrl.passagem)
			}

			if (Object.blank(passagem)) {
				passagem.objetos = [];
			}
		},

		accToggle: function(passagem) {
			if (passagem.edit.opened) {
				passagem.edit.toggle()
			} else {
			passagem.acc.toggle()
			}
		},

		alerta: function(passagem){ //alerta ao clicar no accordion da nova passagem.
			scAlert.open({
				title: 'Atenção!',
				messages: [
					{ msg: 'Deseja realmente fechar o formulário? Todos os dados não salvos serão perdidos.'}
				],
				buttons: [
					{ label: 'Sim', color: 'yellow', action: function(){
						 if ($s.formCtrl.new == true) {
							$s.formCtrl.new = false
						} else {
							passagem.edit.opened = false
						}
					} },
					{ label: 'Não', color: 'gray', action: scAlert.close() },
				]
			})
		},

		criarCategoria: function(){
			this.novaCategoria = !this.novaCategoria;
		},

		addCategoria: function(passagem){ //adiciona uma nova categoria à lista de objetos DO PERFIL
			passagem.objetos.unshift({id: passagem.objetos.length+1, itens: []});
		},

		removerCategoria: function(passagem, index){ //remove a categoria apenas do corpo do formulário, e não da lista principal com as categorias
			passagem.objetos.splice(index, 1);
		},

		cadastrarItem: function(categoria){
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
															status: { label: 'Realizada', color: 'green' },
															perfil: passagem.perfil,
															objetos: passagem.objetos,
															obs: passagem.detalhes,
														});
			console.log($s.listCtrl.list)
		},

		salvar: function(passagem){
			if (this.new == true) {
				$s.listCtrl.list.push({ id: $s.listCtrl.list.length+1,
																pessoa_entrou: passagem.pessoa_entrou,
																pessoa_saiu: passagem.pessoa_saiu,
																data: new Date(),
																horario: passagem.horario,
																status: { label: 'Pendente', color: 'yellow' },
																perfil: passagem.perfil,
																objetos: passagem.objetos,
																obs: passagem.detalhes,
															});
			}
		},
	};

  $s.admCtrl = { //lista fictícia da administraçao
  	grupos: [
	  	{ id: 1,
	  		label: 'Síndico',
	  		membros: [
	  			{ id: 1, user: 'Márcio', email: 'user@usermail.com' },
	  		],
	  	},
	  	{ id: 2,
	  		label: 'Subsíndico',
	  		membros: [
	  			{ id: 1, user: 'Rafael', email: 'user@usermail.com' },
	  		],
	  	},
	  	{ id: 3,
	  		label: 'Administração',
	  		membros: [
	  			{ id: 1, user: 'Ana', email: 'user@usermail.com' },
	  			{ id: 2, user: 'Maria', email: 'user@usermail.com' },
	  			{ id: 3, user: 'Lúcio', email: 'user@usermail.com' },
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
		busca_param: '',
		filtro_param: '',

		abrirFiltroAvancado: function() {
			this.avancado = !this.avancado;
		},

		newPeriodo: function(){
			this.filtroParams.push({ data_inicial: this.newDataInicial, data_final: this.newDataFinal, tipo_data: this.newTipoData})
			console.log(this.filtroParams)
		},

		rmv: function(index) {
			this.filtroParams.splice(index, 1)
		},

		buscaParam: function(){
			this.busca_param = this.filtro_param
			if (this.busca_param == undefined) {
				this.busca_param = ''
			}
			console.log(this.busca_param)
			console.log(this.filtro_param)
		}
	}

	$s.menuAdmCtrl = { //controle de exibição do toolbar principal (gerenciamento de perfis e histórico)
		menuOpened: false,
		showMenu: function() {
			this.menuOpened = !this.menuOpened;
		},
	}

  window.onclick = function(event){
  	$('.sc-dropdown > .sc-dropdown-menu:not(.ng-hide)').each((idx, elDropDownMenu) => {
  		$s.$apply(function(){
  			elDropDown = $(elDropDownMenu).parent()

	  		scoped = angular.element(elDropDown).scope()
	  		attrValue = $(elDropDown).attr('ng-click')

	      model = $parse(attrValue); // note: $parse is injected in the ctor
	      model(scoped)
  		})
  	})

  	// $()
  }

}]);
