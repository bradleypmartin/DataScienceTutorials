# boilerplate config
from pyspark import SparkConf, SparkContext

# local computation
conf = SparkConf().setMaster("local").setAppName("PopularMovies")
sc = SparkContext(conf = conf)

# reducing by movie ID
lines = sc.textFile("file:///SparkCourse/ml-100k/u.data")
movies = lines.map(lambda x: (int(x.split()[1]), 1))
movieCounts = movies.reduceByKey(lambda x, y: x + y)

# flipping to sort by # of appearances of given movie
flipped = movieCounts.map( lambda xy: (xy[1],xy[0]) )
sortedMovies = flipped.sortByKey()

# collecting results and printing
results = sortedMovies.collect()

for result in results:
    print(result)
