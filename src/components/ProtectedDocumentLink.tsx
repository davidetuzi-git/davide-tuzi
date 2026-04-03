import { ExternalLink, Lock } from "lucide-react";

interface ProtectedDocumentLinkProps {
  documentKey: string;
  documentUrl: string;
  label: string;
  className?: string;
}

export function ProtectedDocumentLink({ documentUrl, label, className }: ProtectedDocumentLinkProps) {
  return (
    <a
      href={documentUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Lock className="w-3 h-3" />
      {label}
      <ExternalLink className="w-2.5 h-2.5 opacity-50" />
    </a>
  );
}
