const sharp = require('sharp')
const fs = require('fs').promises
const path = require('path')

const IMAGE_DIR = path.join(__dirname, '..', 'public', 'images')
const QUALITY = 85
const MAX_WIDTH = 1920
const MAX_HEIGHT = 1080

async function optimizeImage(inputPath, outputPath) {
  try {
    const metadata = await sharp(inputPath).metadata()

    // Skip if already optimized (check by size)
    const stats = await fs.stat(inputPath)
    if (stats.size < 100000 && metadata.format === 'webp') {
      console.log(`Skipping ${path.basename(inputPath)} - already optimized`)
      return
    }

    // Process image
    await sharp(inputPath)
      .resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: QUALITY, progressive: true })
      .toFile(outputPath.replace(/\.(jpg|JPG|png|PNG)$/, '_optimized.jpg'))

    console.log(`✓ Optimized ${path.basename(inputPath)}`)
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message)
  }
}

async function processDirectory(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        await processDirectory(fullPath)
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase()
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          const outputPath = fullPath
          await optimizeImage(fullPath, outputPath)
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error.message)
  }
}

async function main() {
  console.log('Starting image optimization...')
  console.log(`Processing images in: ${IMAGE_DIR}`)

  try {
    await processDirectory(IMAGE_DIR)
    console.log('\n✨ Image optimization complete!')
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

// Check if sharp is installed
try {
  require.resolve('sharp')
  main()
} catch (e) {
  console.log('Sharp not installed. Installing it would enable image optimization.')
  console.log('Run: npm install sharp')
}