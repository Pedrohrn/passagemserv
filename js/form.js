angular.module('passagem-servico').lazy

.controller( 'PassagemServico::FormCtrl', [ '$scModal', 'scToggle', 'scAlert', function(scModal, scToggle, scAlert){
	var vm = this;

	vm.new = false;
	vm.params = {};
	vm.listCtrl = null;
	vm.passagem = null;

	vm.init = function(passagem, listCtrl) {
		vm.passagem = passagem

		vm.params = angular.copy(passagem || {});
		vm.listCtrl = listCtrl

		if (Object.blank(vm.params)) {
			vm.params.objetos = [];
			vm.new = true;
		}
	};

	vm.limparForm = function(){
		scAlert.open({
			title: 'Atenção!',
			messages: [
				{ msg: 'Os dados do formulário de objetos serão perdidos. Deseja continuar?' }
			],
			buttons: [
				{ label: 'Sim', color: 'yellow', action: function(){ vm.params.objetos = [] }
			  },
			  { label: 'Cancelar', color: 'gray', action: scAlert.close() }
			]
		})
	};

	vm.setCategoria = function(){
		for (var i = 0; i < vm.params.objetos.length; i++) {
			if (vm.params.objetos[i].categoria.label == categoria.categoria) {
				scAlert.open({
					title: 'Essa categoria já existe na lista! Escolha outra!',
					buttons: [
					 	{ label: 'Ok', color: 'gray' }
					],
				})
				break;
			}
		}
	}

	vm.setPerfil = function(){ //set do perfil, que muda o form
		scAlert.open({
			title: "Atenção!",
			messages: [
				{ msg: 'O perfil de passagem foi alterado, o que pode causar a perda de dados dos objetos atuais do formulário.' },
				{ msg: 'O que deseja fazer?' },
				],
			buttons: [
				{ label: "Mesclar", color: 'blue', action: function() { //mescla a lista de objetos, de acordo com as categorias. caso exista uma categoria, na lista de objetos, igual à uma categoria na lista de objetos do PERFIL (tracked by categoria.id), os itens das categorias são mesclados.
						if (Object.blank(vm.params.objetos)) {
							vm.params.objetos = angular.copy(vm.params.perfil.objetos)
						} else if (Object.blank(vm.params.perfil)){ //colocar mais um if aqui, pra verificar se EXISTE ALGUM PERFIL SETADO, ou se os objetos foram adicionados manualmente
							for (var i = 0; i < vm.params.objetos.length; i++) {
								for (var j= 0; i < vm.params.objetos.length; i++) {
									if (vm.params.objetos[i].categoria.label == vm.params.perfil.objetos[j].categoria.label) {
										vm.params.objetos[i].itens = vm.params.objetos[i].itens.concat(vm.params.perfil.objetos[j].itens)
										vm.params.perfil.objetos.remove(vm.params.perfil.objetos[j])
									}
								}
							}
							vm.params.objetos = vm.params.objetos.concat(vm.params.perfil.objetos)
						} else {
							for (var i = 0; i < vm.params.objetos.length; i++) {
								for (var j = 0; j < vm.params.perfil.objetos.length; j++) {
									if (vm.params.objetos[i].categoria.label == vm.params.perfil.objetos[j].categoria.label) {
										vm.params.objetos[i].itens = vm.params.objetos[i].itens.concat(vm.params.perfil.objetos[j].itens)
										vm.params.perfil.objetos.remove(vm.params.perfil.objetos[j])
									}
								}
							}
							vm.params.objetos = vm.params.objetos.concat(vm.params.perfil.objetos)
						}
					},
					tooltip: 'Mescla objetos/itens abaixo com os do perfil selecionado.',
				},
				{
					label: "Sobreescrever", color: 'yellow', action: function() {
						vm.params.objetos = angular.copy(vm.params.perfil.objetos)
					},
					tooltip: 'Sobreescreve objetos/itens abaixo pelos itens do perfil selecionado.',
				},
				{ label: "Cancelar", color: 'gray', action: scAlert.close() },
			]
		})
	};

	vm.salvarEPassar = function(){
		var data = new Date();
		if (vm.new || vm.duplicar && !vm.params.edit.opened) {
			vm.listCtrl.list.push({
				id: vm.listCtrl.list.length+1,
				data: data,
				data_passagem: data,
				status: { label: 'Realizada', color: 'green' },
			});
			vm.new = false
			vm.duplicar = false
		} else {
			vm.params.status = { label: 'Realizada', color: 'green'}
			angular.extend(vm.listCtrl.list[vm.params.id-1], vm.params)
			vm.params.edit.opened = false
		};
		if (vm.new) {vm.new = false}
	};

	vm.salvar = function(){
		var data = new Date();
		if (vm.new || vm.duplicar) {
			vm.listCtrl.list.push({
				id: vm.listCtrl.list.length+1,
				pessoa_entrou: vm.params.pessoa_entrou,
				pessoa_saiu: vm.params.pessoa_saiu,
				data: data,
				data_passagem: null,
				status: { label: 'Pendente', color: 'yellow' },
				perfil: vm.params.perfil,
				objetos: vm.params.objetos,
				obs: vm.params.obs,
				disabled: false,
			});
			vm.new = false;
			vm.duplicar = false;
		} else {
			angular.extend(vm.listCtrl.list[vm.params.id-1], vm.params)
			vm.params.edit.opened = false
		};
	};

	// Colocar todas as funções de categoria num objeto vm.categoriaCtrl = {}
	vm.criarCategoria = function(){
		vm.novaCategoria = !vm.novaCategoria;
	};

	vm.addCategoria = function(){ //adiciona uma nova categoria à lista de objetos DA PASSAGEM
		vm.params.objetos.unshift({ itens: []});
	};

	vm.removerObjeto = function(index){ //remove a categoria apenas do corpo do formulário, e não da lista principal com as categorias
		vm.params.objetos.splice(index, 1);
	};

	// Colocar todas as funções de item num objeto vm.objetoItemCtrl = {}
	vm.cadastrarItem = function(objeto){
		objeto.itens.unshift({})
	};

	vm.deleteItem = function(objeto, index){
		objeto.itens.splice(index, 1);
	};
}]);
