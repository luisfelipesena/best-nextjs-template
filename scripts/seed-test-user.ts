import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { hash } from '@node-rs/argon2'
import { users } from '@/server/db/schema'
import { eq } from 'drizzle-orm'

async function createTestUser() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  const db = drizzle(pool, { schema: { users } })

  try {
    // Check if test user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, 'test@example.com'))
      .limit(1)

    if (existingUser.length > 0) {
      console.log('Test user already exists')
      return
    }

    // Hash the test password
    const passwordHash = await hash('password123')

    // Create test user
    const [testUser] = await db
      .insert(users)
      .values({
        email: 'test@example.com',
        name: 'Test User',
        passwordHash,
        role: 'user',
        emailVerified: true,
        isActive: true,
      })
      .returning()

    console.log('Test user created:', testUser.email)
  } catch (error) {
    console.error('Error creating test user:', error)
    throw error
  } finally {
    await pool.end()
  }
}

// Run if called directly
if (require.main === module) {
  createTestUser().catch((error) => {
    console.error('Failed to create test user:', error)
    process.exit(1)
  })
}

export { createTestUser }
