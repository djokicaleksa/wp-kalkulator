<?php

// function kalkulator_register_post_type() {

//         $args = ['public'=>true, 'label'=> 'Kalkulator'];

//         //Create the post type using the above two varaiables.
// 	register_post_type('kalkulator', $args);
// }
// add_action('init', 'kalkulator_register_post_type');

function kalkulator_register_post_type() {

        $singular = 'Kalkulator';
        $plural = 'Kalkluatori';

        $labels = [
                'name'                  => $plural,
                'singular_name'         => $singular,
                'add_new'               => 'Dodaj novi',
                'add_new_item'          => 'Dodaj novi ' . $singular,
                'edit_item'             => 'Izmeni',
                'new_item'              => 'Novi ' . $singular,
                'view_item'             => 'Pogledaj ' . $singular,
                'view_items'            => 'Pogledaj ' . $plural,
                'search_items'          => 'Pretraži ' . $plural,
                'not_found'             => $singular . ' nije pronađen',
        ];      
    
    $args = [
        'public'                => true, 
        'labels'                => $labels,
        'exclude_from_search'   => true,
        'publicly_queryable'    => false,
        'show_ui'               => true,
        'show_in_nav_menus'     => true,
        'show_in_admin_bar'     => true,
        'menu_icon'             => 'dashicons-welcome-widgets-menus',
        'can_export'            => true,
        'delete_with_user'      => false,
        'hierarchical'          => false,
        'has_archive'           => true,
        'capability_type'       => 'post',
        'map_meta_cap'          => true,
        'rewrite'               => [
                                        'slug' => 'kalkulator',
                                        'with_front'=> false,
                                        'pages' => true,
                                ],
        'supports'              => [
                                        'title',
                                ],                               
    ];

        //Create the post type using the above two varaiables.
        register_post_type('kalkulator', $args);
}
add_action('init', 'kalkulator_register_post_type');