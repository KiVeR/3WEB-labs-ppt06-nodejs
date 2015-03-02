$( document ).ready(function() {
    $('.myDiv').click(function(){
        var id = $(this).attr('data-id');
        $.ajax({
            url: 'http://localhost:1337/delete/'+id,
            type: 'DELETE',
            success: function(response) {
                console.log(response);
                $(this).remove();
            }
        });
    });
});