"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"

export default function NotificationsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
      <Card>
        <CardContent className="p-12 text-center">
          <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No notifications yet</p>
        </CardContent>
      </Card>
    </div>
  )
}

