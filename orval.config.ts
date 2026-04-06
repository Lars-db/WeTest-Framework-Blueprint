import { defineConfig } from 'orval';
import path from 'path';


export default defineConfig(
    { 
        Zod: 
        { 
            input: 
                { 
                    target: path.join(__dirname, 'sprint5', 'API', 'storage', 'api-docs', 'api-docs.json') , validation: false
                },

        output: {
            mode: 'tags',
            target: 'support/.zod',
            schemas: 'support/.zod/schemas',
            client: 'zod'
        },
    },
});
