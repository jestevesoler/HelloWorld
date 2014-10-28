function retornarPersonas()
{
  /* set no cache */
  $.ajaxSetup({ cache: false });
  $.getJSON("/HelloWorld/Personas.json", function(data){
    var html = [];

    /* loop through array */
    $.each(data, function(index, d){
      html.push("<li> <b> Nombre : </b> ", d.Nombre, "<b> F.Nac : </b>" ,
                d.FNac , " <b> F.Def : </b> " , d.FDec ,"</li>");
    });


    $("#div381").html(html.join(''))
  }).error(function(jqXHR, textStatus, errorThrown){ /* assign handler */
    /* alert(jqXHR.responseText) */
    alert("error occurred!");
    });
}