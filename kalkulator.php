<?php
/**
 * Plugin Name: Kalkulator
 * Plugin URI: http://ga2s.rs
 * Description: Kalkulator za preracunavanje cena
 * Author: Aleksa Djokic
 * Author URI: http://hatrackmedia.com
 * Version: 0.0.2
 * License: GPLv2
 */


//Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	die('Forrbiden');
}


function parse_unicode($string){
	$chars = [
		 "U+0160"=>"Š",
        "U0160"=>"Š",
        "u0160"=>"Š",

        "U+0161"=>"š",
        "U0161"=>"š",
        "u0161"=>"š",

        "U+017D"=>"Ž",
        "U017D"=>"Ž",
        "u017D"=>"Ž",
        "u017d"=>"Ž",

        "U+017E"=>"ž",
        "U017E"=>"ž",
        "u017E"=>"ž",
        "u017e"=>"ž",

        "U+0110"=>"Đ",
        "U0110"=>"Đ",
        "u0110"=>"Đ",

        "U+0111"=>"đ",
        "U0111"=>"đ",
        "u0111"=>"đ",

        "U+0106"=>"Ć",
        "U0106"=>"Ć",
        "u0106"=>"Ć",

        "U+010D"=>"č",
        "U010D"=>"č",
        "u010d"=>"č",

        "U+010C"=>"Č",
        "U010C"=>"Č",
        "u010c"=>"Č",

	];
	foreach ($chars as $find => $replace) {
		$string = str_replace($find, $replace, $string);
	}

	return $string;
}

require_once(plugin_dir_path(__FILE__) . 'kalkulator-setup-tables.php');

//init ili register_activation_hook
add_action( 'init', 'dj_setup_database');

require_once (plugin_dir_path(__FILE__) . 'kalkulator-custom-post-type.php');
require_once (plugin_dir_path(__FILE__) . 'kalkulator-fields.php');
require_once(plugin_dir_path(__FILE__) . 'kalkulator-short-code.php');

require_once(plugin_dir_path(__FILE__) . 'libs/dompdf-master/lib/html5lib/Parser.php');
require_once(plugin_dir_path(__FILE__) . 'libs/dompdf-master/src/Autoloader.php');
Dompdf\Autoloader::register();
require_once(plugin_dir_path(__FILE__) . 'kalkulator-settings.php');

function dj_admin_enqueue_scripts() {
	global $pagenow, $typenow;

	if ( $typenow == 'kalkulator') {

		wp_enqueue_script('limits', plugins_url( 'js/limits.js', __FILE__ ), array('dj-select2', 'jquery'), '124578', true );
		
		wp_enqueue_script('dj-select2', '//cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js');

		wp_enqueue_style('dj-select2', '//cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css');

		wp_enqueue_style( 'dj-custom-css', plugins_url( 'css/custom.css', __FILE__ ) );
		wp_register_script('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js');
		wp_enqueue_script('prefix_bootstrap');

		wp_register_style('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
		wp_enqueue_style('prefix_bootstrap');
		wp_enqueue_script('dynamic-form', plugins_url( 'js/dynamic-form.js', __FILE__ ), array( 'jquery'), '154848', true );
		wp_enqueue_script( 'reorder-js', plugins_url( 'js/reorder.js', __FILE__ ), array( 'jquery', 'jquery-ui-sortable' ), '20150626', true );


		wp_enqueue_script( 'ajax-script', get_template_directory_uri() . '/js/my-ajax-script.js', array('jquery') );

    	wp_localize_script( 'ajax-script', 'my_ajax_object',
            array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
		

	}

	// if ( ($pagenow == 'post.php' || $pagenow == 'post-new.php') && $typenow == 'kalkulator' ) {
	// 	wp_register_script('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js');
	// 	wp_enqueue_script('prefix_bootstrap');

	// 	wp_register_style('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
	// 	wp_enqueue_style('prefix_bootstrap');

	// 	wp_enqueue_script('dynamic-form', plugins_url( 'js/dynamic-form.js', __FILE__ ), array( 'jquery'), '154848', true );

	// }

	// if ( $pagenow =='edit.php' && $typenow == 'kalkulator') {
	// 				wp_register_script('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js');
	// 	wp_enqueue_script('prefix_bootstrap');

	// 	wp_register_style('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
	// 	wp_enqueue_style('prefix_bootstrap');

	// 	wp_enqueue_script('dynamic-form', plugins_url( 'js/dynamic-form.js', __FILE__ ), array( 'jquery', 'bootstrap'), '154848', true );
	// }


}

add_action( 'admin_enqueue_scripts', 'dj_admin_enqueue_scripts' );

function dj_front_enqueruer_scripts(){
	wp_enqueue_script('jquery');
	wp_enqueue_style( 'dj-custom-css', plugins_url( 'css/custom.css', __FILE__ ) );
	wp_register_script('data-tables-js', '//cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js');
	wp_enqueue_script('data-tables-js', ['jquery']);
	wp_enqueue_script('searchable-table', plugins_url( 'js/searchable-table.js', __FILE__ ), array( 'jquery', 'data-tables-js' ), '20150204', true );
	wp_enqueue_script('kalkulator-front', plugins_url( 'js/kalkulator-front.js', __FILE__ ), array( 'jquery'), '20171223', true );
	wp_enqueue_script('form-calculator', plugins_url( 'js/form-calculator.js', __FILE__ ), array( 'jquery'), '20171224', true );

	
		wp_enqueue_script( 'ajax-script', plugin_dir_path('/js/kalkulator-front.js', __FILE__), array('jquery') );
    	wp_localize_script( 'ajax-script', 'my_ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );

  //   	wp_enqueue_script( 'custom-ajax-request', '/path/to/settings.js', array( 'jquery' ) );
		// wp_localize_script( 'custom-ajax-request', 'MyAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) )

}

add_action('wp_enqueue_scripts', 'dj_front_enqueruer_scripts');

     

function dj_set_content_type(){
    return "text/html";
}
add_filter( 'wp_mail_content_type','dj_set_content_type' );