#JavaScript
init = function(passagem) {
	if ($s.itemCtrl.duplicar == true) {
		angular.extend(passagem, $s.itemCtrl.passagem)
	}

	if (Object.blank(passagem)) {
		passagem.objetos = [];
	}
},

#Coffee
init = (passagem)->
	angular.extend(passagem, itemCtrl.passagem) if itemCtrl.duplicar
	return unless Object.blank(passagem)
	passagem.objetos = []


#Ruby
def init(passagem)
	extent(passagem, item_ctrl.passagem) if item_ctrl.duplicar
	return unless passagem.blank?
	passagem[:objetos] = []
end