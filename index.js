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

.controller( 'PassagemServico::IndexCtrl', [ '$scope', '$parse', '$scModal', 'scToggle', 'scAlert', function($s, $parse, scModal, scToggle, scAlert) {
	$s.categoriasCtrl = { //lista base PRINCIPAL das categorias. é a lista que define quais categorias estão previamente cadastradas.
		list: [
		 { id: 1, label: 'Funcionamento', disabled: false },
		 { id: 2, label: 'Acontecimento', disabled: true },
		 { id: 3, label: 'Empréstimos', disabled: false },
		],
		novaCategoria: false,

		showOptions: function(categoria){
			categoria.showOpts = !categoria.showOpts;
		},

		new: function(categoria){
			categoria.novaCategoria = !categoria.novaCategoria;
		},

		rmv: function(index){
			this.list.splice(index, 1);
		},

		add: function(passagem, perfil){
			this.list.push({ id: this.list.length+1, label: this.newCategoria});
			if ($s.perfilCtrl.perfilNovo || perfil.edit.opened) {
				perfil.objetos.unshift({ id: perfil.objetos.length+1, label: this.newCategoria});
			} else {
				passagem.objetos.unshift({ id: passagem.objetos.length+1, label: this.newCategoria});
			};
			this.newCategoria = '';
		},

		edit: function(categoria){
			categoria.novaCategoria = true
			categoria.newCategoria = angular.copy(categoria.newCategoria, categoria.label)
		},

		disable_enable: function(categoria) {
			title: '';
			if (categoria.categoria.disabled) {
				this.title = 'Deseja reativar a categoria?'
			} else {
				this.title = 'Deseja desativar a categoria?'
			}
			scAlert.open({
				title: this.title,
				buttons: [
				{ label: 'Sim', color: 'yellow', action: function() {
				 		categoria.categoria.disabled = !categoria.categoria.disabled
					}
				},
				{ label: 'Não', color: 'gray', action: scAlert.close()
				}
				],
			})
		}
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
				obs: 'passagem 1',
				disabled: false,
			},

			{	id: 2,
				pessoa_entrou: { id: 2, nome:'Porteiro 2' },
				pessoa_saiu: { id: 3, nome: 'Porteiro 3'},
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
				obs: 'passgem 2',
				disabled: false,
			},

			{	id: 3,
				pessoa_entrou: { id: 3, nome: 'Porteiro 3' },
				pessoa_saiu: { id: 4, nome: 'Porteiro 4' },
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
				obs: 'passagem 3',
				disabled: false,
			},
		],
	};

	$s.itemCtrl = { //controlador geral das passagens (exibição de conteúdo e ações)
		params: [],
		duplicar: false,
		init: function(passagem) {
			passagem.acc = new scToggle()
			passagem.menu = new scToggle()
			passagem.notificacoes = new scToggle()
			passagem.edit = new scToggle()
			passagem.modal = new scModal()
		},

		editar: function(passagem) {
			if (!passagem.edit.opened) {
				passagem.edit.opened = true
				this.params = angular.copy(passagem)
			} else {
				passagem.edit.opened = false
			}
			console.log('form aberto?' + passagem.edit.opened)
			console.log(this.params)
			console.log(passagem)
		},

		accToggle: function(passagem) {
			if (passagem.edit.opened) {
				scAlert.open({
					title: 'Atenção!',
					messages: [
					 { msg: 'Deseja realmente cancelar a edição? Os dados não salvos serão perdidos.'}
					],
					buttons: [
					 { label: 'Sim', color: 'yellow', action: function () {
					 		passagem.edit.opened = false
					 		console.log('form aberto?' +passagem.edit.opened)
					 		}
					 },
					 { label: 'Não', color: 'gray', action: scAlert.close() }
					]
				})
			} else {
				passagem.acc.toggle()
			}
			console.log('form aberto?' + passagem.edit.opened)
			console.log('show aberto?' + passagem.acc.opened)
		},

		duplicate: function(passagem){
			$s.formCtrl.new = !$s.formCtrl.new
			this.duplicar = !this.duplicar
			this.params = angular.copy(passagem)
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

		passarServico: function(passagem) {
			angular.extend(passagem.pessoa_entrou, this.pessoa_entrou)
			passagem.status = { label: 'Realizada', color: 'green' }
			passagem.modal.close()
		},

		modalToggle: function(passagem) { // abrir/fechar modal
			this.modal.open()
			this.pessoa_entrou = passagem.pessoa_entrou
			console.log(passagem)
			console.log(this.pessoa_entrou)
		},

		disable_enable: function(passagem) {
			title: '';
			if (passagem.disabled) {
				this.title = 'Deseja reativar a passagem?'
			} else {
				this.title = 'Deseja desativar a passagem?'
			}
			scAlert.open({
				title: this.title,
				buttons: [
				 	{ label: 'Sim', color: 'yellow', action: function() {
				 		passagem.disabled = !passagem.disabled
				 		if (passagem.disabled) {
				 			passagem.status = { label: 'Desativada', color: 'red'}
				 		} else {
				 			passagem.status = { label: 'Pendente', color: 'yellow'}
				 		}
				 		}
					},
					{ label: 'Não', color: 'gray', action: scAlert.close()
					}
				]
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
					{ id: 1, label: 'Adicionar categorias/itens', checked: true },
					{ id: 2, label: 'Remover categorias/itens', checked: false },
					{ id: 3, label: 'Editar itens (nomes)', checked: true },
					{ id: 4, label: 'Editar itens (quantidade)', checked: true, },
				],
				total_permissoes: 3,
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
					{ id: 3, label: 'Editar itens (nomes)', checked: true },
					{ id: 4, label: 'Editar itens (quantidade)', checked: false, },
				],
				total_permissoes: 1,
				disabled: false,
			},
			{ id: 3,
				perfil: 'Portaria de Teste 2',
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
					{ id: 2, label: 'Remover categorias/itens', checked: true },
					{ id: 3, label: 'Editar itens (nomes)', checked: false },
					{ id: 4, label: 'Editar itens (quantidade)', checked: true, },
				],
				total_permissoes: 2,
				disabled: true,
			},
		],
		novaCategoria: false,
		perfilNovo: false, // toggle do formulário de novo perfil
		permissoesMenu: false,

		permissoesMenuToggle: function(perfil){
			perfil.permissoesMenu = !perfil.permissoesMenu
		},

		setPermissao: function(perfil, permissoes, permissao){
			permissao.checked = !permissao.checked;
			if (permissao.checked == true) {
				perfil.total_permissoes++
			} else {
			perfil.total_permissoes--
			}
		},

		total: function(perfil, permissoes, permissao){
			for (var i = 0; i<permissoes.length; i++) {
				if (permissao.checked == true) { perfil.total_permissoes++ }
			}
		},

		init: function(perfil){ // controles do perfil, para o menu e para as ações.
			perfil.edit = new scToggle()
			perfil.menu = new scToggle()
			if (perfil.edit.opened == true) {
				perfil.objetos = angular.copy(perfil.objetos)
			}
		},

		set: function(passagem) { //set do perfil, que muda o form
			if (passagem.perfil == []) { passagem.objetos = [{ id: 1}] }

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

		novoPerfil: function(perfil){
			this.perfilNovo = !this.perfilNovo;
			perfil.perfil = '';
			perfil.objetos = [];
		},

		criarCategoria: function(){ //toggle do campo de adicionador de categoria
			this.novaCategoria = !this.novaCategoria;
		},

		addCategoria: function(perfil){ //adiciona uma nova categoria à lista de objetos DO PERFIL
			perfil.objetos.unshift({id: perfil.objetos.length+1, itens: []});
		},

		removerCategoria: function(index){ //remover da lista de objetos do perfil, e não da lista principal de objetos
			perfil.objetos.splice(index, 1);
		},

		cadastrarItem: function(categoria){ //adicionador de itens
			categoria.itens.unshift({})
		},

		deleteItem: function(categoria, index){
			categoria.itens.splice(index, 1);
		},

		salvarPerfil: function(perfil){
			this.list.push({ id: this.list.length+1, perfil: perfil.perfil, objetos: perfil.objetos, disabled: false});
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
		  this.perfil = angular.copy(perfil.perfil)
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

		novaPassagem: function(){ //abrir o formulário
			this.new = !this.new;
			$s.itemCtrl.params = []
			/*if (this.new) {
				scAlert.open({
					title: 'Atenção!',
					messages: [
						{ msg: 'Deseja realmente fechar o formulário? Os dados não salvos serão perdidos.'}
					],
					buttons: [
						{ label: 'Sim', color: 'yellow', action: function() {
							this.new = !this.new
							}
						},
						{ label: 'Não', color: 'gray', action: scAlert.close() }
					]
				})
			}*/
		},

		limparForm: function(passagem) {
			scAlert.open({
				title: 'Atenção!',
				messages: [
					{ msg: 'Os dados do formulário de objetos serão perdidos. Deseja continuar?' }
				],
				buttons: [
					{ label: 'Sim', color: 'yellow', action: function(){ passagem.objetos = [] }
				  },
				  { label: 'Cancelar', color: 'gray', action: scAlert.close() }
				]
			})
		},

		init: function(passagem) {
			if ($s.itemCtrl.duplicar == true) {
				angular.extend(passagem, $s.itemCtrl.passagem)
			}

			if (Object.blank(passagem)) {
				passagem.objetos = [];
			}
		},

		alerta: function(){ //alerta ao clicar no accordion da nova passagem.
			if ($s.formCtrl.new) {
				scAlert.open({
					title: 'Atenção!',
					messages: [
						{ msg: 'Deseja realmente fechar o formulário? Todos os dados não salvos serão perdidos.'}
					],
					buttons: [
						{ label: 'Sim', color: 'yellow', action: function() {
							$s.formCtrl.new = !$s.formCtrl.new
							}
						},
						{ label: 'Não', color: 'gray', action: scAlert.close() },
					]
				})
			}
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
			var data = new Date();
			var horario = data.getHours();
			var minutos = data.getMinutes();
			var segundos = data.getSeconds();
			$s.listCtrl.list.push({ id: $s.listCtrl.list.length+1,
															pessoa_entrou: passagem.pessoa_entrou,
															pessoa_saiu: passagem.pessoa_saiu,
															data: data,
															horario: horario + ':' + minutos + ':' + segundos,
															status: { label: 'Realizada', color: 'green' },
															perfil: passagem.perfil,
															objetos: passagem.objetos,
															obs: passagem.detalhes,
															disabled: false,
														});
			this.new = !this.new
		},

		salvar: function(passagem){
			var data = new Date();
			var horario = data.getHours();
			var minutos = data.getMinutes();
			var segundos = data.getSeconds();
			if (this.new == true) {
				$s.listCtrl.list.push({ id: $s.listCtrl.list.length+1,
																pessoa_entrou: passagem.pessoa_entrou,
																pessoa_saiu: passagem.pessoa_saiu,
																data: data,
																horario: horario + ':' + minutos + ':' + segundos,
																status: { label: 'Pendente', color: 'yellow' },
																perfil: passagem.perfil,
																objetos: passagem.objetos,
																obs: passagem.obs,
																disabled: false,
															});
				this.new = !this.new
			} else {
				$s.itemCtrl.params = angular.copy(passagem)
				console.log($s.itemCtrl.params)
				console.log(passagem)
			}
			console.log($s.listCtrl.list)
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
		},

		rmv: function(index) {
			this.filtroParams.splice(index, 1)
		},

		buscaParam: function(){
			this.busca_param = this.filtro_param
			if (this.busca_param == undefined) {
				this.busca_param = ''
			}
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
