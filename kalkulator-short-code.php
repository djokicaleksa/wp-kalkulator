<?php

function dj_kalkulator_table_shortcode($atts, $content = null){

	$atts = shortcode_atts([
			'id' => '10',
		], $atts);
	$post = get_post($atts['id']);

	$post_meta_items = get_post_meta((int) $content, 'items');


	if(isset($post_meta_items[0])){

		$items = json_decode($post_meta_items[0]);
		$items = json_decode($items, true);

	?>
				
				<table id="example" class="display" width="100%" cellspacing="0">
		        <thead>
		            <tr>
		            	<th></th>
		                <th>Naziv</th>
		                <th  style="display: none;">Opis</th>
		                <th>Cena</th>
		                <th style="display: none;" ></th>
		                <th style="display: none;" ></th>
		                <th style="display: none;" ></th>
		            </tr>
		        </thead>
		        <tfoot>
		            <tr>
		            	<th></th>
		                <th>Naziv</th>
		                <th  style="display: none;">Opis</th>
		                <th>Cena</th>
		                <th style="display: none;" ></th>
		                <th style="display: none;" ></th>
		                <th style="display: none;" ></th>
		            </tr>
		        </tfoot>
		        <tbody>
		        	<input type="text" style="display: none;" name="kalkulator_id" id="kalkulator_id" value="<?php echo $content; ?>">
			            <?php 
			            	foreach($items as $item1_key => $item1_value){
						?>
								<tr>
									<td></td>
									<td  style="display: none;"></td>
									<td><?php echo  parse_unicode($item1_key);?></td>
									<td></td>
									<td style="display: none;" ></td>
									<td style="display: none;" ></td>
									<td style="display: none;" ></td>
								</tr>
						<?php

								foreach ($item1_value as $item2) {
									foreach ($item2 as $item3) {
										?>
										<tr>
											<td><input type="checkbox" class="terapija" name="terapija[]"></td>
											<td id="name"><?php echo parse_unicode($item3['Naziv']); ?></td>
											<td style="display: none;" id="desc"><?php echo parse_unicode($item3['Opis']); ?></td>
											<td id="price"><?php echo $item3['Cena']; ?></td>
											<td style="display: none;" id="seachable_by"><?php echo parse_unicode($item3['searchable_by']); ?></td>
											<td style="display: none;" id="ogranicenja"><?php echo parse_unicode($item3['ogranicenja']); ?></td>
											<td style="display: none;" id="id"><?php echo $item3['id']; ?></td>
											<td style="display: none;"><input type="hidden" class="rank" value="<?php echo $item3['rang']; ?>"> </td>
										</tr style="display: none;" >

		<!-- 								<tr id="<?php echo $item3['id'] ?>">
											<td style="display: none;" ></td>
											<td style="display: none;" ></td>
											<td style="display: none;"><td>
											<td style="display: none;" ></td>
											<td style="display: none;"></td>
											<td><?php echo parse_unicode($item3['ogranicenja']); ?></td>
											<td style="display: none;"></td>

										</tr> -->	
								<?php
									}

								}
							}
			            ?>
			        </tbody>
					<div id="description_field">
			    		<p></p>
			    	</div>
<!-- 			    	<div id="restrictions">
			    	<h5>Ogranicenja</h5>
			    		<ul>
			    			
			    		</ul>
			    	</div> -->
			    </table>
	<?php
	}else{
		echo esc_attr(__("Kalkulator nema podataka."));
	}
}

add_shortcode('kalkulator_table_sc', 'dj_kalkulator_table_shortcode');

function dj_kalkulator_shortcode($atts, $content = null){
	?>
		<table id="kalkulator_sc" class="display" width="100%" cellspacing="0">
		    <thead>
		        <tr>
		            <th>Naziv</th>
		            <th style="display: none;">Opis</th>
		            <th>Cena</th>
		         </tr>
		    </thead>
		    <tfoot>
		        <tr>
		            <th style="display: none;"></th>
		            <th>Ukupno</th>
		            <th id="total"></th>
		        </tr>
		    </tfoot>
		    <tbody id="table-body">

		    </tbody>
		</table>

		<div id="restrictions">
			    	<h5>Ograničenja</h5>
			    		<ul>
			    			
			    		</ul>
			    	</div>
			    	
		<form method="POST" id="mini_calculator" action="<?php echo admin_url( 'admin.php' ); ?>">
<!-- 			<label for="email">Vaša e-mail adresa</label>
			<input type="email" name="email" placehodler="Vasa e-mail adresa"> -->
			<input type="hidden" name="action" value="dj_submit_form" />
			<button type="submit" id="send" class="btn btn-lg btn-primary btn-block">SNIMITE PDF</button>
		</form>
	<?php
}

add_shortcode('kalkulator_sc','dj_kalkulator_shortcode');