document.getElementById("send").addEventListener("click",()=>{

    let input  = document.getElementById("request").value;
    let res = input;
    if(input.length >0)
    {
        document.getElementsByClassName("chat-box")[0].innerHTML += 
        `<div class="message right">${input}</div>`;
        document.getElementById("request").value=" ";


        // add logics to handle things
        responseWithQuestions(res);
    }
    else
    {
        alert("Please enter something!");
    }


});


let responseWithQuestions = (query)=>{
    words = query.toLowerCase().split(" ");
    positive = ["good", "fine", "well"];
    negative =["notgood","notwell","bad","not","notfine"];
    let pos_count =0;
    let neg_count =0;

    // Questions Preparations 
    questions =["How are you feeling today ?",
                "Are you felling better ?",
                "Felling excited. right? ",
                "Sudip will not be well, if you said like this."
    ]

    // aadding not with words
    for(let k = 0; k<words.length;k++)
    {
        if(words[k]=="not" && (words[k+1]== "good" || words[k+1]== "fine" || words[k+1]== "well"))
        {
            words[k+1] = `${words[k]}${words[k+1]}`;
        }
    }



    // checking positive word count
    for(let i=0; i<words.length;i++)
    {
        for(let j = 0; j<positive.length;j++)
        {
            if(words[i]==positive[j])
            {
                pos_count++;
            }
        }
    }

    // checking negative word count
    for(let i=0; i<words.length;i++)
        {
            for(let j = 0; j<negative.length;j++)
            {
                if(words[i]==negative[j])
                {
                    neg_count++;
                }
            }
        }


    // rendering responses
    if(pos_count>0 && neg_count ==0)
    {
        document.getElementsByClassName("chat-box")[0].innerHTML += 
        `<div class="message left">Trying</div>`;

    }
    else if(pos_count ==0 && neg_count>0)
    {

        document.getElementsByClassName("chat-box")[0].innerHTML += 
        `<div class="message left">Oh No ! I am here to make your mood!</div>`;

        // please add a time Interval
        document.getElementsByClassName("chat-box")[0].innerHTML += 
        `<div class="message left">Check your memories
        <a class="btn btn success" style="background-color:pink" href ="../memories.html" >View</a></div>`;

    }
    else
    {
        document.getElementsByClassName("chat-box")[0].innerHTML += 
        `<div class="message left">Oops! I can't understand.</div>`;
    }

}