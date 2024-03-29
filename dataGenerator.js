// Data Structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.users.shawndrost = [];
streams.users.sharksforcheap = [];
streams.users.mracus = [];
streams.users.douglascalhoun = [];
window.users = Object.keys(streams.users);

// utility function for adding tweets to our data structures
const addTweet = newTweet => {
  const username = newTweet.user;
  streams.users[username].push(newTweet);
  streams.home.push(newTweet);
};

// utility function
const randomElement = function(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
const opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
const verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
const objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
const nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
const tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

const randomMessage = () => {
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
const generateRandomTweet = () => {
  const tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  tweet.profilePhotoURL = `./assets/images/${tweet.user}.jpeg`;
  addTweet(tweet);
};

for (let i = 0; i < 10; i++) {
  generateRandomTweet();
}

const scheduleNextTweet = () => {
  generateRandomTweet();
  setTimeout(scheduleNextTweet, Math.random() * 1500);
};
scheduleNextTweet();

// utility function for letting visitors add a tweet
const writeTweet = message => {
  if (!visitor) {
    throw new Error('set the global visitor property!');
  }
  if (!streams.users[visitor]) {
    streams.users[visitor] = [];
  }

  const tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  tweet.created_at = new Date();
  tweet.photoURL = './assets/img/ski_mask.jpeg';
  addTweet(tweet);
};