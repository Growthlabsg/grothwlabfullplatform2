"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// For demo, import template statically. In production, fetch dynamically.
import ndaTemplate from "../../legal-templates/nda.json"

type TemplateField = {
  name: string
  label: string
  type: string
  required?: boolean
  default?: any
}

type Clause = {
  title: string
  body: string
}

type LegalTemplate = {
  title: string
  description: string
  fields: TemplateField[]
  clauses: Clause[]
  signatureSection: {
    parties: string[]
    dateField: string
  }
}

export default function LegalDocumentGenerator() {
  const [step, setStep] = useState(0)
  const [template, setTemplate] = useState<LegalTemplate | null>(null)
  const [form, setForm] = useState<Record<string, any>>({})
  const [docType, setDocType] = useState("nda")

  // Load template (for now, only NDA)
  useEffect(() => {
    setTemplate(ndaTemplate as LegalTemplate)
    // Set defaults
    if (ndaTemplate.fields) {
      const defaults: Record<string, any> = {}
      ndaTemplate.fields.forEach(f => {
        if (f.default !== undefined) defaults[f.name] = f.default
      })
      setForm(defaults)
    }
  }, [])

  const handleFieldChange = (name: string, value: any) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // Simple template rendering
  const renderClause = (clause: Clause) => {
    let text = clause.body
    if (template) {
      template.fields.forEach(f => {
        text = text.replaceAll(`{{${f.name}}}`, form[f.name] || "____")
      })
    }
    return text
  }

  // Stepper UI
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Legal Document Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Tabs value={String(step)} onValueChange={v => setStep(Number(v))}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="0">Select Type</TabsTrigger>
                <TabsTrigger value="1">Fill Details</TabsTrigger>
                <TabsTrigger value="2">Review & Export</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {step === 0 && (
            <div className="space-y-6">
              <Label className="block mb-2">Document Type</Label>
              <Select value={docType} onValueChange={v => setDocType(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nda">Non-Disclosure Agreement (NDA)</SelectItem>
                  {/* Future: Add more document types here */}
                </SelectContent>
              </Select>
              <div className="mt-4">
                <Button onClick={() => setStep(1)}>Next</Button>
              </div>
            </div>
          )}

          {step === 1 && template && (
            <form className="space-y-6" onSubmit={e => { e.preventDefault(); setStep(2) }}>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{template.title}</h2>
                <p className="text-muted-foreground mb-2">{template.description}</p>
              </div>
              {template.fields.map(field => (
                <div key={field.name} className="space-y-1">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    type={field.type === "date" ? "date" : field.type === "number" ? "number" : "text"}
                    value={form[field.name] || ""}
                    required={field.required}
                    onChange={e => handleFieldChange(field.name, e.target.value)}
                  />
                </div>
              ))}
              <div className="flex gap-2 mt-4">
                <Button type="button" variant="outline" onClick={() => setStep(0)}>Back</Button>
                <Button type="submit">Next</Button>
              </div>
            </form>
          )}

          {step === 2 && template && (
            <div className="space-y-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{template.title}</h2>
                <p className="text-muted-foreground mb-2">{template.description}</p>
              </div>
              <div className="space-y-4">
                {template.clauses.map((clause, idx) => (
                  <div key={idx} className="mb-2">
                    <h4 className="font-medium mb-1">{clause.title}</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{renderClause(clause)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                {/* Future: Add Export/Download/Collaborate buttons here */}
                <Button disabled>Export (Coming Soon)</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}