export default async function Page({params}:{params:Promise<{userId:string}>}) {
  const {userId} = await params;
  return (
    <div>
      <h1>Settings for User: {userId}</h1>
    </div>
  );
}