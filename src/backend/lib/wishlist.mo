import Map "mo:core/Map";
import CommonTypes "../types/common";

module {
  public type State = Map.Map<CommonTypes.UserId, [CommonTypes.ProductId]>;

  public func getWishlist(state : State, userId : CommonTypes.UserId) : [CommonTypes.ProductId] {
    switch (state.get(userId)) {
      case (?ids) ids;
      case null [];
    };
  };

  public func addToWishlist(
    state : State,
    userId : CommonTypes.UserId,
    productId : CommonTypes.ProductId,
  ) {
    let current = getWishlist(state, userId);
    let alreadyAdded = current.find(func(id) { id == productId });
    switch (alreadyAdded) {
      case (?_) (); // already in wishlist
      case null {
        state.add(userId, current.concat([productId]));
      };
    };
  };

  public func removeFromWishlist(
    state : State,
    userId : CommonTypes.UserId,
    productId : CommonTypes.ProductId,
  ) {
    let current = getWishlist(state, userId);
    let updated = current.filter(func(id) { id != productId });
    state.add(userId, updated);
  };
};
