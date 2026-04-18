import { c as createLucideIcon, f as useCart, h as useNavigate, r as reactExports, j as jsxRuntimeExports, k as formatPrice, a as Button, m as createMockOrder, l as ShoppingBag } from "./index-BU4uHDVH.js";
import { S as Separator } from "./separator-kC2LepTQ.js";
import { m as motion } from "./proxy-BQW_Dvzl.js";
import { A as AnimatePresence } from "./index-PGH7r6tF.js";
import { A as ArrowLeft } from "./arrow-left-BhcqkNER.js";
import { M as MapPin } from "./map-pin-BKk7EvVM.js";
import { C as Check } from "./check-Bts_O2Qz.js";
import "./index-B_wl7axP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
const SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 15;
const EMPTY_ADDRESS = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  country: "",
  zipCode: ""
};
const STEPS = [
  { id: 1, label: "Review", icon: ShoppingBag },
  { id: 2, label: "Shipping", icon: MapPin },
  { id: 3, label: "Payment", icon: CreditCard }
];
const ADDRESS_FIELDS = [
  {
    key: "fullName",
    label: "Full Name",
    placeholder: "Alexandra Smith",
    col: "full"
  },
  {
    key: "street",
    label: "Address",
    placeholder: "123 Fashion Avenue",
    col: "full"
  },
  { key: "city", label: "City", placeholder: "New York" },
  { key: "state", label: "State / Province", placeholder: "NY" },
  { key: "zipCode", label: "ZIP / Postal Code", placeholder: "10001" },
  { key: "country", label: "Country", placeholder: "United States" }
];
function StepIndicator({ currentStep }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0 mb-10", children: STEPS.map((step, i) => {
    const done = currentStep > step.id;
    const active = currentStep === step.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 text-xs font-body ${done ? "bg-accent text-accent-foreground" : active ? "bg-accent text-accent-foreground ring-2 ring-accent/30" : "bg-muted text-muted-foreground"}`,
            "data-ocid": `checkout.step_${step.id}.indicator`,
            children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12, strokeWidth: 2.5 }) : step.id
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `font-body text-xs tracking-widest uppercase hidden sm:block ${active ? "text-foreground" : "text-muted-foreground"}`,
            children: step.label
          }
        )
      ] }),
      i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-12 sm:w-16 h-px mx-3 transition-colors duration-300 ${currentStep > step.id ? "bg-accent" : "bg-border"}`
        }
      )
    ] }, step.id);
  }) });
}
function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState(1);
  const [address, setAddress] = reactExports.useState(EMPTY_ADDRESS);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [paymentError, setPaymentError] = reactExports.useState(null);
  const [cardNumber, setCardNumber] = reactExports.useState("");
  const [cardExpiry, setCardExpiry] = reactExports.useState("");
  const [cardCvc, setCardCvc] = reactExports.useState("");
  const [cardName, setCardName] = reactExports.useState("");
  const shipping = total >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const grandTotal = total + shipping;
  if (items.length === 0) {
    navigate({ to: "/cart" });
    return null;
  }
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };
  const handlePayment = async (e) => {
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
          JSON.stringify({ items, address })
        );
      } catch {
      }
      clearCart();
      navigate({ to: "/order-confirmation" });
      window.history.replaceState(
        null,
        "",
        `/order-confirmation?orderId=${order.id}`
      );
    } catch {
      setPaymentError("Payment could not be processed. Please try again.");
      setIsProcessing(false);
    }
  };
  const formatCardNumber = (v) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };
  const formatExpiry = (v) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };
  const summaryPanel = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.15 },
      className: "bg-card border border-border/50 rounded-sm p-6 sticky top-28",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm uppercase tracking-wide mb-5", children: "Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5 mb-5", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 flex-shrink-0 overflow-hidden rounded-sm bg-muted",
                  style: { height: "48px" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: item.product.images[0] ?? "/assets/images/placeholder.svg",
                      alt: item.product.name,
                      className: "w-full h-full object-cover"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-[11px] uppercase tracking-wide line-clamp-1", children: item.product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-[10px] text-muted-foreground mt-0.5", children: [
                  item.selectedSize,
                  " · ×",
                  item.quantity
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs flex-shrink-0", children: formatPrice(item.product.price * item.quantity) })
            ]
          },
          `${item.product.id}-${item.selectedSize}`
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/50 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 text-sm font-body mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(total) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
            shipping === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent text-xs", children: "Complimentary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(shipping) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/50 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm uppercase tracking-wide", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-lg text-accent font-semibold", children: formatPrice(grandTotal) })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen", "data-ocid": "checkout.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto px-6 lg:px-12 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.h1,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "font-display text-3xl uppercase tracking-wide mb-8",
        children: "Checkout"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { currentStep: step }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20 },
            transition: { duration: 0.3 },
            "data-ocid": "checkout.review.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg uppercase tracking-wide mb-6", children: "Review Your Order" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex gap-4 py-5 border-b border-border/40 first:border-t first:border-t-border/40",
                  "data-ocid": `checkout.order_item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-16 rounded-sm overflow-hidden bg-muted flex-shrink-0",
                        style: { height: "80px" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: item.product.images[0] ?? "/assets/images/placeholder.svg",
                            alt: item.product.name,
                            className: "w-full h-full object-cover"
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm uppercase tracking-wide line-clamp-1", children: item.product.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground mt-1", children: [
                        "Size: ",
                        item.selectedSize,
                        " · Qty: ",
                        item.quantity
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-accent font-medium flex-shrink-0 pt-0.5", children: formatPrice(item.product.price * item.quantity) })
                  ]
                },
                `${item.product.id}-${item.selectedSize}`
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-sm p-4 mt-6 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-body text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(total) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-body text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
                  shipping === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Complimentary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(shipping) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/50 my-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-body text-base font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-semibold", children: formatPrice(grandTotal) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  "data-ocid": "checkout.review.next_button",
                  className: "mt-8 bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs",
                  onClick: () => setStep(2),
                  children: "Continue to Shipping"
                }
              )
            ]
          },
          "step1"
        ),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.form,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20 },
            transition: { duration: 0.3 },
            onSubmit: handleAddressSubmit,
            "data-ocid": "checkout.address.form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg uppercase tracking-wide mb-6", children: "Shipping Information" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: ADDRESS_FIELDS.map(({ key, label, placeholder, col }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: col === "full" ? "sm:col-span-2" : "",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: `field-${key}`,
                        className: "block font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5",
                        children: label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: `field-${key}`,
                        type: "text",
                        required: true,
                        placeholder,
                        value: address[key],
                        onChange: (e) => setAddress((prev) => ({
                          ...prev,
                          [key]: e.target.value
                        })),
                        "data-ocid": `checkout.${key}.input`,
                        className: "w-full bg-transparent border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors"
                      }
                    )
                  ]
                },
                key
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "default",
                    "data-ocid": "checkout.back_button",
                    onClick: () => setStep(1),
                    className: "flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
                      "Back"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    size: "lg",
                    "data-ocid": "checkout.address.next_button",
                    className: "bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs",
                    children: "Continue to Payment"
                  }
                )
              ] })
            ]
          },
          "step2"
        ),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.form,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20 },
            transition: { duration: 0.3 },
            onSubmit: handlePayment,
            "data-ocid": "checkout.payment.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg uppercase tracking-wide mb-6", children: "Payment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 border border-border/40 rounded-sm p-4 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[10px] uppercase tracking-widest text-muted-foreground", children: "Shipping To" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setStep(2),
                      className: "font-body text-[10px] uppercase tracking-widest text-accent hover:text-accent/80 transition-colors",
                      children: "Edit"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm", children: address.fullName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground mt-0.5", children: [
                  address.street,
                  ", ",
                  address.city,
                  ", ",
                  address.state,
                  " ",
                  address.zipCode,
                  ", ",
                  address.country
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border/50 rounded-sm p-6 mb-6 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 16, className: "text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm font-medium", children: "Card Details" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Lock,
                    {
                      size: 12,
                      className: "text-muted-foreground ml-auto"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "card-name",
                      className: "block font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5",
                      children: "Name on Card"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "card-name",
                      type: "text",
                      required: true,
                      placeholder: "Alexandra Smith",
                      value: cardName,
                      onChange: (e) => setCardName(e.target.value),
                      "data-ocid": "checkout.card_name.input",
                      className: "w-full bg-transparent border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "card-number",
                      className: "block font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5",
                      children: "Card Number"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "card-number",
                      type: "text",
                      inputMode: "numeric",
                      required: true,
                      placeholder: "4242 4242 4242 4242",
                      value: cardNumber,
                      onChange: (e) => setCardNumber(formatCardNumber(e.target.value)),
                      maxLength: 19,
                      "data-ocid": "checkout.card_number.input",
                      className: "w-full bg-transparent border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors font-mono tracking-wider"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "card-expiry",
                        className: "block font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5",
                        children: "Expiry Date"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "card-expiry",
                        type: "text",
                        inputMode: "numeric",
                        required: true,
                        placeholder: "MM/YY",
                        value: cardExpiry,
                        onChange: (e) => setCardExpiry(formatExpiry(e.target.value)),
                        maxLength: 5,
                        "data-ocid": "checkout.card_expiry.input",
                        className: "w-full bg-transparent border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "card-cvc",
                        className: "block font-body text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5",
                        children: "CVC"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "card-cvc",
                        type: "text",
                        inputMode: "numeric",
                        required: true,
                        placeholder: "123",
                        value: cardCvc,
                        onChange: (e) => setCardCvc(
                          e.target.value.replace(/\D/g, "").slice(0, 4)
                        ),
                        maxLength: 4,
                        "data-ocid": "checkout.card_cvc.input",
                        className: "w-full bg-transparent border border-border rounded-sm px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-accent transition-colors"
                      }
                    )
                  ] })
                ] })
              ] }),
              paymentError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-start gap-2 bg-destructive/10 border border-destructive/30 rounded-sm px-4 py-3 mb-5",
                  "data-ocid": "checkout.payment.error_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CircleAlert,
                      {
                        size: 14,
                        className: "text-destructive mt-0.5 flex-shrink-0"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-destructive", children: paymentError })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "default",
                    "data-ocid": "checkout.payment.back_button",
                    onClick: () => setStep(2),
                    className: "flex items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
                      "Back"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    size: "lg",
                    "data-ocid": "checkout.pay_button",
                    disabled: isProcessing,
                    className: "flex-1 bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs",
                    children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "flex items-center gap-2",
                        "data-ocid": "checkout.loading_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" }),
                          "Processing..."
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 13 }),
                      "Pay Now — ",
                      formatPrice(grandTotal)
                    ] })
                  }
                )
              ] })
            ]
          },
          "step3"
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: summaryPanel })
    ] })
  ] }) });
}
export {
  Checkout as default
};
