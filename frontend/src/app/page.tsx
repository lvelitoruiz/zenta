"use client";
import React from "react";
import { MetricsPanel } from "@/components/Metrics/MetricsPanel";
import { ChartsContainer } from "@/components/Charts/ChartsContainer";
import { ProductsTable } from "@/components/Table/ProductsTable";
// import { FormExamples } from "@/components/Examples/FormExamples";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <MetricsPanel />
        <div className="mt-4">
          <ChartsContainer />
        </div>
        {/* <div className="mb-6">
          <FormExamples />
        </div> */}
        <ProductsTable />
      </div>
    </main>
  );
}
