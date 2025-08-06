export default async function AdminJobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  

  return (
    <div>
      <h1>Admin Job Details Page</h1>
    </div>
  );
}
