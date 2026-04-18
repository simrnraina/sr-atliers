import CommonTypes "common";

module {
  public type NewsletterSubscription = {
    email : Text;
    subscribedAt : CommonTypes.Timestamp;
  };
};
