// preparing/initiating Spark session
import org.apache.spark.sql.SparkSession
val spark = SparkSession.builder().getOrCreate()

// Loading up some financial data from CitiGroup
val df = spark.read.option("header","true").option("inferSchema","true").csv("CitiGroup2006_2008")

// here we're going to work with some temporal data in more depth

/*
// selecting just month info
df.select(month(df("Date"))).show()

//... or year info
df.select(year(df("Date"))).show()
*/

// averaging closing price by year
val df2 = df.withColumn("Year",year(df("Date")))

val dfavgs = df2.groupBy("Year").mean()
dfavgs.select($"Year",$"avg(Close)").show()
