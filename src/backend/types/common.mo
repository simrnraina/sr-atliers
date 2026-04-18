module {
  public type UserId = Principal;
  public type Timestamp = Int;
  public type ProductId = Nat;
  public type OrderId = Nat;

  public type Size = { #S; #M; #L; #XL };

  public type Category = {
    #NewArrivals;
    #Trending;
    #BestSellers;
  };

  public type OrderStatus = {
    #Pending;
    #Processing;
    #Shipped;
    #Delivered;
  };

  public type ShippingAddress = {
    fullName : Text;
    addressLine1 : Text;
    addressLine2 : Text;
    city : Text;
    state : Text;
    postalCode : Text;
    country : Text;
    phone : Text;
  };

  public type DashboardStats = {
    totalProducts : Nat;
    totalOrders : Nat;
    totalRevenue : Nat;
  };
};
