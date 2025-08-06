interface StatusMessageProps {
  status: string;
}

export default function StatusMessage({ status }: StatusMessageProps) {
  if (!status) return null;

  return <div className="mt-4 text-sm text-foreground">{status}</div>;
}
