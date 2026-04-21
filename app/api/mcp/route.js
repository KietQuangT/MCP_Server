import { z } from 'zod';
import { createMcpHandler } from 'mcp-handler';

const handler = createMcpHandler(
  (server) => {
    server.tool(
      'roll_dice',
      'Rolls an N-sided die',
      // Sửa lại dòng này: Thêm giá trị mặc định là 6
      { sides: z.number().int().min(2).default(6) }, 
      async ({ sides }) => {
        const value = 1 + Math.floor(Math.random() * sides);
        return {
          content: [{ type: 'text', text: `🎲 You rolled a ${value}!` }],
        };
      },
    );
  },
  {},
  { basePath: '/api' }, // Nếu server chạy ở /api/mcp thì dòng này giữ nguyên vẫn được
);

export { handler as GET, handler as POST, handler as DELETE };