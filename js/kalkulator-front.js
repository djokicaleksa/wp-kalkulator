$kf = jQuery.noConflict();

$kf(document).ready(function(){
	console.log('Radi front jqeyrt');
	$kf('.terapija').change(function(){

		var name = $kf(this).parent().parent().find('#name').text();
		var desc = $kf(this).parent().parent().find('#desc').text();
		var price = $kf(this).parent().parent().find('#price').text();

		if($kf(this).is(':checked')){
			$kf("#table-body").append('<tr><td>'+name+'</td><td>'+desc+'</td><td class="price">'+price+'</td></tr>');
		}else{
			var tableRow = $kf('#kalkulator_sc td').filter(function(){
				return $kf(this).text() == name;
			}).closest('tr');

			tableRow.remove();
		}
		var total = 0;
		$kf('#total').empty();
		$kf('#kalkulator_sc  td.price').each(function(index){
			total += parseInt($kf(this).text()); 
		});
		$kf('#total').append(total + ' RSD');
	});
});