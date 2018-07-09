// We're going to practice some basic for
// loop action here in Scala.

// note the similarity to for x in y from Python
println("\nRunning through simple list...")
for(item <- List(1,2,3)){
  println(item)
}

// example with iterables and logic
println("\nUsing string interp. with loops/logic...")
for(num <- Range(0,10)){
  if(num % 2 == 0){
    // even case
    println(s"$num is even.")
  }else{
    println(s"$num is odd.")
  }
}

// string logic
println("\nUsing some string logic...")
val names = List("John","Abe","Cindy","Cat")
for(name <- names){
  if(name.startsWith("C")){
    println(s"$name starts with a C")
  }
}
