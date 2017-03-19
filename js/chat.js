    
    
    $(document).ready(function(e) {
    
     $( "#messageBox" ).keyup(function() {
  		var message = $( "#messageBox" ).val();
  		 $("#sendButton").click(function(){
  		  $("#receivedMessage").text(message);
  		  $("#messageBox" ).val('');
  		    var imgUrl = $(this).data('rel');
        $("#senderPic").html("<img src='" + imgUrl + "' alt='description' style='width:64px;height:64px; border-radius: 50%; float:left'/>");  		 
		});

   });
   		
});