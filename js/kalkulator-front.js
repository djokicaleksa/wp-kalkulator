$kf = jQuery.noConflict();

$kf(document).ready(function(){
	console.log('Radi front jqeyrt');
	var i = 0;
	$kf('.terapija').change(function(){

		var name = $kf(this).parent().parent().find('#name').text();
		var desc = $kf(this).parent().parent().find('#desc').text();
		var price = $kf(this).parent().parent().find('#price').text();

		if($kf(this).is(':checked')){
			$kf("#table-body").append('<tr><td>'+name+'</td><td class="price">'+price+'</td></tr>');
			console.log('desc ' + desc);
			$kf('#description_field p').html(desc);

		}else{
			var tableRow = $kf('#kalkulator_sc td').filter(function(){
				return $kf(this).text() == name;
			}).closest('tr');

			tableRow.remove();
		}
		var total = 0;
		$kf('#total').empty();

		$kf('#mini_calculator').append('<input type="hidden" name="item_'+i+'_name" value="'+name+'">');
		$kf('#mini_calculator').append('<input type="hidden" name="item_'+i+'_desc" value="'+desc+'">');
		$kf('#mini_calculator').append('<input type="hidden" name="item_'+i+'_price" value="'+price+'">');

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