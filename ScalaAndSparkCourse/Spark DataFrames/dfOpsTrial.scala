// Doing some intro work for Spark dataframes here

// preparing/initiating Spark session
import org.apache.spark.sql.SparkSession
val spark = SparkSession.builder().getOrCreate()

// Loading up some financial data from CitiGroup
val df = spark.read.option("header","true").option("inferSchema","true").csv("CitiGroup2006_2008")

// lecture 1 trials
/*
// Printing out several rows of info
for(row <- df.head(5)){
  println(row)
}

// Showing columns
df.columns

// creating new dataframe with new column example
val df2 = df.withColumn("HighPlusLow",df("High")+df("Low"))

df2.printSchema()

// renaming column
df2.select(df2("HighPlusLow").as("HPL")).show()
*/

// lecture 2: further work with df operations
df.printSchema()

// preparing to use $-type notation
import spark.implicits._

// basic filtering
/*
// spark-type notation
df.filter($"Close" > 480).show()

// SQL notation
df.filter("Close > 480").show()
*/

/*
// more complex filtering
df.filter($"Close" < 480 && $"High" < 480).show()
// SQL-type
df.filter("Close < 480 AND High < 480").show()
*/

// collect filter results as array object
//val CH_low = df.filter("Close < 480 AND High < 480").collect()

// aggregation by simple counting
//val CH_low = df.filter("Close < 480 AND High < 480").count()

// filtering for equality (weird triple equals in spark right now)
//df.filter($"High"===484.40).show()
// SQL equivalent
//df.filter("High = 484.40").show()

// correlation example
df.select(corr("High","Low")).show()
