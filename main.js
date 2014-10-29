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