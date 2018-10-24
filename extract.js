
var dataset = {};
var rows = document.querySelectorAll('[ui-core-id=member]');
rows.forEach(function (row) {
  console.log('checking row');
  var email, login, teamData = [];
  var emailCell = row.querySelector('[ui-core-id=email]');
  if (!emailCell) {
    return;
  }

  email = emailCell.innerText;
  var loginCell = row.querySelector('[ui-core-id=member-last-login]');
  if (!loginCell) {
    return;
  }
  var login = loginCell.innerText;
  var teamCells = row.querySelectorAll('[ui-core-id=team]');
  if (!teamCells) {
    return;
  }
  var teamData = [];
  teamCells.forEach(function (cell) {
    var team = cell.innerText;
    var roles = cell.parentNode.querySelector('[ui-core-id=roles]').innerText;
    var obj = {};
    obj[team] = roles;
    teamData.push(obj);
  });
  dataset[email] = {
    email: email,
    login: login,
    teams: teamData
  };
});

browser.runtime.sendMessage(dataset);
