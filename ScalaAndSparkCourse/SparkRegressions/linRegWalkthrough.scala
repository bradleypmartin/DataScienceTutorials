// boilerplate Spark initialization
import org.apache.spark.sql.SparkSession

// importing regression library tools
import org.apache.spark.ml.regression.LinearRegression

// tamping down warning output
import org.apache.log4j._
Logger.getLogger("org").setLevel(Level.ERROR)

// more boilerplate: initiating spark session
val spark = SparkSession.builder().getOrCreate()

// loading data
val data = spark.read.option("header","true").option("inferSchema","true").format("csv").load("Clean-USA-Housing.csv")

// want to put data into regression-friendly format
import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.ml.linalg.Vectors

// creating dataframe
val df = data.select(data("Price").as("label"),
  $"Avg Area Income",$"Avg Area House Age",$"Avg Area Number of Rooms",
  $"Avg Area Number of Bedrooms",$"Area Population")

// merging quantities to be regressed into a vector
val assembler = new VectorAssembler().setInputCols(Array("Avg Area Income",
  "Avg Area House Age","Avg Area Number of Rooms","Avg Area Number of Bedrooms",
  "Area Population")).setOutputCol("features")

// making new df with vectorized features to be regressed
val output = assembler.transform(df).select($"label",$"features")

// training model
val lr = new LinearRegression()

// fitting model to training data
val lrModel = lr.fit(output)

val trainingSummary = lrModel.summary

trainingSummary.residuals.show()
