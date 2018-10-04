let state = 0;

const CITIES = {
  'winnipeg': 'Manitoba',
  'edmonton': 'Alberta',
  'charlottetown': 'PEI',
  'st. john\'s': 'Newfoundland and Labrador',
  'yellowknife': 'The Northwest Territories',
  'iqaluit': 'Nunavut',
  'ottawa': 'Canada',
  'whitehorse': 'Yukon',
  'victoria': 'British Columbia',
  'regina': 'Saskatchewan',
  'toronto': 'Ontario',
  'quebec city': 'Quebec',
  'halifax': 'Nova Scotia',
  'fredericton': 'New Brunswick'
};

const SONGS = {
  'the vegetable song': "Tomato tomato tomato tomato tomato tomato tomato potato mato potato potato pumpkin pumpkin pumpkin pumpkin parsley parsley parsley parsley",
  'the huggies commercial song': 'We all need a hug in the morning and one at the end of the day and as many as possible squeeze in between to keep life\'s struggles at bay. It\'s my belief that for instant relief, a hug is the best cure of all. I\'m a big kid now. Pampers!',
  'the diaper rap': "I'm a big kid now. Went from baby bottles to drinkin' from sippy cups. Went from wearing diapers to rocking these fresh pullups. We're fifty million strong, so put on your pull ups and help us sing this song. I'm a big kid now.",
  'baby shark': `Baby shark do do do do do do Baby shark do do do do do do Baby shark do do do do do do Baby shark
  Mommy shark do do do do do do Mommy shark do do do do do do Mommy shark do do do do do do Mommy shark 
  Daddy shark do do do do do do Daddy shark do do do do do do Daddy shark do do do do do do Daddy shark 
  Grandma shark do do do do do do Grandma shark do do do do do do Grandma shark do do do do do do Grandma shark 
  Grandpa shark do do do do do do Grandpa shark do do do do do do Grandpa shark do do do do do do Grandpa shark 
  Let's go hunt do do do do do do Let's go hunt do do do do do do Let's go hunt do do do do do do Let's go hunt 
  Run away do do do do do do Run away do do do do do do Run away do do do do do do Run away 
  Safe at last do do do do do do Safe at last do do do do do do Safe at last do do do do do do Safe at last
  It's the end do do do do do do It's the end do do do do do do It's the end do do do do do do It's the end`
};

function chat(message) {
  logMessage("You", message);
  message = message.toLowerCase();
  let output = `I heard you say "${message}."`;

  let cityMatch = message.match(/^where is (.+)/);
  let songMatch = message.match(/^(?:sing|say|rap) (.+)/);

  if (message == "what is your name") {
    output = "My name is King Bob III";
  } else if (message == 'do you like spaghetti') {
    output = "Yes, I like spaghetts!";
  } else if (songMatch) {
    let song = songMatch[1].toLowerCase();
    if (song in SONGS) {
      output = SONGS[song];
    } else {
      output = "I don't know that one."
    }
  } else if (cityMatch) {
    let city = cityMatch[1].toLowerCase();
    if (city in CITIES) {
      output = `${city} is in ${CITIES[city]}`;
    } else {
      output = `I don't know where ${city} is.`
    }
  } else {
    switch (state) {
      case 0:
        if (message == 'knock knock') {
          output = "Who's there?";
          state++;
        }
        break;
      case 1:
        output = `${message} who?`;
        state++;
        break;
      case 2:
        output = 'hahahahahahaha';
        state = 0;
        break;
    }
  }

  logMessage("Bob", output);
  return output;
}
