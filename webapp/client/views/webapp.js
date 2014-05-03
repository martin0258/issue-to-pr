Template.issue_to_pr.events({
  // Handle "Convert" button click
  'click #convert': function () {
    // Get inputs from users
    var currentUser = Meteor.user();
    var token = currentUser.services.github.accessToken;
    var issue_url = $('#issue-url').val();
    var base = $('#base').val();
    var head = $('#head').val();

    // Example: https://github.com/SkysourceRepo/ER-Bonus-System/issues/777
    var domain = "https://github.com/";
    var split_by_domain = issue_url.split(domain);
    if (split_by_domain.length != 2) {
      toastr.error('Conversion failed. Issue URL is wrong.');
      return;
    }
    var user_repo_num = split_by_domain[1].split('/');
    if (user_repo_num.length != 4) {
      toastr.error('Conversion failed. Issue URL is wrong.');
      return;
    }
    var user = user_repo_num[0];
    var repo = user_repo_num[1];
    var issue_num = user_repo_num[3];

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
