// // Handle the "Send" button click
// document.getElementById("send").addEventListener("click", async () => {
//     let input = document.getElementById("request").value.trim();
//     if (input.length > 0) {
//         document.getElementsByClassName("chat-box")[0].innerHTML +=
//             `<div class="message right">${input}</div>`;
//         document.getElementById("request").value = "";

//         // Process the input and fetch the response
//         await responseWithQuestions(input);
//     } else {
//         alert("Please enter something!");
//     }
// });


document.getElementById("send").addEventListener("click", async () => {
    let input = document.getElementById("request").value.trim();
    if (input.length > 0) {
        document.getElementsByClassName("chat-box")[0].innerHTML +=
            `<div class="message right">${input}</div>`;
        document.getElementById("request").value = "";

        // Add thinking animation
        addThinkingAnimation();

        // Simulate processing time (2 seconds) and fetch response
        setTimeout(async () => {
            removeThinkingAnimation();
            await responseWithQuestions(input);
        }, 2000);
    } else {
        alert("Please enter something!");
    }
});

// Add thinking animation
const addThinkingAnimation = () => {
    document.getElementsByClassName("chat-box")[0].innerHTML += `
        <div class="message left thinking">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>`;
};

// Remove thinking animation
const removeThinkingAnimation = () => {
    const thinkingElement = document.querySelector(".thinking");
    if (thinkingElement) {
        thinkingElement.remove();
    }
};





// ---------------------------------------------------------------------------------
// Render the current question based on qid
let renderCurrentQuestion = async () => {
    try {
        const response = await fetch("../auth/sample.json");
        const data = await response.json();
        let qsid = parseInt(localStorage.getItem("qid") || "1");

        for (let i = 0; i < data.length; i++) {
            if (data[i].qid === qsid) {
                document.getElementsByClassName("chat-box")[0].innerHTML +=
                    `<div class="message left">${data[i].question}</div>`;
                return;
            }
        }

        // Reset the qid if no more questions are available
        localStorage.setItem("qid", 1);
    } catch (error) {
        console.error("Error loading JSON:", error);
    }
};


// ------------------------------------------------------------------------------
// Fetch and handle questions and answers
let findQandA = async (stat) => {
    try {
        const response = await fetch("../auth/sample.json");
        const jsonData = await response.json();
        let qsid = parseInt(localStorage.getItem("qid") || "1");
        let res = { question: "", ans: "", url: "" };

        for (let i = 0; i < jsonData.length; i++) {
            if (jsonData[i].qid === qsid) {
                res.question = jsonData[i].question;
                res.url = jsonData[i].answer[0].url;

                if (stat === "Y") {
                    res.ans = jsonData[i].answer[0].yes;
                } else if (stat === "N") {
                    res.ans = jsonData[i].answer[0].no;
                }
            }
        }

        // Insert Q&A into users.json
        insertQandA(localStorage.getItem("id"), res.question, res.ans);

        return res;
    } catch (error) {
        console.error("Error loading JSON:", error);
        return null;
    }
};


// ===========================================================================
// Response and Question Flow Logic
let responseWithQuestions = async (query) => {
    let words = query.toLowerCase().split(" ");
    let positive = ["good", "fine", "well", "yes"];
    let negative = ["notgood", "notwell", "bad", "not", "notfine", "no"];
    let pos_count = words.filter(word => positive.includes(word)).length;
    let neg_count = words.filter(word => negative.includes(word)).length;

    let stat = pos_count > 0 && neg_count === 0 ? "Y" : neg_count > 0 ? "N" : null;

    if (stat) {
        let data = await findQandA(stat);

        // Display the answer and link
        document.getElementsByClassName("chat-box")[0].innerHTML +=
            `<div class="message left">${data.ans}</div>`;
        document.getElementsByClassName("chat-box")[0].innerHTML +=
            `<div class="message left"> 
                <a class="btn btn success" style="background-color:pink" href="${data.url}" target="_blank">View</a>
            </div>`;

        // Increment the qid and fetch the next question after 2 seconds
        localStorage.setItem("qid", parseInt(localStorage.getItem("qid")) + 1);
        setTimeout(() => {
            renderCurrentQuestion();
        }, 10000);
    } else {
        // Unrecognized input
        document.getElementsByClassName("chat-box")[0].innerHTML +=
            `<div class="message left">Oops! I can't understand.</div>`;
    }
};

// Insert Q&A into users.json
let insertQandA = (userId, question, answer) => {
    fetch("../auth/users.json")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.users.length; i++) {
                if (data.users[i].id == userId) {
                    let k = data.users[i].query[0].question.length;
                    data.users[i].query[0].question[k] = question;
                    data.users[i].query[0].answer[k] = answer;
                }
            }
        })
        .catch(error => console.error("Error updating users.json:", error));
};

// Initial Render of First Question
renderCurrentQuestion();
