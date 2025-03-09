"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { calculateMortgage } from "@/lib/mortgage-utils"

const formSchema = z.object({
  loanAmount: z.coerce.number().positive("Loan amount must be positive"),
  interestRate: z.coerce.number().positive("Interest rate must be positive"),
  currentTerm: z.coerce.number().int().positive("Current term must be a positive integer"),
  newTerm: z.coerce.number().int().positive("New term must be a positive integer"),
})

export function TermShorteningCalculator() {
  const [results, setResults] = useState<{
    currentPayment: number
    newPayment: number
    totalInterestSavings: number
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: 200000,
      interestRate: 5,
      currentTerm: 30,
      newTerm: 15,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { loanAmount, interestRate, currentTerm, newTerm } = values
    const currentPayment = calculateMortgage(loanAmount, interestRate, currentTerm)
    const newPayment = calculateMortgage(loanAmount, interestRate, newTerm)

    const totalCurrentPayments = currentPayment * currentTerm * 12
    const totalNewPayments = newPayment * newTerm * 12
    const totalInterestSavings = totalCurrentPayments - totalNewPayments

    setResults({
      currentPayment,
      newPayment,
      totalInterestSavings,
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="loanAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-600">Loan Amount ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="200000" {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Enter the total amount of your mortgage loan.
                </FormDescription>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-600">Interest Rate (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="5.0"
                    {...field}
                    className="bg-gray-50 border-gray-300"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">Enter your annual interest rate.</FormDescription>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentTerm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-600">Current Loan Term (years)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="30" {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Enter your current loan term in years.
                </FormDescription>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newTerm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-600">New Loan Term (years)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="15" {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">Enter the new loan term in years.</FormDescription>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-gray-800">
            Calculate
          </Button>
        </form>
      </Form>
      {results && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-normal text-gray-900 mb-4">Results:</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-600">Scenario</TableHead>
                <TableHead className="text-gray-600">Monthly Payment</TableHead>
                <TableHead className="text-gray-600">Loan Term</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-gray-900">Current</TableCell>
                <TableCell className="text-gray-900">${results.currentPayment.toFixed(2)}</TableCell>
                <TableCell className="text-gray-900">{form.getValues().currentTerm} years</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-gray-900">New</TableCell>
                <TableCell className="text-gray-900">${results.newPayment.toFixed(2)}</TableCell>
                <TableCell className="text-gray-900">{form.getValues().newTerm} years</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="mt-4 text-lg font-normal text-gray-900">
            Total Interest Savings: ${results.totalInterestSavings.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  )
}

