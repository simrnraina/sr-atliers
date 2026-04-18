import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import OrderTypes "../types/orders";
import ProductLib "../lib/products";
import OrderLib "../lib/orders";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : ProductLib.State,
  orders : OrderLib.State,
) {
  // Returns whether the caller is registered as admin — safe for any caller including anonymous
  public shared query ({ caller }) func isAdmin() : async Bool {
    if (caller.isAnonymous()) return false;
    switch (accessControlState.userRoles.get(caller)) {
      case (?(#admin)) true;
      case (_) false;
    };
  };

  public shared query ({ caller }) func getDashboardStats() : async CommonTypes.DashboardStats {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view dashboard stats");
    };
    let totalProducts = products.size();
    let allOrders = OrderLib.getAll(orders);
    let totalOrders = allOrders.size();
    let totalRevenue = allOrders.foldLeft(0 : Nat, func(acc : Nat, o : OrderTypes.Order) : Nat { acc + o.total });
    { totalProducts; totalOrders; totalRevenue };
  };
};
