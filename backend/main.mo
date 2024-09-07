import Array "mo:base/Array";
import Result "mo:base/Result";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Text "mo:base/Text";

actor {
  type Tweet = {
    id: Nat;
    text: Text;
    author: Text;
    timestamp: Int;
    likes: Nat;
    retweets: Nat;
  };

  stable var tweets : [Tweet] = [];
  stable var nextTweetId : Nat = 0;

  public func createTweet(text: Text, author: Text) : async Result.Result<Tweet, Text> {
    let tweet : Tweet = {
      id = nextTweetId;
      text = text;
      author = author;
      timestamp = Time.now();
      likes = 0;
      retweets = 0;
    };
    tweets := Array.append(tweets, [tweet]);
    nextTweetId += 1;
    #ok(tweet)
  };

  public query func getTweets() : async [Tweet] {
    Array.reverse(tweets)
  };

  public func likeTweet(id: Nat) : async Result.Result<(), Text> {
    let index = Array.indexOf<Tweet>({ id = id; text = ""; author = ""; timestamp = 0; likes = 0; retweets = 0 }, tweets, func(a, b) { a.id == b.id });
    switch (index) {
      case null { #err("Tweet not found") };
      case (?i) {
        let updatedTweet = {
          id = tweets[i].id;
          text = tweets[i].text;
          author = tweets[i].author;
          timestamp = tweets[i].timestamp;
          likes = tweets[i].likes + 1;
          retweets = tweets[i].retweets;
        };
        tweets := Array.tabulate<Tweet>(tweets.size(), func (j) {
          if (j == i) { updatedTweet } else { tweets[j] }
        });
        #ok(())
      };
    }
  };

  public func retweetTweet(id: Nat) : async Result.Result<(), Text> {
    let index = Array.indexOf<Tweet>({ id = id; text = ""; author = ""; timestamp = 0; likes = 0; retweets = 0 }, tweets, func(a, b) { a.id == b.id });
    switch (index) {
      case null { #err("Tweet not found") };
      case (?i) {
        let updatedTweet = {
          id = tweets[i].id;
          text = tweets[i].text;
          author = tweets[i].author;
          timestamp = tweets[i].timestamp;
          likes = tweets[i].likes;
          retweets = tweets[i].retweets + 1;
        };
        tweets := Array.tabulate<Tweet>(tweets.size(), func (j) {
          if (j == i) { updatedTweet } else { tweets[j] }
        });
        #ok(())
      };
    }
  };
}
