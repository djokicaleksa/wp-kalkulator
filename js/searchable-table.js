var $j = jQuery.noConflict();
$j(document).ready(function() {
	console.log('asdasd');
	
    $j('#example').DataTable({
    	"bSort": false,
    	"paging": false,
    	"bInfo" : false
    });

} );
