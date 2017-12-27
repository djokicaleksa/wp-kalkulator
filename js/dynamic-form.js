var $jq = jQuery.noConflict();

$jq(document).ready(function(){
    $jq('#menuModal').modal();
    menu = {};
    //Ucitavanje menija 
    kalkulator_id = $jq('#kalkulator_id').val();
    $jq.ajax({
        type: "GET",
        url: ajaxurl,
        dataType: "json",
        data: {action: 'get_kalulator_meta',kalkulator_id:kalkulator_id},
        success: function (data) {
            if(data !== null){
                menu = JSON.parse(data);
                populateMenuModal(menu);
                $jq("td:empty").remove();
                categories_number = Object.keys(menu).length;
            }
        },

        error: function (data) {
            console.log('Error:', data);
        }
    });

    // Brisanje kategorije
    $jq("#menu").on('click', 'button.cat_remove', function(){
        $jq(this).parent().parent().parent().parent().parent().remove();
        var kategorija = $jq(this).parent().parent().parent().parent().find('.kategorija').val();
        delete menu[kategorija];
        $jq("td:empty").remove();
    });

    // Brisanje stavke
    $jq("#menu").on('click', 'button.item_remove', function(){
        var kategorija = $jq(this).parent().parent().parent().find('.kategorija').val();
        var id = $jq(this).parent().parent().find('.item_id').val();
        menu = removeFromJson(menu, id, kategorija);
        $jq(this).parent().parent().remove();
        $jq("td:empty").remove();
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

            $jq('#menu').append(
                '<div class="panel-body">\n' +
                '                        <div class="row ">\n' +
                '                        <div class="col-md-2">\n' +
                '                            <div class="cat_show inline">' +
                '                                   <h3 class="cat_name">'+unicodeReplace(kategorija)+
                '                                       <a class="edit_cat" type="button"><span class="dashicons dashicons-edit"></span></a>'+
                '                                       <button class="cat_remove btn btn-sm btn-rounded btn-danger">X</button>\n' +
                '                                   </h3>'+ 
                '                             </div> '+
                '                              <div class="cat_edit_form inline" style="display:none">'+
                '                               <input class="old_cat_name" type="hidden" value="'+kategorija+'" class="form-control"> '+
                '                               <input class="cat_name" type="text" value="'+kategorija+'" class="form-control"><a class="save_cat_change"><span class="dashicons dashicons-yes"></span></a>'+
                '                             </div>'+
                '                        </div>\n' +
                '                            <div class="col-md-10">\n' +
                '                            <div class=" table-responsive">\n' +
                '                                <table class="table table-striped">\n' +
                '                                    <thead>\n' +
                '                                        <tr class="border-bottom-warning border-solid">\n' +
                '                                            <th colspan="2"> Naziv <span class="pull-right">Cena</span></th>\n' +
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
                '                                        <div class="form-group">'+
                '                                             <input type="text" placeholder="Ograničenja" id="ogranicenja_stavke" class="form-control ogranicenja_stavke">'+
                '                                       </div>'+
                '                                        <button class="btn btn-add add_item" id="add_item" type="button">Dodaj stavku</button>\n' +
                '                                    </form>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>');
            $jq('#kategorija').val("");
        }

        $jq("td:empty").remove();
    });

    $jq(document).on('click', '.edit_cat', function(){
        $jq('.save_cat_change').show();
        $jq(this).parent().parent().hide();
        var h3 = $jq(this).parent().parent().parent().find('.cat_show');
        var edit = $jq(this).parent().parent().parent().find('.cat_edit_form');
        h3.hide();
        edit.show();
        $jq("td:empty").remove();

    });

    $jq(document).on('click', '.save_cat_change', function(){
        // var parent = $jq(this);
        var old_cat_name = $jq(this).parent().find('.old_cat_name').val();
        var new_cat_name = $jq(this).parent().find('.cat_name').val();
        // $jq(this).hide();
        // $jq(this).parent().parent().find('cat_name').html(new_cat_name);

        var h3 = $jq(this).parent().parent().parent().find('.cat_show');
        var edit = $jq(this).parent().parent().parent().find('.cat_edit_form');

        h3.find('h3').html(new_cat_name  + '<a class="edit_cat" type="button"><span class="dashicons dashicons-edit"></span></a>'+
                                            '<button class="cat_remove btn btn-sm btn-rounded btn-danger">X</button>\n');

        edit.hide();
        h3.show();

        menu[new_cat_name] = menu[old_cat_name];
        delete menu[old_cat_name];
        $jq("td:empty").remove();
    });

    //Dodavanje stavke
    $jq('#menu').on('click', 'button.add_item', function(){
        var naziv, opis, cena;
        naziv = $jq(this).parent().find('.naziv_stavke').val();
        opis = $jq(this).parent().find('.opis_stavke').val();
        cena = $jq(this).parent().find('.cena_stavke').val();
        searchable_by = $jq(this).parent().find('.searchable_by').val();
        kategorija = $jq(this).parent().find('.kategorija').val();
        ogranicenja = $jq(this).parent().find('.ogranicenja_stavke').val();

        $jq(this).parent().parent().parent().find('.tbody').append(
                '<tr>'+
                    '<td>'+naziv+'<td>'+
                    '<td>'+opis+'<td>'+
                    '<td>'+cena+'<td>'+
                    '<td>'+searchable_by+'<td>'+
                    '<td>'+ogranicenja+'<td>'+                                  
                    '<td>'+
                        '<button class="pull-right item_remove btn btn-sm btn-rounded">X</button>'+
                        '<a class="edit_cat" type="button"><span class="dashicons dashicons-edit"></span></a>'+
                    '<td>'+
                '</tr>'
            );

        $jq(this).parent().find('.cena_stavke').val("");
        $jq(this).parent().find('.opis_stavke').val("");
        $jq(this).parent().find('.naziv_stavke').val("");
        $jq(this).parent().find('.searchable_by').val("");
        $jq(this).parent().find('.ogranicenja_stavke').val("");

        menu[kategorija].Stavke.push({
            id: makeid(),
            Naziv: naziv,
            Opis: opis,
            Cena: cena,
            searchable_by: searchable_by,
            ogranicenja: ogranicenja
        });
    });

    //Cuvanje menija
    $jq('.saveMenu').on('click', function(e){
        var kalkulator_id = $jq('#kalkulator_id').val();
        $jq('.saveMenu').button('loading');
    
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
                    $jq('.saveMenu').button('reset');
                    $jq('#saveSuccessModal').modal('show');
            }, 2000);
                
            },
            error: function (data) {

            }
        });
        // $jq('#menu').append("<input type='hidden' name='items' value='"+JSON.stringify(menu)+"' />");
    });

