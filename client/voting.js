Candidates = new Meteor.Collection('candidates');
Deps.autorun(function () {
    Meteor.subscribe("candidates", Session.get("roomId"));
});

Session.setDefault("page", "home");
Session.setDefault("firstItem", true);

$(document).ready(function () {
    $('#myCarousel').carousel({ interval: false });
});

Template.content.showHome = function () {
    return Session.equals("page", "home");
}

Template.content.showVote = function () {
    return Session.equals("page", "vote");
}

Template.content.showReview = function () {
    return Session.equals("page", "review");
}

Template.content.showHelp = function () {
    return Session.equals("page", "help");
}

Template.navbar.events({
    'click li' : function (e) {
        $('.nav .active').removeClass('active');
        e.currentTarget.classList.add('active');
    },
    'click #home' : function (e) {
        console.log("home");
        Session.set("page", "home");
    },
    'click #vote' : function (e) {
        console.log("vote");
        Session.set("page", "vote");
        Session.set("firstItem", true);
    },
    'click #review' : function (e) {
        console.log("review");
        Session.set("page", "review");
    },
    'click #help' : function (e) {
        console.log("help");
        Session.set("page", "help");
    }
});

Template.vote.candidates = function () {
    console.log("in vote.dandidates");
    console.log(Candidates.find().count());
    return Candidates.find();
};

Template.vote.isActive = function () {
    console.log("isActive");
    var isFirstItem =  Session.get("firstItem");
    Session.set("firstItem", false);
    console.log(isFirstItem);
    return isFirstItem?"item active":"item";
};

Template.container.rendered = function (e) {
    $('body').on('keypress', function (e) {
        console.log(e.keyCode);
        var code = e.keyCode || e.which;
        if (104 == code) {
            // left
            $('#left').click();
        }
        else if (108 == code) {
            // right
            $('#right').click();
        }
        else if (107 == code) {
            // down
        }
        else if (106 == code) {
            // up
        }
    });
};

