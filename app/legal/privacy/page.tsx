'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Printer, Shield, Eye, Lock, Database, Globe } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PrivacyPage() {
  const router = useRouter()

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const content = document.getElementById('privacy-content')?.innerText || ''
    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'growthlab-privacy-policy.txt'
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
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
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

        {/* Privacy Content */}
        <Card id="privacy-content">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              GrowthLab Platform Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm leading-relaxed">
            
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="mb-3">
                At GrowthLab (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), we are committed to protecting your privacy and ensuring 
                the security of your personal information. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you use our platform and services.
              </p>
              <p className="mb-3">
                This policy applies to all users of the GrowthLab platform, including startups, entrepreneurs, 
                investors, and other stakeholders who access our services through our website, mobile applications, 
                or any other digital channels.
              </p>
              <p>
                By using our Platform, you consent to the collection and use of your information as described 
                in this Privacy Policy. If you do not agree with our policies and practices, please do not use 
                our Platform.
              </p>
            </section>

            <Separator />

            {/* Information We Collect */}
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              
              <h3 className="text-lg font-medium mb-2">2.1 Personal Information</h3>
              <p className="mb-3">We collect the following types of personal information:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Identity Information:</strong> Name, email address, phone number, profile picture</li>
                <li><strong>Professional Information:</strong> Job title, company, industry, experience level</li>
                <li><strong>Authentication Data:</strong> OAuth tokens, account credentials, login history</li>
                <li><strong>Profile Data:</strong> Bio, skills, education, work history (when imported from LinkedIn)</li>
                <li><strong>Communication Preferences:</strong> Email preferences, notification settings</li>
              </ul>

              <h3 className="text-lg font-medium mb-2">2.2 Automatically Collected Information</h3>
              <p className="mb-3">We automatically collect certain information when you use our Platform:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on Platform</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, operating system</li>
                <li><strong>Location Data:</strong> General location based on IP address (with consent)</li>
                <li><strong>Cookies & Tracking:</strong> Session cookies, analytics cookies, preference cookies</li>
              </ul>

              <h3 className="text-lg font-medium mb-2">2.3 Third-Party Information</h3>
              <p>
                When you use OAuth authentication (Google, LinkedIn), we may receive additional information 
                from these providers as permitted by your privacy settings and our agreements with them.
              </p>
            </section>

            <Separator />

            {/* How We Use Information */}
            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p className="mb-3">We use the collected information for the following purposes:</p>
              
              <h3 className="text-lg font-medium mb-2">3.1 Core Platform Services</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Providing and maintaining our Platform and services</li>
                <li>Processing your registration and managing your account</li>
                <li>Enabling OAuth authentication and profile management</li>
                <li>Facilitating connections between startups, investors, and mentors</li>
                <li>Delivering personalized content and recommendations</li>
              </ul>

              <h3 className="text-lg font-medium mb-2">3.2 Communication & Support</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Sending important updates about our services</li>
                <li>Providing customer support and responding to inquiries</li>
                <li>Sending marketing communications (with your consent)</li>
                <li>Notifying you about new features and opportunities</li>
              </ul>

              <h3 className="text-lg font-medium mb-2">3.3 Platform Improvement</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Analyzing usage patterns to improve our services</li>
                <li>Conducting research and development</li>
                <li>Preventing fraud and ensuring platform security</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <Separator />

            {/* Information Sharing */}
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Information Sharing & Disclosure</h2>
              <p className="mb-3">We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
              
              <h3 className="text-lg font-medium mb-2">4.1 With Your Consent</h3>
              <p className="mb-3">We may share your information when you explicitly consent to such sharing, such as:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Connecting with other users on the platform</li>
                <li>Participating in networking events or programs</li>
                <li>Sharing your profile with potential investors or partners</li>
              </ul>

              <h3 className="text-lg font-medium mb-2">4.2 Service Providers</h3>
              <p className="mb-3">We may share information with trusted third-party service providers who assist us in:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Hosting and maintaining our Platform</li>
                <li>Processing payments and managing subscriptions</li>
                <li>Providing analytics and monitoring services</li>
                <li>Sending emails and communications</li>
                <li>Providing customer support services</li>
              </ul>

              <h3 className="text-lg font-medium mb-2">4.3 Legal Requirements</h3>
              <p className="mb-3">We may disclose your information when required by law or to:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Comply with legal processes or government requests</li>
                <li>Protect our rights, property, or safety</li>
                <li>Investigate potential violations of our Terms of Service</li>
                <li>Prevent fraud or security threats</li>
              </ul>

              <h3 className="text-lg font-medium mb-2">4.4 Business Transfers</h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, your information may be transferred 
                as part of the business transaction. We will notify you of any such change in ownership.
              </p>
            </section>

            <Separator />

            {/* Data Security */}
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Data Security & Protection</h2>
              <p className="mb-3">We implement comprehensive security measures to protect your personal information:</p>
              
              <h3 className="text-lg font-medium mb-2">5.1 Technical Security Measures</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Encryption:</strong> All data is encrypted in transit (TLS/SSL) and at rest (AES-256)</li>
                <li><strong>Authentication:</strong> Multi-factor authentication and secure OAuth flows</li>
                <li><strong>Access Controls:</strong> Role-based access control and principle of least privilege</li>
                <li><strong>Network Security:</strong> Firewalls, intrusion detection, and DDoS protection</li>
                <li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
              </ul>

              <h3 className="text-lg font-medium mb-2">5.2 Operational Security</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Employee Training:</strong> Regular security awareness training for all staff</li>
                <li><strong>Incident Response:</strong> 24/7 security monitoring and rapid response procedures</li>
                <li><strong>Data Backup:</strong> Regular encrypted backups with disaster recovery plans</li>
                <li><strong>Vendor Security:</strong> Rigorous assessment of third-party service providers</li>
              </ul>

              <h3 className="text-lg font-medium mb-2">5.3 Compliance & Standards</h3>
              <p>
                We maintain compliance with industry standards including SOC 2, GDPR, and Singapore's 
                Personal Data Protection Act (PDPA). Our security practices are regularly reviewed and updated.
              </p>
            </section>

            <Separator />

            {/* Data Retention */}
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Data Retention & Deletion</h2>
              <div className="space-y-3">
                <p><strong>Retention Periods:</strong></p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li><strong>Account Data:</strong> Retained while your account is active</li>
                  <li><strong>Usage Data:</strong> Retained for up to 3 years for analytics and improvement</li>
                  <li><strong>Communication Data:</strong> Retained for up to 2 years</li>
                  <li><strong>Payment Data:</strong> Retained as required by financial regulations</li>
                </ul>

                <p><strong>Data Deletion:</strong></p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>You can request deletion of your account and personal data at any time</li>
                  <li>We will process deletion requests within 30 days</li>
                  <li>Some data may be retained for legal compliance or legitimate business purposes</li>
                  <li>Anonymized data may be retained for research and analytics</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Your Rights */}
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Your Rights & Choices</h2>
              <p className="mb-3">You have the following rights regarding your personal information:</p>
              
              <h3 className="text-lg font-medium mb-2">7.1 Access & Control</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Restriction:</strong> Limit how we process your information</li>
              </ul>

              <h3 className="text-lg font-medium mb-2">7.2 Communication Preferences</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Opt out of marketing communications at any time</li>
                <li>Choose your notification preferences</li>
                <li>Control who can see your profile information</li>
                <li>Manage your privacy settings in your account dashboard</li>
              </ul>

              <h3 className="text-lg font-medium mb-2">7.3 Cookie Preferences</h3>
              <p>
                You can control cookies through your browser settings. However, disabling certain cookies 
                may affect the functionality of our Platform.
              </p>
            </section>

            <Separator />

            {/* International Transfers */}
            <section>
              <h2 className="text-xl font-semibold mb-3">8. International Data Transfers</h2>
              <div className="space-y-3">
                <p>
                  Your personal information may be transferred to and processed in countries other than your 
                  country of residence. We ensure appropriate safeguards are in place for such transfers:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Standard Contractual Clauses (SCCs) for EU data transfers</li>
                  <li>Adequacy decisions where applicable</li>
                  <li>Certification schemes and codes of conduct</li>
                  <li>Binding corporate rules for intra-group transfers</li>
                </ul>
                <p>
                  We primarily store and process data in Singapore and the European Union, with additional 
                  processing in the United States for specific services.
                </p>
              </div>
            </section>

            <Separator />

            {/* Children's Privacy */}
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Children's Privacy</h2>
              <p>
                Our Platform is not intended for children under 16 years of age. We do not knowingly collect 
                personal information from children under 16. If you are a parent or guardian and believe your 
                child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <Separator />

            {/* Third-Party Services */}
            <section>
              <h2 className="text-xl font-semibold mb-3">10. Third-Party Services & Links</h2>
              <div className="space-y-3">
                <p>
                  Our Platform may contain links to third-party websites and integrate with third-party services. 
                  We are not responsible for the privacy practices of these external services.
                </p>
                <p><strong>Key Third-Party Services:</strong></p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li><strong>OAuth Providers:</strong> Google, LinkedIn (for authentication)</li>
                  <li><strong>Payment Processors:</strong> Stripe, PayPal (for transactions)</li>
                  <li><strong>Analytics:</strong> Google Analytics, Mixpanel (for insights)</li>
                  <li><strong>Communication:</strong> SendGrid, Twilio (for notifications)</li>
                </ul>
                <p>
                  We recommend reviewing the privacy policies of these third-party services before using them.
                </p>
              </div>
            </section>

            <Separator />

            {/* Changes to Policy */}
            <section>
              <h2 className="text-xl font-semibold mb-3">11. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, 
                technology, legal requirements, or other factors. We will notify you of any material changes 
                by posting the new policy on our Platform and updating the "Last updated" date. Your continued 
                use of the Platform after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <Separator />

            {/* Contact Information */}
            <section>
              <h2 className="text-xl font-semibold mb-3">12. Contact Us</h2>
              <p className="mb-3">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                please contact us:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <p><strong>GrowthLab Pte Ltd</strong></p>
                <p>Data Protection Officer</p>
                <p>Email: privacy@growthlab.sg</p>
                <p>Address: [Your Business Address]</p>
                <p>Phone: [Your Phone Number]</p>
                <p>Website: https://growthlab.sg</p>
              </div>
              
              <p className="mt-4">
                <strong>EU Representative:</strong> If you are located in the European Union, you may also contact 
                our EU representative at [EU Representative Details].
              </p>
            </section>

            <Separator />

            {/* Acceptance */}
            <section className="text-center py-6">
              <p className="text-lg font-semibold">
                By using the GrowthLab Platform, you acknowledge that you have read and understood this 
                Privacy Policy and consent to the collection, use, and disclosure of your information as described herein.
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
