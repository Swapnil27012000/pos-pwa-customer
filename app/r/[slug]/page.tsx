"use client";

import React, { use } from "react";
import { RestaurantProvider } from "@/context/RestaurantContext";
import { MainContent } from "@/app/page";

interface RestaurantMenuPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function RestaurantMenuPage({ params }: RestaurantMenuPageProps) {
  const { slug } = use(params);

  return (
    <RestaurantProvider initialRestaurantSlug={slug}>
      <MainContent />
    </RestaurantProvider>
  );
}
