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
  currentLoanAmount: z.coerce.number().positive("Current loan amount must be positive"),
  currentInterestRate: z.coerce.number().positive("Current interest rate must be positive"),
  currentTerm: z.coerce.number().int().positive("Current term must be a positive integer"),
  cashOutAmount: z.coerce.number().nonnegative("Cash out amount must be non-negative"),
  newInterestRate: z.coerce.number().positive("New interest rate must be positive"),
  newTerm: z.coerce.number().int().positive("New term must be a positive integer"),
})

export function CashOutCalculator() {
  const [results, setResults] = useState<{
    currentPayment: number
    newPayment: number
    additionalCost: number
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentLoanAmount: 200000,
      currentInterestRate: 5,
      currentTerm: 30,
      cashOutAmount: 50000,
      newInterestRate: 5.5,
      newTerm: 30,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { currentLoanAmount, currentInterestRate, currentTerm, cashOutAmount, newInterestRate, newTerm } = values
    const currentPayment = calculateMortgage(currentLoanAmount, currentInterestRate, currentTerm)
    const newPayment = calculateMortgage(currentLoanAmount + cashOutAmount, newInterestRate, newTerm)

    setResults({
      currentPayment,
      newPayment,
      additionalCost: newPayment - currentPayment,
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="currentLoanAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-600">Current Loan Amount ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="200000" {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Enter your current mortgage balance.
                </FormDescription>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentInterestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-600">Current Interest Rate (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="5.0"
                    {...field}
                    className="bg-gray-50 border-gray-300"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Enter your current annual interest rate.
                </FormDescription>
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
            name="cashOutAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-600">Cash Out Amount ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="50000" {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Enter the amount you want to cash out.
                </FormDescription>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newInterestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-600">New Interest Rate (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="5.5"
                    {...field}
                    className="bg-gray-50 border-gray-300"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Enter the new annual interest rate for the cash-out refinance.
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
                  <Input type="number" placeholder="30" {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Enter the new loan term in years for the cash-out refinance.
                </FormDescription>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-gray-900">Current</TableCell>
                <TableCell className="text-gray-900">${results.currentPayment.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-gray-900">New (with Cash Out)</TableCell>
                <TableCell className="text-gray-900">${results.newPayment.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="mt-4 text-lg font-normal text-gray-900">
            Additional Monthly Cost: ${results.additionalCost.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  )
}

