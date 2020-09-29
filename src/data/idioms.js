const idoms = [
  { idiom: "A blessing in disguise", meanging: "a good thing that seemed bad at first", usage: "as part of a sentence"},
  { idiom: "A dime a dozen", meanging: "Something common", usage: "as part of a sentence"},
  { idiom: "Beat around the bush", meanging: "Avoid saying what you mean, usually because it is uncomfortable", usage: "as part of a sentence"},
  { idiom: "Better late than never", meanging: "Better to arrive late than not to come at all", usage: "by itself"},
  { idiom: "Bite the bullet", meanging: "To get something over with because it is inevitable", usage: "as part of a sentence"},
  { idiom: "Break a leg", meanging: "Good luck", usage: "by itself"},
  { idiom: "Call it a day", meanging: "Stop working on something", usage: "as part of a sentence"},
  { idiom: "Cut somebody some slack", meanging: "Don't be so critical", usage: "as part of a sentence"},
  { idiom: "Cutting corners", meanging: "Doing something poorly in order to save time or money", usage: "as part of a sentence"},
  { idiom: "Easy does it", meanging: "Slow down", usage: "by itself"},
  { idiom: "Get out of hand", meanging: "Get out of control", usage: "as part of a sentence"},
  { idiom: "Get something out of your system", meanging: "Do the thing you've been wanting to do so you can move on", usage: "as part of a sentence"},
  { idiom: "Get your act together", meanging: "Work better or leave", usage: "by itself"},
  { idiom: "Give someone the benefit of the doubt", meanging: "Trust what someone says", usage: "as part of a sentence"},
  { idiom: "Go back to the drawing board", meanging: "Start over", usage: "as part of a sentence"},
  { idiom: "Hang in there", meanging: "Don't give up", usage: "by itself"},
  { idiom: "Hit the sack", meanging: "Go to sleep", usage: "as part of a sentence"},
  { idiom: "It's not rocket science", meanging: "It's not complicated", usage: "by itself"},
  { idiom: "Let someone off the hook", meanging: "To not hold someone responsible for something", usage: "as part of a sentence"},
  { idiom: "Make a long story short", meanging: "Tell something briefly", usage: "as part of a sentence"},
  { idiom: "Miss the boat", meanging: "It's too late", usage: "as part of a sentence"},
  { idiom: "No pain, no gain", meanging: "You have to work for what you want", usage: "by itself"},
  { idiom: "On the ball", meanging: "Doing a good job", usage: "as part of a sentence"},
  { idiom: "Pull someone's leg", meanging: "To joke with someone", usage: "as part of a sentence"},
  { idiom: "Pull yourself together", meanging: "Calm down", usage: "by itself"},
  { idiom: "So far so good", meanging: "Things are going well so far", usage: "by itself"},
  { idiom: "Speak of the devil", meanging: "The person we were just talking about showed up!", usage: "by itself"},
  { idiom: "That's the last straw", meanging: "My patience has run out", usage: "by itself"},
  { idiom: "The best of both worlds", meanging: "An ideal situation", usage: "as part of a sentence"},
  { idiom: "Time flies when you're having fun", meanging: "You don't notice how long something lasts when it's fun", usage: "by itself"},
  { idiom: "To get bent out of shape", meanging: "To get upset", usage: "as part of a sentence"},
  { idiom: "To make matters worse", meanging: "Make a problem worse", usage: "as part of a sentence"},
  { idiom: "Under the weather", meanging: "Sick", usage: "as part of a sentence"},
  { idiom: "We'll cross that bridge when we come to it", meanging: "Let's not talk about that problem right now", usage: "by itself"},
  { idiom: "Wrap your head around something", meanging: "Understand something complicated", usage: "as part of a sentence"},
  { idiom: "You can say that again", meanging: "That's true, I agree", usage: "by itself"},
  { idiom: "Your guess is as good as mine", meanging: "I have no idea", usage: "by itself"},
  { idiom: "A bird in the hand is worth two in the bush", meanging: "What you have is worth more than what you might have later", usage: "by itself"},
  { idiom: "A penny for your thoughts", meanging: "Tell me what you're thinking", usage: "by itself"},
  { idiom: "A penny saved is a penny earned", meanging: "Money you save today you can spend later", usage: "by itself"},
  { idiom: "A perfect storm", meanging: "the worst possible situation", usage: "as part of a sentence"},
  { idiom: "A picture is worth 1000 words", meanging: "Better to show than tell", usage: "by itself"},
  { idiom: "Actions speak louder than words", meanging: "Believe what people do and not what they say", usage: "by itself"},
  { idiom: "Add insult to injury", meanging: "To make a bad situation worse", usage: "as part of a sentence"},
  { idiom: "Barking up the wrong tree", meanging: "To be mistaken, to be looking for solutions in the wrong place", usage: "as part of a sentence"},
  { idiom: "Birds of a feather flock together", meanging: "People who are alike are often friends (usually used negatively)", usage: "by itself"},
  { idiom: "Bite off more than you can chew", meanging: "Take on a project that you cannot finish", usage: "as part of a sentence"},
  { idiom: "Break the ice", meanging: "Make people feel more comfortable", usage: "as part of a sentence"},
  { idiom: "By the skin of your teeth", meanging: "Just barely", usage: "as part of a sentence"},
  { idiom: "Comparing apples to oranges", meanging: "Comparing two things that cannot be compared", usage: "as part of a sentence"},
  { idiom: "Costs an arm and a leg", meanging: "Very expensive", usage: "as part of a sentence"},
  { idiom: "Do something at the drop of a hat", meanging: "Do something without having planned beforehand", usage: "as part of a sentence"},
  { idiom: "Do unto others as you would have them do unto you", meanging: "Treat people fairly. Also known as \"The Golden Rule\"", usage: "by itself"},
  { idiom: "Don't count your chickens before they hatch", meanging: "Don't count on something good happening until it's happened.", usage: "by itself"},
  { idiom: "Don't cry over spilt milk", meanging: "There's no reason to complain about something that can't be fixed", usage: "by itself"},
  { idiom: "Don't give up your day job", meanging: "You're not very good at this", usage: "by itself"},
  { idiom: "Don't put all your eggs in one basket", meanging: "What you're doing is too risky", usage: "by itself"},
  { idiom: "Every cloud has a silver lining", meanging: "Good things come after bad things", usage: "by itself"},
  { idiom: "Get a taste of your own medicine", meanging: "Get treated the way you've been treating others (negative)", usage: "as part of a sentence"},
  { idiom: "Give someone the cold shoulder", meanging: "Ignore someone", usage: "as part of a sentence"},
  { idiom: "Go on a wild goose chase", meanging: "To do something pointless", usage: "as part of a sentence"},
  { idiom: "Good things come to those who wait", meanging: "Be patient", usage: "by itself"},
  { idiom: "He has bigger fish to fry", meanging: "He has bigger things to take care of than what we are talking about now", usage: "by itself"},
  { idiom: "He's a chip off the old block", meanging: "The son is like the father", usage: "by itself"},
  { idiom: "Hit the nail on the head", meanging: "Get something exactly right", usage: "by itself"},
  { idiom: "Ignorance is bliss", meanging: "You're better off not knowing", usage: "by itself"},
  { idiom: "It ain't over till the fat lady sings", meanging: "This isn't over yet", usage: "by itself"},
  { idiom: "It takes one to know one", meanging: "You're just as bad as I am", usage: "by itself"},
  { idiom: "It's a piece of cake", meanging: "It's easy", usage: "by itself"},
  { idiom: "It's raining cats and dogs", meanging: "It's raining hard", usage: "by itself"},
  { idiom: "Kill two birds with one stone", meanging: "Get two things done with a single action", usage: "by itself"},
  { idiom: "Let the cat out of the bag", meanging: "Give away a secret", usage: "as part of a sentence"},
  { idiom: "Live and learn", meanging: "I made a mistake", usage: "by itself"},
  { idiom: "Look before you leap", meanging: "Take only calculated risks", usage: "by itself"},
  { idiom: "On thin ice", meanging: "On probation. If you make another mistake, there will be trouble.", usage: "as part of a sentence"},
  { idiom: "Once in a blue moon", meanging: "Rarely", usage: "as part of a sentence"},
  { idiom: "Play devil's advocate", meanging: "To argue the opposite, just for the sake of argument", usage: "as part of a sentence"},
  { idiom: "Put something on ice", meanging: "Put a projet on hold", usage: "as part of a sentence"},
  { idiom: "Rain on someone's parade", meanging: "To spoil something", usage: "as part of a sentence"},
  { idiom: "Saving for a rainy day", meanging: "Saving money for later", usage: "as part of a sentence"},
  { idiom: "Slow and steady wins the race", meanging: "Reliability is more important than speed", usage: "by itself"},
  { idiom: "Spill the beans", meanging: "Give away a secret", usage: "as part of a sentence"},
  { idiom: "Take a rain check", meanging: "Postpone a plan", usage: "as part of a sentence"},
  { idiom: "Take it with a grain of salt", meanging: "Don’t take it too seriously", usage: "as part of a sentence"},
  { idiom: "The ball is in your court", meanging: "It's your decision", usage: "by itself"},
  { idiom: "The best thing since sliced bread", meanging: "A really good invention", usage: "as part of a sentence"},
  { idiom: "The devil is in the details", meanging: "It looks good from a distance, but when you look closer, there are problems", usage: "by itself"},
  { idiom: "The early bird gets the worm", meanging: "The first people who arrive will get the best stuff", usage: "by itself"},
  { idiom: "The elephant in the room", meanging: "The big issue, the problem people are avoiding", usage: "as part of a sentence"},
  { idiom: "The whole nine yards", meanging: "Everything, all the way.", usage: "as part of a sentence"},
  { idiom: "There are other fish in the sea", meanging: "It's ok to miss this opportunity. Others will arise.", usage: "by itself"},
  { idiom: "There's a method to his madness", meanging: "He seems crazy but actually he's clever", usage: "by itself"},
  { idiom: "There's no such thing as a free lunch", meanging: "Nothing is entirely free", usage: "by itself"},
  { idiom: "Throw caution to the wind", meanging: "Take a risk", usage: "as part of a sentence"},
  { idiom: "You can't have your cake and eat it too", meanging: "You can't have everything", usage: "by itself"},
  { idiom: "You can't judge a book by its cover", meanging: "This person or thing may look bad, but it's good inside", usage: "by itself"},
  { idiom: "A little learning is a dangerous thing", meanging: "People who don't understand something fully are dangerous", usage: "by itself"},
  { idiom: "A snowball effect", meanging: "Events have momentum and build upon each other", usage: "as part of a sentence"},
  { idiom: "A snowball's chance in hell", meanging: "No chance at all", usage: "as part of a sentence"},
  { idiom: "A stitch in time saves nine", meanging: "Fix the problem now because it will get worse later", usage: "by itself"},
  { idiom: "A storm in a teacup", meanging: "A big fuss about a small problem", usage: "as part of a sentence"},
  { idiom: "An apple a day keeps the doctor away", meanging: "Apples are good for you", usage: "by itself"},
  { idiom: "An ounce of prevention is worth a pound of cure", meanging: "You can prevent a problem with little effort. Fixing it later is harder.", usage: "by itself"},
  { idiom: "As right as rain", meanging: "Perfect", usage: "as part of a sentence"},
  { idiom: "Bolt from the blue", meanging: "Something that happened without warning", usage: "as part of a sentence"},
  { idiom: "Burn bridges", meanging: "Destroy relationships", usage: "as part of a sentence"},
  { idiom: "Calm before the storm", meanging: "Something bad is coming, but right now it's calm", usage: "as part of a sentence"},
  { idiom: "Come rain or shine", meanging: "No matter what", usage: "as part of a sentence"},
  { idiom: "Curiosity killed the cat", meanging: "Stop asking questions", usage: "by itself"},
  { idiom: "Cut the mustard", meanging: "Do a good job", usage: "as part of a sentence"},
  { idiom: "Don't beat a dead horse", meanging: "Move on, this subject is over", usage: "by itself"},
  { idiom: "Every dog has his day", meanging: "Everyone gets a chance at least once", usage: "by itself"},
  { idiom: "Familiarity breeds contempt", meanging: "The better you know someone the less you like him", usage: "by itself"},
  { idiom: "Fit as a fiddle", meanging: "In good health", usage: "as part of a sentence"},
  { idiom: "Fortune favours the bold", meanging: "Take risks", usage: "by itself"},
  { idiom: "Get a second wind", meanging: "Have more energy after having been tired", usage: "as part of a sentence"},
  { idiom: "Get wind of something", meanging: "Hear news of something secret", usage: "as part of a sentence"},
  { idiom: "Go down in flames", meanging: "Fail spectacularly", usage: "as part of a sentence"},
  { idiom: "Haste makes waste", meanging: "You'll make mistakes if you rush through something", usage: "by itself"},
  { idiom: "Have your head in the clouds", meanging: "Not be concentrating", usage: "as part of a sentence"},
  { idiom: "He who laughs last laughs loudest", meanging: "I'll get you back for what you did", usage: "by itself"},
  { idiom: "Hear something straight from the horse's mouth", meanging: "Hear something from the person involved", usage: "as part of a sentence"},
  { idiom: "He's not playing with a full deck", meanging: "He's dumb", usage: "by itself"},
  { idiom: "He's off his rocker", meanging: "He's crazy", usage: "by itself"},
  { idiom: "He's sitting on the fence", meanging: "He can't make up his mind", usage: "by itself"},
  { idiom: "It is a poor workman who blames his tools", meanging: "If you can't do the job, don't blame it on others", usage: "by itself"},
  { idiom: "It is always darkest before the dawn", meanging: "Things are going to get better", usage: "by itself"},
  { idiom: "It takes two to tango", meanging: "One person alone isn't responsible. Both people are involved.", usage: "by itself"},
  { idiom: "Jump on the bandwagon", meanging: "Follow a trend, do what everyone else is doing", usage: "as part of a sentence"},
  { idiom: "Know which way the wind is blowing", meanging: "Understand the situation (usually negative)", usage: "as part of a sentence"},
  { idiom: "Leave no stone unturned", meanging: "Look everywhere", usage: "as part of a sentence"},
  { idiom: "Let sleeping dogs lie", meanging: "Stop discussing an issue", usage: "as part of a sentence"},
  { idiom: "Like riding a bicycle", meanging: "Something you never forget how to do", usage: "as part of a sentence"},
  { idiom: "Like two peas in a pod", meanging: "They're always together", usage: "as part of a sentence"},
  { idiom: "Make hay while the sun shines", meanging: "Take advantage of a good situation", usage: "as part of a sentence"},
  { idiom: "On cloud nine", meanging: "Very happy", usage: "as part of a sentence"},
  { idiom: "Once bitten, twice shy", meanging: "You're more cautious when you've been hurt before", usage: "by itself"},
  { idiom: "Out of the frying pan and into the fire", meanging: "Things are going from bad to worse", usage: "by itself"},
  { idiom: "Run like the wind", meanging: "Run fast", usage: "as part of a sentence"},
  { idiom: "Shape up or ship out", meanging: "Work better or leave", usage: "by itself"},
  { idiom: "Snowed under", meanging: "Busy", usage: "as part of a sentence"},
  { idiom: "That ship has sailed", meanging: "It's too late", usage: "by itself"},
  { idiom: "The pot calling the kettle black", meanging: "Someone criticizing someone else he is just as bad", usage: "as part of a sentence"},
  { idiom: "There are clouds on the horizon", meanging: "Trouble is coming", usage: "by itself"},
  { idiom: "Those who live in glass houses shouldn't throw stones", meanging: "People who are morally questionable shouldn't criticize others", usage: "by itself"},
  { idiom: "Through thick and thin", meanging: "In good times and in bad times", usage: "as part of a sentence"},
  { idiom: "Time is money", meanging: "Work quickly", usage: "by itself"},
  { idiom: "Waste not, want not", meanging: "Don't waste things and you'll always have enough", usage: "by itself"},
  { idiom: "We see eye to eye", meanging: "We agree", usage: "by itself"},
  { idiom: "Weather the storm", meanging: "Go through something difficult", usage: "as part of a sentence"},
  { idiom: "Well begun is half done", meanging: "Getting a good start is important", usage: "by itself"},
  { idiom: "When it rains it pours", meanging: "Everything is going wrong at once", usage: "by itself"},
  { idiom: "You can catch more flies with honey than you can with vinegar", meanging: "You'll get what you want by being nice", usage: "by itself"},
  { idiom: "You can lead a horse to water, but you can't make him drink", meanging: "You can't force someone to make the right decision", usage: "by itself"},
  { idiom: "You can't make an omelet without breaking some eggs", meanging: "There's always a cost to doing something", usage: "by itself"},
]

export default idoms