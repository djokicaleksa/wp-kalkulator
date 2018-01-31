var $j = jQuery.noConflict();
$j(document).ready(function() {
	
    $j('#example').DataTable({
    	"bSort": false,
    	"paging": false,
    	"bInfo" : false,
    	language: {
        	search: "Pretraži:",
    	}
    });

} );
