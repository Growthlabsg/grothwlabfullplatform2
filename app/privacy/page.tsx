"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowRight,
  Shield,
  Eye,
  Lock,
  Database,
  Users,
  Mail,
  Phone,
  Globe,
  FileText,
  CheckCircle
} from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  const privacySections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        "Personal information (name, email, phone number, company details)",
        "Professional information (skills, experience, education)",
        "Usage data (how you interact with our platform)",
        "Communication data (messages, calls, file sharing)",
        "Payment information (for premium services)",
        "Location data (if you choose to share it)"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "Provide and improve our services",
        "Match you with relevant opportunities",
        "Send you important updates and notifications",
        "Process payments and transactions",
        "Analyze platform usage and performance",
        "Comply with legal obligations"
      ]
    },
    {
      title: "Information Sharing",
      icon: Users,
      content: [
        "With other users when you choose to connect",
        "With service providers who help us operate our platform",
        "With investors and partners in our network (with your consent)",
        "When required by law or to protect our rights",
        "In case of business transfers or acquisitions",
        "Never sell your personal information to third parties"
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "Bank-grade encryption for all data transmission",
        "Secure servers with regular security audits",
        "Multi-factor authentication for account access",
        "Regular security training for our team",
        "Incident response procedures in place",
        "Compliance with international security standards"
      ]
    },
    {
      title: "Your Rights",
      icon: Shield,
      content: [
        "Access your personal information",
        "Correct inaccurate data",
        "Delete your account and data",
        "Export your data in a portable format",
        "Opt out of marketing communications",
        "Withdraw consent for data processing"
      ]
    },
    {
      title: "Cookies and Tracking",
      icon: Globe,
      content: [
        "Essential cookies for platform functionality",
        "Analytics cookies to improve user experience",
        "Marketing cookies (with your consent)",
        "Third-party cookies from integrated services",
        "Cookie preferences can be managed in settings",
        "Clear information about cookie purposes"
      ]
    }
  ]

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "privacy@growthlab.asia",
      action: "mailto:privacy@growthlab.asia"
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+65 1234 5678",
      action: "tel:+6512345678"
    },
    {
      icon: Globe,
      title: "Visit Us",
      value: "Singapore, Hong Kong, Tokyo",
      action: null
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                How we collect, use, and protect your personal information
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Introduction */}
        <Card className="mb-8 border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Commitment to Privacy</h2>
                <p className="text-gray-600 dark:text-gray-300">Last updated: December 15, 2024</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At GrowthLab, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
              platform and services. By using our services, you agree to the collection and use of information in accordance 
              with this policy.
            </p>
          </CardContent>
        </Card>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {privacySections.map((section, index) => {
            const IconComponent = section.icon
            return (
              <Card key={index} className="border-0 shadow-lg bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle className="h-5 w-5 text-[#0F7377] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Data Retention */}
        <Card className="mt-8 border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Data Retention</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes 
              outlined in this Privacy Policy. Specifically:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#0F7377] mt-0.5 flex-shrink-0" />
                <span>Account information is retained while your account is active and for 2 years after closure</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#0F7377] mt-0.5 flex-shrink-0" />
                <span>Communication data is retained for 3 years for service improvement purposes</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#0F7377] mt-0.5 flex-shrink-0" />
                <span>Payment information is retained as required by law and financial regulations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#0F7377] mt-0.5 flex-shrink-0" />
                <span>Analytics data is anonymized and retained for up to 5 years</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* International Transfers */}
        <Card className="mt-8 border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">International Data Transfers</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              As a global platform, we may transfer your personal information to countries outside your jurisdiction. 
              We ensure that such transfers are conducted in accordance with applicable data protection laws and 
              implement appropriate safeguards to protect your information.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Safeguards Include:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• Standard contractual clauses</li>
                  <li>• Adequacy decisions by relevant authorities</li>
                  <li>• Binding corporate rules</li>
                  <li>• Certification schemes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Your Rights:</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• Request information about transfers</li>
                  <li>• Object to specific transfers</li>
                  <li>• Request additional safeguards</li>
                  <li>• Withdraw consent for transfers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Children's Privacy */}
        <Card className="mt-8 border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Children's Privacy</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Our services are not intended for children under 16 years of age. We do not knowingly collect personal 
              information from children under 16. If you are a parent or guardian and believe your child has provided 
              us with personal information, please contact us immediately. If we discover that we have collected 
              personal information from a child under 16, we will take steps to delete such information promptly.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Privacy Policy */}
        <Card className="mt-8 border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Changes to This Privacy Policy</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other 
              operational, legal, or regulatory reasons. We will notify you of any material changes by:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#0F7377] mt-0.5 flex-shrink-0" />
                <span>Posting the updated policy on our website</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#0F7377] mt-0.5 flex-shrink-0" />
                <span>Sending you an email notification</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#0F7377] mt-0.5 flex-shrink-0" />
                <span>Displaying a notice on our platform</span>
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8 border-0 shadow-lg bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Questions About Your Privacy?</h3>
            <p className="text-white/90 text-center mb-8 max-w-2xl mx-auto">
              If you have any questions about this Privacy Policy or our data practices, please don't hesitate to contact us.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">{info.title}</h4>
                    {info.action ? (
                      <a 
                        href={info.action} 
                        className="text-white/90 hover:text-white transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white/90">{info.value}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Started?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Join thousands of entrepreneurs who trust GrowthLab with their data and business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white" asChild>
                  <Link href="/signup">
                    Join GrowthLab
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}