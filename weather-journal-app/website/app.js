/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = 1+d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Declaration
const zipCode    = document.getElementById('zipCode');
const feeling    = document.getElementById('feeling');
const entryHolder    = document.getElementById('entryHolder');
const generate   = document.getElementById('generate');

// Function to print the results
function printOnScreen (temp,feeling,date) {
    entryHolder.textContent=
`Temperature -> ${temp}
Feeling -> ${feeling}
Date -> ${date}`;
}

// API key & URL
const APIkey = '&appid=2bda6d7102d40d0451870f2531fd57e9&units=metric';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Generate button
generate.addEventListener('click',(e)=>{


    //To prevent reloading of the page
    e.preventDefault();

    // Validation
    if (!zipCode.value || !feeling.value){

        if(!zipCode.value){
            //Show Error to ZipCode
            document.getElementById('zipCode-error').classList.remove('d-none');
        }else{
            //Remove Error
            document.getElementById('zipCode-error').classList.add('d-none');
        }

        if(!feeling.value){
            //Show Error to feeling
            document.getElementById('feeling-error').classList.remove('d-none');
        }else{
            //Remove Error
            document.getElementById('feeling-error').classList.add('d-none');
        }
    }else{
        
        //Remove Errors
        document.getElementById('zipCode-error').classList.add('d-none');
        document.getElementById('feeling-error').classList.add('d-none');
        
        
        //GET Data from openweathermap API
        getData(baseURL,zipCode.value,APIkey).then((result)=>{

                // Add data to POST request
                postData('/postData',{
                    temp: result.main.temp,
                    feeling: feeling.value,
                    date: newDate
                })

        }).then(()=>{

            //Get data from the database
            getData('/getData').then((result)=>{

            //Print data on the screen to the client
            printOnScreen(result.temp,result.feeling,result.date);
            })

        })
    

    }
    
})



// POST
const postData = async ( url = '' , data = {} )=>{
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
    });

    try{
        const newData = await response.json();
        return newData;
    }catch(error){
        console.log("error",error);
    }
};

// GET
const getData = async (url,zipCode='',APIkey='')=>{
    const res = await fetch(url+zipCode+APIkey)
    try{
        const newData = await res.json();
        return newData;

    }catch(error){
        console.log('error:',error);
    }
}
