var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { w as Subscribable, x as shallowEqualObjects, y as hashKey, z as getDefaultState, A as notifyManager, C as useQueryClient, r as reactExports, D as noop, E as shouldThrowError, F as useActor, G as useQuery, I as Size, J as Category, K as createActor } from "./index-BU4uHDVH.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
const sampleProducts = [
  {
    id: "1",
    name: "Tailored Silk Blazer",
    price: 1250,
    category: "blazers",
    images: ["/assets/generated/blazer-beige.dim_800x1000.jpg"],
    description: "Impeccably tailored in fine Italian silk, this blazer embodies effortless authority. Clean lines and a relaxed silhouette create the perfect balance of structure and ease.",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 15,
    isTrending: true,
    tags: ["silk", "tailored", "workwear"]
  },
  {
    id: "2",
    name: "Luxury Silk Slip Dress",
    price: 980,
    category: "dresses",
    images: ["/assets/generated/dress-cream.dim_800x1000.jpg"],
    description: "Draped in weightless silk, this slip dress moves like a second skin. The bias cut flatters every silhouette, transitioning seamlessly from day to evening.",
    sizes: ["XS", "S", "M", "L"],
    stock: 10,
    isNew: true,
    tags: ["silk", "evening", "minimal"]
  },
  {
    id: "3",
    name: "Structured Leather Tote",
    price: 1640,
    category: "bags",
    images: ["/assets/generated/bag-tan.dim_800x1000.jpg"],
    description: "Crafted from full-grain Italian leather, this tote transcends seasons. The minimalist hardware and spacious interior make it indispensable for the modern woman.",
    sizes: [],
    stock: 8,
    isBestSeller: true,
    tags: ["leather", "tote", "everyday"]
  },
  {
    id: "4",
    name: "Midnight Velvet Gown",
    price: 2200,
    category: "dresses",
    images: ["/assets/generated/gown-black.dim_800x1000.jpg"],
    description: "A masterwork in deep velvet, this floor-length gown commands attention with understated drama. The open back detail reveals just enough.",
    sizes: ["XS", "S", "M", "L"],
    stock: 5,
    isNew: true,
    tags: ["velvet", "evening", "gown"]
  },
  {
    id: "5",
    name: "Cashmere Wrap Coat",
    price: 2850,
    originalPrice: 3200,
    category: "blazers",
    images: ["/assets/generated/coat-camel.dim_800x1000.jpg"],
    description: "Pure cashmere in a timeless camel hue, this wrap coat is the cornerstone of a luxury wardrobe. The generous lapels and belted waist create an effortlessly polished look.",
    sizes: ["S", "M", "L", "XL"],
    stock: 7,
    isBestSeller: true,
    tags: ["cashmere", "coat", "winter"]
  },
  {
    id: "6",
    name: "Pleated Silk Trousers",
    price: 720,
    category: "bottoms",
    images: ["/assets/generated/trousers-ivory.dim_800x1000.jpg"],
    description: "Wide-leg silk trousers with a high-rise waist and elegant pleats. The fluid drape creates a statuesque silhouette perfect for any refined occasion.",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 12,
    tags: ["silk", "wide-leg", "elegant"]
  },
  {
    id: "7",
    name: "Chain-Detail Crossbody",
    price: 890,
    category: "bags",
    images: ["/assets/generated/bag-crossbody.dim_800x1000.jpg"],
    description: "Compact yet capacious, this crossbody features a delicate gold chain strap and quilted lambskin exterior. The magnetic clasp adds both function and style.",
    sizes: [],
    stock: 9,
    isTrending: true,
    tags: ["leather", "crossbody", "chain"]
  },
  {
    id: "8",
    name: "Linen Tailored Shirt",
    price: 480,
    category: "tops",
    images: ["/assets/generated/shirt-white.dim_800x1000.jpg"],
    description: "Stone-washed Italian linen in pure white. Oversized fit with dropped shoulders and a relaxed collar that effortlessly bridges casual and formal.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 20,
    tags: ["linen", "shirt", "casual"]
  },
  {
    id: "9",
    name: "Suede Ankle Boots",
    price: 1120,
    category: "accessories",
    images: ["/assets/generated/boots-suede.dim_800x1000.jpg"],
    description: "Hand-stitched suede ankle boots with a stacked heel. The tobacco hue complements both warm and cool tones, making them the most versatile piece in any wardrobe.",
    sizes: ["S", "M", "L"],
    stock: 6,
    isBestSeller: true,
    tags: ["suede", "boots", "footwear"]
  },
  {
    id: "10",
    name: "Merino Turtleneck",
    price: 560,
    category: "tops",
    images: ["/assets/generated/turtleneck-beige.dim_800x1000.jpg"],
    description: "Superfine merino wool in a warm beige tone. The ribbed turtleneck sits perfectly while the relaxed body keeps it effortlessly modern.",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 18,
    isNew: true,
    tags: ["merino", "knitwear", "winter"]
  },
  {
    id: "11",
    name: "Silk Scarf — Heritage",
    price: 340,
    category: "accessories",
    images: ["/assets/generated/scarf-silk.dim_800x1000.jpg"],
    description: "Hand-rolled edges on 100% Habotai silk. The abstract botanical print in earthy tones is versatile enough to wear as a headscarf, neck tie, or bag accent.",
    sizes: [],
    stock: 25,
    tags: ["silk", "scarf", "print"]
  },
  {
    id: "12",
    name: "High-Waist Palazzo Pants",
    price: 660,
    category: "bottoms",
    images: ["/assets/generated/palazzo-black.dim_800x1000.jpg"],
    description: "Sweeping palazzo silhouette in matte crepe. The ultra-high waist and wide legs create an elongating effect that is both commanding and comfortable.",
    sizes: ["XS", "S", "M", "L"],
    stock: 11,
    isTrending: true,
    tags: ["palazzo", "crepe", "evening"]
  }
];
function backendCategoryToFrontend(cat) {
  if (cat === Category.NewArrivals) return "new-arrivals";
  if (cat === Category.Trending) return "dresses";
  if (cat === Category.BestSellers) return "blazers";
  return "new-arrivals";
}
function backendSizeToFrontend(size) {
  return size.toString();
}
function frontendSizeToBackend(size) {
  const map = {
    S: Size.S,
    M: Size.M,
    L: Size.L,
    XL: Size.XL,
    XS: Size.S,
    XXL: Size.XL
  };
  return map[size] ?? Size.M;
}
function mapBackendProduct(p) {
  return {
    id: p.id.toString(),
    name: p.name,
    price: Number(p.price) / 100,
    category: backendCategoryToFrontend(p.category),
    images: [p.imageUrl || "/assets/generated/blazer-beige.dim_800x1000.jpg"],
    description: p.description,
    sizes: p.sizes.map(backendSizeToFrontend),
    stock: p.stock.reduce((sum, [, qty]) => sum + Number(qty), 0)
  };
}
function mapCategory(_cat) {
  return Category.NewArrivals;
}
function buildStockArray(sizes, totalStock) {
  if (sizes.length === 0) return [];
  const perSize = Math.max(1, Math.floor(totalStock / sizes.length));
  return sizes.map((s) => [
    frontendSizeToBackend(s),
    BigInt(perSize)
  ]);
}
function useProducts(category) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products", "all"],
    queryFn: async () => {
      if (!actor) {
        return sampleProducts;
      }
      try {
        const products = await actor.getProducts();
        const mapped = products.map(mapBackendProduct);
        if (!category || category === "all") return mapped;
        return mapped.filter((p) => p.category === category);
      } catch {
        return sampleProducts;
      }
    },
    enabled: !isFetching,
    staleTime: 2 * 60 * 1e3
  });
}
function useProductById(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
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
    staleTime: 2 * 60 * 1e3
  });
}
function useAdminStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      if (!actor) throw new Error("Not authenticated");
      const stats = await actor.getDashboardStats();
      return {
        totalProducts: Number(stats.totalProducts),
        totalOrders: Number(stats.totalOrders),
        totalRevenue: Number(stats.totalRevenue) / 100
      };
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useAdminOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      if (!actor) throw new Error("Not authenticated");
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useAdminProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
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
    staleTime: 3e4
  });
}
function useCreateProduct() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Not authenticated");
      let imageUrl;
      if (data.imageFile) {
        imageUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            var _a2;
            return resolve(((_a2 = e.target) == null ? void 0 : _a2.result) ?? "");
          };
          reader.readAsDataURL(data.imageFile);
        });
      } else if (data.imageUrl) {
        imageUrl = data.imageUrl;
      } else {
        imageUrl = "/assets/generated/blazer-beige.dim_800x1000.jpg";
      }
      const backendSizes = data.sizes.map(frontendSizeToBackend);
      const stockArr = buildStockArray(data.sizes, data.stock);
      const input = {
        name: data.name,
        description: data.description,
        price: BigInt(Math.round(data.price * 100)),
        category: mapCategory(data.category),
        sizes: backendSizes,
        stock: stockArr,
        imageUrl
      };
      return actor.createProduct(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    }
  });
}
function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      id,
      data
    }) => {
      if (!actor) throw new Error("Not authenticated");
      const input = {};
      if (data.name) input.name = data.name;
      if (data.description) input.description = data.description;
      if (data.price !== void 0)
        input.price = BigInt(Math.round(data.price * 100));
      if (data.category) input.category = mapCategory(data.category);
      if (data.sizes) input.sizes = data.sizes.map(frontendSizeToBackend);
      if (data.stock !== void 0 && data.sizes) {
        input.stock = buildStockArray(data.sizes, data.stock);
      }
      if (data.imageFile) {
        const imageUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            var _a2;
            return resolve(((_a2 = e.target) == null ? void 0 : _a2.result) ?? "");
          };
          reader.readAsDataURL(data.imageFile);
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
    }
  });
}
function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deleteProduct(BigInt(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    }
  });
}
function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    }
  });
}
export {
  useProductById as a,
  useDeleteProduct as b,
  useAdminStats as c,
  useAdminOrders as d,
  useAdminProducts as e,
  useUpdateOrderStatus as f,
  useCreateProduct as g,
  useUpdateProduct as h,
  sampleProducts as s,
  useProducts as u
};
