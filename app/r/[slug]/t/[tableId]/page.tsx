"use client";

import React, { use } from "react";
import { RestaurantProvider } from "@/context/RestaurantContext";
import { MainContent } from "@/app/page";

interface TableScanPageProps {
  params: Promise<{
    slug: string;
    tableId: string;
  }>;
}

export default function TableScanPage({ params }: TableScanPageProps) {
  const { slug, tableId } = use(params);

  return (
    <RestaurantProvider initialRestaurantSlug={slug} initialTableId={tableId}>
      <MainContent />
    </RestaurantProvider>
  );
}
