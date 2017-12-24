var $jq = jQuery.noConflict();

$jq(document).ready(function(){
    $jq('#menuModal').modal();
    menu = {};

    // ajax token setup
    // $jq.ajaxSetup({
    //     headers: {
    //         'X-CSRF-TOKEN': $jq('meta[name="csrf-token"]').attr('content')
    //     }
    // });

    //Ucitavanje menija
    var kalkulator_id = $jq('#kalkulator_id').val();
    $jq.ajax({
        type: "GET",
        url: ajaxurl,
        dataType: "json",
        data: {action: 'get_kalulator_meta',kalkulator_id:kalkulator_id},
        success: function (data) {
            if(data != 404){
                menu = JSON.parse(data);
                // populateMenu(menu);
                populateMenuModal(menu);
            }
        },
        error: function (data) {
            console.log('Error:', data);
        }
    });

    // Brisanje kategorije
    $jq("#menu").on('click', 'button.cat_remove', function(){
        $jq(this).parent().parent().parent().parent().remove();
        var kategorija = $jq(this).parent().parent().parent().find('.kategorija').val();
        delete menu[kategorija];
    });

    // Brisanje stavke
    $jq("#menu").on('click', 'button.item_remove', function(){
        var kategorija = $jq(this).parent().parent().parent().find('.kategorija').val();
        var stavka = $jq(this).parent().find('.stavka').val();
        menu = removeFromJson(menu, stavka, kategorija);
        $jq(this).parent().parent().remove();
    });


    // Dodavanje kategorija
    var kategorija;
    $jq('#add_cat').on('click',function(){
        kategorija = $jq('#kategorija').val();
        if(kategorija == ""){
            alert('Popunite naziv kategorije');
        }else {
            menu[kategorija] = {};
            menu[kategorija].Stavke = [];

            $jq('#menu').append('' +
                '<div class="panel-body">\n' +
                '                        <div class="row ">\n' +
                '                        <div class="col-md-3">\n' +
                '                            <h3>'+kategorija+' <button class="cat_remove btn btn-sm btn-rounded btn-danger">X</button></h3>\n' +
                '                        </div>\n' +
                '                            <div class="col-md-9">\n' +
                '                            <div class=" table-responsive">\n' +
                '                                <table class="table table-striped">\n' +
                '                                    <thead>\n' +
                '                                        <tr class="border-bottom-warning border-solid">\n' +
                '                                            <th colspan="2"> Naziv jela <span class="pull-right">Cena</span></th>\n' +
                '                                        </tr>\n' +
                '                                    </thead>\n' +
                '                                    <tbody class="tbody">\n' +
                '                                        \n' +
                '                                   <input type="hidden" class="kategorija" value="'+kategorija+'">\n'+
                '                                    </tbody>'+
                '                                </table>\n' +
                '                                <div class="container-fluid item_input_fields">\n' +
                '                                    <form class="form-inline">\n' +
                '                                        <div class="form-group">\n' +
                '                                            <input type="text" placeholder="Naziv stavke" class="form-control naziv_stavke" id="naziv_stavke">\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group">\n' +
                '                                            <input type="text" placeholder="Opis stavke" class="form-control opis_stavke" id="opis_stavke">\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group">\n' +
                '                                            <input type="text" placeholder="Cena u RSD" class="form-control cena_stavke" id="cena_stavke">\n' +
                '                                        </div>\n' +
                '                                        <div class="form-group">\n' +
                '                                            <input type="text" placeholder="Može se pretražiti po..."  data-toggle="tooltip" title="Upišite reči po kojima će ova stavka moći da se nadje u pretrazi" class="form-control searchable_by" id="searchable_by">\n' +
                '                                            <input type="hidden" class="kategorija" value="'+kategorija+'">\n' +
                '                                        </div>\n' +
                '                                        <button class="btn btn-add add_item" id="add_item" type="button">Dodaj stavku</button>\n' +
                '                                    </form>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>');
            $jq('#kategorija').val("");
        }
    });


    //Dodavanje stavke
    $jq('#menu').on('click', 'button.add_item', function(){
        var naziv, opis, cena;
        naziv = $jq(this).parent().find('.naziv_stavke').val();
        opis = $jq(this).parent().find('.opis_stavke').val();
        cena = $jq(this).parent().find('.cena_stavke').val();
        searchable_by = $jq(this).parent().find('.searchable_by').val();
        kategorija = $jq(this).parent().find('.kategorija').val();

        $jq(this).parent().parent().parent().find('.tbody').append('' +
            '<tr>\n' +
            '    <td>\n' +
            '        <div class="media-left">\n' +
            '            <div class="text-default text-semibold">'+naziv+'</div>\n' +
            '            <div class="text-muted text-size-small"> '+opis+'</div>\n' +
            '        </div>\n' +
            '    </td>\n' +
            '    <td>\n' +
            '        <div class="pull-right text-semibold"> '+cena+' RSD</div>\n' +
            '        <input type="hidden" class="stavka" value="'+naziv+'">' +
            '        <button class="pull-right item_remove btn btn-sm btn-rounded">X</button>\n' +
            '    </td>\n' +
            '</tr>');

        $jq(this).parent().find('.cena_stavke').val("");
        $jq(this).parent().find('.opis_stavke').val("");
        $jq(this).parent().find('.naziv_stavke').val("");
        $jq(this).parent().find('.searchable_by').val("");

        menu[kategorija].Stavke.push({
            Naziv: naziv,
            Opis: opis,
            Cena: cena,
            searchable_by: searchable_by
        });

    });

    //Cuvanje menija
    $jq('#saveMenu').on('click', function(e){
        var kalkulator_id = $jq('#kalkulator_id').val();
        $jq('#saveMenu').button('loading');
    
        $jq.ajax({
            type: "POST",
            url: ajaxurl,
            dataType: "json",
            data: {
                action:'save_kalkulator_meta',
                items:JSON.stringify(menu),
                kalkulator_id:kalkulator_id
            },
            success: function (data) {
                setTimeout(function(){
                $jq('#saveMenu').button('reset');
                $jq('#saveSuccessModal').modal('show');
            }, 5000);
                
            },
            error: function (data) {

            }
        });
        // $jq('#menu').append("<input type='hidden' name='items' value='"+JSON.stringify(menu)+"' />");
    });


});


