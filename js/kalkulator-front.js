$kf = jQuery.noConflict();

$kf(document).ready(function(){
	console.log('Radi front jqeyrt');
	$kf('.terapija').change(function(){
		var name = $kf(this).parent().parent().find('#name').text();
		var desc = $kf(this).parent().parent().find('#desc').text();
		var price = $kf(this).parent().parent().find('#price').text();
		$kf("#table-body").append('<tr><td>'+name+'</td><td>'+desc+'</td><td>'+price+'</td></tr>');
	});
});