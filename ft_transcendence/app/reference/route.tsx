import { ApiReference } from '@scalar/nextjs-api-reference'

const config = {
  url: '/api/openapi.json',
  theme: 'default', // or 'purple', 'blue', 'green', etc.
  pageTitle: 'Beentra API Reference',
}

export const GET = ApiReference(config)
