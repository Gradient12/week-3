/* =====================
# Lab 2, Part 2 — Underscore Each Function

## Introduction

Up to this point, we have used Javascript's for loop to loop through data. Underscore's _.each function provides us with an easy to read, simple way to accomplish the same goal.

## Task

Find two previous labs that use for loops. Rewrite these labs to use _.each.

## Syntax
You can see an example of how to use ._each in the underscore documentation: http://underscorejs.org/#each and in the code below.

var myArray = [1, 10, 100, 1000];

_.each(myArray, function(value, key, list) {
  console.log(value, key, list);
});
===================== */

// from lab1 part1

/* =====================
Instructions: "Write a function which counts the number of times a value occurs in an array "
Example: "countItem(['a', 'b', 'a'], 'a') should return 2"
===================== */

var countItem = function(array,value) {
  var count =0;
  _.each(array,function(item){
    if(item===value){count++;}
  }
  );
  console.log(count);
  return count;
};

console.log('countItem success:', countItem([1, 2, 3, 4, 5, 4, 4], 4) === 3);


// from Lab1 part 2

/* =====================
Instructions: Write a function that takes a list of numbers and returns a list with only numbers above 10
===================== */

var filterOutLessThan10 = function(numberArray) {
  var newList = [];
  _.each(numberArray,function(item){
    if(item>10){newList.push(item);}
  });
  return newList;
};

console.log('filterOutLessThan10 success:', filterOutLessThan10([4, 11]).length === 1);
