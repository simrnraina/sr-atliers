import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CreditCard,
  Lock,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { createMockOrder, formatPrice } from "../lib/api";
import type { ShippingAddress } from "../types";

type Step = 1 | 2 | 3;

const SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 15;

const EMPTY_ADDRESS: ShippingAddress = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
};

const STEPS = [
  { id: 1 as Step, label: "Review", icon: ShoppingBag },
  { id: 2 as Step, label: "Shipping", icon: MapPin },
  { id: 3 as Step, label: "Payment", icon: CreditCard },
];

interface FieldDef {
  key: keyof ShippingAddress;
  label: string;
  placeholder: string;
  col?: "full";
}

const ADDRESS_FIELDS: FieldDef[] = [
  {
    key: "fullName",
    label: "Full Name",
    placeholder: "Alexandra Smith",
    col: "full",
  },
  {
    key: "street",
    label: "Address",
    placeholder: "123 Fashion Avenue",
    col: "full",
  },
  { key: "city", label: "City", placeholder: "New York" },
  { key: "state", label: "State / Province", placeholder: "NY" },
  { key: "zipCode", label: "ZIP / Postal Code", placeholder: "10001" },
  { key: "country", label: "Country", placeholder: "United States" },
];

function StepIndicator({ currentStep }: { currentStep: Step }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done = currentStep > step.id;
        const active = currentStep === step.id;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 text-xs font-body ${
                  done
                    ? "bg-accent text-accent-foreground"
                    : active
                      ? "bg-accent text-accent-foreground ring-2 ring-accent/30"
                      : "bg-muted text-muted-foreground"
                }`}
                data-ocid={`checkout.step_${step.id}.indicator`}
              >
                {done ? <Check size={12} strokeWidth={2.5} /> : step.id}
              </div>
              <span
                className={`font-body text-xs tracking-widest uppercase hidden sm:block ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-12 sm:w-16 h-px mx-3 transition-colors duration-300 ${
                  currentStep > step.id ? "bg-accent" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [address, setAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");

  const shipping = total >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const grandTotal = total + shipping;

  if (items.length === 0) {
    navigate({ to: "/cart" });
    return null;
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);
    if (!cardNumber || !cardExpiry || !cardCvc || !cardName) {
      setPaymentError("Please complete all payment fields.");
      return;
    }
    setIsProcessing(true);
    try {
      await new Promise((r) => setTimeout(r, 1800));
      const order = createMockOrder(items, address);
      try {
        sessionStorage.setItem(
          "sr_last_order",
          JSON.stringify({ items, address }),
        );
      } catch {
        // ignore storage errors
      }
      clearCart();
      navigate({ to: "/order-confirmation" });
      window.history.replaceState(
        null,
        "",
        `/order-confirmation?orderId=${order.id}`,
      );
    } catch {
      setPaymentError("Payment could not be processed. Please try again.");
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const summaryPanel = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-card border border-border/50 rounded-sm p-6 sticky top-28"
    >
      <h2 className="font-display text-sm uppercase tracking-wide mb-5">
        Summary
      </h2>
      <div className="space-y-2.5 mb-5">
        {items.map((item) => (
          <div
            key={`${item.product.id}-${item.selectedSize}`}
            className="flex items-center gap-3"
          >
            <div
              className="w-10 flex-shrink-0 overflow-hidden rounded-sm bg-muted"
              style={{ height: "48px" }}
            >
              <img
                src={item.product.images[0] ?? "/assets/images/placeholder.svg"}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-[11px] uppercase tracking-wide line-clamp-1">
                {item.product.name}
              </p>
              <p className="font-body text-[10px] text-muted-foreground mt-0.5">
                {item.selectedSize} · ×{item.quantity}
              </p>
            </div>
            <span className="font-body text-xs flex-shrink-0">
              {formatPrice(item.product.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      <Separator className="bg-border/50 mb-4" />
      <div className="space-y-2.5 text-sm font-body mb-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          {shipping === 0 ? (
            <span className="text-accent text-xs">Complimentary</span>
          ) : (
            <span>{formatPrice(shipping)}</span>
          )}
        </div>
      </div>
      <Separator className="bg-border/50 mb-4" />
      <div className="flex justify-between items-center">
        <span className="font-body text-sm uppercase tracking-wide">Total</span>
        <span className="font-body text-lg text-accent font-semibold">
          {formatPrice(grandTotal)}
        </span>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen" data-ocid="checkout.page">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl uppercase tracking-wide mb-8"
        >
          Checkout
        </motion.h1>

        <StepIndicator currentStep={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  data-ocid="checkout.review.section"
                >
                  <h2 className="font-display text-lg uppercase tracking-wide mb-6">
                    Review Your Order
                  </h2>
                  <div>
                    {items.map((item, i) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}`}
                        className="flex gap-4 py-5 border-b border-border/40 first:border-t first:border-t-border/40"
                        data-ocid={`checkout.order_item.${i + 1}`}
                      >
                        <div
                          className="w-16 rounded-sm overflow-hidden bg-muted flex-shrink-0"
                          style={{ height: "80px" }}
                        >
                          <img
                            src={
                              item.product.images[0] ??
                              "/assets/images/placeholder.svg"
                            }
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-sm uppercase tracking-wide line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="font-body text-xs text-muted-foreground mt-1">
                            Size: {item.selectedSize} · Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-body text-sm text-accent font-medium flex-shrink-0 pt-0.5">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-muted/30 rounded-sm p-4 mt-6 space-y-2">
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      {shipping === 0 ? (
                        <span className="text-accent">Complimentary</span>
                      ) : (
                        <span>{formatPrice(shipping)}</span>
                      )}
                    </div>
                    <Separator className="bg-border/50 my-2" />
                    <div className="flex justify-between font-body text-base font-medium">
                      <span>Total</span>
                      <span className="text-accent font-semibold">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    data-ocid="checkout.review.next_button"
                    className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs"
                    onClick={() => setStep(2)}
                  >
                    Continue to Shipping
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleAddressSubmit}
                  data-ocid="checkout.address.form"
                >
                  <h2 className="font-display text-lg uppercase tracking-wide mb-6">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ADDRESS_FIELDS.map(({ key, label, placeholder, col }) => (
                      <div
                        key={key}
                        className={col === "full" ? "sm:col-span-2" : ""}
                      >
                        <label
                          htmlFor={`field-${key}`}
                          className="block font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5"
                        >
                          {label}
                        </label>
                        <input
                          id={`field-${key}`}
                          type="text"
                          required
                          placeholder={placeholder}
                          value={address[key]}
                          onChange={(e) =>
                            setAddress((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            }))
                          }
                          data-ocid={`checkout.${key}.input`}
                          className="w-full bg-transparent border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-8">
                    <Button
                      type="button"
                      variant="outline"
                      size="default"
                      data-ocid="checkout.back_button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft size={14} />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      data-ocid="checkout.address.next_button"
                      className="bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </motion.form>
              )}

              {step === 3 && (
                <motion.form
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handlePayment}
                  data-ocid="checkout.payment.section"
                >
                  <h2 className="font-display text-lg uppercase tracking-wide mb-6">
                    Payment
                  </h2>

                  <div className="bg-muted/30 border border-border/40 rounded-sm p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">
                        Shipping To
                      </p>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="font-body text-[10px] uppercase tracking-widest text-accent hover:text-accent/80 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="font-body text-sm">{address.fullName}</p>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">
                      {address.street}, {address.city}, {address.state}{" "}
                      {address.zipCode}, {address.country}
                    </p>
                  </div>

                  <div className="border border-border/50 rounded-sm p-6 mb-6 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard size={16} className="text-accent" />
                      <p className="font-body text-sm font-medium">
                        Card Details
                      </p>
                      <Lock
                        size={12}
                        className="text-muted-foreground ml-auto"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="card-name"
                        className="block font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5"
                      >
                        Name on Card
                      </label>
                      <input
                        id="card-name"
                        type="text"
                        required
                        placeholder="Alexandra Smith"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        data-ocid="checkout.card_name.input"
                        className="w-full bg-transparent border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="card-number"
                        className="block font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5"
                      >
                        Card Number
                      </label>
                      <input
                        id="card-number"
                        type="text"
                        inputMode="numeric"
                        required
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        maxLength={19}
                        data-ocid="checkout.card_number.input"
                        className="w-full bg-transparent border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors font-mono tracking-wider"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="card-expiry"
                          className="block font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5"
                        >
                          Expiry Date
                        </label>
                        <input
                          id="card-expiry"
                          type="text"
                          inputMode="numeric"
                          required
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) =>
                            setCardExpiry(formatExpiry(e.target.value))
                          }
                          maxLength={5}
                          data-ocid="checkout.card_expiry.input"
                          className="w-full bg-transparent border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="card-cvc"
                          className="block font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5"
                        >
                          CVC
                        </label>
                        <input
                          id="card-cvc"
                          type="text"
                          inputMode="numeric"
                          required
                          placeholder="123"
                          value={cardCvc}
                          onChange={(e) =>
                            setCardCvc(
                              e.target.value.replace(/\D/g, "").slice(0, 4),
                            )
                          }
                          maxLength={4}
                          data-ocid="checkout.card_cvc.input"
                          className="w-full bg-transparent border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {paymentError && (
                    <div
                      className="flex items-start gap-2 bg-destructive/10 border border-destructive/30 rounded-sm px-4 py-3 mb-5"
                      data-ocid="checkout.payment.error_state"
                    >
                      <AlertCircle
                        size={14}
                        className="text-destructive mt-0.5 flex-shrink-0"
                      />
                      <p className="font-body text-xs text-destructive">
                        {paymentError}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="default"
                      data-ocid="checkout.payment.back_button"
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft size={14} />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      data-ocid="checkout.pay_button"
                      disabled={isProcessing}
                      className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs"
                    >
                      {isProcessing ? (
                        <span
                          className="flex items-center gap-2"
                          data-ocid="checkout.loading_state"
                        >
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Lock size={13} />
                          Pay Now — {formatPrice(grandTotal)}
                        </span>
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div>{summaryPanel}</div>
        </div>
      </div>
    </div>
  );
}
