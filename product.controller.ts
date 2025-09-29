import { FastifyReply, FastifyRequest } from 'fastify'
import { ProductService } from '../services/product.service'
import { Product } from '../models/product.model'
import path from 'path'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import type { MultipartFile } from '@fastify/multipart'

const pump = promisify(pipeline)

export class ProductController {
  constructor(private service: ProductService) {}

  getAll = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const products = await this.service.getAll()
      reply.send(products)
    } catch (error) {
      reply.code(500).send({ error: 'Failed to fetch products' })
    }
  }

  getById = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const product = await this.service.getById(Number(req.params.id))
      if (!product)
        return reply.code(404).send({ message: 'Product not found' })
      reply.send(product)
    } catch (error) {
      reply.code(500).send({ error: 'Failed to fetch product' })
    }
  }

  /**
   * Create via multipart/form-data (image upload)
   */
  create = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      if (!req.isMultipart()) {
        return reply.code(400).send({ error: 'Request must be multipart' })
      }

      const parts = req.parts()
      const fields: Record<string, string> = {}
      let allImages: string[] = [] // Combined array for all image URLs

      for await (const part of parts) {
        console.log(`Processing part: ${part.fieldname}`)
        if (part.fieldname === 'newImages[]' && 'file' in part) {
          const filePart = part as MultipartFile
          console.log(`  Received new image file: ${filePart.filename}`)
          const filename = `${Date.now()}-${filePart.filename}`
          const filepath = path.join(__dirname, '../../public/uploads', filename)
          await pump(filePart.file, fs.createWriteStream(filepath))
          allImages.push(`/uploads/${filename}`)
          console.log(`  Added new image URL: /uploads/${filename}`)
        } else if (part.fieldname === 'existingImages') {
          // Frontend sends existingImages as a JSON string
          // Ensure part.value exists before parsing
          if ('value' in part) {
            console.log(`  Received existing images string: ${part.value}`)
            const existingUrls = JSON.parse(part.value as string) as string[]
            allImages = [...existingUrls, ...allImages] // Add existing images first
            console.log(`  Combined all images (existing first):`, allImages)
          }
        } else {
          // Handle other form fields
          if ('value' in part) {
            const fieldPart = part as { fieldname: string; value: string }
            fields[fieldPart.fieldname] = fieldPart.value
            console.log(`  Received field ${fieldPart.fieldname}: ${fieldPart.value}`)
          }
        }
      }

      console.log('Final allImages array (create):', allImages)
      const productData: Omit<Product, 'id'> = {
        title: fields.title || '',
        category: fields.category || '',
        image: allImages[0] || '', // Use the first image as the main image
        price: parseFloat(fields.price || '0'),
        originalPrice: parseFloat(fields.originalPrice || '0'),
        discount: parseFloat(fields.discount || '0'),
        stock: parseInt(fields.stock || '0'),
        rating: parseFloat(fields.rating || '0'),
        reviewCount: parseInt(fields.reviewCount || '0'),
        status: fields.status === 'published' ? 'published' : 'draft',
        description: fields.description || '',
        features: fields.features ? JSON.parse(fields.features) : [],
        images: allImages.length > 0 ? allImages : [], // Use all collected images
        isOnProduct: fields.isOnProduct === 'true',
        isOnShop: fields.isOnShop === 'true',
        isOnCategory: fields.isOnCategory === 'true',
        isOnToday: fields.isOnToday === 'true'
      }

      const productId = await this.service.create(productData)
      const newProduct = await this.service.getById(productId)
      reply.code(201).send(newProduct)
    } catch (error) {
      const err = error as Error
      console.error('Create product error:', err)
      reply.code(500).send({
        error: 'Failed to create product',
        details: err.message
      })
    }
  }

  /**
   * Create via raw JSON (application/json)
   */
  createJson = async (
    req: FastifyRequest<{ Body: Omit<Product, 'id'> }>,
    reply: FastifyReply
  ) => {
    try {
      const productData = req.body

      // Set fallback values if needed
      productData.features = productData.features || []
      productData.images = productData.images || ['default-image.jpg']
      productData.image = productData.image || productData.images[0] || ''

      const productId = await this.service.create(productData)
      const newProduct = await this.service.getById(productId)
      reply.code(201).send(newProduct)
    } catch (error) {
      const err = error as Error
      reply.code(500).send({
        error: 'Failed to create product (JSON)',
        details: err.message
      })
    }
  }

  update = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const parts = req.parts()
      const fields: Record<string, string> = {}
      let allImages: string[] = [] // Combined array for all image URLs

      for await (const part of parts) {
        console.log(`Processing part: ${part.fieldname}`)
        if (part.fieldname === 'newImages[]' && 'file' in part) {
          const filePart = part as MultipartFile
          console.log(`  Received new image file: ${filePart.filename}`)
          const filename = `${Date.now()}-${filePart.filename}`
          const filepath = path.join(__dirname, '../../public/uploads', filename)
          await pump(filePart.file, fs.createWriteStream(filepath))
          allImages.push(`/uploads/${filename}`)
          console.log(`  Added new image URL: /uploads/${filename}`)
        } else if (part.fieldname === 'existingImages') {
          // Frontend sends existingImages as a JSON string
          // Ensure part.value exists before parsing
          if ('value' in part) {
            console.log(`  Received existing images string: ${part.value}`)
            const existingUrls = JSON.parse(part.value as string) as string[]
            allImages = [...existingUrls, ...allImages] // Add existing images first
            console.log(`  Combined all images (existing first):`, allImages)
          }
        } else {
          // Handle other form fields
          if ('value' in part) {
            const fieldPart = part as { fieldname: string; value: string }
            fields[fieldPart.fieldname] = fieldPart.value
            console.log(`  Received field ${fieldPart.fieldname}: ${fieldPart.value}`)
          }
        }
      }

      console.log('Final allImages array (update):', allImages)
      const existingProduct = await this.service.getById(Number(req.params.id))
      if (!existingProduct) {
        return reply.code(404).send({ message: 'Product not found' })
      }

      const updatedProduct: Product = {
        ...existingProduct,
        title: fields.title || existingProduct.title,
        category: fields.category || existingProduct.category,
        image: allImages[0] || existingProduct.image, // Use the first image or retain existing main image
        price: fields.price ? parseFloat(fields.price) : existingProduct.price,
        originalPrice: fields.originalPrice
          ? parseFloat(fields.originalPrice)
          : existingProduct.originalPrice,
        discount: fields.discount ? parseFloat(fields.discount) : existingProduct.discount,
        stock: fields.stock ? parseInt(fields.stock) : existingProduct.stock,
        rating: fields.rating ? parseFloat(fields.rating) : existingProduct.rating,
        reviewCount: fields.reviewCount
          ? parseInt(fields.reviewCount)
          : existingProduct.reviewCount,
        status: fields.status
          ? fields.status === 'published'
            ? 'published'
            : 'draft'
          : existingProduct.status,
        description: fields.description || existingProduct.description,
        features: fields.features ? JSON.parse(fields.features) : existingProduct.features,
        images: allImages.length > 0 ? allImages : existingProduct.images, // Use all collected images or retain existing ones
        isOnProduct:
          fields.isOnProduct !== undefined
            ? fields.isOnProduct === 'true'
            : existingProduct.isOnProduct,
        isOnShop:
          fields.isOnShop !== undefined
            ? fields.isOnShop === 'true'
            : existingProduct.isOnShop,
        isOnCategory:
          fields.isOnCategory !== undefined
            ? fields.isOnCategory === 'true'
            : existingProduct.isOnCategory,
        isOnToday:
          fields.isOnToday !== undefined
            ? fields.isOnToday === 'true'
            : existingProduct.isOnToday
      }

      await this.service.update(Number(req.params.id), updatedProduct)
      reply.send(updatedProduct)
    } catch (error) {
      console.error('Update product error:', error)
      reply.code(500).send({ error: 'Failed to update product' })
    }
  }

  delete = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      await this.service.delete(Number(req.params.id))
      reply.send({ message: 'Product deleted successfully' })
    } catch (error) {
      reply.code(500).send({ error: 'Failed to delete product' })
    }
  }
} 