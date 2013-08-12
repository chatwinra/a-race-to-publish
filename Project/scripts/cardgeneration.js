<script>
	var picArray2 = [];
				function changeImage(){
 				var pic = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
 
				
				
				picArray2[0] ={src: "//localhost/Users/richardchatwin/MP-website-test/RonaldRoss.png", reputation: 1};
				
				picArray2[1] ={src: "//localhost/Users/richardchatwin/MP-website-test/DimitriMendeleev.png", reputation: 9};

				picArray2[2] ={src: "//localhost/Users/richardchatwin/documents/Science-game/poachlabmamber2.jpg", reputation: 1};

				picArray2[3] ={src: "//localhost/Users/richardchatwin/documents/Science-game/labteam.jpg", reputation: 9};
				
				
				document.getElementById("image_container").innerHTML = "<img src='" + picArray2[pic].src + "'/>";
			
			}
				  
				
				</script>

<script>
	function changeImageAI(){
				
 				var pic = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
 
				
				var picArray = [];
				picArray[0] ={src: "//localhost/Users/richardchatwin/MP-website-test/RonaldRoss.png", reputation: 4};
				
				picArray[1] ={src: "//localhost/Users/richardchatwin/MP-website-test/DimitriMendeleev.png", reputation: 2};

				picArray[2] ={src: "//localhost/Users/richardchatwin/documents/Science-game/poachlabmamber2.jpg", reputation: 2};

				picArray[3] ={src: "//localhost/Users/richardchatwin/documents/Science-game/labteam.jpg", reputation: 3};
				
				document.getElementById("image_containerAI").innerHTML = "<img src='" + picArray[pic].src + "'/>";


				if(picArray[pic].reputation < picArray2[pic].reputation){
					document.getElementById("result").innerHTML = "You Win!";
				}else{
					document.getElementById("result").innerHTML = "You Lose";
				}
}

      

	</script>
 <script src="jquery-1.10.2.js"></script>
 <script src="jquery.csv-0.71.js"></script>
 	<script>
function convert(){
var result = $.csv.toObjects("scientist-card-data-raw.csv");
document.getElementById("scientistdata").innerHTML = "<p>" + result + "</p>";
}
</script>
