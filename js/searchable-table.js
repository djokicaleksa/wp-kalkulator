var $j = jQuery.noConflict();
$j(document).ready(function() {
	
    var items = [];
	var kal_id = $kf('#kalkulator_id').val();

	$j.ajax({
		type: "GET",
		url: search_ajax.ajax_url,
        dataType: "json",
        async: true,
        data: {
        	action:'get_restrictions_order',
            kalkulator_id:kal_id
            },
            success: function (data) {
            	json = JSON.parse(data);
                for(kategorija in json){
                	for(var stavke in json[kategorija]){
                		for(var i = 0; i < json[kategorija][stavke].length; i++){
                			items.push({
                				id:json[kategorija][stavke][i].id,
                				name:json[kategorija][stavke][i].Naziv,
                				desc:json[kategorija][stavke][i].Opis,
                				price:json[kategorija][stavke][i].Cena,
                				restriction:json[kategorija][stavke][i].ogranicenja,
                                search:json[kategorija][stavke][i].searchable_by,
                				rank:json[kategorija][stavke][i].rang,
                                selected:false,
                                value:json[kategorija][stavke][i].Naziv + '  ' + json[kategorija][stavke][i].Cena + ' RSD'
                			});
                		}
                	}
                	
                }
            },
            error: function (data) {
                console.log(data);
            }
	});


  //   $j('#search').devbridgeAutocomplete({
		// lookup: items,
  //       onSelect: function(suggestion){
  //           // console.log(suggestion);
  //           // $j('input[value="'+suggestion.id+'"]').trigger('click');
  //           // $j('#search').val('');
  //       },
  //       beforeRender: function(container){
  //           // console.log(container);
  //       },
  //       formatResults: function(suggestion, currentValue){
  //           suggestion = 'sug';
  //           currentValue = 'cv';
  //       }
  //   });

} );