$jq("td:empty").remove();
});


function removeFromJson(json, id, category)
{
    for(var i = 0; i<json[category].Stavke.length; i++){
        if(json[category].Stavke[i] != null) {
            if (json[category].Stavke[i].id == id) {
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
            '                                            <h3>'+unicodeReplace(kategorija)+'</h3> </div>\n' +
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
        $jq('#menu').append(
            '<div class="panel-body">\n' +
            '                        <div class="row ">\n' +
            '                        <div class="col-md-2">\n' +
                '                            <div class="cat_show inline">' +
                '                                   <h3>'+unicodeReplace(kategorija)+
                '                                       <a class="edit_cat" type="button"><span class="dashicons dashicons-edit"></span></a>'+
                '                                       <button class="cat_remove btn btn-sm btn-rounded btn-danger">X</button>\n' +
                '                                   </h3>'+ 
                '                             </div> '+

                '                              <div class="cat_edit_form inline" style="display:none">'+
                '                               <input class="old_cat_name" type="hidden" value="'+kategorija+'" class="form-control"> '+
                '                               <input class="cat_name" type="text" value="'+kategorija+'" class="form-control"><a class="save_cat_change"><span class="dashicons dashicons-yes"></span></a>'+
                '                             </div>'+
                '                        </div>\n' +
            '                            <div class="col-md-10">\n' +
            '                            <div class=" table-responsive">\n' +
            '                                <table class="table table-striped">\n' +
            '                                    <thead>\n' +
            '                                        <tr class="border-bottom-warning border-solid">\n' +
            '                                            <th>Naziv</th>'+
            '                                            <th>Opis</th>\n' +
            '                                            <th>Cena<th>\n' +
            '                                            <th>Pretraživo po</th>\n' +
            '                                            <th>Ograničenja</th>\n' +
            '                                        </tr>\n' +
            '                                    </thead>\n' +
            '                                    <tbody class="tbody">\n' +
            '                                       <input type="hidden" class="kategorija" value="'+kategorija+'">\n'+
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
            '                                        <div class="form-group">'+
            '                                             <input type="text" placeholder="Ograničenja" id="ogranicenja_stavke" class="ogranicenja_stavke orm-control">'+
            '                                       </div>'+
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

                        $jq(this).parent().append(
                            '<tr>'+
                                '<td>'+json[kategorija][stavke][i].Naziv+'<td>'+
                                '<td>'+json[kategorija][stavke][i].Opis+'<td>'+
                                '<td>'+json[kategorija][stavke][i].Cena+'<td>'+
                                '<td>'+json[kategorija][stavke][i].searchable_by+'<td>'+
                                '<td>'+json[kategorija][stavke][i].ogranicenja+'<td>'+
                                '<td style="display:none;"><input class="item_id" type="hidden" value="'+json[kategorija][stavke][i].id+'"></td>'+                                
                                '<td>'+
                                    '<button class="pull-right item_remove btn btn-sm btn-rounded">X</button>'+
                                    '<a class="edit_item" type="button"><span class="dashicons dashicons-edit"></span></a>'+
                                '<td>'+
                            '</tr>'+


                            '<tr class="item_input" style="display:none;">'+
                                '<td><input class="item_name" type="text" value="'+json[kategorija][stavke][i].Naziv+'"></td>'+
                                '<td><input class="item_desc" type="text" value="'+json[kategorija][stavke][i].Opis+'"></td>'+
                                '<td><input class="item_price" type="text" value="'+json[kategorija][stavke][i].Cena+'"></td>'+
                                '<td><input class="item_searchable" type="text" value="'+json[kategorija][stavke][i].searchable_by+'"></td>'+
                                '<td><input class="item_ogranicenja" type="text" value="'+json[kategorija][stavke][i].ogranicenja+'"></td>'+
                                '<td style="display:none;"><input class="item_id" type="hidden" value="'+json[kategorija][stavke][i].id+'"></td>'+
                                '<td style="display:none;"><input class="item_cat" type="hidden" value="'+kategorija+'"></td>'+
                                '<td><a class="save_item_change"><span class="dashicons dashicons-yes"></span></a></td>'+
                            '</tr>'
                            );
                    }
                });
            }
        }
    }
}


