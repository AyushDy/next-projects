export default function Idle({name}:{name:string}){

    return(
        <div className="flex items-center justify-center h-full w-full border">
          <h1 className="text-white font-semibold text-5xl w-fit">
            What should {name} do?
          </h1>
        </div>
    )
}