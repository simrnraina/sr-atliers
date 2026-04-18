import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import CartTypes "../types/cart";
import CartLib "../lib/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  carts : CartLib.State,
) {
  public shared query ({ caller }) func getCart() : async [CartTypes.CartItem] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.getCart(carts, caller);
  };

  public shared ({ caller }) func addToCart(
    productId : CommonTypes.ProductId,
    size : CommonTypes.Size,
    quantity : Nat,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.addToCart(carts, caller, productId, size, quantity);
  };

  public shared ({ caller }) func removeFromCart(
    productId : CommonTypes.ProductId,
    size : CommonTypes.Size,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.removeFromCart(carts, caller, productId, size);
  };

  public shared ({ caller }) func updateCartQuantity(
    productId : CommonTypes.ProductId,
    size : CommonTypes.Size,
    quantity : Nat,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.updateCartQuantity(carts, caller, productId, size, quantity);
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.clearCart(carts, caller);
  };
};
