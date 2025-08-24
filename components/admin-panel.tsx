"use client"

import { useAuth } from "./auth-provider"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function AdminPanel() {
  const { isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-gray-900/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 flex items-center gap-3">
        <span className="text-cyan-400 text-sm">Admin Mode</span>
        <Button
          onClick={logout}
          size="sm"
          variant="outline"
          className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
