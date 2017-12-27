var $ro = jQuery.noConflict();

$ro(document).ready(function(){
	$ro('#sortable').sortable({
		update: function(event, ui){
			var order = $ro(this).sortable('toArray').toString().split(',').clean('');
			menu = order_categories(menu, order);
			console.log(menu);
		}
	});
	
	$ro('.sortable2').sortable({
		update: function(event, ui){
			var cat = ui.item.attr('data-cat');
			var order = $ro(this).sortable('toArray').toString().split(',').clean('');

			menu = order_items(menu, order, cat);
		}
	});

});





Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};


function order_categories(json, order, cat){
	var ordered_json = {};
	for(var i = 0; i < order.length; i++){
		ordered_json[order[i]] = json[order[i]];
	}
	return ordered_json;
}

function order_items(json, order, cat){
	var ordered_json = [];
	for(var i = 0; i < order.length; i++){
		var item = json[cat].Stavke.filter(function(element){
			return element.id === order[i];
		});
		ordered_json.push(item[0]);
	}

	json[cat].Stavke = ordered_json;
	return json;
}