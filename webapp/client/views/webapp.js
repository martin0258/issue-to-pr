Template.issue_to_pr.events({
  // Handle "Convert" button click
  'click #convert': function () {
    // Get inputs from users
    var currentUser = Meteor.user();
    var token = currentUser.services.github.accessToken;
    var user = $('#user').val();
    var repo = $('#repo').val();
    var issue_num = $('#issue-number').val();
    var base = $('#base').val();
    var head = $('#head').val();

    Meteor.call('convert_issue_to_pr',
                token, user, repo,
                issue_num, base, head,
      function (error, url) {
        if (error) {
          toastr.options.timeOut = '0';
          var title = 'Conversion failed. Please check possible error and try again.';
          toastr.error(error.reason, title);
          console.log(error);
        } else {
          toastr.options.timeOut = '5000';
          toastr.success('Issue converted!');
        }
    });
  }
});
