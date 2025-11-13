"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Plus, X } from "lucide-react"

// Market Analysis Step
export function MarketAnalysisStep({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Market Analysis</h3>
        <p className="text-sm text-gray-600 mb-6">Define your market opportunity and competitive landscape.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="market.totalAddressableMarket"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TAM (Total Addressable Market)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="50000000000" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormDescription>In USD</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="market.serviceableAddressableMarket"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SAM (Serviceable Addressable Market)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="5000000000" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormDescription>In USD</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="market.serviceableObtainableMarket"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SOM (Serviceable Obtainable Market)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="500000000" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormDescription>In USD</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="targetMarket"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Market</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your target market in detail..."
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="competitiveAdvantage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Competitive Advantage</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="What makes you different from competitors?"
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={form.control}
          name="technologyStack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technology Stack</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a technology..."
                      value={form.watch("newValue") || ""}
                      onChange={(e) => form.setValue("newValue", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const value = form.getValues("newValue")
                        if (value?.trim()) {
                          const currentTech = field.value || []
                          form.setValue("technologyStack", [...currentTech, value.trim()])
                          form.setValue("newValue", "")
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(field.value || []).map((tech: string, index: number) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tech}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            const currentTech = field.value || []
                            form.setValue("technologyStack", currentTech.filter((_: any, i: number) => i !== index))
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={form.control}
          name="market.competition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Competitors</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a competitor..."
                      value={form.watch("newValue") || ""}
                      onChange={(e) => form.setValue("newValue", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const value = form.getValues("newValue")
                        if (value?.trim()) {
                          const currentCompetitors = field.value || []
                          form.setValue("market.competition", [...currentCompetitors, value.trim()])
                          form.setValue("newValue", "")
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(field.value || []).map((competitor: string, index: number) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {competitor}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            const currentCompetitors = field.value || []
                            form.setValue("market.competition", currentCompetitors.filter((_: any, i: number) => i !== index))
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="market.marketGrowth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Market Growth Rate (%)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="15" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormDescription>Annual market growth percentage</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="patents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patents & IP</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a patent..."
                      value={form.watch("newValue") || ""}
                      onChange={(e) => form.setValue("newValue", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const value = form.getValues("newValue")
                        if (value?.trim()) {
                          const currentPatents = field.value || []
                          form.setValue("patents", [...currentPatents, value.trim()])
                          form.setValue("newValue", "")
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(field.value || []).map((patent: string, index: number) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {patent}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            const currentPatents = field.value || []
                            form.setValue("patents", currentPatents.filter((_: any, i: number) => i !== index))
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

// Company Culture Step
export function CompanyCultureStep({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Company Culture</h3>
        <p className="text-sm text-gray-600 mb-6">Define your company culture, values, and team characteristics.</p>
      </div>

      <div>
        <FormField
          control={form.control}
          name="culture.values"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Core Values</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a core value..."
                      value={form.watch("newValue") || ""}
                      onChange={(e) => form.setValue("newValue", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const value = form.getValues("newValue")
                        if (value?.trim()) {
                          const currentValues = field.value || []
                          form.setValue("culture.values", [...currentValues, value.trim()])
                          form.setValue("newValue", "")
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(field.value || []).map((value: string, index: number) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {value}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            const currentValues = field.value || []
                            form.setValue("culture.values", currentValues.filter((_: any, i: number) => i !== index))
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={form.control}
          name="culture.perks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee Perks & Benefits</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a perk..."
                      value={form.watch("newValue") || ""}
                      onChange={(e) => form.setValue("newValue", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const value = form.getValues("newValue")
                        if (value?.trim()) {
                          const currentPerks = field.value || []
                          form.setValue("culture.perks", [...currentPerks, value.trim()])
                          form.setValue("newValue", "")
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(field.value || []).map((perk: string, index: number) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {perk}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            const currentPerks = field.value || []
                            form.setValue("culture.perks", currentPerks.filter((_: any, i: number) => i !== index))
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="culture.teamSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Size</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="33" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="culture.averageAge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average Team Age</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="28" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <h4 className="font-medium mb-3">Team Diversity</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-sm font-medium mb-2">Gender Distribution (%)</h5>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="culture.diversity.gender.male"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Male</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="60" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="culture.diversity.gender.female"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Female</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="40" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium mb-2">Ethnicity Distribution (%)</h5>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="culture.diversity.ethnicity.asian"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asian</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="70" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="culture.diversity.ethnicity.caucasian"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Caucasian</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="20" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="culture.diversity.ethnicity.other"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="10" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Office Locations Step
export function OfficeLocationsStep({ form }: { form: any }) {
  const addOfficeLocation = () => {
    const currentLocations = form.getValues("officeLocations") || []
    form.setValue("officeLocations", [
      ...currentLocations,
      {
        city: "",
        address: "",
        type: "Headquarters",
        employees: 0,
      }
    ])
  }

  const removeOfficeLocation = (index: number) => {
    const currentLocations = form.getValues("officeLocations") || []
    form.setValue("officeLocations", currentLocations.filter((_: any, i: number) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Office Locations</h3>
        <p className="text-sm text-gray-600 mb-6">Add your physical office locations and remote work policies.</p>
      </div>

      <div className="space-y-4">
        {(form.watch("officeLocations") || []).map((_: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Office Location {index + 1}</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeOfficeLocation(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`officeLocations.${index}.city`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Singapore" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`officeLocations.${index}.type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Office Type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Headquarters">Headquarters</SelectItem>
                        <SelectItem value="Sales Office">Sales Office</SelectItem>
                        <SelectItem value="Development Center">Development Center</SelectItem>
                        <SelectItem value="Branch Office">Branch Office</SelectItem>
                        <SelectItem value="Remote Hub">Remote Hub</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`officeLocations.${index}.address`}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Full Address</FormLabel>
                    <FormControl>
                      <Input placeholder="1 Marina Bay Sands, Singapore 018956" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`officeLocations.${index}.employees`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Employees</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="25" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addOfficeLocation}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Office Location
        </Button>
      </div>
    </div>
  )
}
