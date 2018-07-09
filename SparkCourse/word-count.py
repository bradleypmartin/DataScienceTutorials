# config/context
from pyspark import SparkConf, SparkContext

# local execution
conf = SparkConf().setMaster("local").setAppName("WordCount")
sc = SparkContext(conf = conf)

# using flatMap to split each line and count # of occurrences of individual words
input = sc.textFile("file:///sparkcourse/book.txt")
words = input.flatMap(lambda x: x.split())
wordCounts = words.countByValue()

# printing out occurrences to console
for word, count in wordCounts.items():
    cleanWord = word.encode('ascii', 'ignore')
    if (cleanWord):
        print(cleanWord.decode() + " " + str(count))
