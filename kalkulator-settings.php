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
add_action('wp_ajax_get_kalkulator_meta', 'dj_get_kalkulator_meta');

function dj_get_restrictions_order(){

	$kalkulator_id = (int) $_GET['kalkulator_id'];

	$post_meta_items = get_post_meta($kalkulator_id, 'items');
	$response = [];
	$i = 0;
	
	return wp_send_json(json_decode($post_meta_items[0], true));
	foreach ($post_meta_items[0] as $kategorije) {
		
		foreach ($kategorije as $kategorija) {
			
			// $response[$i]['item_id'] = $stavka['id'];
			// $response[$i]['rang'] = $stavka['rang'];
		}
	}

	return wp_send_json(json_decode($response, true));
}

add_action('wp_ajax_get_restrictions_order', 'dj_get_restrictions_order');
add_action('wp_ajax_nopriv_get_restrictions_order', 'dj_get_restrictions_order');

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
	$admin_email = get_bloginfo("admin_email");

	$restrictions = [];

	for($k = 0; $k < $i; $k++){
		if(isset($_POST['item_' . $k . '_name'])){
			$items[$k]['name'] = parse_unicode($_POST['item_' . $k . '_name']);
		}

		if(isset($_POST['item_' . $k . '_desc'])){
			$items[$k]['price'] = parse_unicode($_POST['item_' . $k . '_price']);
		}

		if(isset($_POST['item_' . $k . '_price'])){
			$items[$k]['desc'] = parse_unicode($_POST['item_' . $k . '_desc']);
		}

		if(isset($_POST['item_' . $k . '_restriction'])){
			array_push($restrictions, parse_unicode($_POST['item_' . $k . '_restriction']));
		}
		
	}

	$restrictions = array_unique($restrictions);

	$subject = "Test mail";
	$message = "Test Mail";

	$html = '';

	$html .= '
			<table class="table table-striped">
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
				<td>Ukupno</td>
				<td></td>
				<td>".$total."</td>
			</tr>	
			</tbody>
			</table>";
	$html .= '<br>';
	$html .= '<h4>Ogranicenja</h4>';
	$html .= '<ul>';

	foreach ($restrictions as $restriction) {
		$html .= '<li>'.$restriction.'</li>';				
	}

	$html .= '</ul>';

	$pdf_html = '<!DOCTYPE html>
	<html>
		<head>
		<style>
			table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}
table caption {
  font-size: 1.5em;
  margin: .5em 0 .75em;
}
table tr {
  background: #f8f8f8;
  border: 1px solid #ddd;
  padding: .35em;
}
table th,
table td {
  padding: .625em;
  text-align: center;
}
table th {
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;
}
@media screen and (max-width: 600px) {
  table {
    border: 0;
  }
  table caption {
    font-size: 1.3em;
  }
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  table td:before {
    content: attr(aria-label);

    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  table td:last-child {
    border-bottom: 0;
  }
}

	.footer {
	  position: absolute;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  padding: 1rem;
	}
		</style>
	</head>
	<body>
	<img src="'.plugin_dir_path(__FILE__).'images/memorandum_top" width="100%">
	<div class="container">
		'.$html.'
	</div>	
	<div class="footer">
		<img src="'.plugin_dir_path(__FILE__).'images/memorandum_bot"
		width="100%">
	</div>
	</body>
	</html>';

	// var_dump($pdf_html);

	$dompdf->loadHtml($pdf_html);

	// (Optional) Setup the paper size and orientation
	$dompdf->setPaper('A4', 'portrait');

	// Render the HTML as PDF
	$dompdf->render();

	$pdf = $dompdf->output();

	$mail_html = '<!DOCTYPE html>
	<html>
	<head>
		<title></title>
	</head>
	<body>
		'.$html.'
	</body>
	</html>';

	

	// wp_mail($email, $subject, $mail_html, '', ['pdf'=>$pdf]);
	// wp_mail($admin_email, $subject, $mail_html, '', ['pdf'=>$pdf]);


	// Output the generated PDF to Browser
	return $dompdf->stream();
}

add_action('admin_post_nopriv_dj_submit_form', 'dj_submit_form');
add_action('admin_action_dj_submit_form', 'dj_submit_form');