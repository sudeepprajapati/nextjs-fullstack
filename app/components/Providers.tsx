"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ReactNode, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ImageKitProvider } from "@imagekit/next";

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

export default function Providers({ children }: { children: ReactNode }) {
    // Create QueryClient only once on the client
    const [queryClient] = useState(() => new QueryClient());

    return (
        <SessionProvider refetchInterval={5 * 60}>
            <ImageKitProvider urlEndpoint={urlEndPoint}>
                <QueryClientProvider client={queryClient}>
                    {children}
                    <Toaster richColors position="bottom-right" />
                </QueryClientProvider>
            </ImageKitProvider>
        </SessionProvider>
    );
}
