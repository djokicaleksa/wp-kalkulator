var $ro = jQuery.noConflict();

$ro(document).ready(function(){
	$ro('#menu').sortable({
		update: function(event, ui){
			var order = $ro(this).sortable('toArray').toString().split(',').clean('');
			menu = order_categories(menu, order);
		}
	});
	$ro('.tbody').sortable();
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


function order_categories(json, order){
	var ordered_json = {};
	for(var i = 0; i < order.length; i++){
		ordered_json[order[i]] = json[order[i]];
	}
	return ordered_json;
}