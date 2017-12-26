<?php

use Dompdf\Dompdf;

function dj_add_shortcodes_submenu_page(){
	add_submenu_page( 
			'edit.php?post_type=kalkulator', 
			__( 'Shortcodes' ), 
			__( 'Shortcodes' ), 
			'manage_options', 
			'kalkulator_shortcodes', 
			'dj_shortcode_callback' 
	);
}

add_action( 'admin_menu', 'dj_add_shortcodes_submenu_page' );

function dj_shortcode_callback(){

	   $args = array(
            'post_type' 		=> 'kalkulator',
            'post_status'       => 'publish',
    	);
	$kalkulatori = get_posts($args);

	?>
	<div class="container">
		 <h2>Shortcodes</h2>
		 <hr>
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-8"><h2>Shortcodes <b></b></h2></div>
                    <div class="col-sm-4"></div>
                </div>
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Shorcode za tabelu</th>
						<th>Shorcode za kalkulator</th>
                    </tr>
                </thead>
                <tbody>
                	<?php foreach ($kalkulatori as $kalkulator) :?>
	                    <tr>
	                    	<td><?php echo $kalkulator->post_title; ?></td>
	                    	<td>[kalkulator_table_sc]<?php echo $kalkulator->ID ?>[/kalkulator_table_sc]</td>
	                    	<td>[kalkulator_sc]<?php echo $kalkulator->ID ?>[/kalkulator_sc]</td>
	                    </tr>   
	                <?php endforeach;?>
                </tbody>
            </table>
        </div>
    </div>     
	<?php
}


function dj_add_limits_submenu_page(){
		add_submenu_page( 
			'edit.php?post_type=kalkulator', 
			__( 'Ograničenja' ), 
			__( 'Ograničenja' ), 
			'manage_options', 
			'kalkulator_limits', 
			'limits_kalkulator_callback' 
	);
}

add_action( 'admin_menu', 'dj_add_limits_submenu_page' );

function limits_kalkulator_callback(){
	?>
		 <div class="container">
		 <h2>Ograničenja</h2>
		 <hr>
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-8"><h2>Employee <b>Details</b></h2></div>
                    <div class="col-sm-4">
                        <button type="button" data-toggle="modal" data-target="#add_new" class="btn btn-info add-new"><i class="fa fa-plus"></i> Add New</button>
                    </div>
                </div>
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Poruka</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>Administration</td>
                        <td>
							<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>   
                </tbody>
            </table>
        </div>
    </div>     


    <div id="add_new" class="modal fade" role="dialog">
	  <div class="modal-dialog">

	    <!-- Modal content-->
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal">&times;</button>
	        <h4 class="modal-title">Dodaj novo ograničenje</h4>
	      </div>
	      <div class="modal-body">
	        <form class="form">
	        	<div class="form-group">
	        		<lable for="name">Naziv</lable>
	        		<input type="text" name="name" id="name" class="form-control">
	        	</div>
	        	<div class="form-group">
	        		<lable for="message">Poruka</lable>
	        		<input type="text" name="message" id="message" class="form-control">
	        	</div>
	        	<div class="form-group">
	        		<lable for="message">Poruka</lable>
	        		<input type="text" name="message" id="message" class="form-control">
	        	</div>
	        	<div class="form-group">
	        		<lable for="older_then">Starije od</lable>
	        		<select id="older_then_select" name="older_then">
	        			<option>asdasd</option>
	        			<option>sdfsdf</option>
	        			<option>fghfgh</option>
	        			<option>fghfgh</option>
	        		</select>
	        	</div>
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	      </div>
	    </div>

	  </div>
	</div>
	<?php
}


function dj_save_kalkulator_meta($post){
	// if ( ! check_ajax_referer( 'wp-job-order', 'security' ) ) {
	// 	return wp_send_json_error( 'Invalid Nonce' );
	// }

	// if ( ! current_user_can( 'manage_options' ) ) {
	// 	return wp_send_json_error( 'You are not allow to do this.' );
	// }
	$kalkulator_id = $_POST['kalkulator_id'];

	update_post_meta($kalkulator_id, 'items', json_encode($_POST['items']));
	return wp_send_json_error('Bravo');
}

add_action('wp_ajax_save_kalkulator_meta', 'dj_save_kalkulator_meta');

function dj_get_kalkulator_meta(){
	$kalkulator_id = (int) $_GET['kalkulator_id'];
	
	$post_meta_items = get_post_meta($kalkulator_id, 'items');
	return wp_send_json(json_decode($post_meta_items[0], true));
	
}

add_action('wp_ajax_get_kalulator_meta', 'dj_get_kalkulator_meta');


function dj_edit_category_calculator(){
	$old_name = $_POST['old_name'];
	$new_name = $_POST['new_name'];
	$kalkulator_id = $_POST['kalkulator_id'];

	$kalkulator_id = (int) $_POST['kalkulator_id'];

	$post_meta_items = get_post_meta($kalkulator_id, 'items');
	$items = json_decode($post_meta_items[0]);
	$items = json_decode($items, true);
	

	
	$items[$new_name] = $items[$old_name];
	unset($items[$old_name]);
	
	$save_items = addslashes((string)json_encode(json_encode($items)));
	update_post_meta($kalkulator_id, 'items', $save_items);

	$post_meta_items2 = get_post_meta($kalkulator_id, 'items');
	return wp_send_json(json_decode($post_meta_items2[0], true));
}

add_action('wp_ajax_edit_category', 'dj_edit_category_calculator');

function dj_submit_form(){
	$dompdf = new Dompdf();
	$i = $_POST['i'];
	$items = [];
	$email = $_POST['email'];
	$admin_email = get_bloginfo("admin_email");
	for($k = 0; $k < $i; $k++){
		$items[$k]['name'] = $_POST['item_' . $k . '_name'];
		$items[$k]['desc'] = $_POST['item_' . $k . '_desc'];
		$items[$k]['price'] = $_POST['item_' . $k . '_price'];
	}

	$subject = "Test mail";
	$message = "Test Mail";

	$html = '';

	$html .= '<table>
				<thead>
					<tr>
						<th>Naziv</th>
						<th>Opis</th>
						<th>Cena</th>
					</tr>
				</thead>
				<tbody>';
	$total =  0;
	foreach ($items as $item) {
		$html .= '<tr>
					<td>'.$item['name'].'</td>
					<td>'.$item['desc'].'</td>
					<td>'.$item['price'].'</td>
				  </tr>';
				  $total += $item['price'];
	}			

	$html .= "<tr>
				<td>".$email."</td>
				<td>".$admin_email."</td>
				<td>".$total."</td>
			</tr>	
			</tbody>
			</table>";
	// echo $html;
	$dompdf->loadHtml($html);

	// (Optional) Setup the paper size and orientation
	$dompdf->setPaper('A4', 'landscape');

	// Render the HTML as PDF
	$dompdf->render();

	$pdf = $dompdf->output();

	wp_mail($email, $subject, $message, '', ['pdf'=>$pdf]);
	wp_mail($admin_email, $subject, $message, '', ['pdf'=>$pdf]);


	// Output the generated PDF to Browser
	// return $dompdf->stream();
}


add_action('admin_action_dj_submit_form', 'dj_submit_form');