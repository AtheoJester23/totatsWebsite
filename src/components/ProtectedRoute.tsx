import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"
import { useEffect, useState } from "react"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../state/store"
import { setAuthenticated } from "../state/auth/authSlice"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const authenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>()
  
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        navigate("/login", { replace: true })
        dispatch(setAuthenticated(false))
        return
      }

      dispatch(setAuthenticated(true))
      setLoading(false)
    }

    checkSession()
  }, [navigate])

  if (loading) return null // or spinner

  return authenticated ? <>{children}</> : null
}
