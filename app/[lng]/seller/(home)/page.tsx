import React from "react";
import { SectionCards } from "../_components/section-cards";

import { SiteHeader } from "../_components/site-header";

import { SidebarInset } from "@/components/ui/sidebar";
import ProductCard from "../_components/product.card";
import { IProduct1 } from "@/types";
type HomePageProps = {
  totalRevenue: number;
  totalCustomers: number;
  totalOrders: number;
  totalProducts: number;
  products?: IProduct1[];
};

function HomePage({
  totalRevenue,
  totalCustomers,
  totalOrders,
  totalProducts,
  products = [],
}: HomePageProps) {
  return (
    <div className="w-full">
      <SidebarInset>
        <SiteHeader />
      </SidebarInset>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards
              totalRevenue={totalRevenue}
              totalCustomers={totalCustomers}
              totalOrders={totalOrders}
              totalProducts={totalProducts}
            />

            
            {products && products.length > 0 && (
              <div className="px-4 lg:px-6">
                <h2 className="text-lg font-semibold mb-3">Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
