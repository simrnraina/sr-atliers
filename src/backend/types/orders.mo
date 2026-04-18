import CommonTypes "common";

module {
  public type OrderItem = {
    productId : CommonTypes.ProductId;
    productName : Text;
    size : CommonTypes.Size;
    quantity : Nat;
    unitPrice : Nat;
  };

  // Internal type — uses mutable fields for status updates
  public type OrderInternal = {
    id : CommonTypes.OrderId;
    userId : CommonTypes.UserId;
    items : [OrderItem];
    shippingAddress : CommonTypes.ShippingAddress;
    total : Nat;
    var status : CommonTypes.OrderStatus;
    stripePaymentId : Text;
    createdAt : CommonTypes.Timestamp;
  };

  // Shared/public type for API boundary (no mutable fields)
  public type Order = {
    id : CommonTypes.OrderId;
    userId : CommonTypes.UserId;
    items : [OrderItem];
    shippingAddress : CommonTypes.ShippingAddress;
    total : Nat;
    status : CommonTypes.OrderStatus;
    stripePaymentId : Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type CreateOrderInput = {
    items : [OrderItem];
    shippingAddress : CommonTypes.ShippingAddress;
    stripePaymentId : Text;
  };
};
