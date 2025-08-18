export default function Form({
  handleSubmit,
  children,
  shadow = true,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  shadow?: boolean;
}) {
  return (
    <div className={`max-w-xl w-full h-full max-h-3/5 p-4 pb-8 flex items-center  bg-white rounded-xl ${shadow ? "shadow-lg" : ""} justify-center space-y-6`}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="p-2 flex flex-col space-y-3 w-full text-black bg-white text-sm"
      >
        {children}
      </form>
    </div>
  );
}
