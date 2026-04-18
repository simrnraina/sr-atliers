import List "mo:core/List";
import Time "mo:core/Time";
import CommonTypes "../types/common";
import ProductTypes "../types/products";

module {
  public type State = List.List<ProductTypes.ProductInternal>;

  public func toPublic(p : ProductTypes.ProductInternal) : ProductTypes.Product {
    {
      id = p.id;
      name = p.name;
      price = p.price;
      category = p.category;
      sizes = p.sizes;
      description = p.description;
      imageUrl = p.imageUrl;
      stock = p.stock;
      createdAt = p.createdAt;
    };
  };

  public func getAll(state : State) : [ProductTypes.Product] {
    state.map<ProductTypes.ProductInternal, ProductTypes.Product>(toPublic).toArray();
  };

  public func getById(state : State, id : CommonTypes.ProductId) : ?ProductTypes.Product {
    switch (state.find(func(p) { p.id == id })) {
      case (?p) ?toPublic(p);
      case null null;
    };
  };

  public func getByCategory(state : State, category : CommonTypes.Category) : [ProductTypes.Product] {
    state.filter(func(p) { p.category == category })
      .map<ProductTypes.ProductInternal, ProductTypes.Product>(toPublic)
      .toArray();
  };

  public func search(state : State, filter : ProductTypes.SearchFilter) : [ProductTypes.Product] {
    state.filter(func(p) {
      let matchesQuery = switch (filter.searchQuery) {
        case (?q) {
          let lower = q.toLower();
          p.name.toLower().contains(#text lower) or p.description.toLower().contains(#text lower);
        };
        case null true;
      };
      let matchesCategory = switch (filter.category) {
        case (?cat) p.category == cat;
        case null true;
      };
      let matchesMin = switch (filter.minPrice) {
        case (?min) p.price >= min;
        case null true;
      };
      let matchesMax = switch (filter.maxPrice) {
        case (?max) p.price <= max;
        case null true;
      };
      matchesQuery and matchesCategory and matchesMin and matchesMax;
    }).map<ProductTypes.ProductInternal, ProductTypes.Product>(toPublic).toArray();
  };

  public func create(
    state : State,
    nextId : Nat,
    input : ProductTypes.CreateProductInput,
    now : CommonTypes.Timestamp,
  ) : ProductTypes.Product {
    let product : ProductTypes.ProductInternal = {
      id = nextId;
      var name = input.name;
      var price = input.price;
      var category = input.category;
      var sizes = input.sizes;
      var description = input.description;
      var imageUrl = input.imageUrl;
      var stock = input.stock;
      createdAt = now;
    };
    state.add(product);
    toPublic(product);
  };

  public func update(
    state : State,
    id : CommonTypes.ProductId,
    input : ProductTypes.UpdateProductInput,
  ) : ?ProductTypes.Product {
    switch (state.find(func(p) { p.id == id })) {
      case null null;
      case (?p) {
        switch (input.name) { case (?v) p.name := v; case null () };
        switch (input.price) { case (?v) p.price := v; case null () };
        switch (input.category) { case (?v) p.category := v; case null () };
        switch (input.sizes) { case (?v) p.sizes := v; case null () };
        switch (input.description) { case (?v) p.description := v; case null () };
        switch (input.imageUrl) { case (?v) p.imageUrl := v; case null () };
        switch (input.stock) { case (?v) p.stock := v; case null () };
        ?toPublic(p);
      };
    };
  };

  public func delete(state : State, id : CommonTypes.ProductId) : Bool {
    let before = state.size();
    let filtered = state.filter(func(p) { p.id != id });
    if (filtered.size() == before) return false;
    state.clear();
    state.append(filtered);
    true;
  };

  public func updateStock(
    state : State,
    productId : CommonTypes.ProductId,
    size : CommonTypes.Size,
    quantity : Nat,
  ) : Bool {
    switch (state.find(func(p) { p.id == productId })) {
      case null false;
      case (?p) {
        let newStock : [(CommonTypes.Size, Nat)] = do {
          let existing = p.stock.filter(func(entry : (CommonTypes.Size, Nat)) : Bool { entry.0 != size });
          existing.concat([(size, quantity)]);
        };
        p.stock := newStock;
        true;
      };
    };
  };

  // ---- Sample data seeding ----
  public func seedSampleProducts(state : State, nextId : { var value : Nat }) {
    if (state.size() > 0) return; // already seeded

    let samples : [(Text, Nat, CommonTypes.Category, Text)] = [
      ("Silk Evening Gown", 42000, #NewArrivals, "A floor-length silk gown with a subtle sheen and an elegant silhouette, perfect for black-tie events."),
      ("Tailored Blazer", 28000, #BestSellers, "Sharp, structured blazer crafted from premium wool blend. A wardrobe essential for the modern professional."),
      ("Wide-Leg Trousers", 18500, #Trending, "Fluid wide-leg trousers in luxurious crepe fabric. Effortlessly chic and impeccably comfortable."),
      ("Cashmere Turtleneck", 22000, #BestSellers, "Ultra-soft cashmere turtleneck sweater in a refined ribbed knit. A timeless piece for every season."),
      ("Pleated Midi Skirt", 15000, #NewArrivals, "Elegant pleated midi skirt with a fluid drape. Transitions seamlessly from day to evening."),
      ("Structured Trench Coat", 55000, #Trending, "A heritage-inspired trench coat with modern proportions, crafted from water-resistant cotton gabardine."),
      ("Wrap Dress", 19500, #NewArrivals, "Sophisticated wrap dress in a delicate floral jacquard. Flattering silhouette with adjustable fit."),
      ("Cropped Leather Jacket", 48000, #BestSellers, "Impeccably cut cropped leather jacket with a minimal, luxurious finish. A statement investment piece."),
      ("Oversized Linen Shirt", 12000, #Trending, "Relaxed oversized linen shirt with a clean, contemporary cut. Versatile and effortlessly stylish."),
      ("Evening Sequin Top", 16500, #NewArrivals, "Sleek sequin top designed for glamorous evenings. Pairs beautifully with tailored trousers or a pencil skirt."),
    ];

    let allSizes : [CommonTypes.Size] = [#S, #M, #L, #XL];
    let defaultStock : [(CommonTypes.Size, Nat)] = [(#S, 10), (#M, 15), (#L, 12), (#XL, 8)];
    let now = Time.now();

    for ((pName, pPrice, pCategory, pDesc) in samples.values()) {
      let product : ProductTypes.ProductInternal = {
        id = nextId.value;
        var name = pName;
        var price = pPrice;
        var category = pCategory;
        var sizes = allSizes;
        var description = pDesc;
        var imageUrl = "";
        var stock = defaultStock;
        createdAt = now;
      };
      state.add(product);
      nextId.value += 1;
    };
  };
};
