export interface Product {
    id: number;
    title: string;
    title_shop: string;
    category: string;
    category_shop: string;
    image: string;
    price: number;
    price_shop: number;
    originalPrice: number | null;
    originalPrice_shop: number | null;
    discount: number;
    discount_shop: number;
    rating: number;
    rating_shop: number;
    reviewCount: number;
    reviewCount_shop: number;
    isOnProduct: boolean;
    shopbycategory: boolean;
    today: boolean;
    todayDesc?: string;
    todayName?: string;
    todayRating?: number;
    todayPrice?: number;
    isOnShop: boolean;
    stock: number;
    inCart: number;
    description?: string;
    features?: string[];
    images?: string[];
}

export const products: Product[] = [
    {
        id: 1,
        title: 'Premium Wireless Headphones with Noise Cancellation',
        title_shop: 'Premium Wireless Headphones with Noise Cancellation',
        category: 'Electronics',
        category_shop: 'Electronics',
        image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 129.99,
        price_shop: 129.99,
        originalPrice: 179.99,
        originalPrice_shop: 179.99,
        discount: 28,
        discount_shop: 28,
        rating: 4,
        rating_shop: 4,
        todayRating: 4,
        todayPrice: 129.99,
        todayName: 'Electronics',
        todayDesc: 'Experience crystal-clear sound with our premium wireless headphones featuring active noise cancellation technology for immersive audio experience.',
        reviewCount: 124,
        reviewCount_shop: 124,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: true,
        today: true,
        stock: 5,
        inCart: 0,
        description: 'Experience crystal-clear sound with our premium wireless headphones featuring active noise cancellation technology for immersive audio experience.',
        features: [
            'Active Noise Cancellation',
            '30-hour battery life',
            'Bluetooth 5.0',
            'Built-in microphone',
            'Foldable design'
        ],
        images: [
            'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600'
        ]
    },
    {
        id: 2,
        title: 'Smart Fitness Tracker Watch - Black',
        title_shop: 'Smart Fitness Tracker Watch - Black',
        category: 'SmartWatches',
        category_shop: 'SmartWatches',
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 89.99,
        price_shop: 89.99,
        originalPrice: 119.99,
        originalPrice_shop: 119.99,
        discount: 25,
        discount_shop: 25,
        rating: 4.5,
        rating_shop: 4.5,
        todayRating: 4.5,
        todayPrice: 89.99,
        todayName: 'Wearables',
        todayDesc: 'Track your fitness goals with our smart watch featuring heart rate monitoring, sleep tracking, and 7-day battery life.',
        reviewCount: 89,
        reviewCount_shop: 89,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: true,
        today: true,
        stock: 15,
        inCart: 0,
        description: 'Track your fitness goals with our smart watch featuring heart rate monitoring, sleep tracking, and 7-day battery life.',
        features: [
            'Heart rate monitoring',
            'Sleep tracking',
            'Water resistant',
            '7-day battery life',
            'Smart notifications'
        ],
        images: [
            'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600'
        ]
    },
    {
        id: 3,
        title: 'Trendy Sneakers for Men and Women',
        title_shop: 'Trendy Sneakers for Men and Women',
        category: 'Gaming',
        category_shop: 'Gaming',
        image: 'https://images.pexels.com/photos/7862233/pexels-photo-7862233.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 39.99,
        price_shop: 39.99,
        originalPrice: null,
        originalPrice_shop: null,
        discount: 0,
        discount_shop: 0,
        rating: 4.2,
        rating_shop: 4.2,
        todayRating: 4.2,
        todayPrice: 39.99,
        todayName: 'Footwear',
        todayDesc: 'Step into style with our trendy sneakers, perfect for any occasion.',
        reviewCount: 42,
        reviewCount_shop: 42,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: true,
        today: true,
        stock: 10,
        inCart: 0,
        description: 'Step into style with our trendy sneakers, perfect for any occasion.',
        features: [
            'Leather upper',
            'Elastic laces',
            'Comfortable fit',
            'Stylish design',
            'Durable construction'
        ],
        images: [
            'https://images.pexels.com/photos/7862233/pexels-photo-7862233.jpeg?auto=compress&cs=tinysrgb&w=600'
        ]
    },
    {
        id: 4,
        title: 'Wireless Headphones with Bluetooth',
        title_shop: 'Wireless Headphones with Bluetooth',
        category: 'Gaming',
        category_shop: 'Gaming',
        image: 'https://images.pexels.com/photos/4408312/pexels-photo-4408312.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 79.99,
        price_shop: 79.99,
        originalPrice: null,
        originalPrice_shop: null,
        discount: 0,
        discount_shop: 0,
        rating: 4.8,
        rating_shop: 4.8,
        todayRating: 4.8,
        todayPrice: 79.99,
        todayName: 'Electronics',
        todayDesc: 'Experience wireless comfort with our wireless headphones, perfect for on-the-go music enjoyment.',
        reviewCount: 78,
        reviewCount_shop: 78,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: true,
        today: true,
        stock: 8,
        inCart: 0,
        description: 'Experience wireless comfort with our wireless headphones, perfect for on-the-go music enjoyment.',
        features: [
            'Bluetooth connectivity',
            'Noise cancellation',
            'Compact design',
            'Easy to use controls',
            'Long battery life'
        ],
        images: [
            'https://images.pexels.com/photos/4408312/pexels-photo-4408312.jpeg?auto=compress&cs=tinysrgb&w=600'
        ]
    },
    {
        id: 5,
        title: 'Gaming Controller for PS5 and Xbox Series X',
        title_shop: 'Gaming Controller',
        category: 'Gaming',
        category_shop: 'Gaming',
        image: 'https://images.pexels.com/photos/7903008/pexels-photo-7903008.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 49.99,
        price_shop: 49.99,
        originalPrice: null,
        originalPrice_shop: null,
        discount: 0,
        discount_shop: 0,
        rating: 4.6,
        rating_shop: 4.6,
        todayRating: 4.6,
        todayPrice: 49.99,
        todayName: 'Gaming',
        todayDesc: 'Experience the thrill of gaming with our gaming controller, perfect for PC and console gaming enthusiasts.',
        reviewCount: 56,
        reviewCount_shop: 56,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: true,
        today: true,
        stock: 5,
        inCart: 0,
        description: 'Experience the thrill of gaming with our gaming controller, perfect for PC and console gaming enthusiasts.',
        features: [
            'Wireless connectivity',
            'Advanced controls',
            'Customizable buttons',
            'Multiplayer support',
            'Long battery life'
        ],
        images: [
            'https://images.pexels.com/photos/7903008/pexels-photo-7903008.jpeg?auto=compress&cs=tinysrgb&w=600'
        ]
    },
    {
        id: 6,
        title: 'Wireless Earbuds with Active Noise Cancellation',
        title_shop: 'Wireless Earbuds with Active Noise Cancellation',
        category: 'Desktop',
        category_shop: 'Desktop',
        image: 'https://images.pexels.com/photos/2811648/pexels-photo-2811648.jpeg',
        price: 129.99,
        price_shop: 129.99,
        originalPrice: 179.99,
        originalPrice_shop: 179.99,
        discount: 28,
        discount_shop: 28,
        rating: 4,
        rating_shop: 4,
        todayRating: 4,
        todayPrice: 129.99,
        todayName: 'Electronics',
        todayDesc: 'Experience crystal-clear sound with our wireless earbuds featuring active noise cancellation technology for immersive audio experience.',
        reviewCount: 124,
        reviewCount_shop: 124,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: true,
        today: true,
        stock: 5,
        inCart: 0,
        description: 'Experience crystal-clear sound with our wireless earbuds featuring active noise cancellation technology for immersive audio experience.',
        features: [
            'Active Noise Cancellation',
            '30-hour battery life',
            'Bluetooth 5.0',
            'Built-in microphone',
            'Foldable design'
        ],
        images: [
            'https://images.pexels.com/photos/2811648/pexels-photo-2811648.jpeg'
        ]
    },
    {
        id: 7,
        title: 'Premium Wireless Headphones with Noise Cancellation',
        title_shop: 'Premium Wireless Headphones with Noise Cancellation',
        category: 'Camara',
        category_shop: 'Camara',
        image: 'https://images.pexels.com/photos/776907/pexels-photo-776907.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 129.99,
        price_shop: 129.99,
        originalPrice: 179.99,
        originalPrice_shop: 179.99,
        discount: 28,
        discount_shop: 28,
        rating: 4,
        rating_shop: 4,
        todayRating: 4,
        todayPrice: 129.99,
        todayName: 'Electronics',
        todayDesc: 'Experience crystal-clear sound with our premium wireless headphones featuring active noise cancellation technology for immersive audio experience.',
        reviewCount: 124,
        reviewCount_shop: 124,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: true,
        today: true,
        stock: 5,
        inCart: 0,
        description: 'Experience crystal-clear sound with our premium wireless headphones featuring active noise cancellation technology for immersive audio experience.',
        features: [
            'Active Noise Cancellation',
            '30-hour battery life',
            'Bluetooth 5.0',
            'Built-in microphone',
            'Foldable design'
        ],
        images: [
            'https://images.pexels.com/photos/776907/pexels-photo-776907.jpeg?auto=compress&cs=tinysrgb&w=600'
        ]
    },
    {
        id: 8,
        title: 'Smart Fitness Tracker Watch - Black',
        title_shop: 'Smart Fitness Tracker Watch - Black',
        category: 'Mouse',
        category_shop: 'Mouse',
        image: 'https://images.pexels.com/photos/20510003/pexels-photo-20510003.jpeg',
        price: 89.99,
        price_shop: 89.99,
        originalPrice: 119.99,
        originalPrice_shop: 119.99,
        discount: 25,
        discount_shop: 25,
        rating: 4.5,
        rating_shop: 4.5,
        todayRating: 4.5,
        todayPrice: 89.99,
        todayName: 'Wearables',
        todayDesc: 'Track your fitness goals with our smart watch featuring heart rate monitoring, sleep tracking, and 7-day battery life.',
        reviewCount: 89,
        reviewCount_shop: 89,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: true,
        today: true,
        stock: 15,
        inCart: 0,
        description: 'Track your fitness goals with our smart watch featuring heart rate monitoring, sleep tracking, and 7-day battery life.',
        features: [
            'Heart rate monitoring',
            'Sleep tracking',
            'Water resistant',
            '7-day battery life',
            'Built-in GPS'
        ],
        images: [
            'https://images.pexels.com/photos/20510003/pexels-photo-20510003.jpeg'
        ]
    },
    {
        id: 9,
        title: 'Smart Fitness Tracker Watch - Black',
        title_shop: 'Smart Fitness Tracker Watch - Black',
        category: 'Mouse',
        category_shop: 'Mouse',
        image: 'https://images.pexels.com/photos/32463084/pexels-photo-32463084.jpeg',
        price: 89.99,
        price_shop: 89.99,
        originalPrice: 119.99,
        originalPrice_shop: 119.99,
        discount: 25,
        discount_shop: 25,
        rating: 4.5,
        rating_shop: 4.5,
        todayRating: 4.5,
        todayPrice: 89.99,
        todayName: 'Wearables',
        todayDesc: 'Track your fitness goals with our smart watch featuring heart rate monitoring, sleep tracking, and 7-day battery life.',
        reviewCount: 89,
        reviewCount_shop: 89,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: true,
        today: true,
        stock: 15,
        inCart: 0,
        description: 'Track your fitness goals with our smart watch featuring heart rate monitoring, sleep tracking, and 7-day battery life.',
        features: [
            'Heart rate monitoring',
            'Sleep tracking',
            'Water resistant',
            '7-day battery life',
            'Built-in GPS'
        ],
        images: [
            'https://images.pexels.com/photos/32463084/pexels-photo-32463084.jpeg'
        ]
    },
    {
        id: 10,
        title: 'Mouse',
        title_shop: 'Mouse',
        category: 'Mouse',
        category_shop: 'Mouse',
        image: 'https://images.pexels.com/photos/20510000/pexels-photo-20510000.jpeg',
        price: 89.99,
        price_shop: 89.99,
        originalPrice: 119.99,
        originalPrice_shop: 119.99,
        discount: 25,
        discount_shop: 25,
        rating: 4.5,
        rating_shop: 4.5,
        todayRating: 4.5,
        todayPrice: 89.99,
        todayName: 'Wearables',
        todayDesc: 'Track your fitness goals with our smart watch featuring heart rate monitoring, sleep tracking, and 7-day battery life.',
        reviewCount: 89,
        reviewCount_shop: 89,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: true,
        today: true,
        stock: 15,
        inCart: 0,
        description: 'Track your fitness goals with our smart watch featuring heart rate monitoring, sleep tracking, and 7-day battery life.',
        features: [
            'Heart rate monitoring',
            'Sleep tracking',
            'Water resistant',
            '7-day battery life',
            'Built-in GPS'
        ],
        images: [
            'https://images.pexels.com/photos/20510000/pexels-photo-20510000.jpeg'
        ]
    },
    {
        id: 11,
        title: 'Wireless Headphones',
        title_shop: 'Wireless Headphones',
        category: 'Computer',
        category_shop: 'Computer',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        price: 59.99,
        price_shop: 59.99,
        originalPrice: 89.99,
        originalPrice_shop: 89.99,
        discount: 33,
        discount_shop: 33,
        rating: 4.5,
        rating_shop: 4.5,
        reviewCount: 120,
        reviewCount_shop: 120,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: false,
        today: false,
        stock: 10,
        inCart: 0
    },
    {
        id: 12,
        title: 'Classic Sneakers',
        title_shop: 'Classic Sneakers',
        category: 'Bag',
        category_shop: 'Bag',
        image: 'https://images.pexels.com/photos/28881154/pexels-photo-28881154.jpeg?auto=format&fit=crop&w=400&q=80',
        price: 39.99,
        price_shop: 39.99,
        originalPrice: 49.99,
        originalPrice_shop: 49.99,
        discount: 20,
        discount_shop: 20,
        rating: 4.2,
        rating_shop: 4.2,
        reviewCount: 80,
        reviewCount_shop: 80,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: false,
        today: false,
        stock: 15,
        inCart: 0
    },
    {
        id: 13,
        title: 'Wireless Earbud',
        title_shop: 'Wireless Earbuds',
        category: 'Bag',
        category_shop: 'Bag',
        image: 'https://images.pexels.com/photos/11031128/pexels-photo-11031128.png?auto=format&fit=crop&w=400&q=80',
        price: 129.99,
        price_shop: 129.99,
        originalPrice: 159.99,
        originalPrice_shop: 159.99,
        discount: 19,
        discount_shop: 19,
        rating: 4.8,
        rating_shop: 4.8,
        reviewCount: 200,
        reviewCount_shop: 200,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: false,
        today: false,
        stock: 8,
        inCart: 0
    },
    {
        id: 14,
        title: 'Leather Wallet',
        title_shop: 'Leather Wallet',
        category: 'Bag',
        category_shop: 'Bag',
        image: 'https://images.pexels.com/photos/9245466/pexels-photo-9245466.jpeg?auto=format&fit=crop&w=400&q=80',
        price: 79.99,
        price_shop: 79.99,
        originalPrice: 99.99,
        originalPrice_shop: 99.99,
        discount: 20,
        discount_shop: 20,
        rating: 4.6,
        rating_shop: 4.6,
        reviewCount: 65,
        reviewCount_shop: 65,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: false,
        today: false,
        stock: 12,
        inCart: 0
    },
    {
        id: 15,
        title: 'Smartwatch',
        title_shop: 'Smartwatch',
        category: 'SmartWatches',
        category_shop: 'SmartWatches',
        image: 'https://images.pexels.com/photos/2861929/pexels-photo-2861929.jpeg?auto=format&fit=crop&w=400&q=80',
        price: 59.99,
        price_shop: 59.99,
        originalPrice: 89.99,
        originalPrice_shop: 89.99,
        discount: 33,
        discount_shop: 33,
        rating: 4.5,
        rating_shop: 4.5,
        reviewCount: 120,
        reviewCount_shop: 120,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: false,
        today: false,
        stock: 10,
        inCart: 0
    },
    {
        id: 16,
        title: 'Classic Sneakers',
        title_shop: 'Classic Sneakers',
        category: 'SmartWatches',
        category_shop: 'SmartWatches',
        image: 'https://images.pexels.com/photos/31406903/pexels-photo-31406903.jpeg?auto=format&fit=crop&w=400&q=80',
        price: 39.99,
        price_shop: 39.99,
        originalPrice: 49.99,
        originalPrice_shop: 49.99,
        discount: 20,
        discount_shop: 20,
        rating: 4.2,
        rating_shop: 4.2,
        reviewCount: 80,
        reviewCount_shop: 80,
        isOnProduct: true,
        isOnShop: true,
        shopbycategory: false,
        today: false,
        stock: 15,
        inCart: 0
    }
];