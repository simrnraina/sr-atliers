import List "mo:core/List";
import Principal "mo:core/Principal";
import CommonTypes "../types/common";
import OrderTypes "../types/orders";

module {
  public type State = List.List<OrderTypes.OrderInternal>;

  public func toPublic(o : OrderTypes.OrderInternal) : OrderTypes.Order {
    {
      id = o.id;
      userId = o.userId;
      items = o.items;
      shippingAddress = o.shippingAddress;
      total = o.total;
      status = o.status;
      stripePaymentId = o.stripePaymentId;
      createdAt = o.createdAt;
    };
  };

  public func create(
    state : State,
    nextId : Nat,
    userId : CommonTypes.UserId,
    input : OrderTypes.CreateOrderInput,
    now : CommonTypes.Timestamp,
  ) : OrderTypes.Order {
    let total = input.items.foldLeft(
      0 : Nat,
      func(acc : Nat, item : OrderTypes.OrderItem) : Nat { acc + item.unitPrice * item.quantity },
    );
    let order : OrderTypes.OrderInternal = {
      id = nextId;
      userId;
      items = input.items;
      shippingAddress = input.shippingAddress;
      total;
      var status = #Pending;
      stripePaymentId = input.stripePaymentId;
      createdAt = now;
    };
    state.add(order);
    toPublic(order);
  };

  public func getByUser(state : State, userId : CommonTypes.UserId) : [OrderTypes.Order] {
    state.filter(func(o) {
      Principal.equal(o.userId, userId)
    }).map<OrderTypes.OrderInternal, OrderTypes.Order>(toPublic).toArray();
  };

  public func getById(state : State, orderId : CommonTypes.OrderId) : ?OrderTypes.Order {
    switch (state.find(func(o) { o.id == orderId })) {
      case (?o) ?toPublic(o);
      case null null;
    };
  };

  public func getAll(state : State) : [OrderTypes.Order] {
    state.map<OrderTypes.OrderInternal, OrderTypes.Order>(toPublic).toArray();
  };

  public func updateStatus(
    state : State,
    orderId : CommonTypes.OrderId,
    status : CommonTypes.OrderStatus,
  ) : Bool {
    switch (state.find(func(o) { o.id == orderId })) {
      case null false;
      case (?o) {
        o.status := status;
        true;
      };
    };
  };
};
