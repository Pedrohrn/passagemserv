angular.module('passagem-servico')

.controller( 'PassagemServico::FormCtrl', [ '$scope', '$scModal', 'scToggle', 'scAlert', function($s, scModal, scToggle, scAlert){
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
				permissoes: [],
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
				permissoes: [],
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
				permissoes: [],
				disabled: true,
			},
		],
		novaCategoria: false,
		perfilNovo: false, // toggle do formulário de novo perfil
		permissoesMenu: false,

		permissoesMenuToggle: function(perfil){
			perfil.permissoesMenu = !perfil.permissoesMenu
		},

		init: function(perfil){ // controles do perfil, para o menu e para as ações.
			perfil.edit = new scToggle()
			perfil.menu = new scToggle()
			if (perfil.edit.opened == true) {
				perfil.objetos = angular.copy(perfil.objetos)
			}
		},

		setPermissao: function(perfil, permissao){
			permissao.checked = !permissao.checked;
			if (permissao.checked) {
				perfil.permissoes.push(permissao)
			} else {
			perfil.permissoes.remove(permissao)
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
				angular.extend(passagem.pessoa_entrou, $s.itemCtrl.params.pessoa_entrou)
				console.log($s.itemCtrl.params)
				console.log(passagem)
			}
			console.log($s.listCtrl.list)
		},
	};

}]);