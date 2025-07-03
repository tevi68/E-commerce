<template>
  <div class="product-form">
    <h2>{{ formTitle }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Product Name*</label>
        <input
          type="text"
          id="name"
          v-model="product.name"
          required
          placeholder="Enter product name"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="product.description"
          rows="4"
          placeholder="Enter product description"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="price">Price*</label>
          <input
            type="number"
            id="price"
            v-model.number="product.price"
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>

        <div class="form-group">
          <label for="quantity">Quantity in Stock*</label>
          <input
            type="number"
            id="quantity"
            v-model.number="product.quantity"
            required
            min="0"
            placeholder="0"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="category">Category*</label>
          <select
            id="category"
            v-model="product.category"
            required
          >
            <option value="" disabled>Select a category</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="sku">SKU (Stock Keeping Unit)</label>
          <input
            type="text"
            id="sku"
            v-model="product.sku"
            placeholder="Enter SKU"
          />
        </div>
      </div>

      <div class="form-group">
        <label>Product Images</label>
        <div class="image-upload">
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            @change="handleImageUpload"
          />
          <label for="images" class="upload-button">
            <span>+ Upload Images</span>
          </label>
          <div class="image-preview" v-if="product.images.length > 0">
            <div
              class="preview-item"
              v-for="(img, index) in product.images"
              :key="index"
            >
              <img :src="img.preview || img.url" :alt="`Product image ${index + 1}`" />
              <button type="button" @click="removeImage(index)" class="remove-image">
                ×
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="product.isActive" />
          Active Product
        </label>
      </div>

      <div class="form-actions">
        <button type="button" @click="handleCancel" class="secondary">
          Cancel
        </button>
        <button type="submit" class="primary">
          {{ submitButtonText }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface ProductImage {
  file?: File;
  url?: string;
  preview?: string;
}

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  sku: string;
  images: ProductImage[];
  isActive: boolean;
}

const props = defineProps<{
  initialData?: Partial<Product>;
  isEditing?: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit', product: Product): void;
  (e: 'cancel'): void;
}>();

const categories = ref([
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Books',
  'Toys',
  'Sports',
  'Beauty',
  'Food',
]);

const product = ref<Product>({
  name: '',
  description: '',
  price: 0,
  quantity: 0,
  category: '',
  sku: '',
  images: [],
  isActive: true,
  ...props.initialData,
});

const formTitle = computed(() => 
  props.isEditing ? 'Edit Product' : 'Add New Product'
);

const submitButtonText = computed(() => 
  props.isEditing ? 'Update Product' : 'Add Product'
);

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    Array.from(input.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        product.value.images.push({
          file,
          preview: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    });
    input.value = ''; // Reset file input
  }
};

const removeImage = (index: number) => {
  product.value.images.splice(index, 1);
};

const handleSubmit = () => {
  emit('submit', product.value);
};

const handleCancel = () => {
  emit('cancel');
};
</script>

<style scoped>
.product-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

input[type="text"],
input[type="number"],
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

textarea {
  resize: vertical;
}

input[type="checkbox"] {
  margin-right: 8px;
}

.image-upload {
  margin-top: 8px;
}

.upload-button {
  display: inline-block;
  padding: 10px 15px;
  background: #f0f0f0;
  border: 1px dashed #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-button:hover {
  background: #e0e0e0;
}

input[type="file"] {
  display: none;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.preview-item {
  position: relative;
  width: 100px;
  height: 100px;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.remove-image {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button.primary {
  background-color: #4CAF50;
  color: white;
}

button.primary:hover {
  background-color: #45a049;
}

button.secondary {
  background-color: #f0f0f0;
  color: #333;
}

button.secondary:hover {
  background-color: #e0e0e0;
}

* {
  box-sizing: border-box;
}
</style>