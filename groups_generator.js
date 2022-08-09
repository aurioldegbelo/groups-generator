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


// a Pair is a group of two individuals
function Pair (s1, s2)
{
  this.s1 = s1.toString()
  this.s2 = s2.toString()
}

let impossible_pairs = [ new Pair ("Serge", "Carole"), new Pair ("Sonia", "Richard"), new Pair ("Jean-Yves", "Esther"), new Pair ("Lionel", "Naemi")] 

console.log(all_people)
console.log(impossible_pairs)
console.log(generate_groups(all_people))

//pick_random_person(all_people)

//is_a_possible_pair(pick_random_person (all_people), pick_random_person (all_people), impossible_pairs)



/** Definition of all functions starts here */

function generate_groups(all_people)
{

   let list_1 = [...all_people]
   let list_2 = [...all_people]

   console.log(list_1)
   console.log(list_2)


   let groups = []
   let n_groups = 4

   while (groups.length < n_groups)
   {
       let a = pick_random_person(list_1)
       let b = pick_random_person(list_2)
      if(is_a_possible_pair(a, b, impossible_pairs))
      {
        console.log("New group created:", a, b)
        list_1.pop(a)
        list_1.pop(b)
        list_2.pop(a)
        list_2.pop(b)
        console.log(list_1)
        console.log(list_2)
        groups.push(new Pair(a, b, "hello"))
      }

   }

   return groups
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
function is_a_possible_pair(a, b, impossible_pairs)
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
    for (let u = 0; u < impossible_pairs.length; u++)
    {
       //console.log(impossible_pairs[u])
       if ((impossible_pairs[u].s1 == a & impossible_pairs[u].s2 == b) || (impossible_pairs[u].s2 == a & impossible_pairs[u].s1 == b))
       {
         is_possible_pair = false
         break
       }
    }
   }
  // console.log("Result => is_possible_pair = ", is_possible_pair)
   return is_possible_pair
   
}