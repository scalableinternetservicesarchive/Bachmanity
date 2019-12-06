# Benchmark Results

- **vertical**
  - db: m4.xlarge worker: c5.large single - 200 concurrent users, averaged 90 requests per second
  - db: m4.xlarge worker: c5.xlarge single - 390 concurrent users, averaged 220 requests per second
  - db: m4.xlarge worker: c5.2xlarge single - 600 concurrent users, averaged 410 requests per second
  - db: m4.xlarge worker: c5.4xlarge single - 1000 concurrent users, averaged 600 requests per second
- **horizontal**
  - db: m4.xlarge worker: c5.large 1 instances - 200 concurrent users, average 90 requests per second
  - db: m4.xlarge worker: c5.large 2 instances - 450 concurrent users, average 220 requests per second
  - no cache db: m4.xlarge worker: c5.large 2 instances - 400 concurrent users, max 200 requests per second
  - db: m4.xlarge worker: c5.large 4 instances - 1000 concurrent users, average 308 requests per second
  - db: m4.xlarge worker: c5.large 8 instances - 443 requests per second 


# New Benchmark Results
 - **vertical**
    - db: m4.xlarge worker: c5.large single (2 cores) - 200 concurrent users, average 90 requests per second
    - db: m4.xlarge worker: c5.xlarge single (4 cores) - 300 concurrent users, 220 requests per second 
    - db: m4.xlarge worker: c5.2xlarge single (8 cores) - 550 concurrent users, 450 requests per second 
    - db: m4.xlarge worker: c5.4xlarge single (16 cores) - 1200 concurrent users, 900 requests per second 
 - **horizontal**
    - db: m4.xlarge worker: c5.large 1 instances (2 cores) - 200 concurrent users, average 90 requests per second
    - db: m4.xlarge worker: c5.large 2 instances (4 cores) - 450 concurrent users, average 220 requests per second
    - db: m4.xlarge worker: c5.large 4 instances (8 cores) - 870 concurrent users, 460 requests per second
    - db: m4.xlarge worker: c5.large 8 instances (16 cores) - 1700 concurrent users, 900 requests per second

 - **horizontal no cache**
    - db: m4.xlarge worker: c5.large 2 instances (4 cores) - 420 concurrent users, average 190 requests per second
 - **vertical no cache**
    - db: m4.xlarge worker: c5.xlarge single - 325 concurrent users, 225 req/sec peak
