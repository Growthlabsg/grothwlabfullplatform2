import { LegalDocumentGenerator } from "@/components/startup/legal-document-generator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Legal Document Generator | GrowthLab",
  description: "Create essential legal documents for your startup with customizable templates",
}

export default function LegalDocumentsPage() {
  return <LegalDocumentGenerator />
}
