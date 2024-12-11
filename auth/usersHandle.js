// data.js

let checkUsers = (user, pass)=>
{
    fetch("../b-day_Celebration_bot/auth/users.json")
  .then(response => response.json()) // Parse the JSON
  .then(data => {
    console.log(data.users.length); 
    // using loop to check the existance of the user
    for(let i = 0; i<data.users.length; i++)
    {
        if (user.toLowerCase() ==data.users[i].username && pass.toLowerCase()== data.users[i].password )
            {
                localStorage.setItem("username",user);
                localStorage.setItem("id",data.users[i].id);
                localStorage.setItem("qid",1);
                window.location.href ="./b-day_Celebration_bot/loader.html";
            }
            else{
                alert("Invalid Credentials!");
            }
    }

   
			


  })
  .catch(error => console.error('Error loading JSON:', error));
};






function myFunction() {

	document.getElementById("popup").click();
	document.getElementById("next").addEventListener("click",()=>{

		
		names = document.getElementById("name").value;
		dob = document.getElementById("dob").value;
		console.log(dob);

		if (names.length >0 && dob.length >0)
		{
			checkUsers(names,dob);

			
		}
		else
		{
			alert("Please Fill the data to Authenticate!");
		}

	})



}

setTimeout(myFunction, 5000);
