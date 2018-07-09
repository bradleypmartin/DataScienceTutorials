// working with simple functions

// note the structure similar to python
def simple(): Unit = {
  println("simple print")
}

// executing simple function
println("\nHere's the output of our simple function:")
simple()

// completing more complex adding functions.
// Note similarity to C++ in typing outs/ins.
println("\nDefining adder function.")
def adder(num1:Int,num2:Int): Int ={
  return num1 + num2
}

// executing adder function
println("\nHere's the output of adder(2,3):")
adder(2,3)

// defining greet name function
println("\nDefining and executing greet name function:")
def greetName(name:String): String={
  return s"Hello $name"
}
val fullgreet = greetName("Jose")
println(fullgreet)

// coding simple number prime check function
println("\nCoding and testing (10,23) naive isPrime function:")
def isPrime(numcheck:Int): Boolean = {
  for(n <- Range(2,numcheck)){
    if(numcheck%n == 0){
      return false
    }
  }
  return true
}

println(isPrime(10)) // false
println(isPrime(23)) // true

// we can also create functions that take lists
// and give lists as I/O.
println("\nTrying out simple List-valued function:")
val numbers = List(1,2,3,7)
def check(nums:List[Int]): List[Int]={
  return nums
}
check(numbers)
