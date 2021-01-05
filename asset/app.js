
   
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('canvas');
var btncan = document.getElementById('btncan');
var can = document.getElementById('can');
var bgimg = document.getElementById('img');
var image = new Image();


function handleImage(e){
	can.style="display:block";
  var reader = new FileReader();
  reader.onload = function(event){
     
      image.src = event.target.result;
      image.onload = function(){
        updateimage()
        
      }
    
    
     
  }
  reader.readAsDataURL(e.target.files[0]);     
}





function updateimage()
{
	var img1 = document.getElementById('img4');
	 
	 
   	canvas.width = 4201;
   	canvas.height = 2401;
   	var userw = image.width;
   	var userh = image.height;
   	var imagex=300;
   	var imagey=670;
   	if(image.width!=760)
   	{
   		var xper=(1090*100)/image.width;
   		userw=image.width*xper/100;
   		userh=image.height*xper/100;

   		var padd=0;
       	if(userh>1090)
   		{
   			padd=(userh-1090)/2
   			imagey=imagey-padd
   		}
   		if(userh<1090)
   		{
   			padd=(1090-userh)/2
   			imagey=imagey+padd
   		}
   	}
   	
 

   	
   	var ctx = canvas.getContext('2d');
   	ctx.drawImage(image, imagex,imagey,userw, userh); 
	   ctx.drawImage(img1, 0, 0,4201,2401);
	   img1.style="display:none;"
	   bgimg.style="display:none;"
	   btncan.style="display:block;"
}
btncan.addEventListener("click",()=>{
	download(canvas, 'myposter.png');
	btncan.style="display:none;"
	
})

function download(canvas, filename) {
	/// create an "off-screen" anchor tag
	var lnk = document.createElement('a'), e;
  
	/// the key here is to set the download attribute of the a tag
	lnk.download = filename;
  
	/// convert canvas content to data-uri for link. When download
	/// attribute is set the content pointed to by link will be
	/// pushed as "download" in HTML5 capable browsers
	lnk.href = canvas.toDataURL("image/png;base64");
  
	/// create a "fake" click-event to trigger the download
	if (document.createEvent) {
	  e = document.createEvent("MouseEvents");
	  e.initMouseEvent("click", true, true, window,
					   0, 0, 0, 0, 0, false, false, false,
					   false, 0, null);
  
	  lnk.dispatchEvent(e);
	} else if (lnk.fireEvent) {
	  lnk.fireEvent("onclick");
	}
  }
