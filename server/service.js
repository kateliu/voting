Candidates = new Meteor.Collection("candidates");

Meteor.startup(function () {
    if (Candidates.find().count() == 0) {
        Candidates.insert({
            name:"Ang Lee",
            description: "Ang Lee is a Taiwanese-born American film director, screenwriter and producer. Throughout his career, Ang Lee has sought to explore complex themes in his movies. Lee has won the Academy Award for Best Director twice, first for Brokeback Mountain (2005) and most recently for Life of Pi (2012).",
            photoUrl: "http://oscarnominations2013.com/wp-content/uploads/2013/01/Ang-Lee.jpg"
        });

        Candidates.insert({
            name:"Christopher Nolan",
            description: "Christopher Jonathan James Nolan is a British-American film director, screenwriter, and producer. In his career, Nolan has alternated between large-scale epics such as The Dark Knight Trilogy. In total, his films have grossed approximately US$1.6 billion in North America and US$3.5 billion worldwide, making him one of the most commercially successful filmmakers of all time.",
            photoUrl: "http://ia.media-imdb.com/images/M/MV5BNjE3NDQyOTYyMV5BMl5BanBnXkFtZTcwODcyODU2Mw@@._V1._SY314_CR6,0,214,314_.jpg"
        });

        Candidates.insert({
            name:"Steven Spielberg",
            description: "Steven Allan Spielberg is an American film director, screenwriter, producer, and studio entrepreneur. In a career of more than four decades, Spielberg's films have covered many themes and genres. Spielberg won the Academy Award for Best Director for Schindler's List (1993) and Saving Private Ryan (1998).",
            photoUrl: "http://ia.media-imdb.com/images/M/MV5BMTY1NjAzNzE1MV5BMl5BanBnXkFtZTYwNTk0ODc0._V1._SX214_CR0,0,214,314_.jpg"
        });

    }
});

Meteor.publish("candidates", function () {
    return Candidates.find();
});