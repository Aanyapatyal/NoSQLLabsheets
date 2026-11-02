# Q10 — HBase Regions and RegionServers

HBase automatically splits tables into regions based on row-key ranges. RegionServers
host and serve regions. HMaster coordinates region assignment, load balancing and
recovery; it does not serve normal table reads/writes itself.

## Create a table with pre-split regions
Run in HBase Shell:

```ruby
create 'RegionDemo', 'data', {SPLITS => ['m', 't']}
```

This creates initial regions over key ranges (conceptually):
- start to `m`
- `m` to `t`
- `t` to end

Insert records with keys across the ranges:

```ruby
put 'RegionDemo', 'a001', 'data:value', 'North'
put 'RegionDemo', 'n001', 'data:value', 'Central'
put 'RegionDemo', 'z001', 'data:value', 'South'
scan 'RegionDemo'
```

Inspect region and server information:

```ruby
status 'detailed'
```

Depending on the HBase release, the HBase UI and HMaster/RegionServer web interfaces
also show region assignments. The exact UI ports vary by version/configuration.

## Explanation
- A region is a contiguous range of row keys for a table.
- As regions grow, HBase can split them into smaller regions.
- RegionServers host multiple regions and handle client requests for those regions.
- Regions can be reassigned to another RegionServer after a server failure, provided
  the underlying HDFS data and cluster quorum services remain available.
- Pre-splitting can reduce initial write concentration when the row-key design spreads
  data across ranges.

For a true multi-RegionServer demonstration, run a distributed HBase cluster with
multiple RegionServers. A single-node local install cannot demonstrate distribution
across multiple machines.
