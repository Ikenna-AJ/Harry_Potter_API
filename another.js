const student={
    name:"Mrinal",
    age: 18,
    gender:"Male"
}

function printPerson({name, age, gender}, course){
    console.log(`The person's name is ${name}, their age is ${age}, gender is ${gender} and has renrolled to the course ${course}`)
}

printPerson(student, "Physics"); 