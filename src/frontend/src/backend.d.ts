import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface NewsletterSubscription {
    subscribedAt: Timestamp;
    email: string;
}
export interface ShippingAddress {
    country: string;
    city: string;
    postalCode: string;
    fullName: string;
    state: string;
    addressLine1: string;
    addressLine2: string;
    phone: string;
}
export interface OrderItem {
    size: Size;
    productId: ProductId;
    productName: string;
    quantity: bigint;
    unitPrice: bigint;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    total: bigint;
    userId: UserId;
    createdAt: Timestamp;
    stripePaymentId: string;
    shippingAddress: ShippingAddress;
    items: Array<OrderItem>;
}
export interface UpdateProductInput {
    name?: string;
    description?: string;
    sizes?: Array<Size>;
    stock?: Array<[Size, bigint]>;
    imageUrl?: string;
    category?: Category;
    price?: bigint;
}
export interface DashboardStats {
    totalProducts: bigint;
    totalOrders: bigint;
    totalRevenue: bigint;
}
export type UserId = Principal;
export interface CreateProductInput {
    name: string;
    description: string;
    sizes: Array<Size>;
    stock: Array<[Size, bigint]>;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export interface CreateOrderInput {
    stripePaymentId: string;
    shippingAddress: ShippingAddress;
    items: Array<OrderItem>;
}
export type ProductId = bigint;
export interface CartItem {
    size: Size;
    productId: ProductId;
    quantity: bigint;
}
export interface Product {
    id: ProductId;
    name: string;
    createdAt: Timestamp;
    description: string;
    sizes: Array<Size>;
    stock: Array<[Size, bigint]>;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export type OrderId = bigint;
export enum Category {
    BestSellers = "BestSellers",
    Trending = "Trending",
    NewArrivals = "NewArrivals"
}
export enum OrderStatus {
    Delivered = "Delivered",
    Processing = "Processing",
    Shipped = "Shipped",
    Pending = "Pending"
}
export enum Size {
    L = "L",
    M = "M",
    S = "S",
    XL = "XL"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addToCart(productId: ProductId, size: Size, quantity: bigint): Promise<void>;
    addToWishlist(productId: ProductId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    createOrder(input: CreateOrderInput): Promise<Order>;
    createProduct(input: CreateProductInput): Promise<Product>;
    deleteProduct(id: ProductId): Promise<boolean>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getDashboardStats(): Promise<DashboardStats>;
    getMyOrders(): Promise<Array<Order>>;
    getNewsletterSubscribers(): Promise<Array<NewsletterSubscription>>;
    getOrderById(id: OrderId): Promise<Order | null>;
    getProductById(id: ProductId): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getWishlist(): Promise<Array<ProductId>>;
    isAdmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    removeFromCart(productId: ProductId, size: Size): Promise<void>;
    removeFromWishlist(productId: ProductId): Promise<void>;
    searchProducts(searchQuery: string | null, category: Category | null, minPrice: bigint | null, maxPrice: bigint | null): Promise<Array<Product>>;
    subscribeNewsletter(email: string): Promise<void>;
    updateCartQuantity(productId: ProductId, size: Size, quantity: bigint): Promise<void>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<boolean>;
    updateProduct(id: ProductId, input: UpdateProductInput): Promise<Product | null>;
    updateStock(productId: ProductId, size: Size, quantity: bigint): Promise<boolean>;
}
