import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { hash } from '@node-rs/argon2'
import { user } from '@/server/db/schema'
import { eq } from 'drizzle-orm'

async function createTestUser() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is required')
    process.exit(1)
  }

  console.log('🔄 Connecting to database...')
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  const db = drizzle(pool, { schema: { user } })

  try {
    // Test database connection
    await pool.query('SELECT 1')
    console.log('✅ Database connection successful')

    // Check if test user already exists
    console.log('🔍 Checking if test user exists...')
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, 'test@example.com'))
      .limit(1)

    if (existingUser.length > 0) {
      console.log('✅ Test user already exists')
      console.log('📧 Email: test@example.com')
      console.log('🔑 Password: password123')
      return
    }

    console.log('🔐 Hashing password...')
    // Hash the test password
    const passwordHash = await hash('password123')

    console.log('👤 Creating test user...')
    // Create test user
    const [testUser] = await db
      .insert(user)
      .values({
        email: 'test@example.com',
        name: 'Test User',
        passwordHash,
        role: 'user',
        emailVerified: true,
        isActive: true,
      })
      .returning()

    console.log('✅ Test user created successfully!')
    console.log('📧 Email: test@example.com')
    console.log('🔑 Password: password123')
    console.log('👤 User ID:', testUser.id)

    // Also create E2E test user
    const existingE2EUser = await db
      .select()
      .from(user)
      .where(eq(user.email, 'e2e-test@example.com'))
      .limit(1)

    if (existingE2EUser.length === 0) {
      const [e2eUser] = await db
        .insert(user)
        .values({
          email: 'e2e-test@example.com',
          name: 'E2E Test User',
          passwordHash,
          role: 'user',
          emailVerified: true,
          isActive: true,
        })
        .returning()

      console.log('✅ E2E test user created successfully!')
      console.log('📧 Email: e2e-test@example.com')
      console.log('🔑 Password: password123')
      console.log('👤 User ID:', e2eUser.id)
    } else {
      console.log('✅ E2E test user already exists')
    }
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string }
    if (err.code === 'ECONNREFUSED') {
      console.error('❌ Cannot connect to database. Make sure PostgreSQL is running and DATABASE_URL is correct.')
    } else if (err.message?.includes('relation') && err.message?.includes('does not exist')) {
      console.error('❌ Database table "user" does not exist. Run migrations first: npm run drizzle:migrate')
    } else {
      console.error('❌ Error creating test user:', err.message || String(error))
    }
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
