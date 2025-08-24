"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "./auth-provider"

interface PinDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function PinDialog({ isOpen, onClose }: PinDialogProps) {
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const { authenticate } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (authenticate(pin)) {
      setPin("")
      setError("")
      onClose()
    } else {
      setError("Invalid PIN")
      setPin("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-cyan-500/30">
        <DialogHeader>
          <DialogTitle className="text-cyan-400">Enter PIN to Edit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex gap-2">
            <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700">
              Authenticate
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
