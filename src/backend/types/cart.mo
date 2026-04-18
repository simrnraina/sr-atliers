import CommonTypes "common";

module {
  public type CartItem = {
    productId : CommonTypes.ProductId;
    size : CommonTypes.Size;
    quantity : Nat;
  };

  public type Cart = {
    userId : CommonTypes.UserId;
    items : [CartItem];
  };
};