$jq(document).on('click', '.edit_item', function(){
    var row = $jq(this).parent().parent();
    var input_row = row.closest('tr').next('tr');
    row.hide();
    input_row.show();

});

$jq(document).on('click', '.save_item_change', function(){

    var input_row = $jq(this).parent().parent();
    var row = input_row.closest('tr').prev('tr');

    var id = $jq(this).parent().parent().find('.item_id').val();
    var cat = $jq(this).parent().parent().find('.item_cat').val();
    var name = $jq(this).parent().parent().find('.item_name').val();
    var desc = $jq(this).parent().parent().find('.item_desc').val();
    var price = $jq(this).parent().parent().find('.item_price').val();
    var searchable_by = $jq(this).parent().parent().find('.item_searchable').val();
    var ogranicenja = $jq(this).parent().parent().find('.item_ogranicenja').val();

    menu[cat].Stavke

    for (var i = 0; i < menu[cat].Stavke.length; i++){
      // look for the entry with a matching `code` value
      if (menu[cat].Stavke[i].id == id){

         menu[cat].Stavke[i].Naziv = name;
         menu[cat].Stavke[i].Opis = desc;
         menu[cat].Stavke[i].Cena = price;
         menu[cat].Stavke[i].searchable_by = searchable_by;
         menu[cat].Stavke[i].ogranicenja = ogranicenja;

         break;
      }
    }

    input_row.hide();
    row.show();
    $jq('#menu').empty();
    populateMenuModal(menu);

    $jq("td:empty").remove();
});

function spojiNazivKategorije(name){
    var array = name.split(" ");
    var full_name = "";
    for(var i = 0; i < array.length; i++){
        full_name += array[i];
    }
    return full_name;
}


function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 15; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


function unicodeReplace(string){

    var niz = {
        "U+0160":"Š",
        "U0160":"Š",
        "u0160":"Š",

        "U+0161":"š",
        "U0161":"š",
        "u0161":"š",

        "U+017D":"Ž",
        "U017D":"Ž",
        "u017D":"Ž",
        "u017d":"Ž",

        "U+017E":"ž",
        "U017E":"ž",
        "u017E":"ž",
        "u017e":"ž",

        "U+0110":"Đ",
        "U0110":"Đ",
        "u0110":"Đ",

        "U+0111":"đ",
        "U0111":"đ",
        "u0111":"đ",

        "U+0106":"Ć",
        "U0106":"Ć",
        "u0106":"Ć",

        "U+010D":"č",
        "U010D":"č",
        "u010d":"č",

        "U+010C":"Č",
        "U010C":"Č",
        "u010c":"Č",
    };

    for(var item in niz){
       string = string.replace(item, niz[item]);
    }

    return string;


    $jq("td:empty").remove();
}