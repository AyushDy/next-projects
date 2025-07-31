"use client";

export default function ConfirmationModal({
  message = "Are you sure you want to proceed?",
  cancel = "Cancel",
  confirm = "Confirm",
  onConfirm = ()=>{},
  onCancel = ()=>{}
}: {
    message? : string,
    cancel? : string,
    confirm? : string,
    onConfirm? : ()=>void,
    onCancel : ()=>void
}) {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
      <div className="bg-white p-10 flex flex-col">
        <h1 className="p-2 text-gray-800 bg-semibold text-md">{message}</h1>
        <div className="flex justify-between w-full gap-5">
          <button onClick={onCancel} className="px-5 py-3 bg-green-500 rounded cursor-pointer">{cancel}</button>
          <form onSubmit={(e)=>{
            e.preventDefault();
            onConfirm();
          }}>
           <button type="submit" className="px-5 py-3 bg-red-500 rounded cursor-pointer">{confirm}</button>
           </form>
        </div>
      </div>
    </div>
  );
}
