// Đường dẫn: app/api/mcp/route.ts

import { z } from 'zod';
import { createMcpHandler, withMcpAuth } from 'mcp-handler';
import { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types.js';

// 1. Khởi tạo handler cơ bản như ở Bước 2
const handler = createMcpHandler(
  (server) => {
    server.tool(
      'roll_dice',
      'Rolls an N-sided die',
      { sides: z.number().int().min(2) },
      async ({ sides }) => {
        const value = 1 + Math.floor(Math.random() * sides);
        return { content: [{ type: 'text', text: `🎲 You rolled a ${value}!` }] };
      },
    );
  },
  {},
  { basePath: '/api' }
);

// 2. Viết logic kiểm tra Token (Giả lập token là "123")
const verifyToken = async (
  req: Request,
  bearerToken?: string,
): Promise<AuthInfo | undefined> => {
  if (!bearerToken) return undefined;
  
  // Logic kiểm tra token của bạn ở đây (có thể gọi DB, Verify JWT, v.v.)
  const isValid = bearerToken === '123'; 
  
  if (!isValid) return undefined;
  
  return {
    token: bearerToken,
    scopes: ['read:stuff'],
    clientId: 'user123',
    extra: { userId: '123' },
  };
};

// 3. Bọc handler bằng tính năng Auth
const authHandler = withMcpAuth(handler, verifyToken, {
  required: true, // Bắt buộc phải có token
  requiredScopes: ['read:stuff'],
  resourceMetadataPath: '/.well-known/oauth-protected-resource',
});

export { authHandler as GET, authHandler as POST }; 