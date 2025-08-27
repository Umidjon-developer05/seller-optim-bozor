import React from "react";
import HomePage from "../(home)/page";
import {
  getOrders,
  getProducts,
  getCustomers,
  getTransactions,
} from "@/actions/seller.action";

async function Dashboard() {
  const [ordersRes, productsRes, customersRes, transactionsRes] =
    await Promise.all([
      getOrders({ page: "1", pageSize: "1" }),
      getProducts({ page: "1", pageSize: "8" }),
      getCustomers({ page: "1", pageSize: "1" }),
      getTransactions({ page: "1", pageSize: "100" }),
    ]);

  const totalOrders =
    (ordersRes as any)?.data?.total ||
    (ordersRes as any)?.data?.orders?.length ||
    0;
  const totalProducts =
    (productsRes as any)?.data?.total ||
    (productsRes as any)?.data?.products?.length ||
    0;
  const totalCustomers =
    (customersRes as any)?.data?.total ||
    (customersRes as any)?.data?.customers?.length ||
    0;
  const transactions = (transactionsRes as any)?.data?.transactions || [];
  const totalRevenue = Array.isArray(transactions)
    ? transactions.reduce((sum: number, t: any) => sum + (t.amount || 0), 0)
    : 0;

  // Normalize products to minimal shape for ProductCard
  const rawProducts: any[] = (productsRes as any)?.data?.products || [];
  const products = rawProducts.map((p) => ({
    _id: p._id,
    title: p.title,
    price: p.price,
    description: p.description,
    image: p.image,
    imageKey: p.imageKey,
    subcategoryId: p.subcategoryId,
    category: p.category,
  }));

  return (
    <div>
      <HomePage
        totalRevenue={totalRevenue}
        totalCustomers={totalCustomers}
        totalOrders={totalOrders}
        totalProducts={totalProducts}
        products={products}
      />
    </div>
  );
}

export default Dashboard;
