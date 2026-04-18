import CommonTypes "common";

module {
  public type SizeStock = {
    size : CommonTypes.Size;
    quantity : Nat;
  };

  // Internal type — uses mutable fields for state
  public type ProductInternal = {
    id : CommonTypes.ProductId;
    var name : Text;
    var price : Nat;
    var category : CommonTypes.Category;
    var sizes : [CommonTypes.Size];
    var description : Text;
    var imageUrl : Text;
    var stock : [(CommonTypes.Size, Nat)];
    createdAt : CommonTypes.Timestamp;
  };

  // Shared/public type for API boundary (no mutable fields)
  public type Product = {
    id : CommonTypes.ProductId;
    name : Text;
    price : Nat;
    category : CommonTypes.Category;
    sizes : [CommonTypes.Size];
    description : Text;
    imageUrl : Text;
    stock : [(CommonTypes.Size, Nat)];
    createdAt : CommonTypes.Timestamp;
  };

  public type CreateProductInput = {
    name : Text;
    price : Nat;
    category : CommonTypes.Category;
    sizes : [CommonTypes.Size];
    description : Text;
    imageUrl : Text;
    stock : [(CommonTypes.Size, Nat)];
  };

  public type UpdateProductInput = {
    name : ?Text;
    price : ?Nat;
    category : ?CommonTypes.Category;
    sizes : ?[CommonTypes.Size];
    description : ?Text;
    imageUrl : ?Text;
    stock : ?[(CommonTypes.Size, Nat)];
  };

  public type SearchFilter = {
    searchQuery : ?Text;
    category : ?CommonTypes.Category;
    minPrice : ?Nat;
    maxPrice : ?Nat;
  };
};
