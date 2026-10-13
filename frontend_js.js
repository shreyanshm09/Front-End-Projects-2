const rishabh='{"name":"Rishabh Kumar","Age":21,"class":"Btech"}'

const json_roam = JSON.parse(rishabh)

console.log(json_roam);
console.log(json_roam.name);

const test_obt = {
    "name":"Rishabh Kumar",
    "Age":21,
    "class":"Btech"
}

const wapis = JSON.stringify(test_obt);

console.log(typeof wapis);

const vachan = '{"name":"Vachan"}'
console.log(JSON.parse(vachan))


const vishal = {
    name:"Vishal",
    type:"Single",
    address:{
        state:"Rajasthan",
        city:"Jaipur"
    }
}

console.log(vishal.name);
console.log(vishal.address.city);