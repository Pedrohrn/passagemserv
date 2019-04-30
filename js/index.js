angular.module('passagem-servico').lazy

.controller( 'PassagemServico::IndexCtrl', [ '$scope', '$parse', '$scModal', 'scToggle', 'scAlert', function($s, $parse, scModal, scToggle, scAlert, scTopMessages) {
	$s.viewCtrl = {
		notificarParams: [],
		notifQtd: false,

		setUser: function(membro) {
			membro.checked = !membro.checked
			if (membro.checked) {
				this.notificarParams.push(membro)
			} else {
				this.notificarParams.remove(membro)
			}
		},

		notificar: function() {
			if (this.notificarParams.length = 0) {
				this.notifQtd = false
			} else {
				this.notifQtd =  true
				scTopMessages.open({
					messages: [
						{ msg: 'Marque ao menos um usuário!'}
					],
					timeout: 5000
				})
			}
		}
	};

	$s.categoriasCtrl = { //lista base PRINCIPAL das categorias. é a lista que define quais categorias estão previamente cadastradas.
		list: [
		 { id: 1, label: 'Funcionamento', disabled: false },
		 { id: 2, label: 'Acontecimento', disabled: false },
		 { id: 3, label: 'Empréstimos', disabled: false },
		],
		novaCategoria: false,
		newCategoria: '',

		showOptions: function(objeto){
			objeto.showOpts = !objeto.showOpts;
		},

		new: function(objeto){
			objeto.novaCategoria = !objeto.novaCategoria;
			if (objeto.edit) {
				objeto.edit = false
				objeto.novaCategoria = false
			}
		},

		rmv: function(categoria){
			scAlert.open({
				title: 'Atenção!',
				messages: [
				  { msg: 'Deseja realmente excluir essa categoria? Os perfis existentes que possuem essa categoria também serão afetados. Não será possível recuperar o registro.'}
				],
				buttons: [
				  { label: 'Sim', color: 'red', action: function() {
							$s.categoriasCtrl.list.splice(categoria, 1);
						}
					},
					{ label: 'Não', color: 'gray' }
				]
			})
		},

		edit: function(objeto){
			objeto.edit = true
			this.newCategoria = angular.copy(objeto.categoria.label)
		},

		salvar: function(objeto){
			var newCat = { id: objeto.categoria.id, label: this.newCategoria, disabled: false }
			angular.extend(this.list[objeto.categoria.id-1], newCat)
			objeto.edit = false
		},

		add: function(passagem, perfil, categoria){
			categoria = { id: this.list.length+1, label: this.newCategoria, disabled: false }
			if ($s.perfilCtrl.perfilNovo) {
				this.list.push(categoria);
				perfil.objetos.unshift({ categoria: categoria, itens: [] });
			} else {
				this.list.push(categoria);
			};
			this.newCategoria = '';
			categoria.novaCategoria = false
		},

		disable_enable: function(categoria, objeto) {
			title: '';
			if (objeto.categoria.disabled) {
				this.title = 'Deseja reativar a categoria?'
			} else {
				this.title = 'Deseja desativar a categoria?'
			}
			scAlert.open({
				title: this.title,
				buttons: [
					{ label: 'Sim', color: 'yellow', action: function() {
					 		$s.categoriasCtrl.list[objeto.categoria.id-1].disabled = !$s.categoriasCtrl.list[objeto.categoria.id-1].disabled
							objeto.categoria = {}
						}
					},
					{ label: 'Não', color: 'gray' }
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
				status: { label: 'Pendente', color: 'yellow' },
				perfil: { id: 1, nome: 'Portaria Social' },
				objetos: [
					{ id: 1,
						categoria: { id: 1, label: 'Funcionamento'} ,
						itens: [
							{ nome: 'Portão funcionando', qtd: 2 },
							{ nome: 'Câmeras funcionando', qtd: 6 },
							{ nome: 'Interfone funcionando', qtd: 7 },
						],
					},
					{ id: 2,
						categoria: { id: 2, label: 'Acontecimento'} ,
						itens: [
							{ nome: 'Discussão ', qtd: 1 },
						],
					},
					{ id: 3,
						categoria: { id: 3, label: 'Empréstimos'} ,
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
				status: { label: 'Realizada', color: 'green' },
				perfil: { id: 2, nome: 'Portaria de Serviço' },
				objetos: [
					{ id: 1,
						categoria: { id: 1, label: 'Funcionamento'} ,
						itens: [
							{ nome: 'Portão funcionando', qtd: 2 },
							{ nome: 'Câmeras funcionando', qtd: 6 },
							{ nome: 'Interfone funcionando', qtd: 7 },
						],
					},
					{ id: 2,
						categoria: { id: 2, label: 'Acontecimento'} ,
						itens: [
							{ nome: 'Discussão ', qtd: 2 },
						],
					},
					{ id: 3,
						categoria: { id: 3, label: 'Empréstimos'} ,
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
				status: { label: 'Realizada', color: 'green' },
				perfil: { id: 1, nome: 'Portaria Social'},
				objetos: [
					{	id: 1,
						categoria: { id: 1, label: 'Funcionamento'} ,
						itens: [
							{ nome: 'Portão funcionando', qtd: 2 },
							{ nome: 'Câmeras funcionando', qtd: 6 },
							{ nome: 'Interfone ', qtd: 7 },
						],
					},
					{ id: 2,
						categoria: { id: 2, label: 'Acontecimento'} ,
						itens: [
							{ nome: 'Objeto danificado', qtd: 30 },
						],
					},
					{ id: 3,
						categoria: { id: 3, label: 'Empréstimos'} ,
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

		accToggle: function(passagem) {
			if (passagem.edit && passagem.edit.opened) {
				return $s.formularioCtrl.cancelar(passagem, function() { passagem.acc.toggle() })
			}
			passagem.acc.toggle()
		},

		editar: function(passagem) {
			if (passagem.edit && passagem.edit.opened) {
				scAlert.open({
					title: 'Atenção!',
					messages: [
					  { msg: 'Deseja realmente cancelar a edição? Os dados não salvos serão perdidos.' }
					],
					buttons: [
					  { label: 'Sim', color: 'yellow', action: function() { passagem.edit.close() } },
					  { label: 'Não', color: 'gray' }
					],
				})
			}
			passagem.acc.open()
			passagem.edit.open()
		},

		duplicate: function(passagem){
			$s.formularioCtrl.new = !$s.formularioCtrl.new
			this.duplicar = !this.duplicar
			this.params = angular.copy(passagem)
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
							scTopMessages.open({ messages: [{ msg: 'Registro excluído com sucesso!'}], timeout: 3000})
					}},
					{ label: 'Cancelar', color: 'gray' },
				],
			})
		},

		passarServico: function(passagem) { //abre o modal de passagem de serviço
			angular.extend(passagem.pessoa_entrou, this.pessoa_entrou)
			passagem.status = { label: 'Realizada', color: 'green' }
			passagem.disabled = false
			passagem.data_passagem = new Date()
			passagem.modal.close()
		},

		modalToggle: function(passagem) { // abrir/fechar modal
			passagem.modal.open()
			this.pessoa_entrou = angular.copy(passagem.pessoa_entrou)
		},

		disable_enable: function(passagem) { //desativa/ativa a passagem
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
					{ label: 'Não', color: 'gray' }
				]
			})
		},
	};

	$s.perfilCtrl = { //controlador geral dos perfis (criação, edição e gerenciamento)
		permissoesList: [
			{ id: 1, label: 'Adicionar categorias/itens', checked: false },
			{ id: 2, label: 'Remover categorias/itens', checked: false },
			{ id: 3, label: 'Editar itens (nomes)', checked: false },
			{ id: 4, label: 'Editar itens (quantidade)', checked: false, },
		],
		list: [
			{ id: 1,
				nome: 'Portaria Social',
				objetos: [
					{ id: 1,
						categoria: { id: 1, label: 'Funcionamento' },
						itens: [
							{ nome: 'Portão Funcionando', 		 qtd: 4 },
							{ nome: 'Câmeras funcionando', 	 qtd: 6 },
							{ nome: 'Interfone funcionando',  qtd: 2 },
						],
					},
					{ id: 2,
						categoria: { id: 2, label: 'Acontecimento' },
						itens: [
							{ nome: 'Entrada de fornecedores', qtd: 38 },
							{ nome: 'Retirada de chaves de espaço comum', qtd: 10 },
						],
					},
				],
				permissoes: [
					{ id: 1, label: 'Adicionar categorias/itens', checked: true },
					{ id: 2, label: 'Remover categorias/itens', checked: true },
					{ id: 3, label: 'Editar itens (nomes)', checked: false },
					{ id: 4, label: 'Editar itens (quantidade)', checked: true, },
				],
				permissoesTotal: 3,
				disabled: false,
			},
			{ id: 2,
				nome: 'Portaria de Serviço',
				objetos: [
					{ id: 1,
						categoria: { id: 1, label: 'Funcionamento' },
						itens: [
							{ nome: 'Portão Funcionando',  	 qtd: 10 },
							{ nome: 'Câmeras funcionando', 	 qtd: 5 },
							{ nome: 'Interfone funcionando',  qtd: 2 },
						],
					},
					{ id: 2,
						categoria: { id: 2, label: 'Acontecimento' },
						itens: [
							{ nome: 'Entrada de fornecedores', qtd: 7 },
						],
					},
					{ id: 3,
						categoria: { id: 3, label: 'Empréstimos' },
						itens: [
							{ nome: 'Testando', qtd: 6 },
						],
					},
				],
				permissoes: [
					{ id: 1, label: 'Adicionar categorias/itens', checked: false },
					{ id: 2, label: 'Remover categorias/itens', checked: true },
					{ id: 3, label: 'Editar itens (nomes)', checked: false },
					{ id: 4, label: 'Editar itens (quantidade)', checked: false, },
				],
				permissoesTotal: 1,
				disabled: false,
			},
			{ id: 3,
				nome: 'Portaria de Teste 2',
				objetos: [
					{ id: 1,
						categoria: { id: 1, label: 'Funcionamento' },
						itens: [
							{ nome: 'Portão Funcionando',  	 qtd: 10 },
							{ nome: 'Câmeras funcionando', 	 qtd: 5 },
							{ nome: 'Interfone funcionando',  qtd: 2 },
						],
					},
					{ id: 2,
						categoria: { id: 2, label: 'Acontecimento' },
						itens: [
							{ nome: 'Entrada de fornecedores', qtd: 7 },
						],
					},
					{ id: 3,
						categoria: { id: 3, label: 'Empréstimos' },
						itens: [
							{ nome: 'Testando', qtd: 6 },
						],
					},
				],
				permissoes: [
					{ id: 1, label: 'Adicionar categorias/itens', checked: false },
					{ id: 2, label: 'Remover categorias/itens', checked: true },
					{ id: 3, label: 'Editar itens (nomes)', checked: true },
					{ id: 4, label: 'Editar itens (quantidade)', checked: false, },
				],
				permissoesTotal: 2,
				disabled: true,
			},
		],
		perfilNovo: false, // toggle do formulário de novo perfil
		permissoesMenu: false,
		params: [],
		duplicar: false,

		permissoesMenuToggle: function(perfil){ //toggle da caixa de permissões de cada perfil
			perfil.permissoesMenu = !perfil.permissoesMenu
		},

		init: function(perfil){ // controles do perfil, para o menu e para as ações.
			if (Object.blank(perfil) || this.perfilNovo && !perfil.edit.opened) {
				return function() { perfil.edit.toggle() }
			};
			perfil.edit = new scToggle()
			perfil.menu = new scToggle()
			if (perfil.edit.opened) {
				this.params = angular.copy(perfil)
				this.params.permissoes = angular.copy(perfil.permissoes)
			};
		},

		novoPerfil: function(perfil){
			if (!this.perfilNovo) {
				this.perfilNovo = true;
				perfil = {
					id: this.list.length+1,
					edit: new scToggle(),
					menu: new scToggle(),
					objetos: [],
					nome: 'Novo perfil',
					permissoes: angular.copy(this.permissoesList),
					permissoesTotal: 0,
					disabled: false,
				};
				this.params = angular.copy(perfil);
			} else {
				scAlert.open({
					title: 'Atenção!',
					messages: [
					  { msg: 'Deseja realmente fechar o formulário? Os dados não salvos serão perdidos' }
					],
					buttons: [
						{ label: 'Sim', color: 'yellow', action: function() { $s.perfilCtrl.perfilNovo = false } },
						{ label: 'Não', color: 'gray' }
					]
				})

			}
		},

		setPermissao: function(perfil, permissoes, permissao){
			permissao.checked = !permissao.checked;
			if (permissao.checked) {
				perfil.permissoesTotal++
			} else {
				perfil.permissoesTotal--
			}
		},

		limparForm: function(perfil){
			scAlert.open({
				title: 'Atenção!',
				messages: [
				 	{ msg: 'Deseja realmente limpar o formulário abaixo?' }
				],
				buttons: [
					{ label: 'Sim', color: 'yellow', action: function() { perfil.objetos = [] } },
					{ label: 'Não', color: 'gray' }
				]
			})
		},

		cancelar: function(perfil, callback=null) {
			scAlert.open({
				title: 'Atenção!',
				messages: [
					{ msg: 'Deseja realmente fechar o formulário? Todos os dados não salvos serão perdidos.'}
				],
				buttons: [
				  {
				  	label: 'Sim', color: 'yellow', action: function() {
				  		if (perfil.edit.opened) {
					  		perfil.edit.opened = false
					  		angular.extend($s.perfilCtrl.list[perfil.id-1].edit, perfil.edit)
					  	} else if ($s.perfilCtrl.perfilNovo) {
					  		$s.perfilCtrl.perfilNovo = false
					  	} else {
					  		$s.perfilCtrl.perfilNovo = false
					  		$s.perfilCtrl.duplicar = false
					  	}
				  	}
					},
					{ label: 'Não', color: 'gray' }
				]
			})
		},

		setCategoria: function(perfil, objeto){
			var count = 0;
			for (var i = 0; i < perfil.objetos.length; i++) {
				if (Object.blank(perfil.objetos[i].categoria) || perfil.objetos[i].categoria == undefined) {
				} else if (perfil.objetos[i].categoria.label == objeto.categoria.label) {
					count++;
				}
			}
			if (count >= 2) {
				scAlert.open({
					title: 'Essa categoria já existe na lista!',
					buttons: [
					 	{ label: 'Ok', color: 'gray' }
					],
				})
				objeto.categoria = {}
				count = 1
			};
		},

		addCategoria: function(perfil){ //adiciona uma nova categoria à lista de objetos DO PERFIL
			perfil.objetos.unshift({itens: []});
		},

		removerObjeto: function(perfil, index){ //remover da lista de objetos do perfil, e não da lista principal de objetos
			perfil.objetos.splice(index, 1);
		},

		cadastrarItem: function(objeto){ //adicionador de itens
			if(objeto.categoria == {} || objeto.categoria == undefined || objeto.categoria == null) {
				scAlert.open({
					title: 'Selecione uma categoria primeiro!',
					buttons: [
					  { label: 'Não', color: 'gray' }
					]
				})
			} else {
				objeto.itens.unshift({})
			}
		},

		deleteItem: function(objeto, index){
			objeto.itens.splice(index, 1);
		},

		salvarPerfil: function(perfil){
			for (i = 0; i < perfil.objetos.length; i++) {
				if (Object.blank(perfil.objetos[i].itens) || perfil.objetos[i].categoria == null) {
					perfil.objetos.splice(perfil.objetos[i], 1)
				}
			}
			if (Object.blank(perfil.objetos)) {
				scAlert.open({
					title: 'Por favor, cadastre ao menos uma categoria com um item.',
					buttons: [ { label: 'Ok', color: 'gray' } ]
				})
			} else if (this.perfilNovo || this.duplicar && !perfil.edit.opened && perfil.objetos != []) {
				this.list.push({
					id: this.list.length+1,
					nome: perfil.nome,
					objetos: perfil.objetos,
					permissoes: perfil.permissoes,
					disabled: false,
					permissoesTotal: 0,
				});
				this.perfilNovo = false
				this.duplicar = false
			} else {
				angular.extend($s.perfilCtrl.list[perfil.id-1], perfil)
				perfil.edit.opened = false
				this.perfilNovo = false
				this.duplicar = false
				}
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
					{ label: 'Não', color: 'gray'}
				],
			})
		},

		duplicate: function(perfil) {
			this.duplicar = !this.duplicar
		  this.params = angular.copy(perfil)
		},

		editar: function(perfil){
			if (!perfil.edit.opened) {
				perfil.edit.opened = true
				this.params = angular.copy(perfil)
			} else if (perfil.edit.opened) {
				scAlert.open({
					title: 'Atenção!',
					messages: [
						{ msg: 'Deseja realmente fechar o formulário? Os dados não salvos serão perdidos.' }
					],
					buttons: [
						{ label: 'Sim', color: 'yellow', action: function(){ perfil.edit.opened = false } },
						{ label: 'Não', color: 'gray' }
					]
				});
			} else {
				scAlert.open({
					title: 'Atenção!',
					messages: [
					 	{ msg: 'Deseja realmente fechar o formulário? Os dados não salvos serão perdidos.' }
					],
					buttons: [
						{ label: 'Sim', color: 'yellow', action: function() {
								$s.perfilCtrl.duplicar = false
								$s.perfilCtrl.perfilNovo = false
								$s.perfilCtrl.params = []
							}
						},
						{ label: 'Não', color: 'gray' }
					]
				})
			}
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
				 { label: "Cancelar", color: 'gray' },
				]
			})
		},

		modal: new scModal(),

		modalToggle: function () { // abrir/fechar modal
			this.modal.open()
		},

		close: function () {
			if (this.perfilNovo) {
				scAlert.open({
					title: 'Atenção!',
					messages: [
					  { msg: 'Ainda existem formulários, que não foram salvos, abertos. Deseja realmente fechar?'}
					],
					buttons: [
					  { label: 'Sim', color: 'yellow', action: function() { 
					  		$s.perfilCtrl.modal.close()
					  		$s.perfilCtrl.perfilNovo = false
					  		perfil = []
					  	}
						},
					  { label: 'Não', color: 'gray'}
					]
				})
			} else {
			  this.modal.close()
			}
		},
	};

	$s.formularioCtrl = {
		new: false,

		novaPassagem: function(){ //abrir o formulário
			this.new = !this.new;
		},

		cancelar: function(passagem, callback=null) {
			scAlert.open({
				title: 'Atenção!',
				messages: [
					{ msg: 'Deseja realmente fechar o formulário? Todos os dados não salvos serão perdidos.'}
				],
				buttons: [
					{
						label: 'Sim', color: 'yellow', action: function() {
							if (passagem && passagem.edit) { passagem.edit.close() }
							if (callback != null){ callback() }
							$s.formularioCtrl.new = false
						}
					},
					{ label: 'Não', color: 'gray', action: scAlert.close() },
				]
			})
		}
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
	};

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
