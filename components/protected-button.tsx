"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "./auth-provider"
import { PinDialog } from "./pin-dialog"

interface ProtectedButtonProps {
  onClick: () => void
  children: React.ReactNode
  variant?: "default" | "outline" | "ghost" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function ProtectedButton({
  onClick,
  children,
  variant = "default",
  size = "default",
  className,
}: ProtectedButtonProps) {
  const { isAuthenticated } = useAuth()
  const [showPinDialog, setShowPinDialog] = useState(false)

  const handleClick = () => {
    if (isAuthenticated) {
      onClick()
    } else {
      setShowPinDialog(true)
    }
  }

  const handlePinDialogClose = () => {
    setShowPinDialog(false)
    // Check if authentication was successful and execute the onClick
    if (isAuthenticated) {
      onClick()
    }
  }

  return (
    <>
      <Button onClick={handleClick} variant={variant} size={size} className={className}>
        {children}
      </Button>
      <PinDialog isOpen={showPinDialog} onClose={handlePinDialogClose} />
    </>
  )
}
