import { Suspense } from "react";

import { HomeClient } from "@/app/home-client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function HomeFallback() {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 md:px-10">
      <main className="mx-auto w-full max-w-7xl">
        <Card>
          <CardHeader>
            <CardTitle>데이터 불러오는 중</CardTitle>
            <CardDescription>페이지를 준비하고 있습니다.</CardDescription>
          </CardHeader>
        </Card>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomeClient />
    </Suspense>
  );
}
