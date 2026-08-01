import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: 'main',
  clientId: process.env.TINA_CLIENT_ID || 'demo-client-id',
  token: process.env.TINA_TOKEN || 'demo-token',
  build: {
    publicFolder: 'public',
    outputFolder: 'admin',
  },
  schema: {
    collections: [
      {
        name: 'site',
        label: 'Site',
        path: 'src/content/site',
        format: 'json',
        fields: [
          { name: 'title', label: 'Title', type: 'string', required: true },
          { name: 'subtitle', label: 'Subtitle', type: 'string', required: true },
          { name: 'date', label: 'Date', type: 'string', required: true },
          { name: 'location', label: 'Location', type: 'string', required: true },
          { name: 'heroImage', label: 'Hero Image', type: 'image', required: true },
          { name: 'updates', label: 'Updates', type: 'string', required: true, ui: { component: 'textarea' } },
          { name: 'rsvpCopy', label: 'RSVP Copy', type: 'string', required: true, ui: { component: 'textarea' } },
        ],
      },
    ],
  },
});
