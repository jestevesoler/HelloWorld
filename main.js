<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
$(document).ready(function (){
    $("#btn382").click(function(){
        /* set no cache */
        $.ajaxSetup({ cache: false });
        $.getJSON("/HelloWorld/Personas.json", function(data){
            var html = [];

            /* loop through array */
            $.each(data, function(index, d){
                html.push("<b> Nombre : </b> ", d.Nombre, "<b> F.Nac : </b>" ,
                            d.FNac , " <b> F.Def : </b> " , d.FDec ,"<br>");
            });


            $("#div381").html(html.join(''))
        }).error(function(jqXHR, textStatus, errorThrown){ /* assign handler */
            /* alert(jqXHR.responseText) */
            alert("error occurred!");
        });
    });
});