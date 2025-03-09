"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { calculateMortgage, calculateMortgageRange } from "@/lib/mortgage-utils"

const formSchema = z.object({
  loanAmount: z.coerce.number().positive("Loan amount must be positive"),
  interestRate: z.coerce.number().positive("Interest rate must be positive"),
  loanTerm: z.coerce.number().int().positive("Loan term must be a positive integer"),
})

export function DefaultCalculator() {
  const [currentPayment, setCurrentPayment] = useState<number | null>(null)
  const [paymentRange, setPaymentRange] = useState<{ rate: number; payment: number }[] | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: 200000,
      interestRate: 5,
      loanTerm: 30,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { loanAmount, interestRate, loanTerm } = values
    const currentMonthlyPayment = calculateMortgage(loanAmount, interestRate, loanTerm)
    const range = calculateMortgageRange(loanAmount, interestRate, loanTerm)

    setCurrentPayment(currentMonthlyPayment)
    setPaymentRange(range)
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="loanAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#10172A]">Loan Amount ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="200000" {...field} className="border-slate-200" />
                </FormControl>
                <FormDescription className="text-slate-600">
                  Enter the total amount of your mortgage loan.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#10172A]">Current Interest Rate (%)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="5.0" {...field} className="border-slate-200" />
                </FormControl>
                <FormDescription className="text-slate-600">Enter your current annual interest rate.</FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="loanTerm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#10172A]">Loan Term (years)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="30" {...field} className="border-slate-200" />
                </FormControl>
                <FormDescription className="text-slate-600">
                  Enter the total length of your mortgage in years.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Button type="submit" className="bg-[#A78BFA] text-white hover:bg-opacity-90 transition-opacity">
              Calculate
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="border-[#A78BFA] text-[#A78BFA] hover:bg-[#A78BFA] hover:text-white transition-colors"
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
      {currentPayment !== null && paymentRange !== null && (
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-lg font-bold text-[#10172A]">Results</div>
          <div className="mb-4 text-2xl font-bold text-[#10172A]">
            Current Monthly Payment: ${currentPayment.toFixed(2)}
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-[#10172A]">New Rate (%)</TableHead>
                <TableHead className="text-[#10172A]">New Payment ($)</TableHead>
                <TableHead className="text-[#10172A]">Monthly Savings ($)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentRange.map(({ rate, payment }) => (
                <TableRow key={rate} className="hover:bg-transparent">
                  <TableCell className="text-[#10172A]">{rate.toFixed(3)}%</TableCell>
                  <TableCell className="text-[#10172A]">${payment.toFixed(2)}</TableCell>
                  <TableCell className="text-green-600 font-semibold">
                    ${(currentPayment - payment).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

