import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SignInButton } from "@clerk/clerk-react";
import { AlertTriangle, Home, ArrowLeft, Shield, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate("/");
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.05),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.05),transparent_50%)]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm shadow-2xl">
                <CardContent className="p-6 text-center">
                    {/* Icon Section */}
                    <div className="mb-4">
                    <div className="relative mx-auto w-16 h-16 mb-3">
                        <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" />
                        <div className="absolute inset-2 bg-red-500/30 rounded-full" />
                        <div className="absolute inset-0 flex items-center justify-center">
                        <Shield className="w-8 h-8 text-red-400" />
                        </div>
                    </div>
                    <div className="flex justify-center mb-3">
                        <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    </div>

                    {/* Error Code */}
                    <div className="mb-4">
                    <h1 className="text-5xl font-bold text-red-400 mb-2">401</h1>
                    <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto rounded-full" />
                    </div>

                    {/* Title & Description */}
                    <div className="mb-6">
                    <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        You don't have permission to access this page. Please log in with proper credentials.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Authentication required</span>
                    </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                    <SignInButton forceRedirectUrl={"/auth-callback"} fallbackRedirectUrl={"/auth-callback"}>
                        <Button  
                            className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-2.5 rounded-full transition-all duration-200 hover:scale-105"
                        >
                            <Lock className="w-4 h-4 mr-2" />
                            Login
                        </Button>
                    </SignInButton>

                    <div className="flex gap-2">
                        <Button
                        onClick={handleGoBack}
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 rounded-full"
                        >
                        <ArrowLeft className="w-3 h-3 mr-1" />
                        Back
                        </Button>

                        <Button
                        onClick={handleGoHome}
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 rounded-full"
                        >
                        <Home className="w-3 h-3 mr-1" />
                        Home
                        </Button>
                    </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-700/50">
                    <p className="text-xs text-gray-500">
                        Need help? <button type="button" className="text-green-400 hover:text-green-300 underline">Contact support</button>
                    </p>
                    </div>
                </CardContent>
                </Card>

                {/* Floating Elements */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-green-500/20 rounded-full animate-bounce" />
                <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-green-400/20 rounded-full animate-pulse" />
                <div className="absolute top-1/2 -left-6 w-3 h-3 bg-red-400/20 rounded-full animate-ping" />
            </div>

            {/* Additional Background Effects */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/30 to-transparent" />
        </div>
    )
}
