const button = document.getElementById("button");


var errorEmpty_day = false;
var errorEmpty_month = false;
var errorEmpty_year = false;

var errorCorrect_day = false;
var errorCorrect_month = false;
var errorCorrect_year = false;

button.addEventListener('click', function(){
    const output_day = document.getElementById("output-day");
    const output_year = document.getElementById("output-year");
    const output_month = document.getElementById("output-month");

    const input_containers = document.querySelectorAll(".container-input");

    var input_day = document.getElementById("input-day");
    var input_month = document.getElementById("input-month");
    var input_year = document.getElementById("input-year");

    if (!input_day.value && !errorEmpty_day){
        errorEmpty_day = createError(input_day, input_containers, "This field is required");
    }
    else if (input_day.value && errorEmpty_day){
        console.log("bb");
        errorEmpty_day = false;
        input_day.parentElement.querySelector(".p-error").remove();
    }

    if (!input_month.value && !errorEmpty_month){
        errorEmpty_month = createError(input_month, input_containers, "This field is required");
    }
    else if (input_month.value && errorEmpty_month){
        errorEmpty_month = false;
        input_month.parentElement.querySelector(".p-error").remove();
    }

    if (!input_year.value && !errorEmpty_year){
        errorEmpty_year = createError(input_year, input_containers, "This field is required");
    }
    else if (input_year.value && errorEmpty_year){
        errorEmpty_year = false;
        input_year.parentElement.querySelector(".p-error").remove();
    }
    

    if (input_year.value && input_month.value && input_day.value){
        const now_date = new Date();
    
        let flag_day = false;
        let flag_month = false;
        let flag_year = false;
        
        
        if(input_day.value > 0 && input_day.value <= getDaysInMonth(input_year.value, input_month.value)){
            flag_day = true;
        }
        if((input_year.value <= now_date.getFullYear())){
            flag_year = true;
        }
        if(input_month.value > 0 && input_month.value <= 12){
            flag_month = true;
        }


        if(!(flag_day && flag_month && flag_year)) {
            console.log("error");
            output_day.textContent = "- -";
            output_month.textContent = "- -";
            output_year.textContent = "- -";
            
            input_containers.forEach(el =>{
                el.classList.add("input-incorrect");
                el.classList.remove("input-correct");
            });

            if (!flag_day && !errorCorrect_day){
                createError(input_day, input_containers, "Must be valide day");
                errorCorrect_day = true;
            }
            else if (flag_day && errorCorrect_day){
                input_day.parentElement.querySelector(".p-error").remove();
                errorCorrect_day = false;
            }
            
            if (!flag_month && !errorCorrect_month){
                createError(input_month, input_containers, "Must be valide month");
                errorCorrect_month = true;
            }
            else if (flag_month && errorCorrect_month){
                input_month.parentElement.querySelector(".p-error").remove();
                errorCorrect_month = false;
            }

            if (!flag_year && !errorCorrect_year){
                createError(input_year, input_containers, "Must be valide year");
                errorCorrect_year = true;
            }
            else if (flag_year && errorCorrect_year){
                input_year.parentElement.querySelector(".p-error").remove();
                errorCorrect_year = false;
            }
        }


        else if(flag_day && flag_month && flag_year) {
            const input_date = new Date(`${input_year.value}-${input_month.value}-${input_day.value}`);

            input_containers.forEach(el =>{
                el.classList.add("input-correct");
                el.classList.remove("input-incorrect");
            });

            output_day.textContent = getFullAge(input_date)[2];
            output_month.textContent = getFullAge(input_date)[1];
            output_year.textContent = getFullAge(input_date)[0];

            document.querySelectorAll(".p-error").forEach(el =>{el.remove()});
        }
    }
});

function getDaysInMonth(year, month) {
  return new Date(year, month+1, 0).getDate();
}

function createError(input_n, input_containers, massage){
    var error = document.createElement("p");
    error.classList.add("p-error");
    error.textContent = massage;

    input_n.parentElement.appendChild(error);
    input_containers.forEach(el =>{
        el.classList.add("input-incorrect");
        el.classList.remove("input-correct");
    });
    return true;
}

function getFullAge(date) {
    const today = new Date();
    const input_date = new Date(date);
    
    let years = today.getFullYear() - input_date.getFullYear();
    let months = today.getMonth() - input_date.getMonth();
    let days = today.getDate() - input_date.getDate();
    
    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return [ years, months, days ];
}