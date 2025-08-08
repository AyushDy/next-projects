import Button from "@/components/UI/Button";

export default function AcceptButton({application, onClick}:{application:any, onClick: (applicationId:string)=> Promise<void>}){

    return (
        <Button
            variant="success"
            title="Accept Application"
            size="sm"
            className="w-fit h-6"
            onClick={()=>onClick(application.id)}
        >
            Accept
        </Button>
    )

}