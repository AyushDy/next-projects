import Button from "@/components/UI/Button";

export default function RejectButton({ application, onClick }: { application: any, onClick: (applicationId:string)=>Promise<void> }) {


    return (
        <Button variant="danger" title="Reject Application" size="sm" className="w-fit h-6" onClick={()=>onClick(application.id)}>
            Reject
        </Button>
    )
}