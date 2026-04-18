import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Edit,
  ImagePlus,
  Package,
  Plus,
  Shield,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Upload,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { OrderStatus } from "../backend";
import { useAuth, useIsAdmin } from "../hooks/useAuth";
import {
  useAdminOrders,
  useAdminProducts,
  useAdminStats,
  useCreateProduct,
  useDeleteProduct,
  useUpdateOrderStatus,
  useUpdateProduct,
} from "../hooks/useProducts";
import { formatPrice } from "../lib/api";
import type { Product, ProductCategory } from "../types";

const STATUS_COLORS: Record<string, string> = {
  [OrderStatus.Pending]: "bg-accent/10 text-accent border-accent/30",
  [OrderStatus.Processing]:
    "bg-secondary/60 text-secondary-foreground border-secondary",
  [OrderStatus.Shipped]: "bg-accent/20 text-accent border-accent/40",
  [OrderStatus.Delivered]: "bg-muted text-foreground border-border",
};

const CATEGORIES: ProductCategory[] = [
  "new-arrivals",
  "dresses",
  "blazers",
  "accessories",
  "bags",
  "tops",
  "bottoms",
];

interface ProductFormData {
  name: string;
  price: string;
  category: ProductCategory;
  description: string;
  imageUrl: string;
  imagePreview: string;
  imageFile: File | null;
  stock: string;
  sizes: string;
}

const EMPTY_FORM: ProductFormData = {
  name: "",
  price: "",
  category: "new-arrivals",
  description: "",
  imageUrl: "",
  imagePreview: "",
  imageFile: null,
  stock: "",
  sizes: "S, M, L, XL",
};

type AdminTab = "dashboard" | "products" | "orders";

// ─── Access Guard ─────────────────────────────────────────────────────────────

function AdminLoginGate() {
  const { login, isLoading } = useAuth();
  return (
    <div
      className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6"
      data-ocid="admin.login_gate"
    >
      <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
        <Shield size={36} className="text-accent" />
      </div>
      <h1 className="font-display text-3xl uppercase tracking-[0.15em] mb-3">
        Admin Access Required
      </h1>
      <p className="font-body text-sm text-muted-foreground mb-8 max-w-sm leading-relaxed">
        This area is restricted to authorized personnel only. Sign in with your
        Internet Identity to access the SR Atliers admin dashboard.
      </p>
      <Button
        variant="default"
        size="lg"
        data-ocid="admin.login_button"
        onClick={login}
        disabled={isLoading}
        className="bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs px-10"
      >
        {isLoading ? "Authenticating…" : "Sign In as Admin"}
      </Button>
    </div>
  );
}

function AdminDeniedGate() {
  return (
    <div
      className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6"
      data-ocid="admin.denied_gate"
    >
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
        <Shield size={36} className="text-destructive" />
      </div>
      <h1 className="font-display text-3xl uppercase tracking-[0.15em] mb-3">
        Access Denied
      </h1>
      <p className="font-body text-sm text-muted-foreground mb-8 max-w-sm leading-relaxed">
        You are not authorized to access the admin panel. This area is
        restricted to the store owner only.
      </p>
      <Button
        variant="outline"
        data-ocid="admin.go_home_button"
        onClick={() => window.location.assign("/")}
        className="uppercase tracking-widest text-xs"
      >
        Return to Store
      </Button>
    </div>
  );
}

// ─── Dashboard Tab ────────────────────────────────────────────────────────────

