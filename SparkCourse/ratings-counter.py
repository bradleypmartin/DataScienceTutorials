# importing context and configuration libraries
from pyspark import SparkConf, SparkContext
import collections

# setting up for local execution, job name
conf = SparkConf().setMaster("local").setAppName("RatingsHistogram")
sc = SparkContext(conf = conf)

# splitting ratings data by whitespace, aggregating 3rd data type (ratings),
# counting by value (# 1's, #2's, etc.)
lines = sc.textFile("file:///SparkCourse/ml-100k/u.data")
ratings = lines.map(lambda x: x.split()[2])
result = ratings.countByValue()

# reading, sorting, and printing tuples of rating aggregation
sortedResults = collections.OrderedDict(sorted(result.items()))
for key, value in sortedResults.items():
    print("%s %i" % (key, value))
