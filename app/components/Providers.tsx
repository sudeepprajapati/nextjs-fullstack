"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
    // Create QueryClient only once on the client
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster richColors position="bottom-right" />
        </QueryClientProvider>
    );
}
