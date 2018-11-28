(function(window, document) {
  document.addEventListener("DOMContentLoaded", function() {}, false);
  function createNode(element) {
    return document.createElement(element); // Create the type of element you pass in the parameters
  }

  function append(parent, el) {
    return parent.appendChild(el); // Append the second parameter(element) to the first one
  }

  window.onSubmit = function() {
    window.username = document.getElementById("user_input").value;
    const tb = document.getElementById("myTable");
    const url =
      "https://api.github.com/users/" + `${window.username}` + "/followers";

    let cntRow = tb.rows.length;
    if (cntRow > 1) {
      let i;
      for (i = 1; i < cntRow; i++) {
        tb.deleteRow(1);
      }
    }
    fetch(url)
      .then(resp => resp.json())
      .then(function(data) {
        let res = data;
        return res.map(function(user) {
          // Map through the results and for each run the code below
          // Create the elements we need
          let img = createNode("img"),
            tdLogin = createNode("td"),
            tdUrl = createNode("td"),
            tr = createNode("tr");
          img.src = user.avatar_url; // Add the source of the image to be the src of the img element
          tdLogin.innerHTML = `${user.login}`;
          tdUrl.innerHTML = ` ${user.html_url}`;
          // Append all elements
          append(tr, img);
          append(tr, tdLogin);
          append(tr, tdUrl);
          append(tb, tr);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
})(window, document);
