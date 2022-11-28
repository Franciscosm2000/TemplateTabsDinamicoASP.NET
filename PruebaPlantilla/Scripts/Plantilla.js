let tabCounter = 1;
var contenedorTabNodos = $('#tabNodos');

var c = {
    contenedorTab: $('#tabContenedor'),
    TabItems: $('#tabNodos'),
    scrollBarWidths: 40
}

$("body").on('click', '.add_tab', function (e) {
    e.preventDefault();

    var Existe_Elemento = "#div_" + $(this).data("id");

    if ($(Existe_Elemento).length) {
        $('#tabNodos li.active').removeClass('active');
        $('.tab-content div').first().removeClass('active in');
        // Si el elemento existe agregar clase active.
        $("#div_" + $(this).data("id")).addClass('active');

        $("a[href='" + Existe_Elemento + "']").parent('li').addClass('active');
        $("#Ruta").text($("a[href='" + Existe_Elemento + "']").data('ruta'));
    }
    else {


        var href = $(this).data("url");
        if (href != undefined && href.length > 0) {
            var nombre = $(this).html();
            CreateTab($(this).data("id"), nombre, $(this).data("url"), $(this).data("descripcion"), $(this).data("ruta"));
            //reAdjust();
        }
    }
});

contenedorTabNodos.on('click', 'span.closeTab', function () {
    CloseTab($(this))
});

contenedorTabNodos.on('click', 'span.refreshTab', function () {
    refreshTabEvent($(this))
});

function CreateTab(id, name, href, descripcion, ruta) {
    //name = "prueba" + tabCounter;
    //tabCounter += 1;
    //id = tabCounter;
    //descripcion = "esto es una prueba";
    c.contenedorTab.find('div.tab-general').siblings().removeClass('show');
    c.contenedorTab.find('div.tab-general').first().removeClass('show active');
    c.contenedorTab.find('div.tab-general').siblings().removeClass('active');

    c.TabItems.find('li').removeClass('active').attr('aria-selected', 'false');


    var li = $('<li></li>').addClass('nav-item active')
    var a = $('<a></a>').addClass('nav-link').html(name)
    a.attr('href', '#div_' + id)
    a.attr('aria-controls', 'div_' + id)
    a.attr('id', id);
    a.attr('data-toggle', 'tab');
    a.attr('role', 'tab')
    a.attr('aria-selected', 'true');
    a.attr('data-descripcion', descripcion);
    a.attr('data-ruta', ruta);
    a.attr('data-accion', ".");
    a.append('<span  class="tabAction la la-sync refreshTab"></span>')
    a.append('<span class="la la-close tabAction closeTab"></span>')

    li.append(a)
    c.TabItems.append(li)

    var div = $('<div></div>').addClass("tab-pane tab-general active");
    div.attr('role', 'tabpanel');
    div.attr('id', "div_" + id);
    div.attr('aria-labelledby', id)
    div.html('<h2>' + "Cargando...." + tabCounter + '</h2>')
    c.contenedorTab.append(div);
    var baseUrl = '@Url.Content("~")';
    if (!baseUrl.endsWith("/")) baseUrl += "/";

    $.get(href, function (data) {

        receptorhtml = data;
    }).fail(function (data) {

        switch (data.status) {
            case 500:
                receptorhtml = error500();
                break;
            case 404:
                receptorhtml = error404();
                break;
            default:

        }
    }).always(function () {
        setTimeout(function () {
            $("#div_" + id).html(receptorhtml);
        }, 300);
    });

    //var ul = tabs.find('ul');
    //tabCounter = ul.length + 1;
    //alert(tabCounter);
    //$("<li><a href='#" + tabCounter + "'>New Tab</a> </li>").appendTo(ul);
    //$("<div id='" + tabCounter + "'>HOLA</div>").appendTo(tabs);
    //tabs.tabs("refresh");
    //tabs.tabs("option", "active", 1);

};

function CloseTab (t) {
    var $this = t;
    var a = $this.closest('a');
    var idTab = a.attr('href');
    var index = $this.parent('a').parent('li').index();

    $('#Ruta').text('');
    $('#AccionFormulario').text('');

    a.closest('li').remove();
    c.contenedorTab.find(idTab).remove();
    if (c.TabItems.find('li').length > 0) {
        if (index > 0) {
            var nodo = $("#tabNodos li").eq(index - 1);

            var Existe_Elemento = $(nodo).find('a').attr('href');
            c.TabItems.find('li.active').removeClass('active');
            c.contenedorTab.find('div').first().removeClass('active show');
            // Si el elemento existe agregar clase active.
            $(Existe_Elemento).addClass('active');

            $("a[href='" + Existe_Elemento + "']").parent('li').addClass('active');
            $('#Ruta').text($("a[href='" + Existe_Elemento + "']").data('ruta'));
            $('#AccionFormulario').text($("a[href='" + Existe_Elemento + "']").data('accion'));


        } else {
            var nodo = c.TabItems.find("li").eq(index);
            var Existe_Elemento = $(nodo).find('a').attr('href');
            c.TabItems.find('li.active').removeClass('active');
            c.contenedorTab.find('div').first().removeClass('active show');
            // Si el elemento existe agregar clase active.
            $(Existe_Elemento).addClass('active show');
            var elementoTemp = $("a[href='" + Existe_Elemento + "']");
            $("a[href='" + Existe_Elemento + "']").parent('li').addClass('active');
        }
    }

};

function refreshTabEvent(t) {
    var receptorhtml = null;
    var baseUrl = "";
    var _this = t;
    var link = _this.closest('a');
    var idFormulario = link.attr('href').substring(5);
    var url = ($('.sidebar-menu').find("[data-id='" + idFormulario + "']")).data("url");

    $.get(baseUrl + url, function (data) {
        receptorhtml = data;
    }).fail(function (data) {
        switch (data.status) {
            case 500:
                receptorhtml = error500();
                break;
            case 404:
                receptorhtml = error404();
                break;
            default:

        }
    }).always(function () {
        $("#div_" + idFormulario).html(receptorhtml);
        //$("#div_" + idFormulario).find('table.table').addClass('table-striped')
    });
};

function error500 () {
    return '<center style="width: 31%; margin: 0 auto;margin-top: 10px;">' +
        '<div class="m-portlet m-portlet--tab">' +
        '<div class="m-portlet__head">' +
        '<div class="m-portlet__head-caption">' +
        '<div class="m-portlet__head-title">' +
        '<span class="m-portlet__head-icon m--hide">' +
        '<i class="la la-gear"></i>' +
        '</span>' +
        '<h3 class="m-portlet__head-text">' +
        'Error 505 - Looks like we are having some server issues.' +
        '</h3>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="m-portlet__body">' +
        ' Go back to the previous page and try again.' +
        '</br>' +
        'If you think something is broken, report a problem.' +
        '</div>' +
        '</div>' +
        '</center>'

};

function error404() {
    return '<center style="width: 31%; margin: 0 auto;margin-top: 10px;">' +
        '<div class="m-portlet m-portlet--tab">' +
        '<div class="m-portlet__head">' +
        '<div class="m-portlet__head-caption">' +
        '<div class="m-portlet__head-title">' +
        '<span class="m-portlet__head-icon m--hide">' +
        '<i class="la la-gear"></i>' +
        '</span>' +
        '<h3 class="m-portlet__head-text">' +
        'Error 404 - the page you are looking for does not exist.' +
        '</h3>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="m-portlet__body">' +
        'You may want to head back to the homepage.' +
        '</br>' +
        'If you think something is broken, report a problem.' +
        '</div>' +
        '</div>' +
        '</center>'
};
