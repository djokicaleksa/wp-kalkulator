<?php

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
	
	$post_meta_items = get_post_meta(10, 'items');
	return wp_send_json(json_decode($post_meta_items[0], true));
	
}

add_action('wp_ajax_get_kalulator_meta', 'dj_get_kalkulator_meta');


function dj_submit_form(){

	if(wp_mail($_POST['email'], 'Test', 'Test Poruka')){
		wp_redirect(home_url());	
	}else{
		echo 'puza';
	}
	
}


add_action('admin_action_dj_submit_form', 'dj_submit_form');