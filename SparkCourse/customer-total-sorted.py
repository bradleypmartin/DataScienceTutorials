# boilerplate config/context
from pyspark import SparkConf, SparkContext

# running locally
conf = SparkConf().setMaster("local").setAppName("CustomerTotal")
sc = SparkContext(conf = conf)

# function for parsing comma-separated customer spending data
def parseLine(line):
    fields = line.split(',')  
    # important fields here: customer number (to int) and single item prices
    # (to float)
    custNumber = int(fields[0])
    itemPrice  = float(fields[2])
    return (custNumber, itemPrice)

# importing customer data
lines = sc.textFile("file:///SparkCourse/customer-orders.csv")

# mapping our parsing function to each line
rdd = lines.map(parseLine)

# reducing by key here (customer number; summing grand total for each)
totalsByCustomer = rdd.reduceByKey(lambda x,y: x + y)

# sorting by increasing grand totals per customer
totalsSorted = totalsByCustomer.map(lambda x: (x[1], x[0])).sortByKey()
results = totalsSorted.collect()
for result in results:
    print("${:.2f} was spent by customer {}.".format(result[0],result[1]))
