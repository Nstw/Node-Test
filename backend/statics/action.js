(function(window, document) {
  document.addEventListener("DOMContentLoaded", function() {}, false);

  function createNode(element) {
    // Create the type of element you pass in the parameters
    return document.createElement(element);
  }

  function append(parent, el) {
    // Append the second parameter(element) to the first one
    return parent.appendChild(el);
  }

  function renderTable(data) {
    const res = data;
    const table = document.getElementById("myTable");

    let cntRow = table.rows.length;
    if (cntRow > 1) {
      let i;
      for (i = 1; i < cntRow; i++) {
        table.deleteRow(1);
      }
    }

    return res.map(function(user) {
      // Map through the results and for each run the code below
      let img = createNode("img"),
        tdLogin = createNode("td"),
        tdUrl = createNode("td"),
        tr = createNode("tr");

      img.src = user.avatar;
      tdLogin.innerHTML = `${user.login}`;
      tdUrl.innerHTML = ` ${user.url}`;
      // Append all elements
      append(tr, img);
      append(tr, tdLogin);
      append(tr, tdUrl);
      append(table, tr);
    });
  }

  window.onSubmit = function() {
    const username = document.getElementById("user_input").value;

    fetch("/fetchuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({ username: username })
    })
      .then(resp => resp.json())
      .then(function(data) {
        renderTable(data);
      })
      .catch(function(error) {
        console.error(error);
      });
  };
})(window, document);
