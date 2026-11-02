# Q15 — Column-Oriented Application: Event Logging with HBase

This practical selects HBase for an event logging application. It demonstrates table
creation, insertion, retrieval, update, deletion, and explains database properties.

## HBase Shell implementation

```ruby
create 'AppEventLog', 'event', 'user', 'extra'

# Insert
put 'AppEventLog', 'U001|20261030T090000|E01', 'event:type', 'login'
put 'AppEventLog', 'U001|20261030T090000|E01', 'event:status', 'success'
put 'AppEventLog', 'U001|20261030T090000|E01', 'user:name', 'Aanya'

put 'AppEventLog', 'U001|20261030T090500|E02', 'event:type', 'failed-login'
put 'AppEventLog', 'U001|20261030T090500|E02', 'event:status', 'failed'
put 'AppEventLog', 'U001|20261030T090500|E02', 'user:name', 'Aanya'

# Query
get 'AppEventLog', 'U001|20261030T090000|E01'
scan 'AppEventLog'

# Update: write a new value to the same cell
put 'AppEventLog', 'U001|20261030T090500|E02', 'event:status', 'reviewed'
get 'AppEventLog', 'U001|20261030T090500|E02'

# Delete one cell and one row
delete 'AppEventLog', 'U001|20261030T090000|E01', 'extra:note'
deleteall 'AppEventLog', 'U001|20261030T090000|E01'
scan 'AppEventLog'
```

## Database characteristics

### Consistency
HBase provides strongly consistent reads and writes at the row level. Row mutations
are atomic for a single row; it does not provide general cross-row ACID transactions.

### Availability
HBase depends on HDFS and cluster coordination services. Regions can be reassigned
when a RegionServer fails, but availability depends on healthy masters, quorum services,
RegionServers and HDFS.

### Transactions
Atomicity is provided for row-level mutations. General multi-row transactions are
not a built-in HBase feature.

### Query features
HBase supports row-key lookups, scans, filters and server-side processing tools.
It is not a relational SQL database; design row keys and column families around
expected access patterns.

### Scaling
Tables are divided into regions and served by RegionServers. Regions split as they
grow, enabling horizontal scaling. Good row-key design avoids hotspots.

## Conclusion
HBase is suitable for large sparse datasets with high-throughput random reads/writes
and range scans when the row-key design matches application queries.
