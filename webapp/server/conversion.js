var GitHubApi = Meteor.require('github');
var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com",
    //pathPrefix: "/api/v3", // for some GHEs
    timeout: 5000
});

// Define server methods for client to use
Meteor.methods({
  convert_issue_to_pr: function (access_token, user, repo,
                                 issue_num, base, head) {
    // Authenticate
    github.authenticate({
      type: "oauth",
      token: access_token
    });

    var option = {
      user: user,
      repo: repo,
      issue: issue_num,
      base: base,
      head: head
    };

    github.pullRequests.createFromIssue(option, function (error, result) {
      if (error) {
        console.log(error);
        throw new Meteor.Error(500, error);
      } else {
        // succeed
        console.log(result);
      }
    });
  }
});
