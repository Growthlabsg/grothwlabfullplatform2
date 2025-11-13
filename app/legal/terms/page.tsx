'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Printer } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function TermsPage() {
  const router = useRouter()

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const content = document.getElementById('terms-content')?.innerText || ''
    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'growthlab-terms-and-conditions.txt'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
              <p className="text-gray-600 mt-2">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <Card id="terms-content">
          <CardHeader>
            <CardTitle>GrowthLab Platform Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm leading-relaxed">
            
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="mb-3">
                Welcome to GrowthLab ("Platform," "Service," "we," "us," or "our"). These Terms & Conditions 
                ("Terms") govern your use of the GrowthLab platform, including all features, services, and content 
                available through our website and mobile applications.
              </p>
              <p className="mb-3">
                By accessing or using our Platform, you agree to be bound by these Terms. If you disagree with 
                any part of these Terms, you may not access the Service.
              </p>
              <p>
                GrowthLab is a comprehensive platform designed to support startups, entrepreneurs, and investors 
                in their growth journey through various tools, resources, and networking opportunities.
              </p>
            </section>

            <Separator />

            {/* Definitions */}
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Definitions</h2>
              <div className="space-y-2">
                <p><strong>"User"</strong> means any individual or entity that accesses or uses the Platform.</p>
                <p><strong>"Startup"</strong> means a business entity in its early stages of development.</p>
                <p><strong>"Investor"</strong> means an individual or entity that provides capital to startups.</p>
                <p><strong>"Content"</strong> means any information, data, text, graphics, or other materials posted on the Platform.</p>
                <p><strong>"Services"</strong> means all features, tools, and functionalities provided by GrowthLab.</p>
                <p><strong>"Account"</strong> means the user profile and associated data created on the Platform.</p>
              </div>
            </section>

            <Separator />

            {/* Account Registration */}
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Account Registration & Security</h2>
              <div className="space-y-3">
                <p>
                  To access certain features of the Platform, you must create an account. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Ensure your account is used only by you and not shared with others</li>
                </ul>
                <p>
                  We reserve the right to suspend or terminate accounts that violate these Terms or engage in 
                  fraudulent or harmful activities.
                </p>
              </div>
            </section>

            <Separator />

            {/* Acceptable Use */}
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Acceptable Use Policy</h2>
              <div className="space-y-3">
                <p>You agree to use the Platform only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon intellectual property rights</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Spread malware, viruses, or harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use the Platform for spam or unsolicited communications</li>
                  <li>Engage in fraudulent activities or misrepresentation</li>
                  <li>Interfere with the proper functioning of the Platform</li>
                  <li>Collect or harvest personal information without consent</li>
                  <li>Use automated systems to access the Platform without permission</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Content & Intellectual Property */}
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Content & Intellectual Property</h2>
              <div className="space-y-3">
                <p><strong>User-Generated Content:</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>You retain ownership of content you create and share on the Platform</li>
                  <li>By posting content, you grant us a worldwide, non-exclusive license to use, display, and distribute your content</li>
                  <li>You represent that you have the right to share such content</li>
                  <li>We reserve the right to remove content that violates these Terms</li>
                </ul>
                
                <p><strong>Platform Content:</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>All content provided by GrowthLab is protected by copyright and other intellectual property laws</li>
                  <li>You may not copy, modify, or distribute our content without written permission</li>
                  <li>Our trademarks and branding are protected and may not be used without authorization</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Privacy & Data Protection */}
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Privacy & Data Protection</h2>
              <p>
                Your privacy is important to us. Our collection, use, and protection of your personal information 
                is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using 
                the Platform, you consent to the collection and use of your information as described in our Privacy Policy.
              </p>
            </section>

            <Separator />

            {/* Third-Party Services */}
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Third-Party Services & Integrations</h2>
              <div className="space-y-3">
                <p>
                  The Platform may integrate with third-party services, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>OAuth providers (Google, LinkedIn)</li>
                  <li>Payment processors (Stripe, PayPal)</li>
                  <li>Communication tools (email, SMS)</li>
                  <li>Analytics and monitoring services</li>
                  <li>Cloud storage and hosting services</li>
                </ul>
                <p>
                  We are not responsible for the privacy practices or content of third-party services. 
                  Your use of third-party services is subject to their respective terms and privacy policies.
                </p>
              </div>
            </section>

            <Separator />

            {/* Payment Terms */}
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Payment Terms & Subscription</h2>
              <div className="space-y-3">
                <p>
                  Some features of the Platform may require payment or subscription. By purchasing a subscription:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>You agree to pay all fees associated with your chosen plan</li>
                  <li>Fees are billed in advance on a recurring basis</li>
                  <li>You may cancel your subscription at any time</li>
                  <li>Refunds are subject to our refund policy</li>
                  <li>We reserve the right to modify pricing with 30 days notice</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Disclaimers */}
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Disclaimers & Limitations</h2>
              <div className="space-y-3">
                <p><strong>Service Availability:</strong></p>
                <p>
                  We strive to maintain high availability but do not guarantee uninterrupted access to the Platform. 
                  The Platform is provided "as is" without warranties of any kind.
                </p>
                
                <p><strong>Investment Advice:</strong></p>
                <p>
                  GrowthLab does not provide investment, financial, or legal advice. All information on the Platform 
                  is for educational and informational purposes only. Users should consult qualified professionals 
                  before making investment decisions.
                </p>
                
                <p><strong>Limitation of Liability:</strong></p>
                <p>
                  To the maximum extent permitted by law, GrowthLab shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages arising from your use of the Platform.
                </p>
              </div>
            </section>

            <Separator />

            {/* Termination */}
            <section>
              <h2 className="text-xl font-semibold mb-3">10. Termination</h2>
              <div className="space-y-3">
                <p>We may terminate or suspend your account and access to the Platform:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Immediately, for violations of these Terms</li>
                  <li>With 30 days notice, for any other reason</li>
                  <li>Upon your request to delete your account</li>
                </ul>
                <p>
                  Upon termination, your right to use the Platform ceases immediately. We may retain certain 
                  information as required by law or for legitimate business purposes.
                </p>
              </div>
            </section>

            <Separator />

            {/* Governing Law */}
            <section>
              <h2 className="text-xl font-semibold mb-3">11. Governing Law & Dispute Resolution</h2>
              <p>
                These Terms are governed by the laws of Singapore. Any disputes arising from these Terms or 
                your use of the Platform shall be resolved through binding arbitration in Singapore, in accordance 
                with the rules of the Singapore International Arbitration Centre.
              </p>
            </section>

            <Separator />

            {/* Changes to Terms */}
            <section>
              <h2 className="text-xl font-semibold mb-3">12. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately 
                upon posting on the Platform. Your continued use of the Platform after changes are posted 
                constitutes acceptance of the new Terms.
              </p>
            </section>

            <Separator />

            {/* Contact Information */}
            <section>
              <h2 className="text-xl font-semibold mb-3">13. Contact Information</h2>
              <p>
                If you have questions about these Terms, please contact us at:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <p><strong>GrowthLab Pte Ltd</strong></p>
                <p>Email: legal@growthlab.sg</p>
                <p>Address: [Your Business Address]</p>
                <p>Phone: [Your Phone Number]</p>
              </div>
            </section>

            <Separator />

            {/* Acceptance */}
            <section className="text-center py-6">
              <p className="text-lg font-semibold">
                By using the GrowthLab Platform, you acknowledge that you have read, understood, and agree to 
                be bound by these Terms & Conditions.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
