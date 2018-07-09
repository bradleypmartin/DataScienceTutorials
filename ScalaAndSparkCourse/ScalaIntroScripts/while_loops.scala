// testing out some while loops

println("\nSimple hardcoded while loop:")
var x = 0
while(x < 5){
  println(s"x is currently $x")
  println("x is still less than 5; adding 1")
  x += 1
}

// have to import break
import util.control.Breaks._

var y = 0

// while with Breaks
println("\nWhile with break:")
while(y < 10){
  println(s"y is currently $y")
  println("y is still less than 10; add 1")
  y += 1
  if(y==3) break
}