function DashboardTab() {
  const { data: stats, isLoading } = useAdminStats();
  const { data: orders = [] } = useAdminOrders();
  const { data: products = [] } = useAdminProducts();

  const STATS = [
    {
      label: "Total Products",
      value: isLoading ? "—" : String(stats?.totalProducts ?? products.length),
      icon: Package,
    },
    {
      label: "Total Orders",
      value: isLoading ? "—" : String(stats?.totalOrders ?? orders.length),
      icon: ShoppingCart,
    },
    {
      label: "Revenue (MTD)",
      value: isLoading ? "—" : formatPrice(stats?.totalRevenue ?? 0),
      icon: TrendingUp,
      gold: true,
    },
    { label: "Active Customers", value: isLoading ? "—" : "—", icon: Users },
  ];

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-card border border-border/50 rounded-sm p-5 hover:border-accent/40 transition-smooth"
            data-ocid={`admin.stat.item.${i + 1}`}
          >
            <div className="flex items-start justify-between mb-4">
              <stat.icon
                size={16}
                className={stat.gold ? "text-accent" : "text-muted-foreground"}
              />
            </div>
            {isLoading ? (
              <Skeleton className="h-7 w-20 mb-1" />
            ) : (
              <p
                className={`font-display text-xl lg:text-2xl ${stat.gold ? "text-accent" : "text-foreground"}`}
              >
                {stat.value}
              </p>
            )}
            <p className="font-body text-[10px] text-muted-foreground mt-1 tracking-wide uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border/50 rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border/40">
          <h2 className="font-display text-sm uppercase tracking-widest">
            Recent Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                {["Order ID", "Customer", "Date", "Total", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="font-body text-[10px] tracking-widest uppercase text-muted-foreground text-left px-5 py-3"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order, i) => (
                <tr
                  key={order.id.toString()}
                  className="border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors"
                  data-ocid={`admin.recent_order.item.${i + 1}`}
                >
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs text-muted-foreground">
                      #{order.id.toString()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-body text-sm">
                      {order.shippingAddress.fullName}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-body text-xs text-muted-foreground">
                      {new Date(
                        Number(order.createdAt) / 1_000_000,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-body text-sm text-accent font-medium">
                      {formatPrice(Number(order.total) / 100)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge
                      variant="outline"
                      className={`text-[9px] uppercase tracking-widest px-2 py-0.5 ${STATUS_COLORS[order.status] ?? "bg-muted text-foreground"}`}
                    >
                      {order.status}
                    </Badge>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center font-body text-sm text-muted-foreground"
                    data-ocid="admin.recent_orders.empty_state"
                  >
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Products Tab ─────────────────────────────────────────────────────────────

interface ProductsTabProps {
  onAdd: () => void;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}

function ProductsTab({ onAdd, onEdit, onDelete }: ProductsTabProps) {
  const { data: products = [], isLoading } = useAdminProducts();

  return (
    <motion.div
      key="products"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-5">
        <p className="font-body text-xs text-muted-foreground tracking-wide">
          {products.length} products in store
        </p>
        <Button
          variant="default"
          size="default"
          data-ocid="admin.add_product_button"
          onClick={onAdd}
          className="bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-[10px]"
        >
          <Plus size={13} /> Add Product
        </Button>
      </div>
      <div className="bg-card border border-border/50 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" data-ocid="admin.products.table">
            <thead className="border-b border-border/50 bg-muted/30">
              <tr>
                {["Product", "Category", "Price", "Stock", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="font-body text-[10px] tracking-widest uppercase text-muted-foreground text-left px-5 py-3"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                ["a", "b", "c", "d"].map((k) => (
                  <tr
                    key={`skeleton-product-${k}`}
                    className="border-b border-border/20"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-9 h-11 rounded-sm" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Skeleton className="h-5 w-20" />
                    </td>
                    <td className="px-5 py-3">
                      <Skeleton className="h-4 w-16" />
                    </td>
                    <td className="px-5 py-3">
                      <Skeleton className="h-4 w-8" />
                    </td>
                    <td className="px-5 py-3">
                      <Skeleton className="h-6 w-16" />
                    </td>
                  </tr>
                ))}
              {!isLoading &&
                products.map((product, i) => (
                  <tr
                    key={product.id}
                    className="border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors"
                    data-ocid={`admin.product.row.${i + 1}`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-11 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-display text-[11px] uppercase tracking-wide truncate max-w-[140px]">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge
                        variant="outline"
                        className="text-[9px] uppercase tracking-widest capitalize"
                      >
                        {product.category.replace("-", " ")}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <span className="font-body text-sm text-accent font-medium">
                        {formatPrice(product.price)}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`font-body text-sm font-medium ${
                          product.stock <= 5
                            ? "text-destructive"
                            : product.stock <= 10
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-foreground"
                        }`}
                      >
                        {product.stock}
                        {product.stock <= 5 && (
                          <span className="ml-1 text-[9px] uppercase tracking-wider">
                            low
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          aria-label="Edit product"
                          data-ocid={`admin.product.edit_button.${i + 1}`}
                          onClick={() => onEdit(product)}
                          className="p-1.5 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-sm transition-colors"
                        >
                          <Edit size={13} />
                        </button>
                        <button
                          type="button"
                          aria-label="Delete product"
                          data-ocid={`admin.product.delete_button.${i + 1}`}
                          onClick={() => onDelete(product.id)}
                          className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-sm transition-colors"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {!isLoading && products.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center"
                    data-ocid="admin.products.empty_state"
                  >
                    <p className="font-body text-sm text-muted-foreground mb-3">
                      No products yet
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onAdd}
                      className="uppercase tracking-widest text-[10px]"
                    >
                      <Plus size={12} /> Add First Product
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────

function OrdersTab() {
  const { data: orders = [], isLoading } = useAdminOrders();
  const updateStatus = useUpdateOrderStatus();

  return (
    <motion.div
      key="orders"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-card border border-border/50 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" data-ocid="admin.orders.table">
            <thead className="border-b border-border/50 bg-muted/30">
              <tr>
                {[
                  "Order ID",
                  "Customer",
                  "Date",
                  "Items",
                  "Total",
                  "Status",
                  "Update",
                ].map((h) => (
                  <th
                    key={h}
                    className="font-body text-[10px] tracking-widest uppercase text-muted-foreground text-left px-5 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                ["a", "b", "c"].map((k) => (
                  <tr
                    key={`skeleton-order-${k}`}
                    className="border-b border-border/20"
                  >
                    {["1", "2", "3", "4", "5", "6", "7"].map((col) => (
                      <td key={`skeleton-col-${col}`} className="px-5 py-3.5">
                        <Skeleton className="h-4 w-20" />
                      </td>
                    ))}
                  </tr>
                ))}
              {!isLoading &&
                orders.map((order, i) => (
                  <tr
                    key={order.id.toString()}
                    className="border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors"
                    data-ocid={`admin.order.row.${i + 1}`}
                  >
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs text-muted-foreground">
                        #{order.id.toString()}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-body text-sm">
                          {order.shippingAddress.fullName}
                        </p>
                        <p className="font-body text-[10px] text-muted-foreground">
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.country}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-body text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(
                          Number(order.createdAt) / 1_000_000,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-body text-sm text-center">
                        {order.items.reduce(
                          (s, it) => s + Number(it.quantity),
                          0,
                        )}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-body text-sm text-accent font-medium whitespace-nowrap">
                        {formatPrice(Number(order.total) / 100)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge
                        variant="outline"
                        className={`text-[9px] uppercase tracking-widest px-2 py-0.5 whitespace-nowrap ${STATUS_COLORS[order.status] ?? "bg-muted text-foreground border-border"}`}
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <Select
                        value={order.status}
                        onValueChange={(val) =>
                          updateStatus.mutate(
                            { id: order.id, status: val as OrderStatus },
                            {
                              onSuccess: () =>
                                toast.success("Order status updated"),
                              onError: () =>
                                toast.error("Failed to update status"),
                            },
                          )
                        }
                      >
                        <SelectTrigger
                          className="h-7 text-[10px] uppercase tracking-wider w-32"
                          data-ocid={`admin.order.status_select.${i + 1}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(OrderStatus).map((s) => (
                            <SelectItem
                              key={s}
                              value={s}
                              className="text-[10px] uppercase tracking-wider"
                            >
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              {!isLoading && orders.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center font-body text-sm text-muted-foreground"
                    data-ocid="admin.orders.empty_state"
                  >
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Product Form Modal ───────────────────────────────────────────────────────

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  editTarget: Product | null;
}

function ProductModal({ open, onClose, editTarget }: ProductModalProps) {
  const [form, setForm] = useState<ProductFormData>(EMPTY_FORM);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const isSubmitting = createProduct.isPending || updateProduct.isPending;

  const initForm = (p: Product | null) => {
    if (p) {
      setForm({
        name: p.name,
        price: String(p.price),
        category: p.category,
        description: p.description,
        imageUrl: p.images[0] ?? "",
        imagePreview: p.images[0] ?? "",
        imageFile: null,
        stock: String(p.stock),
        sizes: p.sizes.join(", "),
      });
    } else {
      setForm(EMPTY_FORM);
    }
  };

  // Reset form when modal opens
  const handleOpenChange = (next: boolean) => {
    if (next) initForm(editTarget);
    else onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setForm((f) => ({
        ...f,
        imagePreview: objectUrl,
        imageFile: file,
        imageUrl: file.name,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price) return;
    const price = Number.parseFloat(form.price);
    const stock = Number.parseInt(form.stock, 10) || 0;
    const sizes = form.sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const data = {
      name: form.name,
      price,
      category: form.category,
      description: form.description,
      stock,
      sizes,
      imageFile: form.imageFile ?? undefined,
      imageUrl: form.imageFile ? undefined : form.imageUrl || undefined,
    };

    setUploadProgress(0);

    if (editTarget) {
      updateProduct.mutate(
        { id: editTarget.id, data },
        {
          onSuccess: () => {
            toast.success("Product updated successfully");
            onClose();
          },
          onError: () => toast.error("Failed to update product"),
        },
      );
    } else {
      createProduct.mutate(data, {
        onSuccess: () => {
          toast.success("Product added to store");
          onClose();
        },
        onError: () => toast.error("Failed to add product"),
      });
    }
    setUploadProgress(0);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="admin.product_modal.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-base uppercase tracking-widest">
            {editTarget ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <Label className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">
                Product Name
              </Label>
              <Input
                data-ocid="admin.product_modal.name_input"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Tailored Silk Blazer"
                className="font-body text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">
                Price (₹ INR)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-body text-sm text-muted-foreground">
                  ₹
                </span>
                <Input
                  data-ocid="admin.product_modal.price_input"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  placeholder="1250"
                  type="number"
                  className="font-body text-sm pl-7"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">
                Category
              </Label>
              <Select
                value={form.category}
                onValueChange={(val) =>
                  setForm((f) => ({ ...f, category: val as ProductCategory }))
                }
              >
                <SelectTrigger
                  className="font-body text-sm"
                  data-ocid="admin.product_modal.category_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="capitalize font-body text-sm"
                    >
                      {cat.replace("-", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">
                Sizes (comma separated)
              </Label>
              <Input
                data-ocid="admin.product_modal.sizes_input"
                value={form.sizes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, sizes: e.target.value }))
                }
                placeholder="S, M, L, XL"
                className="font-body text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">
                Stock Quantity
              </Label>
              <Input
                data-ocid="admin.product_modal.stock_input"
                value={form.stock}
                onChange={(e) =>
                  setForm((f) => ({ ...f, stock: e.target.value }))
                }
                placeholder="15"
                type="number"
                className="font-body text-sm"
              />
            </div>

            {/* Image Upload */}
            <div className="col-span-2 space-y-2">
              <Label className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">
                Product Image
              </Label>
              <button
                type="button"
                data-ocid="admin.product_modal.upload_button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-border/60 rounded-sm p-4 flex flex-col items-center gap-2 hover:border-accent/60 hover:bg-accent/5 transition-colors group"
              >
                <Upload
                  size={20}
                  className="text-muted-foreground group-hover:text-accent transition-colors"
                />
                <p className="font-body text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  Click to upload from device
                </p>
                <p className="font-body text-[10px] text-muted-foreground/60">
                  JPG, PNG, WEBP — max 5MB
                </p>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                data-ocid="admin.product_modal.image_file_input"
                onChange={handleFileChange}
              />
              {form.imagePreview && (
                <div className="relative mt-2 rounded-sm overflow-hidden border border-border/40 bg-muted">
                  <img
                    src={form.imagePreview}
                    alt="Product preview"
                    className="w-full h-40 object-cover"
                  />
                  <button
                    type="button"
                    aria-label="Remove image"
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        imagePreview: "",
                        imageUrl: "",
                        imageFile: null,
                      }))
                    }
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-foreground/80 flex items-center justify-center hover:bg-foreground transition-colors"
                  >
                    <X size={12} className="text-background" />
                  </button>
                </div>
              )}
              {isSubmitting && uploadProgress > 0 && (
                <div className="w-full bg-muted rounded-full h-1">
                  <div
                    className="bg-accent h-1 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
              <div className="flex items-center gap-2 mt-1">
                <div className="h-px flex-1 bg-border/40" />
                <span className="font-body text-[10px] text-muted-foreground uppercase tracking-widest">
                  or paste URL
                </span>
                <div className="h-px flex-1 bg-border/40" />
              </div>
              <Input
                data-ocid="admin.product_modal.image_url_input"
                value={
                  form.imagePreview.startsWith("blob:") ? "" : form.imageUrl
                }
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    imageUrl: e.target.value,
                    imagePreview: e.target.value,
                    imageFile: null,
                  }))
                }
                placeholder="https://… or /assets/generated/…"
                className="font-body text-sm"
              />
            </div>

            <div className="col-span-2 space-y-1.5">
              <Label className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">
                Description
              </Label>
              <Textarea
                data-ocid="admin.product_modal.description_textarea"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Describe the product…"
                rows={3}
                className="font-body text-sm resize-none"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="default"
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-[10px]"
              data-ocid="admin.product_modal.submit_button"
              disabled={isSubmitting || !form.name || !form.price}
              onClick={handleSubmit}
            >
              <ImagePlus size={13} />
              {isSubmitting
                ? "Saving…"
                : editTarget
                  ? "Save Changes"
                  : "Add Product"}
            </Button>
            <Button
              type="button"
              variant="outline"
              data-ocid="admin.product_modal.cancel_button"
              onClick={onClose}
              disabled={isSubmitting}
              className="uppercase tracking-widest text-[10px]"
            >
              Cancel
            </Button>
          </div>
        </div>
        <button
          type="button"
          aria-label="Close"
          data-ocid="admin.product_modal.close_button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

export default function Admin() {
  const { isAuthenticated, isLoading } = useAuth();
  const isAdmin = useIsAdmin();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const deleteProduct = useDeleteProduct();

  // Show loading state while auth initializes
  if (isLoading) {
    return (
      <div
        className="min-h-[80vh] flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <div className="space-y-3 text-center">
          <Skeleton className="h-12 w-12 rounded-full mx-auto" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <AdminLoginGate />;
  if (!isAdmin) return <AdminDeniedGate />;

  const openAddModal = () => {
    setEditTarget(null);
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditTarget(product);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="admin.page">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 bg-card border-r border-border/50 py-10 px-4 gap-1 flex-shrink-0">
          <div className="px-3 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingBag size={16} className="text-accent" />
              <span className="font-display text-xs uppercase tracking-widest text-foreground">
                SR Atliers
              </span>
            </div>
            <p className="font-body text-[10px] text-muted-foreground pl-6">
              Admin Panel
            </p>
          </div>
          {(["dashboard", "products", "orders"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              data-ocid={`admin.tab.${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-left transition-smooth font-body text-xs tracking-widest uppercase ${
                activeTab === tab
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              {tab === "dashboard" && <BarChart3 size={14} />}
              {tab === "products" && <Package size={14} />}
              {tab === "orders" && <ShoppingCart size={14} />}
              {tab}
            </button>
          ))}
        </aside>

        {/* Mobile Tabs */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 flex z-30">
          {(["dashboard", "products", "orders"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              data-ocid={`admin.mobile_tab.${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 font-body text-[10px] uppercase tracking-widest transition-smooth ${
                activeTab === tab ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {tab === "dashboard" && <BarChart3 size={16} />}
              {tab === "products" && <Package size={16} />}
              {tab === "orders" && <ShoppingCart size={16} />}
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto pb-20 lg:pb-0">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-2xl lg:text-3xl uppercase tracking-[0.12em]">
                  {activeTab === "dashboard" && "Dashboard"}
                  {activeTab === "products" && "Products"}
                  {activeTab === "orders" && "Orders"}
                </h1>
                <p className="font-body text-xs text-muted-foreground mt-1 tracking-wide">
                  SR Atliers — Store Management
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "dashboard" && <DashboardTab />}
              {activeTab === "products" && (
                <ProductsTab
                  onAdd={openAddModal}
                  onEdit={openEditModal}
                  onDelete={(id) => setDeleteConfirm(id)}
                />
              )}
              {activeTab === "orders" && <OrdersTab />}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Product Modal */}
      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editTarget={editTarget}
      />

      {/* Delete Confirm Dialog */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent
          className="max-w-sm text-center"
          data-ocid="admin.delete_modal.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-base uppercase tracking-widest">
              Delete Product?
            </DialogTitle>
          </DialogHeader>
          <p className="font-body text-sm text-muted-foreground mt-2 mb-6">
            This action cannot be undone. The product will be permanently
            removed from the store.
          </p>
          <div className="flex gap-3">
            <Button
              variant="destructive"
              className="flex-1 uppercase tracking-widest text-[10px]"
              data-ocid="admin.delete_modal.confirm_button"
              disabled={deleteProduct.isPending}
              onClick={() => {
                if (deleteConfirm) {
                  deleteProduct.mutate(deleteConfirm, {
                    onSuccess: () => {
                      toast.success("Product deleted");
                      setDeleteConfirm(null);
                    },
                    onError: () => {
                      toast.error("Failed to delete product");
                      setDeleteConfirm(null);
                    },
                  });
                }
              }}
            >
              {deleteProduct.isPending ? "Deleting…" : "Delete"}
            </Button>
            <Button
              variant="outline"
              className="flex-1 uppercase tracking-widest text-[10px]"
              data-ocid="admin.delete_modal.cancel_button"
              onClick={() => setDeleteConfirm(null)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
