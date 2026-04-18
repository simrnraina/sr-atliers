import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category, type OrderStatus, Size, createActor } from "../backend";
import type {
  Product as BackendProduct,
  CreateProductInput,
  UpdateProductInput,
} from "../backend";
import {
  getBestSellers,
  getNewArrivals,
  getProductsByCategory,
  getTrending,
  sampleProducts,
  searchProducts,
} from "../lib/sampleData";
import type { Product, ProductCategory } from "../types";

// ─── Mapping helpers ──────────────────────────────────────────────────────────

function backendCategoryToFrontend(cat: Category): ProductCategory {
  if (cat === Category.NewArrivals) return "new-arrivals";
  if (cat === Category.Trending) return "dresses";
  if (cat === Category.BestSellers) return "blazers";
  return "new-arrivals";
}

function backendSizeToFrontend(size: Size): string {
  return size.toString();
}

function frontendSizeToBackend(size: string): Size {
  const map: Record<string, Size> = {
    S: Size.S,
    M: Size.M,
    L: Size.L,
    XL: Size.XL,
    XS: Size.S,
    XXL: Size.XL,
  };
  return map[size] ?? Size.M;
}

function mapBackendProduct(p: BackendProduct): Product {
  return {
    id: p.id.toString(),
    name: p.name,
    price: Number(p.price) / 100,
    category: backendCategoryToFrontend(p.category),
    images: [p.imageUrl || "/assets/generated/blazer-beige.dim_800x1000.jpg"],
    description: p.description,
    sizes: p.sizes.map(backendSizeToFrontend) as Product["sizes"],
    stock: p.stock.reduce((sum, [, qty]) => sum + Number(qty), 0),
  };
}

function mapCategory(_cat: ProductCategory): Category {
  return Category.NewArrivals;
}

function buildStockArray(
  sizes: string[],
  totalStock: number,
): Array<[Size, bigint]> {
  if (sizes.length === 0) return [];
  const perSize = Math.max(1, Math.floor(totalStock / sizes.length));
  return sizes.map((s): [Size, bigint] => [
    frontendSizeToBackend(s),
    BigInt(perSize),
  ]);
}

// ─── Public hooks ─────────────────────────────────────────────────────────────

export function useProducts(category?: ProductCategory | "all") {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["products", category ?? "all"],
    queryFn: async () => {
      if (!actor) {
        if (!category || category === "all") return sampleProducts;
        return getProductsByCategory(category);
      }
      try {
        const products = await actor.getProducts();
        const mapped = products.map(mapBackendProduct);
        if (!category || category === "all") return mapped;
        return mapped.filter((p) => p.category === category);
      } catch {
        if (!category || category === "all") return sampleProducts;
        return getProductsByCategory(category);
      }
    },
    enabled: !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useNewArrivals() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["products", "new-arrivals"],
    queryFn: async () => {
      if (!actor) return getNewArrivals();
      try {
        const products = await actor.getProductsByCategory(
          Category.NewArrivals,
        );
        const mapped = products.map(mapBackendProduct);
        return mapped.length > 0 ? mapped : getNewArrivals();
      } catch {
        return getNewArrivals();
      }
    },
    enabled: !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useTrending() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["products", "trending"],
    queryFn: async () => {
      if (!actor) return getTrending();
      try {
        const products = await actor.getProductsByCategory(Category.Trending);
        const mapped = products.map(mapBackendProduct);
        return mapped.length > 0 ? mapped : getTrending();
      } catch {
        return getTrending();
      }
    },
    enabled: !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useBestSellers() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["products", "best-sellers"],
    queryFn: async () => {
      if (!actor) return getBestSellers();
      try {
        const products = await actor.getProductsByCategory(
          Category.BestSellers,
        );
        const mapped = products.map(mapBackendProduct);
        return mapped.length > 0 ? mapped : getBestSellers();
      } catch {
        return getBestSellers();
      }
    },
    enabled: !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useProductById(id: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product | undefined>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return sampleProducts.find((p) => p.id === id);
      try {
        const product = await actor.getProductById(BigInt(id));
        if (!product) return sampleProducts.find((p) => p.id === id);
        return mapBackendProduct(product);
      } catch {
        return sampleProducts.find((p) => p.id === id);
      }
    },
    enabled: !!id && !isFetching,
    staleTime: 2 * 60 * 1000,
  });
}

export function useSearchProducts(query: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["products", "search", query],
    queryFn: async () => {
      if (!query.trim()) return sampleProducts;
      if (!actor) return searchProducts(query);
      try {
        const products = await actor.searchProducts(query, null, null, null);
        const mapped = products.map(mapBackendProduct);
        return mapped.length > 0 ? mapped : searchProducts(query);
      } catch {
        return searchProducts(query);
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

// ─── Admin hooks ─────────────────────────────────────────────────────────────

export function useAdminStats() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      if (!actor) throw new Error("Not authenticated");
      const stats = await actor.getDashboardStats();
      return {
        totalProducts: Number(stats.totalProducts),
        totalOrders: Number(stats.totalOrders),
        totalRevenue: Number(stats.totalRevenue) / 100,
      };
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useAdminOrders() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      if (!actor) throw new Error("Not authenticated");
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useAdminProducts() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      if (!actor) return sampleProducts;
      try {
        const products = await actor.getProducts();
        return products.map(mapBackendProduct);
      } catch {
        return sampleProducts;
      }
    },
    enabled: !isFetching,
    staleTime: 30_000,
  });
}

// ─── Admin mutations ──────────────────────────────────────────────────────────

interface AdminProductFormData {
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
  imageFile?: File;
  imageUrl?: string;
  stock: number;
  sizes: string[];
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (data: AdminProductFormData) => {
      if (!actor) throw new Error("Not authenticated");

      let imageUrl: string;
      if (data.imageFile) {
        // Convert file to data URL for storage
        imageUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve((e.target?.result as string) ?? "");
          reader.readAsDataURL(data.imageFile!);
        });
      } else if (data.imageUrl) {
        imageUrl = data.imageUrl;
      } else {
        imageUrl = "/assets/generated/blazer-beige.dim_800x1000.jpg";
      }

      const backendSizes = data.sizes.map(frontendSizeToBackend);
      const stockArr = buildStockArray(data.sizes, data.stock);

      const input: CreateProductInput = {
        name: data.name,
        description: data.description,
        price: BigInt(Math.round(data.price * 100)),
        category: mapCategory(data.category),
        sizes: backendSizes,
        stock: stockArr,
        imageUrl,
      };

      return actor.createProduct(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: { id: string; data: Partial<AdminProductFormData> }) => {
      if (!actor) throw new Error("Not authenticated");

      const input: UpdateProductInput = {};
      if (data.name) input.name = data.name;
      if (data.description) input.description = data.description;
      if (data.price !== undefined)
        input.price = BigInt(Math.round(data.price * 100));
      if (data.category) input.category = mapCategory(data.category);
      if (data.sizes) input.sizes = data.sizes.map(frontendSizeToBackend);
      if (data.stock !== undefined && data.sizes) {
        input.stock = buildStockArray(data.sizes, data.stock);
      }
      if (data.imageFile) {
        const imageUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve((e.target?.result as string) ?? "");
          reader.readAsDataURL(data.imageFile!);
        });
        input.imageUrl = imageUrl;
      } else if (data.imageUrl) {
        input.imageUrl = data.imageUrl;
      }

      return actor.updateProduct(BigInt(id), input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deleteProduct(BigInt(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: OrderStatus }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
  });
}
