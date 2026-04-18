import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import OrderTypes "../types/orders";
import OrderLib "../lib/orders";
import CartLib "../lib/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : OrderLib.State,
  nextOrderId : { var value : Nat },
  carts : CartLib.State,
) {
  public shared ({ caller }) func createOrder(input : OrderTypes.CreateOrderInput) : async OrderTypes.Order {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be a registered user");
    };
    if (input.items.size() == 0) {
      Runtime.trap("Validation: order must have at least one item");
    };
    let id = nextOrderId.value;
    nextOrderId.value += 1;
    let order = OrderLib.create(orders, id, caller, input, Time.now());
    CartLib.clearCart(carts, caller);
    order;
  };

  public shared query ({ caller }) func getMyOrders() : async [OrderTypes.Order] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be a registered user");
    };
    OrderLib.getByUser(orders, caller);
  };

  public shared query ({ caller }) func getOrderById(id : CommonTypes.OrderId) : async ?OrderTypes.Order {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be a registered user");
    };
    let result = OrderLib.getById(orders, id);
    // Users can only see their own orders; admins can see all
    switch (result) {
      case (?order) {
        let isOwner = Principal.equal(order.userId, caller);
        let isAdminCaller = switch (accessControlState.userRoles.get(caller)) {
          case (?(#admin)) true;
          case (_) false;
        };
        if (isOwner or isAdminCaller) {
          ?order;
        } else {
          Runtime.trap("Unauthorized: Cannot view another user's order");
        };
      };
      case null null;
    };
  };

  public shared query ({ caller }) func getAllOrders() : async [OrderTypes.Order] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    OrderLib.getAll(orders);
  };

  public shared ({ caller }) func updateOrderStatus(
    id : CommonTypes.OrderId,
    status : CommonTypes.OrderStatus,
  ) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrderLib.updateStatus(orders, id, status);
  };
};
