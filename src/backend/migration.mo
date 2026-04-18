import List "mo:core/List";
import Map "mo:core/Map";
import ProductTypes "types/products";
import CommonTypes "types/common";
import CartTypes "types/cart";
import OrderTypes "types/orders";
import NewsletterTypes "types/newsletter";

module {
  // Old types (copied from .old/src/backend/types/products.mo)
  // ExternalBlob was Storage.ExternalBlob = Blob
  type OldProductInternal = {
    id : CommonTypes.ProductId;
    var name : Text;
    var price : Nat;
    var category : CommonTypes.Category;
    var sizes : [CommonTypes.Size];
    var description : Text;
    var imageBlob : Blob;   // was Storage.ExternalBlob = Blob
    var stock : [(CommonTypes.Size, Nat)];
    createdAt : CommonTypes.Timestamp;
  };

  type OldActor = {
    products : List.List<OldProductInternal>;
    nextProductId : { var value : Nat };
    carts : Map.Map<CommonTypes.UserId, [CartTypes.CartItem]>;
    wishlists : Map.Map<CommonTypes.UserId, [CommonTypes.ProductId]>;
    orders : List.List<OrderTypes.OrderInternal>;
    nextOrderId : { var value : Nat };
    subscriptions : List.List<NewsletterTypes.NewsletterSubscription>;
  };

  type NewActor = {
    products : List.List<ProductTypes.ProductInternal>;
    nextProductId : { var value : Nat };
    carts : Map.Map<CommonTypes.UserId, [CartTypes.CartItem]>;
    wishlists : Map.Map<CommonTypes.UserId, [CommonTypes.ProductId]>;
    orders : List.List<OrderTypes.OrderInternal>;
    nextOrderId : { var value : Nat };
    subscriptions : List.List<NewsletterTypes.NewsletterSubscription>;
  };

  public func run(old : OldActor) : NewActor {
    // Migrate each product: drop imageBlob, add imageUrl defaulting to ""
    let products = old.products.map<OldProductInternal, ProductTypes.ProductInternal>(
      func(p) {
        {
          id = p.id;
          var name = p.name;
          var price = p.price;
          var category = p.category;
          var sizes = p.sizes;
          var description = p.description;
          var imageUrl = "";
          var stock = p.stock;
          createdAt = p.createdAt;
        };
      }
    );
    {
      products;
      nextProductId = old.nextProductId;
      carts = old.carts;
      wishlists = old.wishlists;
      orders = old.orders;
      nextOrderId = old.nextOrderId;
      subscriptions = old.subscriptions;
    };
  };
};
