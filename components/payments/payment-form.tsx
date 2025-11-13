"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { 
  CreditCard, 
  DollarSign, 
  Percent, 
  Users, 
  Calendar,
  Info,
  CheckCircle
} from "lucide-react"

interface PaymentFormProps {
  onSave: (paymentData: any) => void
  onCancel: () => void
  initialData?: any
}

export function PaymentForm({ onSave, onCancel, initialData }: PaymentFormProps) {
  const { toast } = useToast()
  const [paymentData, setPaymentData] = useState({
    enabled: initialData?.enabled || false,
    price: initialData?.price || '',
    currency: initialData?.currency || 'usd',
    paymentType: initialData?.paymentType || 'per_person',
    earlyBirdDiscount: initialData?.earlyBirdDiscount || false,
    earlyBirdPrice: initialData?.earlyBirdPrice || '',
    earlyBirdEndDate: initialData?.earlyBirdEndDate || '',
    groupDiscount: initialData?.groupDiscount || false,
    groupSize: initialData?.groupSize || '',
    groupDiscountPercent: initialData?.groupDiscountPercent || '',
    refundPolicy: initialData?.refundPolicy || 'no_refund',
    refundDays: initialData?.refundDays || '7',
    paymentMethods: initialData?.paymentMethods || ['card'],
    requireApproval: initialData?.requireApproval || false,
    maxParticipants: initialData?.maxParticipants || '',
    ...initialData
  })

  const currencies = [
    { code: 'usd', name: 'US Dollar', symbol: '$' },
    { code: 'eur', name: 'Euro', symbol: '€' },
    { code: 'gbp', name: 'British Pound', symbol: '£' },
    { code: 'cad', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'aud', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'sgd', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'jpy', name: 'Japanese Yen', symbol: '¥' },
  ]

  const paymentTypes = [
    { value: 'per_person', label: 'Per Person', description: 'Each participant pays individually' },
    { value: 'per_team', label: 'Per Team', description: 'Each team pays a fixed amount' },
    { value: 'per_event', label: 'Per Event', description: 'Single payment for the entire event' },
  ]

  const refundPolicies = [
    { value: 'no_refund', label: 'No Refunds', description: 'No refunds once payment is made' },
    { value: 'full_refund', label: 'Full Refund', description: 'Full refund if cancelled within specified days' },
    { value: 'partial_refund', label: 'Partial Refund', description: 'Partial refund based on cancellation timing' },
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    if (paymentData.enabled && !paymentData.price) {
      toast({
        title: "Validation Error",
        description: "Please enter a price when payment is enabled.",
        variant: "destructive",
      })
      return
    }

    onSave(paymentData)
    toast({
      title: "Payment Settings Saved",
      description: "Your payment configuration has been updated.",
    })
  }

  const calculateTotal = () => {
    if (!paymentData.price || !paymentData.maxParticipants) return 0
    const price = parseFloat(paymentData.price)
    const participants = parseInt(paymentData.maxParticipants)
    return price * participants
  }

  const selectedCurrency = currencies.find(c => c.code === paymentData.currency)

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <CardTitle>Payment Settings</CardTitle>
            <CardDescription>
              Configure payment options for your event
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Enable Payment */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="enabled"
            checked={paymentData.enabled}
            onCheckedChange={(checked) => handleInputChange('enabled', checked as boolean)}
          />
          <Label htmlFor="enabled" className="text-base font-medium">
            Enable payment for this event
          </Label>
        </div>

        {paymentData.enabled && (
          <>
            {/* Basic Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {selectedCurrency?.symbol}
                  </span>
                  <Input
                    id="price"
                    type="number"
                    value={paymentData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0.00"
                    className="pl-8"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="currency">Currency *</Label>
                <Select value={paymentData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">{currency.symbol}</span>
                          <span>{currency.code.toUpperCase()}</span>
                          <span className="text-sm text-gray-500">- {currency.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Payment Type */}
            <div>
              <Label>Payment Type *</Label>
              <div className="grid grid-cols-1 gap-3 mt-2">
                {paymentTypes.map((type) => (
                  <div key={type.value} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <input
                      type="radio"
                      id={type.value}
                      name="paymentType"
                      value={type.value}
                      checked={paymentData.paymentType === type.value}
                      onChange={(e) => handleInputChange('paymentType', e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor={type.value} className="font-medium">
                        {type.label}
                      </Label>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Max Participants */}
            <div>
              <Label htmlFor="maxParticipants">Maximum Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                value={paymentData.maxParticipants}
                onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                placeholder="e.g., 20"
                min="1"
              />
            </div>

            {/* Revenue Estimate */}
            {paymentData.price && paymentData.maxParticipants && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Revenue Estimate</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">
                  {selectedCurrency?.symbol}{calculateTotal().toFixed(2)}
                </p>
                <p className="text-sm text-blue-700">
                  {paymentData.maxParticipants} participants × {selectedCurrency?.symbol}{paymentData.price}
                </p>
              </div>
            )}

            {/* Early Bird Discount */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="earlyBirdDiscount"
                  checked={paymentData.earlyBirdDiscount}
                  onCheckedChange={(checked) => handleInputChange('earlyBirdDiscount', checked as boolean)}
                />
                <Label htmlFor="earlyBirdDiscount" className="font-medium">
                  Early Bird Discount
                </Label>
              </div>
              
              {paymentData.earlyBirdDiscount && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                  <div>
                    <Label htmlFor="earlyBirdPrice">Early Bird Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {selectedCurrency?.symbol}
                      </span>
                      <Input
                        id="earlyBirdPrice"
                        type="number"
                        value={paymentData.earlyBirdPrice}
                        onChange={(e) => handleInputChange('earlyBirdPrice', e.target.value)}
                        placeholder="0.00"
                        className="pl-8"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="earlyBirdEndDate">Discount Ends</Label>
                    <Input
                      id="earlyBirdEndDate"
                      type="date"
                      value={paymentData.earlyBirdEndDate}
                      onChange={(e) => handleInputChange('earlyBirdEndDate', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Group Discount */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="groupDiscount"
                  checked={paymentData.groupDiscount}
                  onCheckedChange={(checked) => handleInputChange('groupDiscount', checked as boolean)}
                />
                <Label htmlFor="groupDiscount" className="font-medium">
                  Group Discount
                </Label>
              </div>
              
              {paymentData.groupDiscount && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                  <div>
                    <Label htmlFor="groupSize">Minimum Group Size</Label>
                    <Input
                      id="groupSize"
                      type="number"
                      value={paymentData.groupSize}
                      onChange={(e) => handleInputChange('groupSize', e.target.value)}
                      placeholder="e.g., 5"
                      min="2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="groupDiscountPercent">Discount Percentage</Label>
                    <div className="relative">
                      <Input
                        id="groupDiscountPercent"
                        type="number"
                        value={paymentData.groupDiscountPercent}
                        onChange={(e) => handleInputChange('groupDiscountPercent', e.target.value)}
                        placeholder="10"
                        className="pr-8"
                        min="1"
                        max="50"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Refund Policy */}
            <div>
              <Label>Refund Policy *</Label>
              <div className="grid grid-cols-1 gap-3 mt-2">
                {refundPolicies.map((policy) => (
                  <div key={policy.value} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <input
                      type="radio"
                      id={policy.value}
                      name="refundPolicy"
                      value={policy.value}
                      checked={paymentData.refundPolicy === policy.value}
                      onChange={(e) => handleInputChange('refundPolicy', e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor={policy.value} className="font-medium">
                        {policy.label}
                      </Label>
                      <p className="text-sm text-gray-600">{policy.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {(paymentData.refundPolicy === 'full_refund' || paymentData.refundPolicy === 'partial_refund') && (
                <div className="mt-4">
                  <Label htmlFor="refundDays">Refund Period (Days)</Label>
                  <Input
                    id="refundDays"
                    type="number"
                    value={paymentData.refundDays}
                    onChange={(e) => handleInputChange('refundDays', e.target.value)}
                    placeholder="7"
                    min="1"
                    max="30"
                  />
                </div>
              )}
            </div>

            {/* Payment Methods */}
            <div>
              <Label>Accepted Payment Methods</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="card"
                    checked={paymentData.paymentMethods.includes('card')}
                    onCheckedChange={(checked) => {
                      const methods = paymentData.paymentMethods
                      if (checked) {
                        handleInputChange('paymentMethods', [...methods, 'card'])
                      } else {
                        handleInputChange('paymentMethods', methods.filter(m => m !== 'card'))
                      }
                    }}
                  />
                  <Label htmlFor="card">Credit/Debit Cards</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bank"
                    checked={paymentData.paymentMethods.includes('bank')}
                    onCheckedChange={(checked) => {
                      const methods = paymentData.paymentMethods
                      if (checked) {
                        handleInputChange('paymentMethods', [...methods, 'bank'])
                      } else {
                        handleInputChange('paymentMethods', methods.filter(m => m !== 'bank'))
                      }
                    }}
                  />
                  <Label htmlFor="bank">Bank Transfer</Label>
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requireApproval"
                  checked={paymentData.requireApproval}
                  onCheckedChange={(checked) => handleInputChange('requireApproval', checked as boolean)}
                />
                <Label htmlFor="requireApproval">
                  Require approval before payment
                </Label>
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Save Payment Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
