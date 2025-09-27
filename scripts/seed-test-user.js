const { drizzle } = require('drizzle-orm/node-postgres')
const { Pool } = require('pg')
const { hash } = require('@node-rs/argon2')
const { eq } = require('drizzle-orm')

// Import the user table schema
const { pgTable, text, uuid, boolean, timestamp } = require('drizzle-orm/pg-core')

// Define the user table schema (simplified for seeding)
const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  passwordHash: text('password_hash'),
  role: text('role').default('user').notNull(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

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
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Cannot connect to database. Make sure PostgreSQL is running and DATABASE_URL is correct.')
    } else if (error.message.includes('relation') && error.message.includes('does not exist')) {
      console.error('❌ Database table "user" does not exist. Run migrations first: npm run drizzle:migrate')
    } else {
      console.error('❌ Error creating test user:', error.message)
    }
    throw error
  } finally {
    await pool.end()
  }
}

// Run if called directly
if (require.main === module) {
  createTestUser().catch((error) => {
    console.error('❌ Failed to create test user:', error.message)
    process.exit(1)
  })
}

module.exports = { createTestUser }