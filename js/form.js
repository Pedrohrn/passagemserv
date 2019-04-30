angular.module('passagem-servico').lazy

.controller( 'PassagemServico::FormCtrl', [ '$scModal', 'scToggle', 'scAlert', function(scModal, scToggle, scAlert){
	var vm = this;

	vm.new = false;
	vm.params = {};
	vm.listCtrl = null;
	vm.passagem = null;
	vm.itemCtrl = null;
	vm.formularioCtrl = null;

	vm.init = function(passagem, listCtrl, itemCtrl, formularioCtrl) {
		vm.passagem = passagem
		vm.itemCtrl = itemCtrl
		vm.formularioCtrl = formularioCtrl

		vm.params = angular.copy(passagem || {});
		vm.listCtrl = listCtrl


		if (Object.blank(vm.params)) {
			vm.params.objetos = [];
			vm.new = true;
		};

		if (vm.itemCtrl.duplicar) {
			vm.params = angular.copy(vm.itemCtrl.params)
		};
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

	vm.setPerfil = function(){ //set do perfil, que muda o form
		scAlert.open({
			title: "Atenção!",
			messages: [
				{ msg: 'O perfil de passagem foi alterado, o que pode causar a perda de dados dos objetos atuais do formulário.' },
				{ msg: 'O que deseja fazer?' },
				],
			buttons: [
				{ label: "Mesclar", color: 'blue', action: function() { //mescla a lista de objetos, de acordo com as categorias. caso exista uma categoria, na lista de objetos, igual à uma categoria na lista de objetos do PERFIL (tracked by categoria.id), os itens das categorias são mesclados.
						var aux = [];
						var maior = undefined;
						var menor = undefined;
						if (Object.blank(vm.params.objetos)) {
								vm.params.perfil = angular.copy(vm.perfil)
								vm.params.objetos = angular.copy(vm.perfil.objetos)
						} else if (Object.blank(vm.params.perfil)){ //colocar mais um if aqui, pra verificar se EXISTE ALGUM PERFIL SETADO, ou se os objetos foram adicionados manualmente
								for (var i = 0; i < vm.params.objetos.length; i++) { //transfere os objetos não vazios para o array aux
									if (vm.params.objetos[i].categoria != undefined || vm.params.objetos[i].categoria != null || vm.params.objetos[i].categoria != {}) {
										aux.push(vm.params.objetos[i])
									}
								}
								vm.params.objetos = angular.copy(aux) //copia o array aux
								vm.params.perfil = angular.copy(vm.perfil) //seta o pertil da passagem
								if (vm.params.objetos.length >= vm.params.perfil.objetos.length) {
									maior = vm.params.objetos
									menor = vm.params.perfil.objetos
								} else if (vm.params.objetos.length <= vm.params.perfil.objetos.length) {
									maior = vm.params.perfil.objetos
									menor = vm.params.objetos
								}
								for (var i = 0; i < maior.length; i++) {
									for (var j = 0; j < menor.length; j++) {
										if (vm.params.objetos[i].categoria.label == vm.params.perfil.objetos[j].categoria.label) {
											vm.params.objetos[i].itens = vm.params.objetos[i].itens.concat(vm.params.perfil.objetos[j].itens)
											vm.params.perfil.objetos.remove(vm.params.perfil.objetos[j])
										}
									}
								}
								vm.params.objetos = vm.params.objetos.concat(vm.params.perfil.objetos)
						} else {
								for (var i = 0; i < vm.params.objetos.length; i++) {
									if (vm.params.objetos[i].categoria == {} || vm.params.objetos[i].categoria == null || vm.params.objetos[i].categoria == undefined) {
										vm.params.objetos.remove(vm.params.objetos[i])
									}
								}
								vm.params.perfil = angular.copy(vm.perfil)
								for (var i = 0; i < vm.params.objetos.length; i++) {
									for (var j = 0; j < vm.params.perfil.objetos.length; j++) {
										if (vm.params.objetos[i].categoria.label == vm.params.perfil.objetos[j].categoria.label && !null) {
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
						vm.params.perfil = vm.perfil
						vm.params.objetos = angular.copy(vm.params.perfil.objetos)
					},
					tooltip: 'Sobreescreve objetos/itens abaixo pelos itens do perfil selecionado.',
				},
				{ label: "Cancelar", color: 'gray', action: scAlert.close() },
			]
		})
	};

	vm.salvar = function() {

		for (var i = 0; i <= vm.params.objetos.length; i ++) {
			if (Object.blank(vm.params.objetos[i].itens) || vm.params.objetos[i].categoria == {} || !vm.params.objetos[i].categoria) {
				vm.params.objetos.remove(vm.params.objetos[i])
			}
		}

	  vm.data = new Date();

	  if (vm.new) {
	  	vm.params.objetos
	    vm.listCtrl.list.push({
	      id: vm.listCtrl.list.length+1,
	      pessoa_entrou: vm.params.pessoa_entrou,
	      pessoa_saiu: vm.params.pessoa_saiu,
	      data: vm.data,
	      data_passagem: null,
	      status: { label: 'Pendente', color: 'yellow' },
	      perfil: vm.params.perfil,
	      objetos: vm.params.objetos,
	      obs: vm.params.obs,
	      disabled: false,
	    })
	  } else if (vm.itemCtrl.duplicar && !vm.params.edit.opened) {
	    vm.params.status = { label: 'Pendente', color: 'yellow' };
	    vm.params.id = vm.listCtrl.list.length+1;
	    vm.listCtrl.list.push(vm.params)
	    vm.itemCtrl.duplicar = false
	  } else {
	    angular.extend(vm.listCtrl.list[vm.params.id-1], vm.params)
	    vm.params.edit.opened = false
	  };

	  vm.formularioCtrl.new = false
	};

	vm.salvar_passar = function() {

		for (i = 0; i < vm.params.objetos.length; i++) {
			if (Object.blank(vm.params.objetos[i].itens) || vm.params.objetos[i].categoria == null) {
				vm.params.objetos.splice(vm.params.objetos[i], 1)
			}
		}

	  vm.data = new Date();

	  if (vm.new) {
	    vm.listCtrl.list.push({
	      id: vm.listCtrl.list.length+1,
	      pessoa_entrou: vm.params.pessoa_entrou,
	      pessoa_saiu: vm.params.pessoa_saiu,
	      data: vm.data,
	      data_passagem: vm.data,
	      status: { label: 'Realizada', color: 'green' },
	      perfil: vm.params.perfil,
	      objetos: vm.params.objetos,
	      obs: vm.params.obs,
	      disabled: false,
	    })
	  } else if (vm.itemCtrl.duplicar) {
	    vm.params.status = { label: 'Realizada', color: 'green' };
	    vm.params.id = vm.listCtrl.list.length+1;
	    vm.listCtrl.list.push(vm.params)
	    vm.itemCtrl.duplicar = false
	  } else {
	    angular.extend(vm.listCtrl.list[vm.params.id-1], vm.params)
	    vm.params.edit.opened = false
	  };

	  vm.formularioCtrl.new = false
	};

	vm.categoriaCtrl = {

		setCategoria: function(objeto){
			var count = 0;
			for (var i = 0; i < vm.params.objetos.length; i++) {
				if (Object.blank(vm.params.objetos[i].categoria) || vm.params.objetos[i].categoria == undefined) {
				} else if (vm.params.objetos[i].categoria.label == objeto.categoria.label) {
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

		criarCategoria: function() {
			vm.novaCategoria = !vm.novaCategoria;
		},

		addObjeto: function() {
			vm.params.objetos.unshift({ id: vm.params.objetos.length+1, itens: [] })
		},

		removerObjeto: function(index){ //remove a categoria apenas do corpo do formulário, e não da lista principal com as categorias
			vm.params.objetos.splice(index, 1);
		},
	};

	vm.objetoItemCtrl = {

		cadastrarItem: function(objeto) {
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
	};

}]);
