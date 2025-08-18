export default function InputText({
  value,
  onChange,
  placeholder,
  type,
  name = "input"
}: {
  value?: string;
  onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void;
  placeholder? : string
  type?: string
  name?: string
}) {
  return (
    <label className="font-light">
      {name.charAt(0).toUpperCase() + name.slice(1)}:
      <input
        name={name}
        type={type}
        id={name}
        value={value}
        onChange={onChange}
      className={`w-full p-2 rounded-lg border-gray-300 bg-gray-50 focus:border-sky-500 focus:ring-0.5 focus:ring-sky-500 transition-all text-black outline-none border `}
      placeholder={placeholder}
      />
    </label>
  )
}
