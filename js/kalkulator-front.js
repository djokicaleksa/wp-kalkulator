$kf = jQuery.noConflict();

$kf(document).ready(function(){
	var i = 0;
	var topRank = 0;
	kalkulator_id = $kf('#kalkulator_id').val();
	ranks = [];
	
	$kf.ajax({
		type: "GET",
		url: my_ajax_object.ajax_url,
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
                			ranks.push({
                				id:json[kategorija][stavke][i].id,
                				restriction:json[kategorija][stavke][i].ogranicenja,
                				rank:json[kategorija][stavke][i].rang
                			});
                		}
                	}
                	
                }
            },
            error: function (data) {

            }
	});
	//  console.log(ranks);

	$kf('.terapija').change(function(){

		var name = $kf(this).parent().parent().find('#name').text();
		var desc = $kf(this).parent().parent().find('#desc').text();
		var price = $kf(this).parent().parent().find('#price').text();
		var ogranicenja = $kf(this).parent().parent().find('#ogranicenja').text();
		var id = $kf(this).parent().parent().find('#id').text();
		var rank = parseInt($kf(this).parent().parent().find('.rank').val());
		// console.log(rank);
		if($kf(this).is(':checked')){
			$kf("#table-body").append('<tr><td>'+name+'</td><td class="price">'+price+'</td></tr>');
			$kf('#description_field p').html(desc);

			//dodaje za pdf
			$kf('#mini_calculator').append('<input type="hidden" data-rank="'+rank+'" data-id="'+id+'" class="input_name" name="item_'+i+'_name" value="'+name+'">');
			$kf('#mini_calculator').append('<input type="hidden" data-id="'+id+'" id="desc" name="item_'+i+'_desc" value="'+desc+'">');
			$kf('#mini_calculator').append('<input type="hidden" data-id="'+id+'" id="price" name="item_'+i+'_price" value="'+price+'">');

			
			if(ogranicenja !== '' && ogranicenja !== null ){
				$kf(this).parent().parent().after('<tr data-id="'+id+'" class="ogr"><td colspan=4>'+ogranicenja+'</td></tr>');//dodaje u galvnu tabelu

				$kf('#restrictions ul').empty();	
				
				$kf('.input_name').each(function(index){
					var id = $kf(this).attr('data-id');
					var input_rank = $kf(this).attr('data-rank');

					var item = $kf.grep(ranks, function(e){ return e.id == id; });
					// console.log('iteracija: ' + index);
					// console.log(id);
					// console.log('rank ' + rank);
					console.log('top rank '  + topRank);
					if(input_rank >= topRank){
						$kf('#restrictions ul').append('<li>'+item[0].restriction+'</li>');	
						console.log('prosao ' + input_rank);
						topRank = input_rank;
						// console.log('topRank ' + topRank);
						$kf('#mini_calculator').append('<input type="hidden" class="rest" name="item_'+index+'_restriction" value="'+item[0].restriction+'">');//dodaje ogranicenje za pdf
					}else{
						console.log('Nemeze');
					}


					
				});
			}
		}else{
			var tableRow = $kf('#kalkulator_sc td').filter(function(){
				return $kf(this).text() == name;
			}).closest('tr');
			$kf('input[data-id="'+id+'"]').remove();
			$kf('#restrictions ul li:contains("'+ogranicenja+'")').remove();
			tableRow.remove();

			var rest_row = $kf('tr[data-id="'+id+'"]');
			rest_row.remove();

			$kf('.input_name').each(function(index){
				var id = $kf(this).attr('data-id');
				var input_rank = $kf(this).attr('data-rank');
				var item = $kf.grep(ranks, function(e){ return e.id == id; });
					// console.log('iteracija: ' + index);
					// console.log(id);
					// console.log('rank ' + rank);
				console.log('top rank '  + topRank);
				if(input_rank >= topRank){
					$kf('#restrictions ul').append('<li>'+item[0].restriction+'</li>');	
					console.log('prosao ' + input_rank);
					topRank = input_rank;
					// console.log('topRank ' + topRank);
					$kf('#mini_calculator').append('<input type="hidden" class="rest" name="item_'+index+'_restriction" value="'+item[0].restriction+'">');//dodaje ogranicenje za pdf
				}else{
					console.log('Nemeze');
				}});
		}
		var total = 0;
		$kf('#total').empty();

		

		$kf('#kalkulator_sc  td.price').each(function(index){
			total += parseInt($kf(this).text()); 
		});
		$kf('#total').append(total + ' RSD');
		i++;
	});

	$kf('#send').click(function(e){
		e.preventDefault();

		$kf('#mini_calculator').append('<input type="hidden" name="i" value="'+i+'">');
		$kf('#mini_calculator').submit();
	});
});