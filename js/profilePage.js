
function editProfilePhoto(input) {
        var inputFiles = input.files;
        for (var i = 0; i < inputFiles.length; i++) {           
            var profilePhoto = inputFiles[i];     
            if (!profilePhoto .type.match('image.*')) {
                continue;
            }   
            var img=document.getElementById("profileThumbnail");            
            img.file = profilePhoto ;    
            var reader = new FileReader();
            reader.onload = (function(profileThumbnail) { 
                return function(e) { 
                    profileThumbnail.src = e.target.result; 
                }; 
            })(img);
            reader.readAsDataURL(profilePhoto);
        }    
    }


var sb = new SendBird({
    appId: E998E2D1-D9C3-4386-997A-20BA0DED6807;
});