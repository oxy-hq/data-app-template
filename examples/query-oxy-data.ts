/**
 * Comprehensive examples for querying data using Oxy SDK
 *
 * This file demonstrates:
 * 1. Querying app data
 * 2. Querying Parquet files with SQL
 * 3. Advanced filtering and aggregations
 * 4. Multiple data sources
 */

import { OxyClient, createConfig, ParquetReader, readParquet, queryParquet } from "@oxy-hq/sdk";

// Initialize the client
const config = createConfig();
const client = new OxyClient(config);

// ========================================
// Example 1: Basic App Data Query
// ========================================
async function example1_basicAppDataQuery() {
  console.log("\n=== Example 1: Basic App Data Query ===");

  // Get app data
  const result = await client.getAppData("dashboard.app.yml");

  if (result.error) {
    console.error("Error fetching app data:", result.error);
    return;
  }

  console.log("App data:", result.data);
}

// ========================================
// Example 2: Query Parquet File (Quick Read)
// ========================================
async function example2_quickParquetRead() {
  console.log("\n=== Example 2: Quick Parquet Read ===");

  // Fetch the parquet file
  const blob = await client.getFile("data/sales.parquet");

  // Quick read - get first 100 rows
  const data = await readParquet(blob, 100);

  console.log("Columns:", data.columns);
  console.log("Row count:", data.rows.length);
  console.log("Sample data:", data.rows.slice(0, 5));
}

// ========================================
// Example 3: SQL Query on Parquet Data
// ========================================
async function example3_sqlQueryParquet() {
  console.log("\n=== Example 3: SQL Query on Parquet ===");

  const blob = await client.getFile("data/sales.parquet");

  // Query with SQL
  const result = await queryParquet(blob, `
    SELECT
      product,
      SUM(amount) as total_sales,
      COUNT(*) as order_count,
      AVG(amount) as avg_order_value
    FROM data
    GROUP BY product
    ORDER BY total_sales DESC
    LIMIT 10
  `);

  console.log("Top 10 products by sales:");
  console.table(result.rows);
}

// ========================================
// Example 4: Advanced ParquetReader Usage
// ========================================
async function example4_advancedParquetQuery() {
  console.log("\n=== Example 4: Advanced Parquet Query ===");

  const blob = await client.getFile("data/transactions.parquet");
  const reader = new ParquetReader("transactions");

  try {
    await reader.registerParquet(blob);

    // Get schema
    const schema = await reader.getSchema();
    console.log("Schema:", schema);

    // Get total count
    const count = await reader.count();
    console.log("Total rows:", count);

    // Complex query with filters and date operations
    const result = await reader.query(`
      SELECT
        DATE_TRUNC('month', transaction_date) as month,
        category,
        SUM(amount) as monthly_total,
        COUNT(DISTINCT customer_id) as unique_customers
      FROM transactions
      WHERE
        transaction_date >= '2024-01-01'
        AND amount > 0
        AND status = 'completed'
      GROUP BY
        DATE_TRUNC('month', transaction_date),
        category
      ORDER BY
        month DESC,
        monthly_total DESC
    `);

    console.log("Monthly sales by category:");
    console.table(result.rows);

  } finally {
    await reader.close();
  }
}

// ========================================
// Example 5: Filter by Date Range
// ========================================
async function example5_dateRangeFilter() {
  console.log("\n=== Example 5: Filter by Date Range ===");

  const blob = await client.getFile("data/orders.parquet");

  const result = await queryParquet(blob, `
    SELECT
      order_id,
      customer_id,
      order_date,
      total_amount,
      status
    FROM data
    WHERE
      order_date >= '2024-01-01'
      AND order_date < '2024-04-01'
      AND status IN ('completed', 'shipped')
    ORDER BY
      order_date DESC,
      total_amount DESC
    LIMIT 50
  `);

  console.log("Orders from Q1 2024:");
  console.table(result.rows);
}

// ========================================
// Example 6: Time Series Analysis
// ========================================
async function example6_timeSeriesAnalysis() {
  console.log("\n=== Example 6: Time Series Analysis ===");

  const blob = await client.getFile("data/metrics.parquet");

  const result = await queryParquet(blob, `
    WITH daily_metrics AS (
      SELECT
        DATE_TRUNC('day', timestamp) as date,
        metric_name,
        AVG(value) as avg_value,
        MIN(value) as min_value,
        MAX(value) as max_value,
        STDDEV(value) as std_dev
      FROM data
      WHERE
        timestamp >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY
        DATE_TRUNC('day', timestamp),
        metric_name
    )
    SELECT
      date,
      metric_name,
      avg_value,
      min_value,
      max_value,
      std_dev,
      -- Calculate 7-day moving average
      AVG(avg_value) OVER (
        PARTITION BY metric_name
        ORDER BY date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
      ) as moving_avg_7d
    FROM daily_metrics
    ORDER BY date DESC, metric_name
  `);

  console.log("Time series metrics (last 30 days):");
  console.table(result.rows.slice(0, 20));
}

// ========================================
// Example 7: Multi-dimensional Analysis
// ========================================
async function example7_multiDimensionalAnalysis() {
  console.log("\n=== Example 7: Multi-dimensional Analysis ===");

  const blob = await client.getFile("data/sales.parquet");

  const result = await queryParquet(blob, `
    SELECT
      region,
      product_category,
      sales_channel,
      COUNT(*) as transaction_count,
      SUM(quantity) as total_quantity,
      SUM(revenue) as total_revenue,
      AVG(revenue) as avg_revenue,
      SUM(revenue) / SUM(SUM(revenue)) OVER () * 100 as revenue_percentage
    FROM data
    WHERE
      sale_date >= '2024-01-01'
      AND sale_date < '2025-01-01'
    GROUP BY
      region,
      product_category,
      sales_channel
    HAVING
      SUM(revenue) > 1000
    ORDER BY
      total_revenue DESC
  `);

  console.log("Sales breakdown by region, category, and channel:");
  console.table(result.rows.slice(0, 15));
}

