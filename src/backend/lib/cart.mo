import Map "mo:core/Map";
import CommonTypes "../types/common";
import CartTypes "../types/cart";

module {
  public type State = Map.Map<CommonTypes.UserId, [CartTypes.CartItem]>;

  public func getCart(state : State, userId : CommonTypes.UserId) : [CartTypes.CartItem] {
    switch (state.get(userId)) {
      case (?items) items;
      case null [];
    };
  };

  public func addToCart(
    state : State,
    userId : CommonTypes.UserId,
    productId : CommonTypes.ProductId,
    size : CommonTypes.Size,
    quantity : Nat,
  ) {
    let current = getCart(state, userId);
    // If same product+size exists, increase quantity
    let existing = current.find(func(item) {
      item.productId == productId and item.size == size
    });
    let updated : [CartTypes.CartItem] = switch (existing) {
      case (?item) {
        current.map(func(i : CartTypes.CartItem) : CartTypes.CartItem {
          if (i.productId == productId and i.size == size) {
            { i with quantity = i.quantity + quantity }
          } else i
        });
      };
      case null {
        current.concat([{ productId; size; quantity }]);
      };
    };
    state.add(userId, updated);
  };

  public func removeFromCart(
    state : State,
    userId : CommonTypes.UserId,
    productId : CommonTypes.ProductId,
    size : CommonTypes.Size,
  ) {
    let current = getCart(state, userId);
    let updated = current.filter(func(item) {
      not (item.productId == productId and item.size == size)
    });
    state.add(userId, updated);
  };

  public func updateCartQuantity(
    state : State,
    userId : CommonTypes.UserId,
    productId : CommonTypes.ProductId,
    size : CommonTypes.Size,
    quantity : Nat,
  ) {
    let current = getCart(state, userId);
    let updated = if (quantity == 0) {
      current.filter(func(item) {
        not (item.productId == productId and item.size == size)
      });
    } else {
      current.map(func(item : CartTypes.CartItem) : CartTypes.CartItem {
        if (item.productId == productId and item.size == size) {
          { item with quantity }
        } else item
      });
    };
    state.add(userId, updated);
  };

  public func clearCart(state : State, userId : CommonTypes.UserId) {
    state.add(userId, []);
  };
};
