// Here are some examples of if/else and logical operators in
// Scala.

val person = "Sammy"

// Note that in these cascading logic gates, need to place the
// else/elif statements JUST SO so that Scala doesn't get mad!

if(person == "Sammy"){
  println("welcome Sammy")
}else if(person == "George"){
  println("welcome George!")
}else{
  println("What is your name?")
}

// Reviewing logical operators
// and
println("\nResult of AND trial (1 == 1) && (2 == 2):")
println((1 == 1) && (2 == 2))

// or
println("\nResult of OR trial (1 == 1) || (2 == 3):")
println((1 == 1) || (2 == 3))

// not
println("\nResult of NOT trial 1 != 2:")
println(1 != 2)
