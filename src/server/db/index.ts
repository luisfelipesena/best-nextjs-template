import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'
import { env } from '@/config/env'

const pool = new Pool({ connectionString: env.DATABASE_URL })

export const db = drizzle(pool, { schema })
export { schema }
