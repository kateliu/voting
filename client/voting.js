Candidates = new Meteor.Collection('candidates');

Deps.autorun(function () {
    Meteor.subscribe("candidates");
});

Session.setDefault("page", "home");
Session.setDefault("voted", false);
Session.setDefault("name", "");

Template.content.showHome = function () {
    return Session.equals("page", "home");
}

Template.content.showIntro = function () {
    return Session.equals("page", "intro");
}

Template.content.showVote = function () {
    return Session.equals("page", "vote");
}

Template.content.showDone = function () {
    return Session.equals("page", "done");
}

Template.navbar.events({
    'click' : function (e) {
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
    'click #done' : function (e) {
        console.log("done");
        Session.set("page", "done");
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
                $('#home').bind('click', function(e) {
                    e.preventDefault();
                    return false;
                });
            }
            else if (page === "intro") {
                console.log("going to click on vote");
                $('#vote').click();
            }
            else if (page === "vote") {
                console.log("going to click on done");
                var isVoted = Session.get("voted");
                if (isVoted) {
                    $('#done').click();
                }
                else {
                    $('#votingAlert').show();
                }
            }
            else if (page === "done") {
                console.log("showing a confirm box");
            }
        }
    });
};

Template.vote.rendered = function () {
    $('#votingAlert').hide();
};

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
                var isVoted = Session.get("voted");
                Session.set("voted", !isVoted);
                $('.active').toggleClass("selected");
                $('.active .carousel-selection').toggleClass("checked");
                $('#candidate:not(.active)').removeClass("selected");
                $('#candidate:not(.active) .carousel-selection').removeClass("checked");
                break;
            default:
                break;
        }
    });
};

