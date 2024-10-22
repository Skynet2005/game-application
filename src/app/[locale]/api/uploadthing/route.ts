// src/app/api/uploadthing/route.ts
import { createRouteHandler } from 'uploadthing/next'; // Updated import
// ... existing code ...
import { ourFileRouter } from './core';
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({ router: ourFileRouter });
