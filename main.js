$(document).ready(function (){
  $("#btn382").click(function(){
    retornarPersonas();
  });
  $("#btn383").click(function(){
    retornarArbol();
  });
  $("#btn384").click(function(){
    retornarArbol2();
  });
  $("#btn385").click(function(){
    retornarBusqueda();
  });
   $("#btn386").click(function(){
  //  carga('nuevo.html', 'div381');
    modal('nuevo.html');
  });
  $("#edbuscar").keypress(function(){
    retornarBusqueda();
  });


});

function retornarPersonas()
{
  /* set no cache */
  $.ajaxSetup({ cache: false });
  $.getJSON("/HelloWorld/Personas.json", function(data){
    var html = [];

    /* loop through array */
    $.each(data, function(index, d){
      html.push("<li id=\"persona\"> <b> Nombre : </b> ", d.Nombre, "<p><b> Apellidos : </b>", d.Apellidos,
                "</p><p><b> F.Nac : </b>" , d.FNac , "</p> <p><b> F.Def : </b> " , d.FDec ,"</p></li>");
    });


    $("#div381").html(html.join(''))
  }).error(function(jqXHR, textStatus, errorThrown){ /* assign handler */
    /* alert(jqXHR.responseText) */
    alert("error occurred!");
    });
}

function retornarArbol()
{
    var graph = new joint.dia.Graph;
    /*Fondo para graficos*/
    var paper = new joint.dia.Paper({
        el: $('#myholder'),
       // width: 800,
        //height: 200,
        model: graph
    });
    var i = 0;

    $.ajaxSetup({ cache: false });
    $.getJSON("/HelloWorld/Personas.json", function(data){

       $.each(data, function(index, d){
          graph.addCells([nuevaCaja(d.Nombre, d.Apellidos, i)]);
          i++;
        });

    }).error(function(jqXHR, textStatus, errorThrown){ /* assign handler */
    /* alert(jqXHR.responseText) */
      alert("error occurred!");
    });
}

function nuevaCaja(nombre, apellidos, i) {

  var rect = new joint.shapes.basic.Rect({
    position: { x: 50+((i%4)*160), y: 30 + (Math.trunc(i/4)*65) },
    size: { width: 150, height: 60 },
    attrs: { rect: { fill: 'red' }, text: { text: nombre + "\n" +apellidos, fill: 'white' } }
  });

  return rect;
}

function retornarArbol2()
{
    var graph = new joint.dia.Graph;
    /*Fondo para graficos*/
    var paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: 600,
        height: 200,
        model: graph
    });
    /*Una caja*/
    var rect = new joint.shapes.basic.Rect({
        position: { x: 100, y: 30 },
        size: { width: 100, height: 30 },
        attrs: { rect: { fill: 'red' }, text: { text: 'Prueba', fill: 'white' } }
    });
    /*otra caja*/
    var rect2 = rect.clone();
    rect2.translate(300);

    /*Linea de union*/
    var link = new joint.dia.Link({
        source: { id: rect.id },
        target: { id: rect2.id }
    });

    graph.addCells([rect, rect2, link]);
}

function busqueda()
{

  $( "li" )
  .filter(function( index ) {

  var textbus = $("#edbuscar").val();

  $( "li:contains(" + textbus +")" ).css( "text-decoration", "underline" );
  })
    .css( "border-color", "red" );
}

function retornarBusqueda()
{
  /* set no cache */
  $.ajaxSetup({ cache: false });
  $.getJSON("/HelloWorld/Personas.json", function(data){
    var html = [];
    var textbus = $("#edbuscar").val();

    /* loop through array */
    $.each(data, function(index, d){
      var str = d.Nombre+" "+d.Apellidos;

      if (str.toLowerCase().indexOf(textbus.toLowerCase()) >= 0) {
        html.push("<li id=\"persona\"> <b> Nombre : </b> ", d.Nombre, "<p><b> Apellidos : </b>", d.Apellidos,
                  "</p><p><b> F.Nac : </b>" , d.FNac , "</p> <p><b> F.Def : </b> " , d.FDec ,"</p></li>");
      }
    });


    $("#div381").html(html.join(''))
  }).error(function(jqXHR, textStatus, errorThrown){ /* assign handler */
    /* alert(jqXHR.responseText) */
    alert("error occurred!");
    });
}


function carga(url,id){
var pagecnx = createXMLHttpRequest();
pagecnx.onreadystatechange=function(){
  if (pagecnx.readyState == 4 &&
     (pagecnx.status==200 || window.location.href.indexOf("http")==-1))
	 document.getElementById(id).innerHTML=pagecnx.responseText;
  }
  pagecnx.open('GET',url,true)
  pagecnx.send(null)
}

function createXMLHttpRequest(){
var xmlHttp=null;
if (window.ActiveXObject) xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
else if (window.XMLHttpRequest)
	     xmlHttp = new XMLHttpRequest();
return xmlHttp;
}

function modal(url) {
  $("#div381").append("<div id=\"dialog\" style=\"display: none\"></div>")

  carga('nuevo.html', 'dialog');

  $('#dialog').fadeIn('slow');
        $('.popup-overlay').fadeIn('slow');
        $('.popup-overlay').height($(window).height());

}

