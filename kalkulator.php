<?php
/**
 * Plugin Name: Kalkulator
 * Plugin URI: http://ga2s.rs
 * Description: Kalkulator za preracunavanje cena
 * Author: Aleksa Djokic
 * Author URI: http://hatrackmedia.com
 * Version: 0.0.1
 * License: GPLv2
 */


//Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	die('Forrbiden');
}




require_once (plugin_dir_path(__FILE__) . 'kalkulator-custom-post-type.php');
require_once (plugin_dir_path(__FILE__) . 'kalkulator-fields.php');
require_once(plugin_dir_path(__FILE__) . 'kalkulator-short-code.php');


function dj_admin_enqueue_scripts() {
	global $pagenow, $typenow;

	if ( $typenow == 'kalkulator') {
		wp_enqueue_style( 'dj-custom-css', plugins_url( 'css/custom.css', __FILE__ ) );
		wp_register_script('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js');
		wp_enqueue_script('prefix_bootstrap');

		wp_register_style('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
		wp_enqueue_style('prefix_bootstrap');

	}

	if ( ($pagenow == 'post.php' || $pagenow == 'post-new.php') && $typenow == 'kalkulator' ) {
		wp_register_script('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js');
		wp_enqueue_script('prefix_bootstrap');

		wp_register_style('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
		wp_enqueue_style('prefix_bootstrap');

	}

	if ( $pagenow =='edit.php' && $typenow == 'kalkulator') {
					wp_register_script('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js');
		wp_enqueue_script('prefix_bootstrap');

		wp_register_style('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
		wp_enqueue_style('prefix_bootstrap');
	}


}

add_action( 'admin_enqueue_scripts', 'dj_admin_enqueue_scripts' );

function dj_front_enqueruer_scripts(){
	wp_enqueue_script('jquery');
	wp_register_script('data-tables-js', '//cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js');
	wp_enqueue_script('data-tables-js', ['jquery']);
	wp_enqueue_script('searchable-table', plugins_url( 'js/searchable-table.js', __FILE__ ), array( 'jquery', 'data-tables-js' ), '20150204', true );
}

add_action('wp_enqueue_scripts', 'dj_front_enqueruer_scripts');