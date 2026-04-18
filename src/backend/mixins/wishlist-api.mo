import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import WishlistLib "../lib/wishlist";

mixin (
  accessControlState : AccessControl.AccessControlState,
  wishlists : WishlistLib.State,
) {
  public shared query ({ caller }) func getWishlist() : async [CommonTypes.ProductId] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    WishlistLib.getWishlist(wishlists, caller);
  };

  public shared ({ caller }) func addToWishlist(productId : CommonTypes.ProductId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    WishlistLib.addToWishlist(wishlists, caller, productId);
  };

  public shared ({ caller }) func removeFromWishlist(productId : CommonTypes.ProductId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    WishlistLib.removeFromWishlist(wishlists, caller, productId);
  };
};
