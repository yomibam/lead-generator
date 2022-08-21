let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

// retrieving "array as string" from the local storage and converting back to array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

// retaining save input
if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)   
    })
    
})

function render(leads) {
    let listItems = ""

    for(let i = 0; i < leads.length; i++) {
    
        // lists inputs into the DOM
        listItems +=  `
            <li>
                <a href = '${leads[i]}' target = '_blank'> ${leads[i]} </a>
            </li>
            `
    }
        ulEl.innerHTML = listItems
                            
   }


// deletes inputs from local storage, arrays and DOM
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

// saves input to local storage, array and DOM
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""

// converting array to string before storing on local storage
localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})


