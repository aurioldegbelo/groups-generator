"use strict";
/*
@description: Algorithm to generate Teams for the course Geosoft at the Institute for Geoinformatics, University of Muenster
@author: Auriol Degbelo
Last modified: May 2017
*/

var all_people = [
  "Auriol",
  "Jean-Yves",
  "Esther",
  "Lionel",
  "Naemi",
  "Serge",
  "Carole",
  "Richard",
  "Sonia",
];



let ruled_out_pairs = [ new Pair ("Serge", "Carole"), new Pair ("Sonia", "Richard"), new Pair ("Jean-Yves", "Esther"), new Pair ("Lionel", "Naemi")] 

console.log("All people: ",all_people)
console.log("Pairs ruled out: ", ruled_out_pairs)
console.log("Groups for this quarter: ", generate_groups(all_people))



/** Definition of all functions starts here */

function generate_groups(all_people)
{

   let list_1 = [...all_people]
   let list_2 = [...all_people]

   //console.log(list_1)
   //console.log(list_2)


   let groups = []
   let n_groups = 4

   while (groups.length < n_groups)
   {
       let a = pick_random_person(list_1)
       let b = pick_random_person(list_2)
      if(is_a_possible_pair(a, b, ruled_out_pairs))
      {
        console.log("New group created:", a, b)
        list_1 = list_1.filter(item => item !== a && item !== b)
        list_2 = list_2.filter(item => item !== a && item !== b)
       // console.log(list_1)
       // console.log(list_2)
        groups.push(new Pair(a, b))
      }

   }

   console.log("Groups so far...", groups)

   let trio_options = []

   if (list_1.length == 1 && list_2.length == 1)
   {

      let c = list_1[0]
      console.log(`${c} is still looking for a group...`)
      // look for trinomes
      for (let i=0; i< groups.length; i++)
      {
          let a = groups[i].p1
          let b = groups[i].p2
          if((is_a_possible_pair(a, c, ruled_out_pairs)) && (is_a_possible_pair(b, c, ruled_out_pairs)))
          {
            trio_options.push (new Trio(a, b, c))
          }
      }

      let r = getRandomInt(0, trio_options.length)
      console.log("Possible trios: ",trio_options)

      let selected_trio = trio_options[r]
      console.log("Selected trio: ", selected_trio)

      groups = groups.filter (item => !in_trio(item.p1, selected_trio) && !in_trio(item.p2, selected_trio))
 
      groups.push(selected_trio)

   }
   
   return groups
}



// a Pair is a group with two individuals
function Pair (p1, p2)
{
  this.p1 = p1.toString()
  this.p2 = p2.toString()
}

// a Trinome is a group with three individuals
function Trio(p1, p2, p3)
{
  this.p1 = p1.toString()
  this.p2 = p2.toString()
  this.p3 = p3.toString()

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