const button = document.getElementById("button");


button.addEventListener('click', function(){
    const output_day = document.getElementById("output-day");
    const output_year = document.getElementById("output-year");
    const output_month = document.getElementById("output-month");

    const input_containers = document.querySelectorAll(".container-input");

    var input_day = document.getElementById("input-day");
    var input_month = document.getElementById("input-month");
    var input_year = document.getElementById("input-year");


    const input_date = new Date(`${input_year.value}-${input_month.value}-${input_day.value}`);
    const now_date = new Date();

    var flag_day = false;
    var flag_month = false;
    var flag_year = false;

    if(input_date.getFullYear() <= now_date.getFullYear()){
        flag_year = true;
        if(input_date.getMonth() > 0 && input_date.getMonth() <= 12){
            flag_month = true;
            if(input_date.getDate() > 0 && input_date.getDate() <= getDaysInMonth(input_date.getFullYear(), input_date.getMonth())){
                flag_day = true;
                input_containers.forEach(el => function(){
                    el.classList.add("input-correct");
                    el.classList.remove("input-incorrect");
                    console.log(el.classList);
                });
            }
        }
    }

    if(flag_day && flag_month && flag_year) {
    }
    else{
        input_containers.forEach(el => function(){
            console.log(el.classList);
            el.classList.add("input-incorrect");
            
            el.classList.remove(".input-correct");
            
        });
    }

    


    output_day.textContent = now_date.getDate();
    output_month.textContent = input_month.value;
    output_year.textContent = input_year.value;
});

function getDaysInMonth(year, month) {
  return new Date(year, month+1, 0).getDate();
}