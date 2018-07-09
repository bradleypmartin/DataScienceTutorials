// DATAFRAME PROJECT
// We're using the Netflix_2011_2016.csv file to answer and complete the
// following commented tasks.

// Start a simple Spark Session
import org.apache.spark.sql.SparkSession
val spark = SparkSession.builder().getOrCreate()

// Load the Netflix Stock CSV File, have Spark infer the data types.
val df = spark.read.option("header","true").option("inferSchema","true").csv("Netflix_2011_2016.csv")

// What are the column names?
// Ans: From the code below, we're looking at Date, Open, High, Low,
//      Close, Volume, and Adj Close
//df.columns

// What does the Schema look like?
// Ans: From the code below, we've got a TimeStamp, 4 doubles, and int,
//      and then a final double.
//df.schema

// Print out the first 5 columns.
//df.select("Date","Open","High","Low","Close").show() // 5 first cols
//df.show(5) // 5 first rows

// Use describe() to learn about the DataFrame.
// df.describe().show()

// Create a new dataframe with a column called HV Ratio that
// is the ratio of the High Price versus volume of stock traded
// for a day.
//val df2 = df.withColumn("HV Ratio",df("High")/df("Volume"))
//df2.select("HV Ratio").show(5)

// What day had the Peak High in Price?
// Ans: probably don't need a whole sort for this, but it was on 7/13/2015 (716.16)
//df.orderBy($"High".desc).show(1)
// Here's another way of finding the max value:
//df.select(max("High")).show()

// What is the mean of the Close column? Ans: 230.52
// df.select(mean("Close")).show()

// What is the max and min of the Volume column? Ans: 3.53E6; 3.16E8
//df.select(min("Volume")).show()
//df.select(max("Volume")).show()

// For Scala/Spark $ Syntax

// How many days was the Close lower than $ 600? Ans: 1218.
//df.filter($"Close" < 600).count()

// What percentage of the time was the High greater than $500 ? Ans: 4.92%
/*
val totalDays = df.count()
val daysAbove500 = df.filter($"High" > 500).count()
val above500pct = 100*daysAbove500.toFloat/totalDays
*/

// What is the Pearson correlation between High and Volume? Ans: -0.2096
//df.select(corr("High","Volume")).show()

// What is the max High per year? Ans: 120.28,129.29,133.43,489.29,389.16,716.16
//                                     from 2011-2015 respectively.
/*
val df2 = df.withColumn("Year",year(df("Date")))
val dfmaxs = df2.groupBy("Year").max()
dfmaxs.select($"Year",$"max(High)").show()
*/

// What is the average Close for each Calender Month?
// Ans: we've got Jan-Dec as 216, 257, 254, 251... 197, 202.
val df2 = df.withColumn("Month",month(df("Date")))
val dfavgs = df2.groupBy("Month").mean()
dfavgs.select($"Month",$"avg(High)").show()
