var state = {
    person: 0,
    buttons: [],
    
};

state.buttons = ['baboon',  'cheetah', 'chimpanzee', 'eland', 'elephant', 'giraffe', 'gazelle', 'zebra', 'hippopotamus', 'hyena', 'crocodile', 'leopard', 'lion', 'gorilla', 'rhinoceros'];

function createButton() {
       
    for (i = 0; i < state.buttons.length; i++){

    $('#button').append("<button class='button' data-person='" + state.buttons[i] + "'>" + state.buttons[i]);
    
    }

    createPerson();
}

$('.submit').on('click', function (event){
    event.preventDefault();

    var button = $('#add').val();

    if ((button != "") && (state.buttons.indexOf(button)===-1)) {
        state.buttons.push(button);
        remove();
        createButton();
        createOnClick(button);
    }
});

function remove(){
    $('.button').remove();
}

function createPerson(){

    $(".button").on("click", function() {
    
     $('.gif').remove();
        
    var person = $(this).attr("data-person");

    createOnClick(person);
    
    });
}
 
function createOnClick (animal){

    $('.gif').remove();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=UzH43GWKAIhgjK0qyZ4SXDlP82hvUprd&limit=20";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })
             
            .done(function(response) {
                
            var results = response.data;
            console.log(queryURL);
            console.log(response);
              
            for (var i = 0; i < results.length; i++) {
        
                    var personImage = $("<img>");
        
                    personImage.attr("src", results[i].images.fixed_height_small_still.url);
                    personImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    personImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    personImage.attr("data-state", "still");
                    personImage.attr("class", "gif");
        
                    $("#gifs-appear-here").append(personImage);
               
            }
            createOnClickGif();
            });
             
 }

function createOnClickGif (){
    
    $(".gif").on("click", function() {
     
        var state = $(this).attr("data-state");
     
        if (state === "still") {
           $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            $(this).attr("class", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            $(this).attr("class", "gif");
            }
    });
}

createButton();

var images=new Array('assets/image.jpg', 'assets/image1.jpg','assets/image2.jpg','assets/image3.jpg','assets/image4.jpg','assets/image5.jpg','assets/image6.jpg','assets/image7.jpg','assets/image8.jpg');
var nextimage=0;

doSlideshow();

function doSlideshow()
{
    if($('.slideshowimage').length!=0)
    {
        $('.slideshowimage').fadeOut(500,function(){slideshowFadeIn();$(this).remove()});
    }
    else
    {
        slideshowFadeIn();
    }
}
function slideshowFadeIn()
{
    $('.slideshow').prepend($('<img class="slideshowimage" src="'+images[nextimage++]+'" style="display:none">').fadeIn(500,function(){setTimeout(doSlideshow,10000);}));
    if(nextimage>=images.length)
        nextimage=0;
}