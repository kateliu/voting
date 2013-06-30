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

Template.content.showIntro = function () {
    return Session.equals("page", "intro");
}

Template.content.showVote = function () {
    return Session.equals("page", "vote");
}

Template.content.showReview = function () {
    return Session.equals("page", "review");
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
    'click #intro' : function (e) {
        console.log("intro");
        Session.set("page", "intro");
    },
    'click #vote' : function (e) {
        console.log("vote");
        Session.set("page", "vote");
        Session.set("firstItem", true);
    },
    'click #review' : function (e) {
        console.log("review");
        Session.set("page", "review");
    }
});

Template.vote.events({
    'click .active' : function (e) {
        console.log("active item");
    }
});

Template.vote.candidates = function () {
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
        var code = e.keyCode || e.which;
        var page = Session.get("page");
        console.log(page);
        console.log(e.keyCode);
        switch (code) {
            case 72:
            case 104:
                // H or h: left
                $('#left').click();
                break;
            case 76:
            case 108:
                // L or l" right
                $('#right').click();
                break;
            case 75:
            case 107:
                // K or k: down
                $('.active').toggleClass("selected");
                break;
            case 65:
            case 97:
                // A or a: tab
                if (page === "home") {
                    console.log("going to click on intro");
                    $('#intro').click();
                }
                else if (page === "intro") {
                    console.log("going to click on vote");
                    $('#vote').click();
                }
                else if (page === "vote") {
                    console.log("going to click on review");
                    $('#review').click();
                }
                else if (page === "review") {
                    console.log("going to click on home");
                    $('#home').click();
                }
                break;
            default:
                break;
        }
    });
};