function removeFromJson(json, name, category)
{
    for(var i = 0; i<json[category].Stavke.length; i++){
        if(json[category].Stavke[i] != null) {
            if (json[category].Stavke[i].Naziv == name) {
                json[category].Stavke.splice(i,1);
            }
        }
    }
    return json;
}

// Popunjava mani sa podacima iz json-fajla
function populateMenu(json){
    for(var kategorija in json){
        var kategorija_id = spojiNazivKategorije(kategorija);
        $jq('#menu').append('' +
            '<div class="row mt-20">\n' +
            '                                        <div class="col-md-3">\n' +
            '                                            <h3>'+kategorija+'</h3> </div>\n' +
            '                                        <div class="col-md-9">\n' +
            '                                            <div class=" table-responsive">\n' +
            '                                                <table class="table table-striped">\n' +
            '                                                    <thead>\n' +
            '                                                    <tr class="border-bottom-warning border-solid">\n' +
            '                                                        <th colspan="2"> Naziv jela <span class="pull-right">Cena</span></th>\n' +
            '                                                    </tr>\n' +
            '                                                    </thead>\n' +
            '                                                    <tbody id="'+kategorija_id+'">\n' +
            '                                                    </tbody>\n' +
            '                                                </table>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>' +
            '<div class="list-group-divider"></div>');

        for(var stavke in json[kategorija]){
            for(var i = 0; i < json[kategorija][stavke].length; i++){
                $jq('#'+kategorija_id).append('' +
                    '<tr>\n' +
                    '                                                        <td>\n' +
                    '                                                            <div class="media-left">\n' +
                    '                                                                <div class="text-default text-semibold">'+json[kategorija][stavke][i].Naziv+'</div>\n' +
                    '                                                                <div class="text-muted text-size-small">'+json[kategorija][stavke][i].Opis+'</div>\n' +
                    '                                                            </div>\n' +
                    '                                                        </td>\n' +
                    '                                                        <td>\n' +
                    '                                                            <div class="pull-right text-semibold">'+json[kategorija][stavke][i].Cena+' RSD</div>\n' +
                    '                                                        </td>\n' +
                    '                                                    </tr>');
            }
        }
    }
}

