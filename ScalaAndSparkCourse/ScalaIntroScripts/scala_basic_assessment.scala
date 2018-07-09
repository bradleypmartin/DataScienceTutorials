// We're writing a couple of functions/executions
// to test basic scala facility here

// Question 1: writing check for a single int
// that outputs whether it's even or not
println("\nDefining even check (Prob 1)")
def evenIntCheck(my_num:Int): Boolean = {
  if(my_num % 2 == 0){
    return true
  }else{
    return false
  }
}

// testing evenIntCheck function
println("\nChecking evenIntCheck. Are 2,5 even?")
evenIntCheck(2)
evenIntCheck(5)

// Question 2: looking for evens in a list.
// let's try to make use of evenIntCheck here!
println("\nDefining list even check (Prob2)")
def evenIntCheckList(my_nums:List[Int]): Boolean = {
  for(num <- my_nums){
    if(evenIntCheck(num)){
      return true
    }
  }
  return false
}

// testing list even check
println("\nTesting list even check:")
println("(Inputs: (1,2,4,3,7),(1,3,7,9))")
evenIntCheckList(List(1,2,4,3,7))
evenIntCheckList(List(1,3,7,9))

// Question 3: Summing list of ints with 7's counting
// double.
println("\nDefining lucky 7 sum (Prob 3)")
def lucky7sum(my_nums:List[Int]): Int = {
  var my_sum = 0
  for(num <- my_nums){
    if(num == 7){
      my_sum += 14
    }else{
      my_sum += num
    }
  }
  return my_sum
}

// testing lucky 7 sum
println("\nTesting lucky 7 sum:")
println("Inputs: (1,2,4,3,7),(2,4,6)")
lucky7sum(List(1,2,4,3,7))
lucky7sum(List(2,4,6))

// Question 4: Defining canBalance function (Prob 4)
println("\nDefining canBalance function (Prob 4)")
def canBalance(my_nums:List[Int]): Boolean = {
  for(i <- Range(0,my_nums.size)){
    var leftSum = 0
    var rightSum = 0
    for(j <- Range(0,i+1)){
      leftSum += my_nums(j)
    }
    for(j <- Range(i+1,my_nums.size)){
      rightSum += my_nums(j)
    }
    if(leftSum == rightSum){
      return true
    }
  }
  return false
}

// Testing canBalance function
println("\nTesting canBalance:")
println("Inputs: (1,3,5,9),(2,3,9,11)")
canBalance(List(1,3,5,9))
canBalance(List(2,3,9,11))

// Question 5: defining isPalindrome (simple; one word)
println("\nDefining isPalindrome function...")
def isPalindrome(my_string:String): Boolean = {
  val n = my_string.size
  for(i <- Range(0,n/2)){
    if(my_string(i) != my_string(n-1-i)){
      return false
    }
  }
  return true
}

// Testing isPalindrome
println("\nTesting isPalindrome function")
println("Inputs: 'doggo','racecar'")
isPalindrome("doggo")
isPalindrome("racecar")
