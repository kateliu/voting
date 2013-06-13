Session.setDefault("page", "home");

Template.content.showHome = function () {
  return Session.equals("page", "home");
}

Template.content.showCalibrate = function () {
  return Session.equals("page", "calibrate");
}

Template.content.showVote = function () {
  return Session.equals("page", "vote");
}

Template.content.showReview = function () {
  return Session.equals("page", "review");
}

Template.content.showSend = function () {
  return Session.equals("page", "send");
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
  'click #calibrate' : function (e) {
    console.log("calibrate");
    Session.set("page", "calibrate");
  },
  'click #vote' : function (e) {
    console.log("vote");
    Session.set("page", "vote");
  },
});

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


