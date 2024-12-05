

function myFunction() {

	document.getElementById("popup").click();
	document.getElementById("next").addEventListener("click",()=>{

		
		names = document.getElementById("name").value;
		dob = document.getElementById("dob").value;
		console.log(dob);

		if (names.length >0 && dob.length >0)
		{
			// check the data
			if ((names.toLowerCase() =="srijita" || names.toLowerCase()=='srijita nanda'|| names.toLowerCase() == 'srijitananda') && dob == '2000-12-17')
			{
				window.location.href ="../loader.html";
			}
			else{
				alert("Invalid Credentials!");
			}

			
		}
		else
		{
			alert("Please Fill the data to Authenticate!");
		}

	})



}

setTimeout(myFunction, 5000);
