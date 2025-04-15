'use client';

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { ReactNode } from "react"

export function ToastTest() {
  const { toast } = useToast()

  const testScenarios = [
    {
      name: "Basic Toast",
      action: () => {
        toast({
          title: "Basic Toast Test",
          description: "This is a basic toast notification",
        })
      }
    },
    {
      name: "Destructive Toast",
      action: () => {
        toast({
          variant: "destructive",
          title: "Error Toast Test",
          description: "This is a destructive error toast",
        })
      }
    },
    {
      name: "Toast with Action",
      action: () => {
        toast({
          title: "Action Toast Test",
          description: "This toast has an action button",
          action: (
            <ToastAction altText="Try again" onClick={() => alert("Action clicked!")}>
              Try again
            </ToastAction>
          ),
        })
      }
    },
    {
      name: "Long Content Toast",
      action: () => {
        toast({
          title: "Long Content Test",
          description: "This is a toast with a very long description that should test how the toast handles longer content. It should wrap properly and maintain readability while staying within the toast container bounds.",
        })
      }
    },
    {
      name: "Multiple Toasts",
      action: () => {
        // Test toast limit handling
        toast({
          title: "Toast 1",
          description: "First toast",
        })
        setTimeout(() => {
          toast({
            title: "Toast 2",
            description: "Second toast",
          })
        }, 100)
        setTimeout(() => {
          toast({
            title: "Toast 3",
            description: "Third toast",
          })
        }, 200)
      }
    },
    {
      name: "HTML Content Toast",
      action: () => {
        toast({
          title: "Styled Title" as ReactNode,
          description: (
            <div>
              <p className="font-bold">HTML Content Test</p>
              <ul className="list-disc pl-4 mt-2">
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </div>
          ) as ReactNode,
        })
      }
    }
  ]

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Toast Testing Panel</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testScenarios.map((scenario) => (
          <Button
            key={scenario.name}
            onClick={scenario.action}
            variant="outline"
            className="w-full"
          >
            Test: {scenario.name}
          </Button>
        ))}
      </div>
    </div>
  )
} 