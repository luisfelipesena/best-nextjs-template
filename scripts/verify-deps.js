#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔍 Verificando dependências críticas...')

const criticalDeps = [
  'autoprefixer',
  'postcss', 
  'tailwindcss',
  'next',
  '@types/node',
  'typescript'
]

let allFound = true

for (const dep of criticalDeps) {
  try {
    const resolved = require.resolve(dep)
    console.log(`✅ ${dep}: ${resolved}`)
  } catch (error) {
    console.log(`❌ ${dep}: NOT FOUND`)
    allFound = false
  }
}

// Verificar package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
console.log('\n📦 Package.json dependencies:')
console.log('Dependencies:', Object.keys(packageJson.dependencies || {}).length)
console.log('DevDependencies:', Object.keys(packageJson.devDependencies || {}).length)

// Verificar node_modules
const nodeModulesExists = fs.existsSync('node_modules')
console.log('\n📁 node_modules exists:', nodeModulesExists)

if (nodeModulesExists) {
  const nodeModulesSize = fs.readdirSync('node_modules').length
  console.log('📁 node_modules packages:', nodeModulesSize)
}

console.log('\n' + (allFound ? '✅ Todas as dependências encontradas!' : '❌ Dependências faltando!'))
process.exit(allFound ? 0 : 1)