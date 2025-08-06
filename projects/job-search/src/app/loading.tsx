export default function Loading(){
return (
     <div className="fixed inset-0 bg-primary/10 backdrop-blur-md flex justify-center items-center">
      <div className="spinner">
        <div className="white" />
        <div className="black" />
        <div className="white" />
        <div className="black" />
      </div>
    </div>
)
}