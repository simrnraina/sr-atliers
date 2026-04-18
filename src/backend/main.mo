import Map "mo:core/Map";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Migration "migration";

import CommonTypes "types/common";
import ProductTypes "types/products";
import CartTypes "types/cart";
import OrderTypes "types/orders";
import NewsletterTypes "types/newsletter";

import ProductLib "lib/products";
import MixinProducts "mixins/products-api";
import MixinCart "mixins/cart-api";
import MixinWishlist "mixins/wishlist-api";
import MixinOrders "mixins/orders-api";
import MixinAdmin "mixins/admin-api";
import MixinNewsletter "mixins/newsletter-api";

(with migration = Migration.run)
actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage infrastructure
  include MixinObjectStorage();

  // Domain state
  let products : List.List<ProductTypes.ProductInternal> = List.empty();
  let nextProductId = { var value : Nat = 1 };

  let carts : Map.Map<CommonTypes.UserId, [CartTypes.CartItem]> = Map.empty();
  let wishlists : Map.Map<CommonTypes.UserId, [CommonTypes.ProductId]> = Map.empty();

  let orders : List.List<OrderTypes.OrderInternal> = List.empty();
  let nextOrderId = { var value : Nat = 1 };

  let subscriptions : List.List<NewsletterTypes.NewsletterSubscription> = List.empty();

  // Seed sample products on first canister start (idempotent — skips if already seeded)
  ProductLib.seedSampleProducts(products, nextProductId);

  // Mixin includes
  include MixinProducts(accessControlState, products, nextProductId);
  include MixinCart(accessControlState, carts);
  include MixinWishlist(accessControlState, wishlists);
  include MixinOrders(accessControlState, orders, nextOrderId, carts);
  include MixinAdmin(accessControlState, products, orders);
  include MixinNewsletter(accessControlState, subscriptions);
};