// ========================================
// Example 8: Customer Segmentation
// ========================================
async function example8_customerSegmentation() {
  console.log("\n=== Example 8: Customer Segmentation ===");

  const blob = await client.getFile("data/customer_transactions.parquet");

  const result = await queryParquet(blob, `
    WITH customer_stats AS (
      SELECT
        customer_id,
        COUNT(*) as purchase_count,
        SUM(amount) as total_spent,
        AVG(amount) as avg_order_value,
        MAX(purchase_date) as last_purchase_date,
        MIN(purchase_date) as first_purchase_date
      FROM data
      WHERE
        purchase_date >= CURRENT_DATE - INTERVAL '1 year'
      GROUP BY customer_id
    )
    SELECT
      customer_id,
      purchase_count,
      total_spent,
      avg_order_value,
      last_purchase_date,
      CASE
        WHEN total_spent >= 10000 THEN 'VIP'
        WHEN total_spent >= 5000 THEN 'Premium'
        WHEN total_spent >= 1000 THEN 'Regular'
        ELSE 'New'
      END as customer_segment,
      CASE
        WHEN last_purchase_date >= CURRENT_DATE - INTERVAL '30 days' THEN 'Active'
        WHEN last_purchase_date >= CURRENT_DATE - INTERVAL '90 days' THEN 'At Risk'
        ELSE 'Churned'
      END as engagement_status
    FROM customer_stats
    ORDER BY total_spent DESC
    LIMIT 100
  `);

  console.log("Customer segmentation:");
  console.table(result.rows);
}

// ========================================
// Example 9: Top N Analysis
// ========================================
async function example9_topNAnalysis() {
  console.log("\n=== Example 9: Top N Analysis ===");

  const blob = await client.getFile("data/products.parquet");
  const reader = new ParquetReader("products");

  try {
    await reader.registerParquet(blob);

    // Top 10 products by revenue
    const topProducts = await reader.query(`
      SELECT
        product_id,
        product_name,
        category,
        SUM(quantity_sold) as total_units,
        SUM(revenue) as total_revenue,
        AVG(unit_price) as avg_price
      FROM products
      GROUP BY product_id, product_name, category
      ORDER BY total_revenue DESC
      LIMIT 10
    `);

    console.log("Top 10 products by revenue:");
    console.table(topProducts.rows);

    // Bottom 10 products by sales
    const bottomProducts = await reader.query(`
      SELECT
        product_id,
        product_name,
        category,
        SUM(quantity_sold) as total_units,
        SUM(revenue) as total_revenue
      FROM products
      GROUP BY product_id, product_name, category
      ORDER BY total_revenue ASC
      LIMIT 10
    `);

    console.log("\nBottom 10 products by revenue:");
    console.table(bottomProducts.rows);

  } finally {
    await reader.close();
  }
}

// ========================================
// Example 10: Combining Multiple Queries
// ========================================
async function example10_combineMultipleQueries() {
  console.log("\n=== Example 10: Combine Multiple Queries ===");

  // Fetch data from multiple apps in parallel
  const [salesResult, inventoryResult, customersResult] = await Promise.all([
    client.getAppData("sales-dashboard.app.yml"),
    client.getAppData("inventory-status.app.yml"),
    client.getAppData("customer-analytics.app.yml"),
  ]);

  console.log("Sales Dashboard:", salesResult.data);
  console.log("Inventory Status:", inventoryResult.data);
  console.log("Customer Analytics:", customersResult.data);

  // Query a parquet file with insights from app data
  const blob = await client.getFile("data/combined-analytics.parquet");

  const result = await queryParquet(blob, `
    SELECT
      date,
      metric_type,
      SUM(value) as total_value,
      AVG(value) as avg_value
    FROM data
    WHERE
      date >= CURRENT_DATE - INTERVAL '7 days'
    GROUP BY date, metric_type
    ORDER BY date DESC, metric_type
  `);

  console.log("Combined analytics (last 7 days):");
  console.table(result.rows);
}

// ========================================
// Run All Examples
// ========================================
async function runAllExamples() {
  try {
    await example1_basicAppDataQuery();
    await example2_quickParquetRead();
    await example3_sqlQueryParquet();
    await example4_advancedParquetQuery();
    await example5_dateRangeFilter();
    await example6_timeSeriesAnalysis();
    await example7_multiDimensionalAnalysis();
    await example8_customerSegmentation();
    await example9_topNAnalysis();
    await example10_combineMultipleQueries();

    console.log("\n=== All examples completed successfully! ===");
  } catch (error) {
    console.error("Error running examples:", error);
    process.exit(1);
  }
}

// Run examples if this file is executed directly
if (require.main === module) {
  runAllExamples();
}

// Export functions for use in other files
export {
  example1_basicAppDataQuery,
  example2_quickParquetRead,
  example3_sqlQueryParquet,
  example4_advancedParquetQuery,
  example5_dateRangeFilter,
  example6_timeSeriesAnalysis,
  example7_multiDimensionalAnalysis,
  example8_customerSegmentation,
  example9_topNAnalysis,
  example10_combineMultipleQueries,
};
