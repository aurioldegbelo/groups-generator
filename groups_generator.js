"use strict";
/*
@description: script to generate pairs/trios that satisfy some simple constraints
@author: Auriol Degbelo
Last modified: August 2022
*/

var all_people = [
  "AD",
  "JB",
  "EB",
  "LB",
  "NB",
  "SN",
  "CN",
  "RM",
  "SM"
];

let ruled_out_pairs = [ new Pair ("SN", "CN"), new Pair ("SM", "RM"), new Pair ("JB", "EB"), new Pair ("LB", "NB")] 

console.log("Suggested Group: ", generate_groups(all_people, ruled_out_pairs))


/** Definition of all functions starts here */


// a Pair is a group with two individuals
function Pair (p1, p2)
{
  this.p1 = p1.toString()
  this.p2 = p2.toString()
}

// a Trio is a group with three individuals
function Trio(p1, p2, p3)
{
  this.p1 = p1.toString()
  this.p2 = p2.toString()
  this.p3 = p3.toString()

}

// function to generate the groups
function generate_groups(all_people, ruled_out_pairs)
{
   let explanation_div = document.getElementById("explanation")
   let br = document.createElement("br")

   let groups = []
   let n_groups = 4

   console.log(all_people.length)

   console.log("All people: ",all_people)
   explanation_div.append("All people: ", all_people)
   explanation_div.append(br)

   console.log("Pairs ruled out: ", ruled_out_pairs)
   explanation_div.append("Pairs ruled out: ", ruled_out_pairs.toString())
   explanation_div.append(br)

   console.log("Number of groups: ", n_groups)
   explanation_div.append("Number of groups: ", n_groups)
   explanation_div.append(br)

   // generate two lists out the group of all people
   let list_1 = [...all_people]
   let list_2 = [...all_people]

  // console.log(list_1)
  // console.log(list_2)

   while (groups.length < n_groups)
   {
      // randomly pick people from the two lists
       let a = pick_random_person(list_1)
       let b = pick_random_person(list_2)

       // create a new pair if the given conditions are fulfilled
      if(is_a_possible_pair(a, b, ruled_out_pairs))
      {
        console.log("New pair created:", a, b)
        list_1 = list_1.filter(item => item !== a && item !== b)
        list_2 = list_2.filter(item => item !== a && item !== b)
       // console.log(list_1)
       // console.log(list_2)
        groups.push(new Pair(a, b))
      }
    
      // there is only one group left, but the two possible elements of the pair form a ruled out pair
      if (groups.length == n_groups-1 && !is_a_possible_pair(a, b, ruled_out_pairs)) 
      {
        groups = [] // start again
        list_1 = [...all_people]
        list_2 = [...all_people]
      }
    
   }

   console.log("Pairs so far...", groups)

   // if there happens to be an odd number of people to put into groups, we need one trio
   let trio_options = []

   if (list_1.length == 1 && list_2.length == 1)
   {

      let c = list_1[0]
      console.log(`${c} is still looking for a group...`)

      // look for trio
      for (let i=0; i< groups.length; i++)
      {
          // find out trio options where the partner is not a ruled out person (i.e. the constraints still hold)
          let a = groups[i].p1
          let b = groups[i].p2
          if((is_a_possible_pair(a, c, ruled_out_pairs)) && (is_a_possible_pair(b, c, ruled_out_pairs)))
          {
            trio_options.push (new Trio(a, b, c))
          }
      }

      console.log("Possible trios: ", trio_options)

      // randomly select a trio out of all possible options
      let r = getRandomInt(0, trio_options.length)
      let selected_trio = trio_options[r]
      console.log("Selected trio: ", selected_trio)

      // delete the pair
      groups = groups.filter (item => !in_trio(item.p1, selected_trio) && !in_trio(item.p2, selected_trio))
 
      // add the trio to the final list of groups
      groups.push(selected_trio)

   }
   
   return groups
}

// check if a name is in the trio
function in_trio (name, trio)
{
    let in_trio = false
    if (name == trio.p1 || name == trio.p2 || name == trio.p3)
    {
       in_trio = true
    }

    return in_trio
}

// pick a random person from the list
function pick_random_person (people_list)
{
  let u = getRandomInt(0, people_list.length)
//  console.log( people_list[u])
  return people_list[u]
}

// get a a random number between 0 and max-1
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
//  console.log(Math.floor(Math.random() * (max - min)) + min)
  return Math.floor(Math.random() * (max - min)) + min
}

// check if the current pair is a possible pair
function is_a_possible_pair(a, b, ruled_out_pairs)
{
  // console.log("Current pair examined: ", a, b)
   let is_possible_pair = true

   if(a == b)
   {
      // You cannot be a pair with yourself
      is_possible_pair = false

   }
   else
   {
    // check if the current pair is in the list of impossible pair
    for (let u = 0; u < ruled_out_pairs.length; u++)
    {
       //console.log(ruled_out_pairs[u])
       if ((ruled_out_pairs[u].p1 == a & ruled_out_pairs[u].p2 == b) || (ruled_out_pairs[u].p2 == a & ruled_out_pairs[u].p1 == b))
       {
         is_possible_pair = false
         break
       }
    }
   }
  // console.log("Result => is_possible_pair = ", is_possible_pair)
   return is_possible_pair
   
}