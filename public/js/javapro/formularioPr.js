$(document).ready(function() {
    $("input[type=radio]").change(function() {
        var preguntaId = $(this).attr("name").replace("respuesta_", "");
        var comentarioTextarea = $("#comentario_" + preguntaId);

        if ($(this).val() === "0") {
            comentarioTextarea.prop("disabled", false);
        } else {
            comentarioTextarea.prop("disabled", true);
        }
    });
});