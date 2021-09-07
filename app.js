$(document).ready(() => {
   const $app = $('#app');
   $('<div id="feed">').appendTo($app);
 
   const $button = $('<button id="reload">');
   $button.text('Update Feed').appendTo('header');
   window.visitor = '';
 
   $('#visitor').on('submit', e => {
     e.preventDefault();
     $('#feed').empty();
     visitor = $('#visitor-name').val();
     const message = $('#visitor-message').val();
 
     writeTweet(message);
     renderFeed();
   });
 
   const renderFeed = user => {
     let stream = user ? streams.users[user] : streams.home;
     let index = stream.length - 1; // start at end of array
 
     while (index >= 0) {
       let tweet = stream[index],
       date = tweet.created_at,
       photoUrl = users.includes(tweet.user) ? `./assets/images/${tweet.user}.jpeg`
         : `./assets/images/incognito.jpeg`;
 
       let tweetHtml = `<div class="tweet">
         <div class="profile">
           <img class="profile-photo" src="${photoUrl}">
           <span class="username">${tweet.user}</span>
         </div>
         <p class="message">${tweet.message}</p>
         <section class="engage">
         <time datetime=${date.toISOString()} class="timestamp timeago">${date}</time>
           <section class="engage-icons">
             <i class="icon comment far fa-comment-dots"></i>
             <i class="icon retweet fas fa-retweet"></i>
             <i class="icon like far fa-thumbs-up"></i>
             <i class="icon share fas fa-share-square"></i>
           </section>
         </section>
       </div>`;
 
       $(tweetHtml).appendTo('#feed');
       index -= 1; // count down -- last tweet will be zeroth element
     }
     // update the time display
     $('time.timeago').timeago();
 
     const handleUsernameClick = e => {
       $('#feed').empty();
       let user = e.target.innerText;
       renderFeed(user);
       $button.text('Back');
       $button.on('click', function () {
         $button.text('Update Feed');
         $('#feed').empty(); // clear out #feed container
         renderFeed();
       });
     };
     $('.username').on('click', handleUsernameClick);
   };
 
   renderFeed();
 
   $button.on('click', () => {
     $('#feed').empty(); // clear out #feed container
     renderFeed();
   });
 });