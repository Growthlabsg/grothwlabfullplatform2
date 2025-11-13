import * as z from "zod"

export const applicationSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  website: z.string().url("Please enter a valid URL").min(1, "Website is required"),
  foundedDate: z.string().min(1, "Founded date is required"),
  teamSize: z.string().min(1, "Team size is required"),
  industry: z.string().min(1, "Industry is required"),
  stage: z.string().min(1, "Company stage is required"),
  fundingRaised: z.string().min(1, "Funding information is required"),
  pitchDeck: z.string().url("Please enter a valid URL").min(1, "Pitch deck URL is required"),
  productDescription: z.string().min(50, "Please provide at least 50 characters"),
  problemStatement: z.string().min(50, "Please provide at least 50 characters"),
  targetMarket: z.string().min(50, "Please provide at least 50 characters"),
  businessModel: z.string().min(50, "Please provide at least 50 characters"),
  traction: z.string().min(20, "Please provide at least 20 characters"),
  competitors: z.string().min(20, "Please provide at least 20 characters"),
  whyGrowthLab: z.string().min(50, "Please provide at least 50 characters"),
  founderName: z.string().min(1, "Founder name is required"),
  founderEmail: z.string().email("Please enter a valid email").min(1, "Founder email is required"),
  founderLinkedIn: z.string().url("Please enter a valid LinkedIn URL").min(1, "LinkedIn profile is required"),
  founderBio: z.string().min(50, "Please provide at least 50 characters"),
  coFounders: z.string().optional(),
  heardFrom: z.string().min(1, "This field is required"),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
})
