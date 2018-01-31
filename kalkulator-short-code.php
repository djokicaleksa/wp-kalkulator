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

		$html = '';

	
				
		$html .= '<table id="example" class="display" cellspacing="0">
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
		        	<input type="text" style="display: none;" name="kalkulator_id" id="kalkulator_id" value="'.$content.'">';
			            
			            	foreach($items as $item1_key => $item1_value){
								$html .=
								'<tr>
									<td></td>
									<td  style="display: none;"></td>
									<td>' . parse_unicode($item1_key) . '</td>
									<td></td>
									<td style="display: none;" ></td>
									<td style="display: none;" ></td>
									<td style="display: none;" ></td>
								</tr>';
						

								foreach ($item1_value as $item2) {
									foreach ($item2 as $item3) {

									$html .= '<tr>
											<td><input type="checkbox" value="'.$item3['id'].'" class="terapija" name="terapija[]"></td>
											<td id="name">'.parse_unicode($item3['Naziv']).'</td>
											<td style="display: none;" id="desc">'.parse_unicode($item3['Opis']).'</td>
											<td id="price">'.$item3['Cena'].'</td>
											<td style="display: none;" id="seachable_by">'.parse_unicode($item3['searchable_by']).'</td>
											<td style="display: none;" id="ogranicenja">'.parse_unicode($item3['ogranicenja']).'</td>
											<td style="display: none;" id="id">'.$item3['id'].'</td>
											<td style="display: none;"><input type="hidden" class="rank" value="'.$item3['rang'].'"> </td>
										</tr style="display: none;" >

		<!-- 								<tr id="'.$item3['id'].'">
											<td style="display: none;" ></td>
											<td style="display: none;" ></td>
											<td style="display: none;"><td>
											<td style="display: none;" ></td>
											<td style="display: none;"></td>
											<td>'.parse_unicode($item3['ogranicenja']).'</td>
											<td style="display: none;"></td>
										</tr> -->';	
									}
								}
							}

			    $html .= '</tbody>
					<div id="description_field">
			    		<p></p>
			    	</div>
<!-- 			    	<div id="restrictions">
			    	<h5>Ogranicenja</h5>
			    		<ul>
			    			
			    		</ul>
			    	</div> -->
			    </table>';

			    return $html;
	
	}else{
		echo esc_attr(__("Kalkulator nema podataka."));
	}
}

add_shortcode('kalkulator_table_sc', 'dj_kalkulator_table_shortcode');

function dj_kalkulator_shortcode($atts, $content = null){
	$html = '';
	$html .= '<table id="kalkulator_sc" class="display" cellspacing="0">
		    <thead>
		        <tr>
		        	<th width="10"></th>
		            <th>Naziv</th>
		            <th>Opis</th>
		            <th>Cena</th>
		         </tr>
		    </thead>
		    <tfoot>
		        <tr>
		        	<th></th>
		            <th>Ukupno</th>
		            <th></th>
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
			    	
		<form method="POST" id="mini_calculator" action="' . admin_url( 'admin.php' ) . '">
<!-- 			<label for="email">Vaša e-mail adresa</label>
			<input type="email" name="email" placehodler="Vasa e-mail adresa"> -->
			<input type="hidden" name="action" value="dj_submit_form" />
			<button type="submit" id="send" class="btn btn-lg btn-primary btn-block">SNIMITE PDF</button>
		</form>';

		return $html;
	
}

add_shortcode('kalkulator_sc','dj_kalkulator_shortcode');