
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