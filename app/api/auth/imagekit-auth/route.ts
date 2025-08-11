import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
    // Your application logic to authenticate the user
    // For example, you can check if the user is logged in or has the necessary permissions
    // If the user is not authenticated, you can return an error response

    try {
        const authenticationParameteres = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
            // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
            // token: "random-token", // Optional, a unique token for request
        })
        return Response.json({
            authenticationParameteres, publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY
        });
    } catch (error) {
        return Response.json({
            error: "Authentication for Imagekit failed",
        }, { status: 500 });
    }
}