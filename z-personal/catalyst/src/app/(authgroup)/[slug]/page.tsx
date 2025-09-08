export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10">
      <div className="w-full sm:w-1/2 lg:w-1/4 h-full"></div>
    </main>
  );
}
