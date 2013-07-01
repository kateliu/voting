Candidates = new Meteor.Collection('candidates');

Deps.autorun(function () {
    Meteor.subscribe("candidates");
});

Session.setDefault("page", "home");

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
    'click li a' : function (e) {
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
    },
    'click #review' : function (e) {
        console.log("review");
        Session.set("page", "review");
    }
});

Template.navbar.rendered = function (e) {
    $('body').on('keypress', function (e) {
        var code = e.keyCode || e.which;
        var page = Session.get("page");
        console.log(page);
        console.log(e.keyCode);
        if (code === 97) {
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
                console.log("showing a confirm box");
            }
        }
    });
};

Template.vote.events({
    'click .active' : function (e) {
        console.log("active item");
    }
});

Template.candidateInfo.candidates = function () {
    return Candidates.find();
};

Template.candidateInfo.rendered = function () {
    $('#myCarousel').carousel({ interval: false });
    $("#candidate").first().addClass("active");
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
                $('.active .carousel-selection').toggleClass("checked");
                break;
            default:
                break;
        }
    });
};

