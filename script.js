
    
  function callApiRest() {
            var email = document.getElementById("eInputEmail").value;
            var pass = document.getElementById("eInputPassword").value;

            if (email == '' || pass == '') {
                alert("Email or pass incorrect.");
                return;
            }

            axios({
                    method: 'get',
                    url: 'https://openapi.emtmadrid.es/v1/mobilitylabs/user/login/',
                    headers: {
                        "email": email,
                        "password": pass
                    }
                }).then(function(response) {
                    console.log("accessToken: " + response.data.data[0].accessToken);

                    callCollection(response.data.data[0].accessToken)

                })
                .catch(function(error) {
                    alert("Invalid user.");
                });

        }

        function callCollection(accessToken) {

            var cid = document.getElementById("eInputID").value;
            if (cid == null || cid == "") {
                alert("Invalid Collection ID");
            }

            axios({
                    method: 'post',
                    url: "https://openapi.emtmadrid.es/v1/mobilitylabs/collection/reactive/" + cid + "/1/",
                    headers: {
                        "accessToken": accessToken,
                        "Content-Type": "application/json"
                    },
                    data: {}
                }).then(function(response) {
                    console.log("Madrid Central: " + JSON.stringify(response.data));
                    document.getElementById("pResponse").setAttribute("style", "display:block")
                    document.getElementById("textResponse").innerHTML = JSON.stringify(response.data);

                })
                .catch(function(error) {
                    alert(error);
                });
        }
