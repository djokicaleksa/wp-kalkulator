$kf = jQuery.noConflict();

$kf(document).ready(function(){
	var i = 0;
	$kf('.terapija').change(function(){

		var name = $kf(this).parent().parent().find('#name').text();
		var desc = $kf(this).parent().parent().find('#desc').text();
		var price = $kf(this).parent().parent().find('#price').text();
		var ogranicenja = $kf(this).parent().parent().find('#ogranicenja').text();
		var id = $kf(this).parent().parent().find('#id').text();

		if($kf(this).is(':checked')){
			$kf("#table-body").append('<tr><td>'+name+'</td><td class="price">'+price+'</td></tr>');
			$kf('#description_field p').html(desc);

			if(ogranicenja !== '' && ogranicenja !== null ){
				$kf('#restrictions ul li:contains("'+ogranicenja+'")').remove();
				$kf('#restrictions ul').append('<li>'+ogranicenja+'</li>');	

				$kf(this).parent().parent().after('<tr data-id="'+id+'" class="ogr"><td colspan=4>'+ogranicenja+'</td></tr>');
				var rest_row = $kf('tr[data-id="'+id+'"]');
			
				rest_row.fadeOut(4000, function(){ $kf(this).remove();});
		
			}

			$kf('#mini_calculator').append('<input type="hidden" data-id="'+id+'" name="item_'+i+'_name" value="'+name+'">');
			$kf('#mini_calculator').append('<input type="hidden" data-id="'+id+'" name="item_'+i+'_desc" value="'+desc+'">');
			$kf('#mini_calculator').append('<input type="hidden" data-id="'+id+'" name="item_'+i+'_price" value="'+price+'">');

			$kf('#restrictions ul li').each(function(index){
				$kf('#mini_calculator').append('<input type="hidden" name="item_'+i+'_restriction" value="'+ogranicenja+'">');
			});
		}else{
			var tableRow = $kf('#kalkulator_sc td').filter(function(){
				return $kf(this).text() == name;
			}).closest('tr');
			$kf('input[data-id="'+id+'"]').remove();
			$kf('#restrictions ul li:contains("'+ogranicenja+'")').remove();
			tableRow.remove();
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