var raw_input = require('readline-sync').question
console.log("    **************** WELCOME TO SARAL PAGE ****************")
function responseData(first_api_data){
    var response = require("axios");
    var getData = response.get(first_api_data);
    return getData
}
var first_url = "http://saral.navgurukul.org/api/courses";
var first_url_data = responseData(first_url)


function courseData(response_data){
    var course_id_list = []
    var a;
    var main_content_id;
    var content_slug;
    response_data.then((data) =>{
            var course_data=data["data"]["availableCourses"]
            for (course in course_data){
                var course_name = course_data[course]["name"]
                var course_id = course_data[course]["id"]
                course_id_list.push(course_id);
                console.log(course,course_name)
            }
            return course_id_list
            
        })
        .then((course_id_list) =>{
            var chose_course = raw_input("select course ")
            console.log(course_id_list[chose_course])
            var second_url = first_url+"/"+course_id_list[chose_course]+"/exercises"
            var second_getData = responseData(second_url)
            console.log("           -----exercise------        ")
            return second_getData
        })
            .then((second_getData) =>{
                var exercise = second_getData.data["data"]
                
                exercise_id = []
                exercise_name = []
                exercise_slug = []            
                for (exerciseName in exercise){
                    var name = exercise[exerciseName]["name"]
                    var id = exercise[exerciseName]["id"]
                    var slug = exercise[exerciseName]["slug"]
                    exercise_slug.push(slug)
                    exercise_id.push(id)
                    exercise_name.push(name)
                    var child_exercise = exercise[exerciseName]["childExercises"]
                    console.log(exerciseName,name)
                    child_exercise_name = []
                    for (child in child_exercise){
                        child_name = child_exercise[child]["name"]
                        child_exercise_name.push(child_name)
                        console.log("   ",child,child_name)

                    }
                }
                var select_childExercise = raw_input("select child exercise")
                content_slug = slug
                var mainData=exercise[select_childExercise]["childExercises"];
                console.log(" ******************* CHILD EXERCISE *********************")

                console.log(exercise[select_childExercise]["name"])
                var ids = (exercise[select_childExercise]["id"])
                main_content_id = ids
                child_slug_list = []
                for (var i in mainData){
                    console.log("  ",i,mainData[i]["name"])
                    var child_slug = mainData[i]["slug"]
                    child_slug_list.push(child_slug)
                }
                a  = child_slug_list
                var main_slug = exercise[select_childExercise]["slug"]
                return exercise_slug
                
            })
            .then((exercise_slug) =>{
                var third_url = "http://saral.navgurukul.org/api/courses/"+main_content_id+`/exercise/getBySlug?slug=`+content_slug;
                return third_url
            })
            .then((third_url) =>{
                var content = responseData(third_url)
                return content;

            })
            .then((content)=>{
                var content_data = content["data"]["content"]
                console.log(content_data)
            })
            .then(()=>{
                var child_input = raw_input("enter your child_exercis no.")
                var child_content_url  = "http://saral.navgurukul.org/api/courses/"+main_content_id+`/exercise/getBySlug?slug=`+a[child_input];
                var contain_data = responseData(child_content_url)
                return contain_data
            })
            .then((contain_data)=>{
                var child_content = contain_data.data["content"]
                console.log(child_content)
            })
            .catch((contain_data) =>{
                console.log("there is no child exercise")
            })
        response_data.catch((wrong)=>{
            console.log("error");
        })
}
var data = first_url_data
var all_courses_name = courseData(first_url_data)