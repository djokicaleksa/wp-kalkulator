<?php

function dj_add_custom_metabox() {
	add_meta_box(
			'dj_meta',
			'Stavke',
			'dj_meta_callback',
			'kalkulator',
			'normal',
			'high'
		);
}

add_action( 'add_meta_boxes', 'dj_add_custom_metabox' );

function dj_meta_callback( $kalkulator ){
	?>
		<form>
		  <div class="form-group">
		    <label for="exampleInputEmail1">Email address</label>
		    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
		    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
		  </div>
		  <div class="form-group">
		    <label for="exampleInputPassword1">Password</label>
		    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
		  </div>
		  <div class="form-check">
		    <label class="form-check-label">
		      <input type="checkbox" class="form-check-input">
		      Check me out
		    </label>
		  </div>
		  <button type="submit" class="btn btn-primary">Submit</button>
		</form>
	<?php
} 