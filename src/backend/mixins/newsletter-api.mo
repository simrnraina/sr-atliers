import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import NewsletterTypes "../types/newsletter";
import NewsletterLib "../lib/newsletter";

mixin (
  accessControlState : AccessControl.AccessControlState,
  subscriptions : NewsletterLib.State,
) {
  public shared ({ caller }) func subscribeNewsletter(email : Text) : async () {
    NewsletterLib.subscribe(subscriptions, email, Time.now());
  };

  public shared query ({ caller }) func getNewsletterSubscribers() : async [NewsletterTypes.NewsletterSubscription] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view newsletter subscribers");
    };
    NewsletterLib.getAll(subscriptions);
  };
};
