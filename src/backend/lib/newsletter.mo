import List "mo:core/List";
import CommonTypes "../types/common";
import NewsletterTypes "../types/newsletter";

module {
  public type State = List.List<NewsletterTypes.NewsletterSubscription>;

  public func subscribe(
    state : State,
    email : Text,
    now : CommonTypes.Timestamp,
  ) {
    // Prevent duplicate subscriptions
    let existing = state.find(func(s) { s.email == email });
    switch (existing) {
      case (?_) (); // already subscribed
      case null {
        state.add({ email; subscribedAt = now });
      };
    };
  };

  public func getAll(state : State) : [NewsletterTypes.NewsletterSubscription] {
    state.toArray();
  };
};
