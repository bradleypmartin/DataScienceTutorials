// Starting Spark Spark Session
import org.apache.spark.sql.SparkSession
val spark = SparkSession.builder().getOrCreate()

// Creating DataFrame from Sales data
val df = spark.read.option("header","true").option("inferSchema","true").csv("Sales.csv")

// Checking out imported data
/*
df.printSchema()
df.show()
*/

// A sampling of aggregate functions (MANY other options exist)

// grouping by company (mean sales)
df.groupBy("Company").mean().show()

// grouping by company (count sales)
df.groupBy("Company").count().show()

// grouping by company (min sales)
df.groupBy("Company").min().show()

// ...or we can aggregate without grouping.
df.select(sum("Sales")).show()
df.select(variance("Sales")).show()
df.select(stddev("Sales")).show()
df.select(countDistinct("Sales")).show()


// ordering (ascending/descending)
df.orderBy("Sales").show()
df.orderBy($"Sales".desc).show()
