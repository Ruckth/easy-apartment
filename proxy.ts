// middleware.ts (preferred name in the root of the project)
import { withAuth } from '@kinde-oss/kinde-auth-nextjs/server';

// Define the core middleware logic
function proxy(request: Request) {

  return withAuth(request, {
    isReturnToCurrentPage: true, 
  });
}

// Export the function as the main Middleware function
export default proxy;

// Configure the paths where this middleware should run
export const config = { 
  matcher: ['/history/:path*', '/api/auth/kinde_callback'], 
};