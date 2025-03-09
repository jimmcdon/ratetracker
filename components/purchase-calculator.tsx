"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { calculateMortgage } from "@/lib/mortgage-utils"

const formSchema = z.object({
  purchasePrice: z.coerce.number().positive("Purchase price must be positive"),
  downPayment: z.coerce.number().nonnegative("Down payment must be non-negative"),
  interestRate: z.coerce.number().positive("Interest rate must be positive"),
  loanTerm: z.coerce.number().int().positive("Loan term must be a positive integer"),
})

export function PurchaseCalculator() {
  const [results, setResults] = useState<{
    loanAmount: number
    monthlyPayment: number
    downPaymentPercentage: number
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purchasePrice: 300000,
      downPayment: 60000,
      interestRate: 5,
      loanTerm: 30,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { purchasePrice, downPayment, interestRate, loanTerm } = values
    const loanAmount = purchasePrice - downPayment
    const monthlyPayment = calculateMortgage(loanAmount, interestRate, loanTerm)
    const downPaymentPercentage = (downPayment / purchasePrice) * 100

    setResults({
      loanAmount,
      monthlyPayment,
      downPaymentPercentage,
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="purchasePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-600">Purchase Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="300000" {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Enter the total purchase price of the property.
                </FormDescription>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="downPayment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-600">Down Payment ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="60000" {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Enter the amount you plan to pay upfront.
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
                <FormDescription className="text-xs text-gray-500">
                  Enter the annual interest rate for the mortgage.
                </FormDescription>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="loanTerm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-600">Loan Term (years)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="30" {...field} className="bg-gray-50 border-gray-300" />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Enter the length of the mortgage in years.
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
            <TableBody>
              <TableRow>
                <TableCell className="text-gray-600 font-medium">Loan Amount</TableCell>
                <TableCell className="text-gray-900">${results.loanAmount.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-gray-600 font-medium">Monthly Payment</TableCell>
                <TableCell className="text-gray-900">${results.monthlyPayment.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-gray-600 font-medium">Down Payment Percentage</TableCell>
                <TableCell className="text-gray-900">{results.downPaymentPercentage.toFixed(2)}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

