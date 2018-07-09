// Starting Spark Spark Session
import org.apache.spark.sql.SparkSession
val spark = SparkSession.builder().getOrCreate()

// Creating DataFrame from Sales data
val df = spark.read.option("header","true").option("inferSchema","true").csv("ContainsNull.csv")

// dealing with missing data; checking out initial state of DataFrame
df.printSchema()
df.show()

// have to decide on a case-by-case basis how we clean this.
// df.na. functions give us some options to work with. Example dropping:
df.na.drop().show()

// can also drop with a minimum of (Int) non-null values
df.na.drop(2).show()

// we can fill na's too. Note power here: it only fills matching data type.
df.na.fill(100).show() // fills missing sales

df.na.fill("Missing Name").show() // fills missing names

// OR, we can specify columns to fill manually.
df.na.fill("New Name",Array("Name")).show()

df.na.fill(200,Array("Sales")).show()
