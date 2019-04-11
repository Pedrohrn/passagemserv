angular.module('passagem-servico')

.controller( 'PassagemServico::FormCtrl', [ '$scope', '$scModal', 'scToggle', 'scAlert', function($s, scModal, scToggle, scAlert){
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
				$s.formCtrl.listObjetos.unshift({ id: $s.formCtrl.listObjetos.length+1, label: this.newCategoria});
			};
			this.newCategoria = '';
			console.log(this.list);
			console.log($s.perfilCtrl.objetos);
			console.log($s.formCtrl.listObjetos);
		},
	};

/*	$s.perfilCtrl = { //controlador geral dos perfis (criação, edição e gerenciamento)
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
				this.listObjetos = this.listObjetos.concat(perfil.objetos)
				console.log(this.listObjetos)
			}
			console.log(perfil.edit.opened)
			console.log(perfil.objetos)
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
			this.list.push({ id: this.list.length+1, perfil: this.new_perfil, objetos: this.listObjetos, disabled: false});
			console.log(this.list);
		},

		disable_enable: function(perfil){
			perfil.disabled = !perfil.disabled;
		},

		modal: new scModal(),

		modalToggle: function () { // abrir/fechar modal
			this.modal.open()
		},

		close: function () {
			this.modal.close()
		},
	};*/

	$s.formCtrl = {
		params: [],
		edit: false,
		new: false,
		newRecord: false,

		new: false,
		listObjetos: [],
		novaCategoria: false,
		itens: [],

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
				$s.formCtrl.listObjetos == angular.copy(passagem)
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
					{ label: 'Sim', color: 'yellow', action: this.novaPassagem() },
					{ label: 'Não', color: 'gray', action: scAlert.close() },
				]
			})
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

}]);