$kf = jQuery.noConflict();

$kf(document).ready(function(){
	no = 0;
	var i = 0;
	kalkulator_id = $kf('#kalkulator_id').val();
	var items = [];
	var items_checked = [];
	
	$kf.ajax({
		type: "GET",
		url: search_ajax.ajax_url,
        dataType: "json",
        data: {
        	action:'get_restrictions_order',
            kalkulator_id:kalkulator_id
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

	$kf('.terapija').change(function(){
		var restrictions = [];
		var id = $kf(this).val();
		var item = $kf.grep(items, function(e){ return e.id == id;});
		var clicked_row = $kf(this).parent().parent();

		if($kf(this).is(':checked')){
			no++;
			updateJson(items, id, true);

			//dodaje u items_checked
			items_checked.push({
					id:item[0].id,
                	name:item[0].name,
                	desc:item[0].desc,
                	price:item[0].price,
                	restriction:item[0].restriction,
                	rank:item[0].rank
                });

			//dodaje u malu tabelu
			$kf("#table-body").append('<tr id="'+item[0].id+'"><td width="10">'+no+'</td><td>'+item[0].name+'</td><td>'+item[0].desc+'</td><td class="price">'+item[0].price+'</td></tr>');
			//dodaje opis u div
			// $kf('#description_field p').html(item[0].desc);

			//ako ogranicenje nije prazno
			if(item[0].restriction !== '' && item[0].restriction !== null && typeof item[0].restriction !== "undefined"){
				//posle kliknutog reda dodati ogranicenje
				// clicked_row.after('<tr><td colspan=4>'+item[0].restriction+'</td></tr>');//dodaje u galvnu tabelu
				// $kf('#restrictions ul').empty();	
				
				//prolazi kroz svaki dodati input
				$kf('#restrictions ul').empty()
				items_checked.forEach(function(stavka, index){
					if(stavka.rank >= getMaxRank(items_checked)){
						restrictions.push(stavka.restriction);
						// $kf('#restrictions ul').append('<li>'+stavka.restriction+'</li>');
					}
				});			
			}
		}else{
			updateJson(items, id, false);
			no--;
			$kf('#description_field p').empty();
			items_checked = remove(items_checked, $kf.grep(items, function(e){ return e.id == id;}));
			$kf('#restrictions ul').empty();
			items_checked.forEach(function(stavka, index){
				if(stavka.rank >= getMaxRank(items_checked)){
					restrictions.push(stavka.restriction);
					// $kf('#restrictions ul').append('<li>'+stavka.restriction+'</li>');
				}
			});		

			var mini_table_row = $kf('#'+item[0].id);
			mini_table_row.remove();
			//clicked_row.next('tr').remove();

		}


		//racuna total
		var total = 0;
		$kf('#total').empty();

		$kf('#kalkulator_sc  td.price').each(function(index){
			total += parseInt($kf(this).text()); 
		});
		$kf('#total').append(total + ' RSD');
		i++;

		
		restrictions = $kf.unique(restrictions);

		restrictions.forEach(function(item){
			$kf('#restrictions ul').append('<li>'+item+'</li>');
		});

	});

	$kf('#send').click(function(e){
		e.preventDefault();

		items_checked.forEach(function(stavka, index){
			$kf('#mini_calculator').append('<input type="hidden" class="input_name" name="item_'+index+'_name" value="'+stavka.name+'">');
			$kf('#mini_calculator').append('<input type="hidden" id="desc" name="item_'+index+'_desc" value="'+stavka.desc+'">');
			$kf('#mini_calculator').append('<input type="hidden" id="price" name="item_'+index+'_price" value="'+stavka.price+'">');
			
			if(stavka.rank >= getMaxRank(items_checked)){
				$kf('#mini_calculator').append('<input type="hidden" class="rest" name="item_'+index+'_restriction" value="'+stavka.restriction+'">');
			}
		});

		$kf('#mini_calculator').append('<input type="hidden" name="i" value="'+i+'">');
		$kf('#mini_calculator').submit();
	});


//toggle red u tabeli na klik kategorije
	$kf('.link').click(function(){
		var id = $kf(this).attr('data-id');
		// $kf('#'+ id).toggleClass('hide');
		console.log($kf('hide[data-id="'+id+'"'));
		$kf('.hide[data-id="'+id+'"').toggle();
	});












	


	$kf(document).on('click', '.terapija2', function(){
		var id = $kf(this).val();
		var restrictions = [];
		var item = $kf.grep(items, function(e){ return e.id == id;});

		if($kf(this).is(':checked')){
			no++;
			$kf('.terapija[value="'+id+'"]').prop('checked', true);

			updateJson(items, id, true);
			//dodaje u items_checked
			items_checked.push({
					id:item[0].id,
                	name:item[0].name,
                	desc:item[0].desc,
                	price:item[0].price,
                	restriction:item[0].restriction,
                	rank:item[0].rank
                });

			//dodaje u malu tabelu
			$kf("#table-body").append('<tr id="'+item[0].id+'"><td width="10">'+no+'</td><td>'+item[0].name+'</td><td>'+item[0].desc+'</td><td class="price">'+item[0].price+'</td></tr>');
			//dodaje opis u div
			// $kf('#description_field p').html(item[0].desc);

			//ako ogranicenje nije prazno
			if(item[0].restriction !== '' && item[0].restriction !== null && typeof item[0].restriction !== "undefined"){
				//posle kliknutog reda dodati ogranicenje
				// clicked_row.after('<tr><td colspan=4>'+item[0].restriction+'</td></tr>');//dodaje u galvnu tabelu
				// $kf('#restrictions ul').empty();	
				
				//prolazi kroz svaki dodati input
				$kf('#restrictions ul').empty()
				items_checked.forEach(function(stavka, index){
					if(stavka.rank >= getMaxRank(items_checked)){
						restrictions.push(stavka.restriction);
						// $kf('#restrictions ul').append('<li>'+stavka.restriction+'</li>');
					}
				});			
			}
		}else{
			$kf('.terapija[value="'+id+'"]').prop('checked', false);
			updateJson(items, id, false);
			no--;
			$kf('#description_field p').empty();
			items_checked = remove(items_checked, $kf.grep(items, function(e){ return e.id == id;}));
			$kf('#restrictions ul').empty();
			items_checked.forEach(function(stavka, index){
				if(stavka.rank >= getMaxRank(items_checked)){
					restrictions.push(stavka.restriction);
					// $kf('#restrictions ul').append('<li>'+stavka.restriction+'</li>');
				}
			});		

			var mini_table_row = $kf('#'+item[0].id);
			mini_table_row.remove();
		}

		//racuna total
		var total = 0;
		$kf('#total').empty();

		$kf('#kalkulator_sc  td.price').each(function(index){
			total += parseInt($kf(this).text()); 
		});
		$kf('#total').append(total + ' RSD');
		i++;

		
		restrictions = $kf.unique(restrictions);

		restrictions.forEach(function(item){
			$kf('#restrictions ul').append('<li>'+item+'</li>');
		});
		
	});


	$j('#search').devbridgeAutocomplete({
		lookup: items,
        onSelect: function(suggestion){
            // console.log(suggestion);
            // $j('input[value="'+suggestion.id+'"]').trigger('click');
            // $j('#search').val('');
        },
        formatResults: function(suggestion, currentValue){
            suggestion = 'sug';
            currentValue = 'cv';
        }
    });
});

function remove(array, element) {
    var filtered;
    filtered = array.filter(function(el){;
    	return el.id !== element[0].id;
    });
    return filtered;
}

function getMaxRank(items_checked){
	var max = 0;
	items_checked.forEach(function(item){
		if(item.rank > max){
			max = item.rank;
		}
	});
	return max;
}

function isUniqueRestriction(items_checked, stavka){
	var bool = true;
	items_checked.forEach(function(item){
		if(item.restriction == stavka.restriction){

			bool = false;
		}

	});

}

function updateJson(json, id, bool){
	for(var i in json){
		if(id === json[i].id){
			json[i].selected = bool;
			console.log('json updated');
		}
	}
}