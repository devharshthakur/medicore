import { defineEventHandler, proxyRequest } from 'h3'
import { useRuntimeConfig } from 'nuxt/server'

export default defineEventHandler((event) => {
  const { apiOrigin } = useRuntimeConfig()

  return proxyRequest(event, new URL(event.path, apiOrigin).toString())
})
