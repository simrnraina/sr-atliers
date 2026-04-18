import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import ProductTypes "../types/products";
import ProductLib "../lib/products";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : ProductLib.State,
  nextProductId : { var value : Nat },
) {
  public query func getProducts() : async [ProductTypes.Product] {
    ProductLib.getAll(products);
  };

  public query func getProductById(id : CommonTypes.ProductId) : async ?ProductTypes.Product {
    ProductLib.getById(products, id);
  };

  public query func getProductsByCategory(category : CommonTypes.Category) : async [ProductTypes.Product] {
    ProductLib.getByCategory(products, category);
  };

  public query func searchProducts(
    searchQuery : ?Text,
    category : ?CommonTypes.Category,
    minPrice : ?Nat,
    maxPrice : ?Nat,
  ) : async [ProductTypes.Product] {
    ProductLib.search(products, { searchQuery; category; minPrice; maxPrice });
  };

  public shared ({ caller }) func createProduct(input : ProductTypes.CreateProductInput) : async ProductTypes.Product {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    // Input validation
    if (input.name.size() == 0) Runtime.trap("Validation: name cannot be empty");
    if (input.price == 0) Runtime.trap("Validation: price must be greater than zero");
    if (input.description.size() == 0) Runtime.trap("Validation: description cannot be empty");
    let id = nextProductId.value;
    nextProductId.value += 1;
    ProductLib.create(products, id, input, Time.now());
  };

  public shared ({ caller }) func updateProduct(
    id : CommonTypes.ProductId,
    input : ProductTypes.UpdateProductInput,
  ) : async ?ProductTypes.Product {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    // Validate optional fields if provided
    switch (input.name) {
      case (?n) { if (n.size() == 0) Runtime.trap("Validation: name cannot be empty") };
      case null {};
    };
    switch (input.price) {
      case (?p) { if (p == 0) Runtime.trap("Validation: price must be greater than zero") };
      case null {};
    };
    switch (input.description) {
      case (?d) { if (d.size() == 0) Runtime.trap("Validation: description cannot be empty") };
      case null {};
    };
    ProductLib.update(products, id, input);
  };

  public shared ({ caller }) func deleteProduct(id : CommonTypes.ProductId) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductLib.delete(products, id);
  };

  public shared ({ caller }) func updateStock(
    productId : CommonTypes.ProductId,
    size : CommonTypes.Size,
    quantity : Nat,
  ) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update stock");
    };
    ProductLib.updateStock(products, productId, size, quantity);
  };
};
