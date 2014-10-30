function retornarPersonas()
{
  /* set no cache */
  $.ajaxSetup({ cache: false });
  $.getJSON("/HelloWorld/Personas.json", function(data){
    var html = [];

    /* loop through array */
    $.each(data, function(index, d){
      html.push("<li id=\"persona\"> <b> Nombre : </b> ", d.Nombre, "<p><b> F.Nac : </b>" ,
                d.FNac , " <b> F.Def : </b> " , d.FDec ,"</p></li>");
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
        width: 600,
        height: 200,
        model: graph
    });

    $.ajaxSetup({ cache: false });
    $.getJSON("/HelloWorld/Personas.json", function(data){

       $.each(data, function(index, d){
          graph.addCells([nuevaCaja(d.Nombre)]);
        });

    }).error(function(jqXHR, textStatus, errorThrown){ /* assign handler */
    /* alert(jqXHR.responseText) */
      alert("error occurred!");
    });
}

function nuevaCaja(nombre, fnac, fdec) {

  var rect = new joint.shapes.basic.Rect({
    position: { x: 100, y: 30 },
    size: { width: 150, height: 60 },
    attrs: { rect: { fill: 'red' }, text: { text: nombre.replace(/\s/g,"\n"), fill: 'white' } }
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

