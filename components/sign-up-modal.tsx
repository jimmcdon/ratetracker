"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Spinner } from "@/components/ui/spinner"

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
}

type RefinanceType = "lower-payment" | "cash-out" | "shortened-term"
type FormType = "purchase" | "refinance"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+1\s$$\d{3}$$\s\d{3}-\d{4}$/, "Invalid phone number format"),
  type: z.enum(["purchase", "refinance"] as const),
  refinanceType: z.enum(["lower-payment", "cash-out", "shortened-term"] as const).optional(),
})

type FormData = z.infer<typeof formSchema>

export function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "purchase",
    },
  })

  const formType = watch("type")

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      toast({
        title: "Success!",
        description: "Your information has been submitted. Check your email for confirmation.",
      })
      onClose()
      reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was a problem submitting your information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Track Your Rate
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Enter your information below to start tracking your mortgage rate and get notified when you can save.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-slate-600">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Jane Smith"
              {...register("name")}
              className="bg-slate-50 border-slate-200"
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-600">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="jane@example.com"
              {...register("email")}
              className="bg-slate-50 border-slate-200"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-slate-600">
              Phone Number
            </Label>
            <div className="flex gap-2">
              <Input value="+1" disabled className="w-12 bg-slate-50 border-slate-200 text-center" />
              <Input
                id="phone"
                type="tel"
                placeholder="(123) 456-7890"
                {...register("phone")}
                className="flex-1 bg-slate-50 border-slate-200"
                aria-invalid={errors.phone ? "true" : "false"}
              />
            </div>
            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-600">Do you want to refinance or purchase?</Label>
            <RadioGroup {...register("type")} className="flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="purchase" id="purchase" />
                <Label htmlFor="purchase" className="text-sm">
                  Purchase
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="refinance" id="refinance" />
                <Label htmlFor="refinance" className="text-sm">
                  Refinance
                </Label>
              </div>
            </RadioGroup>
          </div>

          {formType === "refinance" && (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-600">What is your goal?</Label>
              <RadioGroup {...register("refinanceType")} className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lower-payment" id="lower-payment" />
                  <Label htmlFor="lower-payment" className="text-sm">
                    Lower Payment
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash-out" id="cash-out" />
                  <Label htmlFor="cash-out" className="text-sm">
                    Cash Out
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="shortened-term" id="shortened-term" />
                  <Label htmlFor="shortened-term" className="text-sm">
                    Shortened Term
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#10172A] hover:bg-opacity-90 transition-opacity"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Submitting...
              </>
            ) : (
              "Track Your Rate"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

