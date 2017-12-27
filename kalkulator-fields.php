<?php

function dj_add_custom_items_metabox() {
	add_meta_box(
			'dj_meta',
			'Stavke',
			'dj_meta_custom_items_callback',
			'kalkulator',
			'normal',
			'high'
		);
}

add_action( 'add_meta_boxes', 'dj_add_custom_items_metabox' );

function dj_meta_custom_items_callback( $kalkulator ){

	?>

		<div id="" class="">
        <div class="">
            <!-- Modal content-->
            <div class="content">
                <div class="header">
                    <button type="button" class="close">&times;</button>
                    <h4 class="modal-title">Izmeni stavke kalkulatora</h4>
                </div>
                <div class="body">
                	<div class="form-group">
                    	<input type="text" placeholder="Naziv nove kategorije" class="form-control" id="kategorija">
                    </div>
                    <input type="hidden" name="kalkulator_id" id="kalkulator_id" value="<?php echo $kalkulator->ID; ?>">
					<div class="form-group">
                    	<button class="btn btn-add" id="add_cat" type="button">Dodaj kategoriju</button>
                    </div>
                    <div ></div>

                    <ul id="menu"></ul>


                    <br>
                    
                </div>
                <div class="footer">
                	<div class="form-group">
                    	<button type="button" class="btn btn-primary btn-lg btn-block saveMenu" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Obrađuje" id="saveMenu2">Sačuvaj</button>
                    </div>
                </div>
            </div>

        </div>
    </div>




		<!-- Modal -->
		<div id="saveSuccessModal" class="modal fade" role="dialog">
		  <div class="modal-dialog">

		    <!-- Modal content-->
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal">&times;</button>
		        <h4 class="modal-title">Uspesno sacuvano</h4>
		      </div>
		      <div class="modal-body">
		        <p>
		        	<i class="fa fa-check" aria-hidden="true"></i>
					Promene uspesno sacuvane
				</p>
		      </div>
		      <div class="modal-footer">
		      </div>
		    </div>

		  </div>
		</div>
	<?php
} 


function dj_add_custom_sort_metabox() {
	add_meta_box(
			'dj_meta_sort',
			'Sortiranje',
			'dj_meta_custom_sort_callback',
			'kalkulator',
			'normal',
			'high'
		);
}

add_action( 'add_meta_boxes', 'dj_add_custom_sort_metabox' );


function dj_meta_custom_sort_callback($kalkulator){
	$dj_kalkulator_meta = get_post_meta($kalkulator->ID, 'items');

	if(isset($dj_kalkulator_meta[0])){

		$items = json_decode($dj_kalkulator_meta[0]);
		$items = json_decode($items, true);

		?>
		<div class="row">
			<div class="col-md-4">
			<h4>Kategorije</h4>
				<ul id="sortable" class="sortable">
		<?php
		foreach($items as $item1_key => $item1_value){
			echo '<li id="'.$item1_key.'">' . parse_unicode($item1_key) . '</li>';
		}
		?>
				</ul>
			</div>
		<?php

			foreach($items as $item1_key => $item1_value){
					echo '<div class="col-md-4">';
					echo '<h4>' . parse_unicode($item1_key) . '</h4>';
					echo '<ul id="sortable2" class="sortable sortable2">';
					foreach ($item1_value as $item2) {
						if(!empty($item2)){
							foreach ($item2 as $item3) {
								echo '<li data-cat="'.$item1_key.'" id="'.$item3['id'].'">'.$item3['Naziv'].'</li>';
							}
						}else{
							echo 'Stavke nisu pronadjenje';
						}
						

					echo '</ul></div>';
				}
				
			}


		?>
		</div>
		<button type="button" class="btn btn-primary btn-lg btn-block saveMenu" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Obrađuje" id="saveMenu1">Sačuvaj</button>
		<?php
	}
}

function dj_meta_save($post_id){
	// Checks save status
    $is_autosave = wp_is_post_autosave( $post_id );
    $is_revision = wp_is_post_revision( $post_id );
    // $is_valid_nonce = ( isset( $_POST[ 'dwwp_jobs_nonce' ] ) && wp_verify_nonce( $_POST[ 'dwwp_jobs_nonce' ], basename( __FILE__ ) ) ) ? 'true' : 'false';

    // Exits script depending on save status
    if ( $is_autosave || $is_revision) {
        return;
    }

    if ( isset( $_POST[ 'email' ] ) ) {
    	update_post_meta( $post_id, 'email', sanitize_text_field( $_POST[ 'email' ] ) );
	}

	if ( isset( $_POST[ 'password' ] ) ) {
    	update_post_meta( $post_id, 'password', sanitize_text_field( $_POST[ 'password' ] ) );
	}

	if( isset( $_POST['items'])){
		update_post_meta($post_id, 'items', $_POST['items']);
	}
}

add_action('save_post', 'dj_meta_save');