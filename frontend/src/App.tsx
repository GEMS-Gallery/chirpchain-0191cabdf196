import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, CircularProgress, Card, CardContent, IconButton } from '@mui/material';
import { ThumbUp, Repeat } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { backend } from 'declarations/backend';

type Tweet = {
  id: bigint;
  text: string;
  author: string;
  timestamp: bigint;
  likes: bigint;
  retweets: bigint;
};

function App() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const fetchedTweets = await backend.getTweets();
      setTweets(fetchedTweets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tweets:', error);
      setLoading(false);
    }
  };

  const onSubmit = async (data: { tweetText: string }) => {
    try {
      setLoading(true);
      const result = await backend.createTweet(data.tweetText, 'Anonymous');
      if ('ok' in result) {
        await fetchTweets();
        reset();
      } else {
        console.error('Error creating tweet:', result.err);
      }
    } catch (error) {
      console.error('Error creating tweet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: bigint) => {
    try {
      await backend.likeTweet(id);
      await fetchTweets();
    } catch (error) {
      console.error('Error liking tweet:', error);
    }
  };

  const handleRetweet = async (id: bigint) => {
    try {
      await backend.retweetTweet(id);
      await fetchTweets();
    } catch (error) {
      console.error('Error retweeting:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Twitter Clone
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('tweetText')}
          label="What's happening?"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Tweet
        </Button>
      </form>
      {loading ? (
        <CircularProgress />
      ) : (
        tweets.map((tweet) => (
          <Card key={tweet.id.toString()} sx={{ marginTop: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {tweet.author}
              </Typography>
              <Typography variant="body1">{tweet.text}</Typography>
              <Typography variant="caption" display="block">
                {new Date(Number(tweet.timestamp) / 1000000).toLocaleString()}
              </Typography>
              <IconButton onClick={() => handleLike(tweet.id)}>
                <ThumbUp />
              </IconButton>
              {tweet.likes.toString()}
              <IconButton onClick={() => handleRetweet(tweet.id)}>
                <Repeat />
              </IconButton>
              {tweet.retweets.toString()}
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}

export default App;
