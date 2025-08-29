import { DeleteProjectButton } from "@/components/buttons/DeleteProjectButton";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <main>
            <h1>Settings</h1>
            <DeleteProjectButton slug={slug} />
        </main>
    )
}