function populateMenuModal(json){
    for(var kategorija in json){
        var kategorija_id = spojiNazivKategorije(kategorija);
        $jq('#menu').append('' +
            '<div class="panel-body">\n' +
            '                        <div class="row ">\n' +
            '                        <div class="col-md-3">\n' +
            '                            <h3>'+kategorija+' <button class="cat_remove btn btn-sm btn-rounded btn-danger">X</button></h3>\n' +
            '                        </div>\n' +
            '                            <div class="col-md-9">\n' +
            '                            <div class=" table-responsive">\n' +
            '                                <table class="table table-striped">\n' +
            '                                    <thead>\n' +
            '                                        <tr class="border-bottom-warning border-solid">\n' +
            '                                            <th colspan="2"> Naziv jela <span class="pull-right">Cena</span></th>\n' +
            '                                        </tr>\n' +
            '                                    </thead>\n' +
            '                                    <tbody class="tbody">\n' +
            '                                        \n' +
            '                                   <input type="hidden" class="kategorija" value="'+kategorija+'">\n'+
            '                                    </tbody>'+
            '                                </table>\n' +
            '                                <div class="container-fluid item_input_fields">\n' +
            '                                    <form class="form-inline">\n' +
            '                                        <div class="form-group">\n' +
            '                                            <input type="text" placeholder="Naziv stavke" class="form-control naziv_stavke" id="naziv_stavke">\n' +
            '                                        </div>\n' +
            '                                        <div class="form-group">\n' +
            '                                            <input type="text" placeholder="Opis stavke" class="form-control opis_stavke" id="opis_stavke">\n' +
            '                                        </div>\n' +
            '                                        <div class="form-group">\n' +
            '                                            <input type="text" placeholder="Cena u RSD" class="form-control cena_stavke" id="cena_stavke">\n' +
            '                                        </div>\n' +
            '                                        <div class="form-group">\n' +
            '                                            <input type="text" placeholder="Može se pretražiti po..."  data-toggle="tooltip" title="Upišite reči po kojima će ova stavka moći da se nadje u pretrazi" class="form-control searchable_by" id="searchable_by">\n' +
            '                                            <input type="hidden" class="kategorija" value="'+kategorija+'">\n' +
            '                                        </div>\n' +
            '                                        <button class="btn btn-add add_item" id="add_item" type="button">Dodaj stavku</button>\n' +
            '                                    </form>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>');

        for(var stavke in json[kategorija]){
            for(var i = 0; i < json[kategorija][stavke].length; i++){
                $jq('#'+kategorija_id).append('');
                $jq('.kategorija').each(function(index){
                    if($jq(this).val() == kategorija && $jq(this).parent().prop('nodeName') == 'TBODY'){
                        $jq(this).parent().append('' +
                            '<tr>\n' +
                            '    <td>\n' +
                            '        <div class="media-left">\n' +
                            '            <div class="text-default text-semibold">'+json[kategorija][stavke][i].Naziv+'</div>\n' +
                            '            <div class="text-muted text-size-small"> '+json[kategorija][stavke][i].Opis+'</div>\n' +
                            '        </div>\n' +
                            '    </td>\n' +
                            '    <td>\n' +
                            '        <div class="pull-right text-semibold"> '+json[kategorija][stavke][i].Cena+' RSD</div>\n' +
                            '        <input type="hidden" class="stavka" value="'+json[kategorija][stavke][i].Naziv+'">' +
                            '        <button class="pull-right item_remove btn btn-sm btn-rounded">X</button>\n' +
                            '    </td>\n' +
                            '</tr>');
                    }
                });
            }
        }
    }
}

function spojiNazivKategorije(name){
    var array = name.split(" ");
    var full_name = "";
    for(var i = 0; i < array.length; i++){
        full_name += array[i];
    }
    return full_name;
}