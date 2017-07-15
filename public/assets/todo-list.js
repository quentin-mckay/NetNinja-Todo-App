$(document).ready(function(){

    $('form').on('submit', function(event) {
        // event.preventDefault();

        var item = $('form input');
        var todo = {item: item.val()};

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function(data){
              // or perhaps do something with the data via front-end framework
              location.reload();
            }
        });

        // this prevents form's default GET method from firing
        // or use event.preventDefault above
        return false;

    });

    $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
    });

});
