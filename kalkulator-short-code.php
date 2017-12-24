<?php

function dj_kalkulator_table_shortcode($atts, $content = null){

	$atts = shortcode_atts([
			'id' => '10',
		], $atts);
	$post = get_post($atts['id']);

	$post_meta_items = get_post_meta( (int) $content, 'items');

	$items = json_decode($post_meta_items[0]);
	$items = json_decode($items, true);

	?>
	
		<div class="">
			<div class="">
				<table id="example" class="display" width="100%" cellspacing="0">
		        <thead>
		            <tr>
		            	<th></th>
		                <th>Naziv</th>
		                <th>Opis</th>
		                <th>Cena</th>
		            </tr>
		        </thead>
		        <tfoot>
		            <tr>
		            	<th></th>
		                <th>Naziv</th>
		                <th>Opis</th>
		                <th>Cena</th>
		            </tr>
		        </tfoot>
		        <tbody>
			            <?php 
			            	foreach($items as $item1_key => $item1_value){
						?>
								<tr>
									<td></td>
									<td></td>
									<td><?php echo $item1_key;?></td>
									<td></td>
								</tr>
						<?php

								foreach ($item1_value as $item2) {
									foreach ($item2 as $item3) {
										?>
										<tr>
											<td><input type="checkbox" class="terapija" name="terapija[]"></td>
											<td id="name"><?php echo $item3['Naziv']; ?></td>
											<td id="desc"><?php echo $item3['Opis']; ?></td>
											<td id="price"><?php echo $item3['Cena']; ?></td>
										</tr>	
								<?php
									}

								}
							}
			            ?>
			        </tbody>
			    </table>
		    <div>
		    <div class="">
		    	
		    </div>
	    </div>
    
	<?php
}

add_shortcode('kalkulator_table_sc', 'dj_kalkulator_table_shortcode');

function dj_kalkulator_shortcode($atts, $content = null){
	?>
		<table id="example" class="display" width="100%" cellspacing="0">
		    <thead>
		        <tr>
		            <th>Naziv</th>
		            <th>Opis</th>
		            <th>Cena</th>
		         </tr>
		    </thead>
		    <tfoot>
		        <tr>
		            <th>Naziv</th>
		            <th>Opis</th>
		            <th>Cena</th>
		        </tr>
		    </tfoot>
		    <tbody id="table-body">

		    </tbody>
		</table>
	<?php
}

add_shortcode('kalkulator_sc','dj_kalkulator_shortcode');