// Đường dẫn: app/.well-known/oauth-protected-resource/route.ts

import { 
  protectedResourceHandler, 
  metadataCorsOptionsRequestHandler,
} from 'mcp-handler';

// Đặt URL server xác thực của bạn (nếu có hệ thống OAuth riêng)
const handler = protectedResourceHandler({
  authServerUrls: ['https://example-authorization-server-issuer.com'], 
});

const corsHandler = metadataCorsOptionsRequestHandler();

export { handler as GET, corsHandler as OPTIONS };