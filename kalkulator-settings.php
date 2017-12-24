<?php

use Dompdf\Dompdf;

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