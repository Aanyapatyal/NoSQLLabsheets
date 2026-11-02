# Q8 — Transaction-like shopping operation in Riak KV

Riak KV does not provide general ACID transactions across multiple keys. The following
is an application-level sequence, not an atomic transaction.

## Example sequence
1. Read the user's cart key.
2. Add a product to the cart value.
3. Recalculate the cart total.
4. Write the updated cart value.
5. Optionally write a separate order/audit record.

The shell example in `04_riak_shopping_cart.sh` demonstrates storing and updating the
whole cart as one JSON value. For a production application, use conditional writes
where supported by your Riak version (for example, `If-Match`/ETag-based optimistic
concurrency through the HTTP API) to reduce lost updates.

## Limitations
- A sequence of writes to different keys can partially succeed.
- There is no general multi-key rollback/commit transaction.
- Concurrent read-modify-write requests can overwrite each other's changes without
  conflict detection and retry logic.
- Application logic should handle retries, idempotency, conflict resolution and
  compensating actions.
- Keeping related data in one object can simplify atomic single-object replacement,
  but may increase contention and object size.
