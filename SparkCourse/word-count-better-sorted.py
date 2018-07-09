# again, using regular expression to easily clean words
import re
from pyspark import SparkConf, SparkContext

# creating function for cleaning words
def normalizeWords(text):
    return re.compile(r'\W+', re.UNICODE).split(text.lower())

# local execution
conf = SparkConf().setMaster("local").setAppName("WordCount")
sc = SparkContext(conf = conf)

# parsing book text
input = sc.textFile("file:///sparkcourse/book.txt")
words = input.flatMap(normalizeWords)

# reducing by key; reversing pair order before sorting by (new) key (count)
wordCounts = words.map(lambda x: (x, 1)).reduceByKey(lambda x, y: x + y)
wordCountsSorted = wordCounts.map(lambda x: (x[1], x[0])).sortByKey()
results = wordCountsSorted.collect()

# printing results
for result in results:
    count = str(result[0])
    word = result[1].encode('ascii', 'ignore')
    if (word):
        print(word.decode() + ":\t\t" + count)
