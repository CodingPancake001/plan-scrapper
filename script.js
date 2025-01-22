function fn(){
    let final_data = [];
    let data_object_template = { //template of an object representing a lesson
        "weekday": "",
        "lessonNumber": 0,
        "start": "",
        "end": "",
        "subject": "",
        "teacher": "",
        "room": ""
    };

    let plan = document.getElementsByClassName("plan-zajec")[0]; // plan

    // get collumns
    let columns = plan.getElementsByClassName("column"); // HTMLcolection of all columns

    for (let index = 0; index < columns.length; index++) { // iterate over all columns
        const element = columns.item(index);
        let day = element.getElementsByClassName("day__name")[0].innerHTML;
        day = day.charAt(0).toUpperCase() + day.slice(1);
        
        // get cells
        let cells = element.getElementsByClassName("cell"); // HTMLcolection of all cells in column
        
        for (let j = 0; j < cells.length; j++){
            let cell = cells.item(j); //single lesson
            let data = Object.assign({}, data_object_template);
            
            if(cell.classList.contains("cell--multi--conflicted")){
                data.subject = "ERR: Wiecej pozycji";
            } else{
                // get lesson data
                let time = cell.getElementsByClassName("position__lesson__hours")[0].innerHTML;
                time = time.split(" - ");
                data.start = time[0];
                data.end = time[1];

                data.subject = cell.getElementsByClassName("position__lesson__subject")[0].innerHTML;
                data.teacher = cell.getElementsByClassName("position__lesson__teacher")[0].innerHTML;

                data.room = cell.getElementsByClassName("flex__items")[0].getElementsByTagName("span")[1].innerHTML;
            }
            // finalize data object
            data.weekday = day;
            data.lessonNumber = j+1; // j+1 is the lesson number // dosnt count lessons not in plan

            //push to array
            final_data.push(data);
        }
    }

    //return final_data
    return JSON.stringify(final_data);
}
fn()//inwoke
