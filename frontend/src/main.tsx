import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/' 
			signUpForceRedirectUrl={"/auth-callback"}
			signUpFallbackRedirectUrl={"/auth-callback"}>
			<AuthProvider>
				<BrowserRouter>
					<QueryClientProvider client={queryClient}>
						<App />
					</QueryClientProvider>
				</BrowserRouter>
			</AuthProvider>
		</ClerkProvider>
	</StrictMode>
);
