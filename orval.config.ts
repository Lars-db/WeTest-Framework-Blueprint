import { defineConfig } from 'orval';
import path from 'path';


export default defineConfig(
    { 
        Zod: 
        { 
            input: 
                { 
                    target: path.join(__dirname, 'support', 'openAPI-specs', 'openAPI.json') , validation: false
                },

        output: {
            mode: 'tags',
            target: 'support/.zod',
            schemas: 'support/.zod/schemas',
            client: 'zod'
        },
    },
});
