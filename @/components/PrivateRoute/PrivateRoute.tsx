import { Navigate } from 'react-router-dom'
import { getToken } from '../../../src/services/auth'

interface PrivateRouteProps {
    children: React.ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    const token = getToken()

    if (!token) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}