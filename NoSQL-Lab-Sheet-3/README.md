# NoSQL Database Design — Lab Sheet 3

MongoDB practical examples for all 15 questions. Each `.js` file is intended to be
run with `mongosh` against a running MongoDB server.

## Requirements
- MongoDB Community Server (local or remote)
- MongoDB Shell (`mongosh`)
- MongoDB replica set for Question 11 (transactions require a replica set or sharded cluster)

## Run a practical
```bash
mongosh --file 01_student_activity.js
```
Use the corresponding filename for each practical. Scripts use separate lab database
names and reset their own target collections before inserting sample data.

## Files
1. `01_student_activity.js` — Student activity tracking
2. `02_event_logging.js` — Event logging and failed-login analysis
3. `03_mini_blog.js` — Blogging platform, tags and categories
4. `04_flexible_product_catalog.js` — Category-specific product attributes
5. `05_ecommerce_orders.js` — Customers, products, orders and purchase history
6. `06_website_analytics.js` — Page visits and aggregation
7. `07_content_management.js` — Articles and publication status
8. `08_shopping_cart.js` — Embedded shopping cart operations
9. `09_product_reviews.js` — Product ratings and review aggregation
10. `10_inventory_monitoring.js` — Low-stock and restocking queries
11. `11_wallet_transactions.js` — Atomic wallet transfer transaction
12. `12_user_notifications.js` — Unread notifications and read status
13. `13_course_learning.js` — Learning progress and completion
14. `14_order_tracking.js` — Order status history
15. `15_flexible_news.js` — Flexible news document structure and searches

## Important notes
- Question 11 requires MongoDB running as a replica set or sharded cluster. A standalone
  `mongod` does not support multi-document transactions.
- The transaction script uses `startSession()` and `withTransaction()`. Configure a
  replica set before running it.
- Sample scripts are educational examples. They are not production-ready security,
  payment, inventory, or analytics systems.
- Run in a disposable lab environment. The scripts drop their own named collections
  before inserting examples.
