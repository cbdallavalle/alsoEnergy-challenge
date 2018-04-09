/*****************************************************************************************
* Part 2
****************************************************************************************/
var employees = [
        {first: "Amanda", last: "Byron", group: "Sales"},
        {first: "Ye", last: "Xia", group: "Receiving", nameOrder: "reverse"},
        {first: "Miltiades", last: "Crescens", group: "Sales"},
        /*...don't foget to account for other entries of the same form, but with different group names.....*/
    ];

// Part 2 Answer Here

const organizeStaff = (staffInfo) => {
  return staffInfo.reduce( (organizedStaff, employee) => {
    if(!organizedStaff[employee.group]) {
      organizedStaff[employee.group] = [];
    }
    
    organizedStaff[employee.group].push({name: `${employee.first} ${employee.last}`})

    return organizedStaff
  }, {})
}

console.log(organizeStaff(employees))

/*****************************************************************************************
* Bonus
****************************************************************************************/

// Bonus Anwser Here
