"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Download, CheckCircle, XCircle, Clock } from "lucide-react"

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/payments")
      if (res.ok) {
        const data = await res.json()
        setPayments(data)
      }
    } catch (error) {
      console.error("Failed to fetch payments:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge variant="success">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case "PENDING":
        return (
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "FAILED":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Payment History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : payments.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No payments found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-lg">
                        {payment.booking?.provider?.user?.name || "Provider"}
                      </h3>
                      {getStatusBadge(payment.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <p className="font-medium">Amount</p>
                        <p className="text-lg font-bold text-foreground">
                          {formatCurrency(payment.amount)}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Date</p>
                        <p>{formatDate(payment.createdAt)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Payment ID</p>
                        <p className="font-mono text-xs">{payment.paymentId}</p>
                      </div>
                      <div>
                        <p className="font-medium">Method</p>
                        <p>{payment.paymentMethod || "Online"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    {payment.invoiceUrl ? (
                      <Button variant="outline" asChild>
                        <a
                          href={payment.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          View Invoice
                        </a>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => {
                          // Generate invoice
                          alert("Invoice generation coming soon")
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Generate Invoice
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

